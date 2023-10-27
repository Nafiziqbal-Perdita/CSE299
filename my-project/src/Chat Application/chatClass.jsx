import {
    getFirestore,
    getDocs,
    collection,
    addDoc,
    doc,
    updateDoc,
    getDoc,
    where,
    query,
    orderBy,
} from "firebase/firestore";

import { getDatabase, ref, push, equalTo, get, orderByChild } from "firebase/database";


class chatClass {
    // Define any constructor if needed

    async findType(userid) {
        const db = getFirestore();
        let res = "";

        try {
            const querySnapshot = await getDocs(collection(db, "users"));

            for (const doc of querySnapshot.docs) {
                if (doc.id === userid) {
                    const allData = doc.data();
                    console.log(allData.type);
                    res = allData.type;
                    break;
                }
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

        return res;
    }

    // sent text

    sendText = (data) => {
        // Create a reference to your Firestore database
        const db = getFirestore();

        // Specify the name of the collection where you want to add the document
        const collectionRef = collection(db, "messages");

        // Use the addDoc function to add the data to the collection
        addDoc(collectionRef, data)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    };


    //update room

    updateRoom = async (docId, data) => {
        // Create a reference to your Firestore database
        const db = getFirestore();

        // Specify the path to the document you want to update
        const docRef = doc(db, "chatRoom", docId);

        // Use updateDoc to update specific fields in the document
        updateDoc(docRef, data)
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    };

    //get room data by giving id


    getRoomDataById = async (docId) => {
        // Create a reference to your Firestore database
        const db = getFirestore();

        // Specify the path to the document you want to retrieve (substitute with your own collection and document ID)
        const docRef = doc(db, "chatRoom", docId);

        try {
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                // Document data is in docSnapshot.data()
                const documentData = docSnapshot.data();
                console.log("Document data:", documentData);
                return documentData;
            } else {
                console.log("Document does not exist.");
                return null;
            }
        } catch (error) {
            console.error("Error getting document: ", error);
            return null;
        }
    };








    allTheTexts = async (value) => {





        const db = getFirestore();
        // const q = query(collection(db, "messages"), where("room", "==", value));
        const q = query(collection(db, "messages"), where("room", "==", value), orderBy("time", "asc"));

        const querySnapshot = await getDocs(q);



        const data = [];
        querySnapshot.forEach((doc) => {
            // Convert Firestore document to JavaScript object
            data.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return data;




    }








}

export default chatClass;
