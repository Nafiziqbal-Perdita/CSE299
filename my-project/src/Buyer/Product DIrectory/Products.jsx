import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Carousoul from "../Carosoul/carosoul";

const Products = ({ buyerId }) => {
  //states
  const [data, setData] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchCatagory, setSearchCatagory] = useState("");
  const [clickCatagory, setClickCatagory] = useState(false);

  const db = getFirestore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const fetchedData = [];

        querySnapshot.forEach((doc) => {
          fetchedData.push({
            ...doc.data(),
          });
        });

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  console.log(data);

  return (
    <>
      <div className="bg-gray-100 flex flex-col">
        {/* all products will deployed here  */}

        <div className="h-36 flex items-center justify-center ">
          <Carousoul data={data} buyerId={buyerId} />
        </div>

        <div className="p-2">
          <form>
            <div class="flex">
              <div className=" flex flex-col w-48">
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                  type="button"
                  onClick={() => {
                    setClickCatagory(!clickCatagory);
                  }}
                >
                  {searchCatagory === "" ? "All Items" : searchCatagory}

                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdown"
                  className={`z-10 ${
                    clickCatagory ? "" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul
                    class="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdown-button"
                  >
                    <li
                      onClick={(e) => {
                        setSearchCatagory("");
                        setClickCatagory(false);
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                      >
                        All Items
                      </button>
                    </li>

                    <li
                      onClick={(e) => {
                        setSearchCatagory("vegetables");
                        setClickCatagory(!clickCatagory);
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                      >
                        vegetables
                      </button>
                    </li>

                    <li
                      onClick={(e) => {
                        setSearchCatagory("fruits");
                        setClickCatagory(!clickCatagory);
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                      >
                        fruits
                      </button>
                    </li>
                    <li
                      onClick={(e) => {
                        setSearchCatagory("fish");
                        setClickCatagory(!clickCatagory);
                      }}
                    >
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
                      >
                        fish
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  class="block p-2.5 w-full z-20 text-sm bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search Mockups, Logos, Design Templates..."
                  required
                  onChange={(e) => {
                    setSearchName(e.target.value.toLocaleLowerCase());
                  }}
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="m-5 p-1    flex flex-wrap   ">
          {data
            .filter(
              (doc) =>
                (!searchCatagory ||
                  (doc.category && doc.category.includes(searchCatagory))) &&
                doc.product_name.toLocaleLowerCase().includes(searchName)
            )
            .map((doc) => (
              <Product
                key={doc.id} // Use a unique identifier for the key, rather than Math.random()
                creator_id={doc.creator_id}
                desc={doc.description}
                id={doc.product}
                price={doc.price}
                name={doc.product_name}
                avail={doc.stock}
                image={doc.image}
                buyerId={buyerId}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
