import {
  collection, deleteDoc, doc, DocumentData, getDocs,
  QueryDocumentSnapshot, serverTimestamp, setDoc, SnapshotOptions, Timestamp
} from "firebase/firestore";
import { db, auth } from "./Setup";

const tasksColRef = 'tasks'

export type TaskModel = {
  Id: string,
  TaskName: string,
  Selected: boolean
}

type TaskFields = {
  CreatedOn: Timestamp,
  TaskName: string
}

const taskConverter = {
  toFirestore(task: TaskModel): DocumentData {
    return {
      CreatedOn: serverTimestamp(),
      TaskName: task.TaskName
    } as TaskFields;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): TaskModel {
    const data = snapshot.data(options) as TaskFields
    return {
      Id: snapshot.id,
      Selected: false,
      TaskName: data.TaskName
    } as TaskModel;
  }
};

export async function CreateTask(task: TaskModel, listId: string) {
  return await setDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${listId}/tasks/${task.Id}`).withConverter(taskConverter), task)
}

export async function DeleteSelectTasksInAList(listId: string, taskIds: Array<string>) {
  const promises = new Array<Promise<void>>()
  for (let i = 0; i < taskIds.length; i++) {
    promises.push(deleteDoc(doc(db, `users/${auth.currentUser?.uid}/lists/${listId}/tasks/${taskIds[i]}`)))
  }
  await Promise.all(promises)
}

export async function DeleteAllTasksInAList(listId: string) {
  const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/lists/${listId}/tasks`))
  DeleteSelectTasksInAList(listId, querySnapshot.docs.map(x => x.id))
}

export async function GetAllTasks(listId: string) {
  const tasks = new Array<TaskModel>()
  const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser?.uid}/lists/${listId}/tasks`).withConverter(taskConverter))
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    tasks.push(querySnapshot.docs[i].data())
  }
  return tasks
}