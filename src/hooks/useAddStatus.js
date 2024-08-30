import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, arrayUnion , getDoc} from 'firebase/firestore';
import { firestore } from '../firebase/firebase.js'; 

const uploadImageAndGetUrl = async (file, user) => { // Accept user as an argument
  try {
    const storage = getStorage();

    if (!user || !user.uid) {
      throw new Error('User not authenticated');
    }
    console.log(file.name,file)
    const storageRef = ref(storage, `statuses/${file.name}`);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Add status to user
    await addStatusToUser(user.uid, downloadURL);

    console.log('Image URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const addStatusToUser = async (userId, imageUrl) => {
  try {
    const userRef = doc(firestore, 'users', userId);

    // Add the new status URL to the `status` array field
    await updateDoc(userRef, {
      status: arrayUnion(imageUrl) // Add the URL to the array
    });

    console.log('Status added successfully.');
  } catch (error) {
    console.error('Error adding status:', error);
  }
};
export const getStatus = async (userId) => {
    try {
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
      const status = userDoc.exists() ? userDoc.data().status : [];
      return status;
    } catch (error) {
      console.error('Error getting status:', error);
      throw error; 
    }
  };

export default uploadImageAndGetUrl;
