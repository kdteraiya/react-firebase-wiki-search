import { db } from './Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore'

const userCollection = collection(db, 'users');

export const getRecord = async (starting, currentEmail) => {
    const res = await getDocs(userCollection);
    let data = await res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let scoreCard = data.filter(({ userEmail, created }) => (userEmail === currentEmail && created >= starting.getTime()));

    // console.log(scoreCard)
    return scoreCard;
}

export const insertRecord = async (payload) => {
    let res = await addDoc(userCollection, payload);
    //console.log(res);
}