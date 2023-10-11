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
    try {
      if (file) {
        const randomNumber = generateRandomNumber();
        const storage = getStorage();
        const storageRef = ref(storage, `productImages/${randomNumber}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error uploading file:", error);
            setError("Error uploading file");
          },
          async () => {
            const imageUrl = await getDownloadURL(storageRef);
            console.log("Image URL:", imageUrl);
            setPimage(imageUrl);
            updateDocument(imageUrl);
          }
        );
      } else {
        updateDocument(image);
      }
    } catch (e) {
      console.error("Error uploading file:", e);
      setError("Error uploading file");
    }
  };

  const updateDocument = async (imageUrl) => {
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
        await setDoc(existingPost.ref, {
          image: imageUrl,
          creator_id: userid,
          product_name: pname,
          price: pprice,
          description: pdesc,
          stock: pstock,
        });

        console.log("Document updated successfully.");
        console.log("The Post id is:", existingPost.id);
        setGo(true);
      } else {
        setError("Can not change the Post");
      }
    } catch (e) {
      console.error("Error adding/updating document:", e);
      setError("Error adding/updating document");
    }
  };

  const handleClick = async () => {
    setError(""); // Clear any previous error message
    await uploadPhoto();
  };

  if (go) {
    return <Navigate to="/MyProduct" />;
  }

  return (
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
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
              }}
            />
          </div>
        </div>
        {/* Other form fields */}
        {/* ... */}
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
  );
};

export default EditPost;
  