import { getDatabase, ref, push, get, remove, update } from "firebase/database";

class CartManager {
  //addition of a collection in to the database
  addToCart = async (newCart, user) => {
    let isAdded = false;

    // Initialize Firebase database
    const db = getDatabase();

    // Reference to the "myCart" collection
    const cartRef = ref(db, "myCart");

    const snapShot = await get(cartRef);

    if (snapShot.exists()) {
      // Data exists, you can access it using snapshot.val()
      const cartData = snapShot.val();
      console.log("myCart data:", cartData);

      //iterate over the cart data

      for (const key in cartData) {
        if (cartData.hasOwnProperty(key)) {
          const cartItem = cartData[key];
          console.log("CartItem key:", key);

          // Now you can access individual properties of the cartItem object
          console.log("Product name:", cartItem.product_name);

          console.log("Product price:", cartItem.product_price);

          // applying the condition
          if (cartItem.product_id === newCart.product_id) {
            console.log("In condition product id", cartItem.product_id);
            console.log("In condition NewCart id", newCart.product_id);

            if (cartItem.buyer_id === user) {
              isAdded = true;
            }
          }
        }
      }
    }

    // Exit the addToCart function if the item is already added

    if (isAdded) {
      console.log("Already added");
      return;
    }

    try {
      // Add the new product to the "myCart" collection
      const newCartRef = await push(cartRef, newCart);

      console.log("Data added successfully with key: ", newCartRef.key);
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  };

  //update a value of the cart data

  updateCartQuan = async (obj, path) => {
    const pathToData = `myCart/${path}`;

    const db = getDatabase();
    const dbRef = ref(db, pathToData);

    update(dbRef, obj)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  // Deletion of a specific colleciton from the database

  deleteFromCart = async (path) => {
    const pathToData = `myCart/${path}`;

    const db = getDatabase();
    const dataRef = ref(db, pathToData);

    remove(dataRef)
      .then(() => {
        console.log("Collection deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting collection: ", error);
      });
  };
}

export default CartManager;
