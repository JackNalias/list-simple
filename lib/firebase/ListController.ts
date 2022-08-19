import {
  collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, QueryDocumentSnapshot,
  QuerySnapshot, serverTimestamp, setDoc, SnapshotOptions, Timestamp
} from "firebase/firestore"
import { db, auth } from "./Setup"
import { DeleteAllTasksInLists } from "./TaskController";
import firestoreAutoId from "./utils/IdGenerator";

const listColRef = 'lists'

export type ListModel = {
  Id: string,
  ListName: string,
  Selected: boolean,
}

type ListFields = {
  CreatedOn: Timestamp,
  ListName: string,
}

const listConverter = {
  toFirestore(list: ListModel): DocumentData {
    return {
      CreatedOn: serverTimestamp(),
      ListName: list.ListName
    } as ListFields;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ListModel {
    const data = snapshot.data(options) as ListFields
    return {
      Id: snapshot.id,
      Selected: false,
      ListName: data.ListName
    } as ListModel;
  }
};

function ConvertQuerySnapshotIntoDocRefArray(querySnapshot: QuerySnapshot<ListModel>) {
  const docRefs = new Array<DocumentReference<ListModel>>
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const docRef = querySnapshot.docs[i].ref
    docRefs.push(docRef)
  }
  return docRefs
}

export async function CreateList(list: ListModel) {
  return await setDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${list.Id}`).withConverter(listConverter), list)
}

export async function GetAllLists() {
  const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/lists`).withConverter(listConverter))
  const lists = new Array<ListModel>()
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const doc = querySnapshot.docs[i]
    lists.push(doc.data())
  }
  return lists
}

// Deletes only list docs
// To be used after tasks in subcollection are deleted
async function DeleteAllLists(listDocRefs: Array<DocumentReference<ListModel>>) {
  const deletePromsies = new Array<Promise<void>>()
  for (let i = 0; i < listDocRefs.length; i++) {
    deletePromsies.push(deleteDoc(listDocRefs[i]))
  }
  await Promise.all(deletePromsies)
}

export async function DeleteAllListsAndTasks() {
  const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/lists`).withConverter(listConverter))
  const listDocRefs = ConvertQuerySnapshotIntoDocRefArray(querySnapshot)
  await DeleteAllTasksInLists(listDocRefs)
  await DeleteAllLists(listDocRefs)
}

export async function DeleteSelectedLists(lists: Array<ListModel>) {
  // Get all selected doc refs
  const listDocRefs = new Array<DocumentReference<ListModel>>()
  for (let i = 0; i < lists.length; i++) {
    listDocRefs.push(doc(db, `users/${auth.currentUser?.uid}/lists/${lists[i].Id}`).withConverter(listConverter))
  }

  await DeleteAllTasksInLists(listDocRefs)
  await DeleteAllLists(listDocRefs)
}