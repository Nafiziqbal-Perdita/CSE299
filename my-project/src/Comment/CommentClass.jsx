import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

class CommentClass {
  saveTheComments = async (docId, myData) => {
    const db = getFirestore();
    //comment of the specific product id
    console.log(docId);
    //mydata is the total comment data persing
    console.log(myData);

    // set the firestore collection
    const myCollection = doc(db, "commentOfProducts", docId);

    //save data to fireStore

    console.log("Starting the Async Process for saving data in fireStore");

    try {
      const savedData = await setDoc(myCollection, myData);
      console.log("Comments Saved");
    } catch (error) {
      console.log("Comments Not Saved");
      console.log("There occurred an error: ", error);
    }
  };

  //now retrive the comments data

  getData = async (docId) => {
    const db = getFirestore();

    // get the firestore reference

    const collection = doc(db, "commentOfProducts", docId);

    //searching for data

    try {
      const docSnap = await getDoc(collection);

      if (docSnap.exists()) {
        // document Exists now you can access the data
        const dataOFcomment = docSnap.data();

        return dataOFcomment;
      } else {
        //no document exists
        return null;
      }
    } catch (error) {
      console.log("Comments Not Found");
      console.log("There occurred an error: ", error);
      return null;
    }
  };
}

export default CommentClass;
