import { FC } from "react"
import { ListGroup, Form } from "react-bootstrap"
import { TaskModel } from "../firebase/ListController"

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

export default TasksList