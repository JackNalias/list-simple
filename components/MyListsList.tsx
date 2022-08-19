import { useRouter } from "next/router"
import { FC } from "react"
import { ListGroup, Form } from "react-bootstrap"
import Image from "next/image";
import { ListModel } from "../lib/firebase/ListController";

type Props = {
  lists: Array<ListModel>,
  updateList: (list: ListModel) => void
}

const MyListsList: FC<Props> = (props) => {
  const router = useRouter()

  function ToggleSelect(e: React.ChangeEvent<HTMLInputElement>, list: ListModel) {
    if (list.Selected) {
      list.Selected = false
    } else {
      list.Selected = true
    }
    props.updateList(list)
  }

  const viewList = (listId: string) => {
    router.push(`my-lists/${listId}`)
  }

  const myLists = props.lists.map((list, index) =>
    <ListGroup.Item className="d-flex justify-content-between" key={index}>
      <div className="d-flex align-items-center">
        <Form.Check role={'button'} checked={list.Selected} onChange={(e) => { ToggleSelect(e, list) }} />
        <span className="ms-4">{list.ListName}</span>
      </div>
      <div role={'button'} className="d-flex align-items-center" onClick={() => { viewList(list.Id) }}>
        <div className="me-2">View List</div>
        <Image src="/arrow-right-svgrepo-com.svg" alt="" width={30} height={30} />
      </div>
    </ListGroup.Item>
  )

  return (
    <ListGroup className="mt-2">{myLists}</ListGroup>
  )
}

export default MyListsList