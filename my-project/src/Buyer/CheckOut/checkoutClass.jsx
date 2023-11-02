import emailjs from "@emailjs/browser";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  ref,
} from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { auth } from "../../FireBase/FireComp";
class checkoutClass {
  sendEmail = async (data, noItem, price) => {
    const messageBody = `
Hi ${data.fullName},

Thank you for your purchase on our website. You have confirmed your address for the delivery of the following items:

- ${noItem} items

Total Price: ${price + 80} taka

You can pay the total amount when your items are delivered to your door.

If you have any questions or need further assistance, please don't hesitate to contact us.

`;

    try {
      emailjs.send(
        "service_rlfwdm6",
        "template_3ecbibq",
        {
          from_name: "Far To Farm",
          to_name: data.fullName,
          message: messageBody,
          reply_to: data.email,
        },
        "JMGiKXvwKcUhcLv1Q"
      );

      console.log("Email Sent");
    } catch (error) {
      console.log(error);
    }
  };

  setCartPend = async (product) => {
    const db = getFirestore();
    const id = Math.random();

    console.log("enter");

    try {
      // Reference to the "soldItems" collection
      const soldItemsCollection = collection(db, "soldItems");

      // Use addDoc to save the data with an auto-generated document ID
      await addDoc(soldItemsCollection, product);
      console.log("Document saved to collection");
    } catch (error) {
      console.log("Error saving document to collection:", error);
      return;
    }
  };
}

export default checkoutClass;
