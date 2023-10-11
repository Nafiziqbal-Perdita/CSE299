import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Post = () => {
  const { userid, getCurrentUser, generateRandomNumber } = useAuth();

  // State management
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pprice, setPprice] = useState("");
  const [error, setError] = useState("");
  const [go, setGo] = useState(false);
  //states for image upload
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Function to create a post
  const createPost = async () => {
    if (!userid || userid === "null") {
      console.error("User ID is invalid.");
      setGo(true);
      return;
    }

    if (!pname || !pprice) {
      console.error("Please fill in all fields.");
      setError("Please fill in all fields.");
      return;
    }

    if (!file) {
      console.log("No image file selected");
      setError("Please Insert an Image");
      return;
    }
    // Get the storage from Firebase
    const storage = getStorage();

    //get the random number for the image url
    const randomNumber = generateRandomNumber();
    console.log(randomNumber);

    // Create a reference to the storage bucket and specify the file path
    const storageRef = ref(storage, "productImages/" + randomNumber);

    // Upload the image
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen to state changes, errors, and completion of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        console.log("File uploaded successfully!");

        try {
          // Get the image URL
          const imageUrl = await getDownloadURL(storageRef);
          console.log("Image URL:", imageUrl);

          // Now that you have the image URL, you can store it in Firestore
          const db = getFirestore();
          const postsCollection = collection(db, "posts");
          const newPostRef = await doc(postsCollection);

          await setDoc(newPostRef, {
            image: imageUrl,
            product: newPostRef.id,
            creator_id: userid,
            product_name: pname,
            price: pprice,
            description: pdesc,
            stock: true,
          });

          console.log("Document written successfully.");
          console.log("The Post id is:", newPostRef.id); // Access the generated document ID
          setGo(true);
        } catch (error) {
          console.error("Error storing image URL:", error);
        }
      }
    );
  };

  //useeffect

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (go) {
    return <Navigate to="/Seller" />;
  }

  return (
    <>
      <div>Post Creation</div>
      <div>User ID: {userid}</div>

      <form className="space-y-4 m-10">
        <div className="border space-x-2">
          <label>Product Name:</label>
          <input
            className="border border-black w-56"
            onChange={(e) => {
              setPname(e.target.value);
            }}
            value={pname}
            type="text"
          />
        </div>
        <div className="border space-x-2">
          <label>Product Description:</label>
          <input
            className="border border-black w-72"
            onChange={(e) => {
              setPdesc(e.target.value);
            }}
            value={pdesc}
            type="text"
          />
        </div>
        <div className="border space-x-2">
          <label>Product Price:</label>
          <input
            className="border border-black w-56"
            onChange={(e) => {
              setPprice(e.target.value);
            }}
            value={pprice}
            type="text"
          />
        </div>
        <div className="border space-x-2">
          <label>Upload image :</label>

          <input
            type="file"
            onChange={(e) => {
              const image = e.target.files[0];
              setFile(image);
            }}
          />

          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        </div>

        <input
          type="button"
          value="Submit"
          className="border w-16 rounded-md bg-blue-400 text-white"
          onClick={createPost}
        />
      </form>
      <div>
        <p>{error}</p>
      </div>
    </>
  );
};

export default Post;
