import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./Setup";

export async function CreateNewAccount() {
  await setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
    CreatedOn: serverTimestamp()
  })
}