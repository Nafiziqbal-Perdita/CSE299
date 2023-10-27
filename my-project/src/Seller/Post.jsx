import { useEffect, useState } from "react";
import { useAuth } from "../FireBase/Authentication/AuthContext";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Post = ({ changePage }) => {
  const { userid, getCurrentUser, generateRandomNumber } = useAuth();

  // State management
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pprice, setPprice] = useState("");
  const [error, setError] = useState("");
  const [go, setGo] = useState(false);
  const [catagory, setCatagory] = useState("vegetables");

  //states for image upload
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Function to create a post
  const createPost = async (e) => {

    e.preventDefault();


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
            category:catagory,
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

  const navigate = useNavigate();

  if (go) {
    // navigate("/Seller", {});

    changePage("home");
  }

  console.log(catagory);

  return (
    <>
      <div className=" h-screen  flex justify-center mt-20 ">
        <form
          action=""
          className="flex flex-col justify-center items-center h-fit w-2/3 bg-slate-100  p-2 rounded-xl shadow-md "
        >
          <label className="text-xl font-bold mt-2 ">
            Create Post
            <hr />
          </label>

          <div className="h-5/6 w-5/6">
            <input
              className="p-2 w-2/3 mt-1 rounded-xl border"
              type="text"
              placeholder="Name "
              onChange={(e) => {
                setPname(e.target.value);
              }}
            />
            <input
              className="p-2 w-2/3 mt-8 rounded-xl border"
              type="text"
              placeholder="Price "
              onChange={(e) => {
                setPprice(e.target.value);
              }}
            />

            <div className="mt-4 ">
              <div>
                <label
                  htmlFor=""
                  className="text-slate-500 font-serif text-lg p-2 "
                >
                  Select Category:
                </label>
              </div>

              <div>
                <select
                  className="p-2 w-2/5 rounded-xl border"
                  value={catagory}
                  onChange={(e) => {
                    setCatagory(e.target.value);
                  }}
                >
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="fish">Fish</option>
                </select>
              </div>
            </div>

            <div className="h-20">
              <input
                className="p-2 mt-2 rounded-xl border w-2/3 h-full "
                type="text"
                placeholder="Description"
                onChange={(e) => {
                  setPdesc(e.target.value);
                }}
              />
            </div>

            <div className="mt-8">
              <input
                type="file"
                onChange={(e) => {
                  const image = e.target.files[0];
                  setFile(image);
                }}
              />
              {uploadProgress > 0 && (
                <div className="relative mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-md">
                    <div
                      className="h-2 bg-blue-500 rounded-md"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload Progress: {uploadProgress}%
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-center">
              <button
                className="bg-[#002D74] m-3  w-56 rounded-xl text-white py-2 hover:scale-105 duration-300"
                onClick={createPost}
              >
                Create
              </button>
            </div>

            <div className="mt-2 flex justify-center">
              <p>{error}</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Post;
