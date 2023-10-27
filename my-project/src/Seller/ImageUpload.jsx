import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuth } from "../FireBase/Authentication/AuthContext";

class ImageUpload {
  constructor() {
    this.storage = getStorage();
    this.auth = useAuth();
  }

  async uploadImage(file, onProgress) {
    const { generateRandomNumber } = this.auth;

    const storageRef = ref(
      this.storage,
      `productImages/${generateRandomNumber()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      // Handle the upload progress
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress); // Callback to handle progress updates
    });

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}

export default ImageUpload;
