import { NextPage } from "next"
import React, { useState } from "react"
import { InputGroup, Form, Button, Col, Row } from "react-bootstrap"
import TasksList from "../../components/TasksList"
import { TaskModel } from "../../lib/firebase/TaskController"

const MyListsId: NextPage = () => {

  const [taskInputValue, setTaskInputValue] = useState('')
  const [tasksArr, setTasksArr] = useState(new Array<TaskModel>())

  const taskInputOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && taskInputValue !== '') {
      setTasksArr(current => [...current, {
        Id: '55',
        TaskName: taskInputValue,
        Selected: false
      }]);
      setTaskInputValue('')
    }
  }

  const createNew = () => {
    setTasksArr(current => [...current, {
      Id: '3',
      TaskName: taskInputValue,
      Selected: false
    } as TaskModel
    ]);
    setTaskInputValue('')
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

  const deleteAllTasks = () => {
    setTasksArr(new Array<TaskModel>());
  }

  const deleteAllSelected = () => {
    setTasksArr(current =>
      current.filter(obj => {
        return obj.Selected !== true;
      }),
    );
  }

  return (
    <div className="d-flex flex-column">

      <h1 className="my-5 text-center">List Name</h1>

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
  )
}

export default MyListsId