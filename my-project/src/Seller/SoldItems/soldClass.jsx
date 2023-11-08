import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

class soldClass {
  getSoldItemsByCreatorId = async (targetValue) => {
    const db = getFirestore();
    const soldItemsCollection = collection(db, "soldItems");

    // Create a query to filter documents by "creator_id"
    const q = query(
      soldItemsCollection,
      where("creator_id", "==", targetValue),
      orderBy("createdAt", "desc")
    );

    try {
      const querySnapshot = await getDocs(q);
      const soldItems = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        soldItems.push({ id, ...data });
      });

      return soldItems;
    } catch (error) {
      console.error("Error getting sold items:", error);
      return [];
    }
  };

  updateDocument = async (documentId, newData) => {
    const db = getFirestore();

    const docRef = doc(db, "soldItems", documentId); // Replace "soldItems" with your collection name

    try {
      await updateDoc(docRef, newData);
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
}
export default soldClass;
