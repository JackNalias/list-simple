import {
  collection, deleteDoc, doc, DocumentData, getDoc, getDocs, QueryDocumentSnapshot,
  serverTimestamp, setDoc, SnapshotOptions, Timestamp
} from "firebase/firestore"
import { db, auth } from "./Setup"
import { DeleteAllTasksInAList, } from "./TaskController";

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
      ListName: list.ListName,
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
      ListName: data.ListName,
    } as ListModel;
  }
};

export async function CreateList(list: ListModel) {
  return await setDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${list.Id}`).withConverter(listConverter), list)
}

export async function GetAllLists() {
  const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/lists`).withConverter(listConverter))
  const lists = new Array<ListModel>()
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    lists.push(querySnapshot.docs[i].data())
  }
  return lists
}

async function DeleteListsAndTasksInLists(lists: Array<ListModel>) {
  // Delete all tasks in lists
  const deleteTasksPromises = new Array<Promise<void>>()
  for (let i = 0; i < lists.length; i++) {
    deleteTasksPromises.push(DeleteAllTasksInAList(lists[i].Id))
  }
  await Promise.all(deleteTasksPromises)

  // Delete lists
  const deleteListsPromises = new Array<Promise<void>>()
  for (let i = 0; i < lists.length; i++) {
    deleteListsPromises.push(deleteDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${lists[i].Id}`)))
  }
  await Promise.all(deleteListsPromises)
}

export async function DeleteAllListsAndTasksInLists() {
  const lists = await GetAllLists()
  await DeleteListsAndTasksInLists(lists)
}

export async function DeleteSelectedLists(lists: Array<ListModel>) {
  await DeleteListsAndTasksInLists(lists)
}

export async function GetList(listId: string) {
  const listDoc = await getDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${listId}`).withConverter(listConverter))
  return listDoc.data()
}