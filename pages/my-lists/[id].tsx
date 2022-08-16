import { NextPage } from "next"
import React, { FC, useState } from "react"
import { InputGroup, Form, Button, ListGroup, Col, Row } from "react-bootstrap"

type TaskModel = {
  Id: string,
  Name: string,
  Selected: boolean
}

const TasksList: FC<{tasks: Array<TaskModel>, updateTask: (task: TaskModel) => void}> = (props) => {

  const toggleSelect = (e: React.ChangeEvent, task: TaskModel) => {
    if (task.Selected) {
      task.Selected = false
    } else {
      task.Selected = true
    }
    props.updateTask(task)
  }

  const tasks = props.tasks.map((task, index) =>
    <ListGroup.Item className="d-flex justify-content-between" key={index}>
      <div className="d-flex align-items-center">
        <Form.Check role={'button'} checked={task.Selected} onChange={(e) => { toggleSelect(e, task) }} />
        <span className="ms-4">{task.Name}</span>
      </div>
    </ListGroup.Item>
  )

  return (
    <ListGroup className="mt-2">{tasks}</ListGroup>
  )
}

const MyListsId: NextPage = () => {

  const [taskInputValue, setTaskInputValue] = useState('')
  const [tasksArr, setTasksArr] = useState(new Array<TaskModel>())

  const taskInputOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && taskInputValue !== '') {
      setTasksArr(current => [...current, {
        Id: '55',
        Name: taskInputValue,
        Selected: false
      }]);
      setTaskInputValue('')
    }
  }

  const createNew = () => {
    setTasksArr(current => [...current, {
      Id: '3',
      Name: taskInputValue,
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