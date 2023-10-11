
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { query } from "firebase/database";

const EditPost = () => {
  const location = useLocation();
  const { image, name, price, stock, product_id, userid, detail } =
    location.state;

  // States
  const [pname, setPname] = useState("");
  const [pimage, setPimage] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pprice, setPprice] = useState("");
  const [pstock, setPstock] = useState(false);
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");
  const [go, setGo] = useState(false);

  // States for image upload
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setPname(name);
    setPprice(price);
    setPdesc(detail);
    setPstock(stock);
    setPimage(image);
    setProduct(product_id);
  }, [name, price, detail, stock, image, product_id]);

  const { generateRandomNumber } = useAuth();

 
  
  const uploadPhoto = async () => {
    if (file != null) {
      console.log("Start UPloading photo");
      try {
        const randomNumber = generateRandomNumber();
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + randomNumber);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        // Listen to state changes, errors, and completion of the upload
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle upload progress if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // Handle errors during the upload
            console.error("Error uploading file:", error);
          },
          async () => {
            // Upload completed successfully, get the image URL
            const imageUrl = await getDownloadURL(storageRef);
            console.log("Image URL:", imageUrl);
  
            // Update the state with the new image URL
            setPimage(imageUrl);
  
            // Call the function to upload other data
            uploadData(imageUrl);
          }
        );
      } catch (error) {
        // Handle any exceptions that may occur
        console.error("Error uploading file:", error);
      }
    } else {
      // If no file is selected, just proceed with uploading other data
      uploadData(image);
    }
  };
  
  const uploadData = async (urlOfimage) => {
    // Now that you have the image URL, you can store it in Firestore
    const db = getFirestore();
    const postsCollection = collection(db, "posts");
  
    try {
      const querySnapshot = await getDocs(
        query(
          postsCollection,
          where("creator_id", "==", userid),
          where("id", "==", product_id)
        )
      );
  
      if (!querySnapshot.empty) {
        const existingPost = querySnapshot.docs[0];
  
        // Update the state with the new data
        setPname(name);
        setPprice(price);
        setPdesc(detail);
        setPstock(stock);
  
        // Update the document in Firestore with the new data
        await setDoc(existingPost.ref, {
          image: urlOfimage,
          product: existingPost.id,
          creator_id: userid,
          product_name: pname,
          price: pprice,
          description: pdesc,
          stock: pstock,
        });
  
        console.log("Document updated successfully.");
        console.log("The Post id is:", existingPost.id);
      } else {
        setError("Can not change the Post");
      }
  
      setGo(true);
    } catch (error) {
      console.error("Error adding/updating document:", error);
      setError("Error adding/updating document");
    }
  };
  




  const handleClick = async () => {
    // Clear any previous error message
    await uploadPhoto();
  };

  if (go) {
    return <Navigate to="/MyProduct" />;
  }








    return (
        <>
            <>
                <form className="space-y-4 m-10">
                    <div>
                        <img
                            className="max-h-32 rounded-full border"
                            src={pimage}
                            alt={pname}
                        />

                        <div className="m-2">
                            <input
                                type="file"
                                onChange={(e) => {
                                    const theFile = e.target.files[0];
                                    setFile(theFile);
                                }}
                            />
                        </div>
                    </div>

                    <div className="border space-x-2">
                        <label>Product Name: </label>
                        <input
                            className="border border-black w-56"
                            type="text"
                            onChange={(e) => {
                                setPname(e.target.value);
                            }}
                            value={pname}
                        />
                    </div>
                    <div className="border space-x-2">
                        <label>Product Description:</label>
                        <input
                            className="border border-black w-72"
                            type="text"
                            onChange={(e) => {
                                setPdesc(e.target.value);
                            }}
                            value={pdesc}
                        />
                    </div>
                    <div className="border space-x-2">
                        <label>Product Price:</label>
                        <input
                            className="border border-black w-56"
                            type="text"
                            onChange={(e) => {
                                setPprice(e.target.value);
                            }}
                            value={pprice}
                        />
                    </div>

                    <div className="border space-x-2">
                        <label>Product In Stock ?</label>

                        <div className="flex flex-col items-start">
                            <div>
                                <input
                                    type="radio"
                                    // value={yes}

                                    checked={pstock}
                                    onChange={(e) => setPstock(!pstock)}
                                />{" "}
                                <label>Yes</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    // value={no}
                                    checked={!pstock}
                                    onChange={(e) => setPstock(!pstock)}
                                />{" "}
                                <label>No</label>
                            </div>
                        </div>
                    </div>

                    <input
                        type="button"
                        value="Update"
                        className="border w-16 rounded-md bg-blue-400 text-white"
                        onClick={handleClick}
                    />
                </form>
                <div>
                    <p>{error}</p>
                </div>
            </>
        </>
    );
};

export default EditPost;
