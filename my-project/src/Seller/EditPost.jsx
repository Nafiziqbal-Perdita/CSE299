import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";

const EditPost = () => {
  const location = useLocation();

  const { image, name, price, stock, product_id, userid, detail, category } =
    location.state;

  const navigate = useNavigate();

  //initializing the class

  const imageUpload = new ImageUpload();

  // State management
  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pprice, setPprice] = useState("");
  const [pstock, setPstock] = useState(false);
  const [error, setError] = useState("");
  const [go, setGo] = useState(false);
  const [catagory, setCatagory] = useState("vegetables");
  const [pimage, setPimage] = useState(image);

  //states for image upload
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setPname(name);
    setPdesc(detail);
    setPprice(price);
    setPstock(stock);
    setCatagory(category);
  }, []);

  console.log(pname);
  console.log(pdesc);
  console.log(pprice);
  console.log(pstock);
  console.log(catagory);
  console.log(product_id);
  console.log(userid);

  const updateTheDocument = async (obj) => {
    // Now that you have the image URL, you can store it in Firestore
    const db = getFirestore();
    const collectionName = "posts";
    const documentId = product_id;

    const docRef = doc(db, collectionName, documentId);

    try {
      await updateDoc(docRef, obj);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Function to create a post
  const updatePost = async (e) => {
    e.preventDefault();

    if (!pname) {
      setError("Name Field Empty");
      return;
    }

    if (!pprice) {
      setError("Price Field Empty");
      return;
    }

    let updatedImage = pimage;

    if (file != null) {
      imageUpload
        .uploadImage(file, (progress) => {
          setUploadProgress(progress);
          console.log(`Upload progress: ${progress}%`);
        })
        .then((downloadURL) => {
          const idata = {
            image: downloadURL,
          };

          const saveIt = async () => {
            await updateTheDocument(idata);
          };
          saveIt();

          console.log(`Image uploaded. Download URL: ${downloadURL}`);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }

    console.log("Updated image");
    console.log(updatedImage);

    //The Updated data set
    const updatedData = {
      product_name: pname,
      price: pprice,
      description: pdesc,
      category: catagory,
      stock: pstock,
    };

    await updateTheDocument(updatedData);

    navigate("/Seller");
  };

  return (
    <>
      <div className=" h-screen  flex justify-center mt-20 ">
        <form
          action=""
          className="flex flex-col justify-center items-center h-fit w-2/3 bg-slate-100  p-2 rounded-xl shadow-md "
        >
          <label className="text-xl font-bold mt-2 ">
            Update Post
            <hr />
          </label>

          <div className="h-5/6 w-5/6">
            <input
              className="p-2 w-2/3 mt-1 rounded-xl border"
              type="text"
              placeholder="Name "
              value={pname}
              onChange={(e) => {
                setPname(e.target.value);
              }}
            />
            <input
              className="p-2 w-2/3 mt-8 rounded-xl border"
              type="text"
              placeholder="Price "
              value={pprice}
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
                value={pdesc}
                onChange={(e) => {
                  setPdesc(e.target.value);
                }}
              />
            </div>

            {/* toggle button for make the stock change */}

            <div className="mt-5 ml-1">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={pstock} // Set the "checked" attribute based on the pstock variable
                  disabled={!pstock} // Set the "disabled" attribute based on the inverse of the pstock variable
                />
                <div
                  onClick={() => setPstock(!pstock)}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                ></div>
                <span className="ml-3 text-md font-medium text-gray-900">
                  {pstock ? "Available" : "Not Available"}
                </span>
              </label>
            </div>

            <div className="mt-6">
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
                onClick={updatePost}
              >
                Update
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

export default EditPost;
