import { onAuthStateChanged } from "firebase/auth"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { InputGroup, Form, Button, Col, Row, Alert } from "react-bootstrap"
import TasksList from "../../components/TasksList"
import { GetList } from "../../lib/firebase/ListController"
import { auth } from "../../lib/firebase/Setup"
import { CreateTask, DeleteAllTasksInAList, DeleteSelectTasksInAList, GetAllTasks, TaskModel } from "../../lib/firebase/TaskController"
import firestoreAutoId from "../../lib/firebase/utils/IdGenerator"

const MyListsId: NextPage = () => {

  const [taskInputValue, setTaskInputValue] = useState('')
  const [tasksArr, setTasksArr] = useState(new Array<TaskModel>())
  const [listName, setListName] = useState('')
  const listId = useRouter().query.id as string
  const [signedIn, setSignedIn] = useState(true)
  
  const [validPage, setValidPage] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (auth.currentUser) {
        setSignedIn(true)
        const list = await GetList(listId)
        if(!list) {
          setValidPage(false)
          setErrorMsg('404 error - This page could not be found.')
          return
        }
        setListName(list?.ListName as string)
        setTasksArr(await GetAllTasks(listId))
        console.log(1111)
      } else {
        setSignedIn(false)
        setValidPage(false)
        setErrorMsg('You must be signed in to create tasks.')
      }
    })
  }, [listId])

  const createNew = () => {
    const newTask: TaskModel = {
      Id: firestoreAutoId(),
      TaskName: taskInputValue,
      Selected: false
    }
    setTasksArr(current => [...current, newTask]);
    setTaskInputValue('')
    if (signedIn) {
      CreateTask(newTask, listId)
    }
  }

  const taskInputOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && taskInputValue !== '') {
      createNew()
    }
  }

  const updateTask = (task: TaskModel) => {
    setTasksArr(current =>
      current.map(obj => {
        if (obj.Id === task.Id) {
          return { ...obj, task };
        }
        return obj;
      }),
    )
  }

  const deleteAllTasks = async () => {
    setTasksArr(new Array<TaskModel>());
    if (signedIn) {
      DeleteAllTasksInAList(listId)
    }
  }

  const deleteAllSelected = () => {
    const selectedTasks = new Array<TaskModel>()
    const remainingTasks = [...tasksArr]
    for (let i = 0; i < remainingTasks.length;) {
      const task = remainingTasks[i]
      if (task.Selected) {
        selectedTasks.push(task)
        remainingTasks.splice(i, 1)
      } else {
        i++
      }
    }
    setTasksArr(remainingTasks)
    if (signedIn) {
      DeleteSelectTasksInAList(listId, selectedTasks.map(x => x.Id))
    }
  }

  return (
    <>
      {!validPage &&
        <Alert className="mt-5" variant="danger">{errorMsg}</Alert>
      }
      {validPage &&
        <div className="d-flex flex-column">

          <h1 className="my-5 text-center">{listName}</h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="New Task..."
              aria-label="New Task Name"
              value={taskInputValue}
              onChange={(e) => { setTaskInputValue(e.target.value) }}
              onKeyUp={(e) => { taskInputOnKeyUp(e) }}
            />
            <Button variant="primary" onClick={createNew}>
              Create New
            </Button>
          </InputGroup>

          <Row className="mb-3">
            <Col sm="auto"><Button variant="primary" size="sm" onClick={deleteAllSelected}>Delete Selected</Button></Col>
            <Col sm="auto"><Button variant="primary" size="sm" onClick={deleteAllTasks}>Delete All</Button></Col>
          </Row>

          <TasksList tasks={tasksArr} updateTask={updateTask}></TasksList>

        </div>
      }
    </>
  )
}

export default MyListsId