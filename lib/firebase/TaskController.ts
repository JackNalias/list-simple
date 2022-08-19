import {
  collection, deleteDoc, DocumentData, DocumentReference, getDocs,
  QueryDocumentSnapshot, QuerySnapshot, serverTimestamp, SnapshotOptions, Timestamp
} from "firebase/firestore";
import { ListModel } from "./ListController";
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

export async function DeleteAllTasksInLists(listDocRefs: Array<DocumentReference<ListModel>>) {
  // Get tasks
  const taskSnapshotPromises = new Array<Promise<QuerySnapshot<TaskModel>>>
  for (let i = 0; i < listDocRefs.length; i++) {
    const list = listDocRefs[i]
    taskSnapshotPromises.push(getDocs(collection(db, `users/${auth.currentUser?.uid}/lists/${list.id}/tasks`).withConverter(taskConverter)))
  }

  const taskSnapshots = await Promise.all(taskSnapshotPromises)

  // Delete tasks
  const deleteTaskPromsies = new Array<Promise<void>>()
  for (let i = 0; i < taskSnapshots.length; i++) {
    const taskSnapshot = taskSnapshots[i]
    for (let j = 0; j < taskSnapshot.docs.length; j++) {
      const taskRef = taskSnapshot.docs[j].ref
      deleteTaskPromsies.push(deleteDoc(taskRef))
    }
  }

  await Promise.all(deleteTaskPromsies)
}
