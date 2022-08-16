import { NextPage } from "next";
import Image from "next/image";
import { FC, useState } from "react";
import { InputGroup, Form, Button, Row, Col, ListGroup } from "react-bootstrap";

type ListModel = {
  Id: string,
  Name: string,
  Selected: boolean,
}

const MyListsList: FC<{ lists: Array<ListModel>, updateList: (list: ListModel) => void }> = (props) => {

  function ToggleSelect(e: React.ChangeEvent<HTMLInputElement>, list: ListModel) {
    if (list.Selected) {
      list.Selected = false
    } else {
      list.Selected = true
    }
    props.updateList(list)
  }

  const myLists = props.lists.map((list, index) =>
    <ListGroup.Item className="d-flex justify-content-between" key={index}>
      <div className="d-flex align-items-center">
        <Form.Check role={'button'} checked={list.Selected} onChange={(e) => { ToggleSelect(e, list) }} />
        <span className="ms-4">{list.Name}</span>
      </div>
      <div role={'button'} className="d-flex align-items-center">
        <div className="me-2">View List</div>
        <Image src="/arrow-right-svgrepo-com.svg" alt="" width={30} height={30} />
      </div>
    </ListGroup.Item>
  )

  return (
    <ListGroup className="mt-2">{myLists}</ListGroup>
  )
}

const MyListsPage: NextPage = () => {

  const [listsArr, setListsArr] = useState([
    {
      Id: '1',
      Name: 'List name 1',
      Selected: false,
    },
    {
      Id: '2',
      Name: 'List name 2',
      Selected: false,
    }
  ] as Array<ListModel>)

  function UpdateListInListsArr(list: ListModel) {
    setListsArr(current =>
      current.map(obj => {
        if (obj.Id === list.Id) {
          return { ...obj, list };
        }
        return obj;
      }),
    );
  }

  const [listNameInput, updateListNameInput] = useState('')

  function OnCreateNew() {
    setListsArr(current => [...current, {
      Id: '3',
      Name: listNameInput,
      Selected: false
    } as ListModel
    ]);
    updateListNameInput('')
  }

  function ListNameInputOnKeyUp(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && listNameInput !== '') {
      setListsArr(current => [...current, {
        Id: '55',
        Name: listNameInput,
        Selected: false
      }]);
      updateListNameInput('')
    }
  }

  function DeleteAllLists() {
    setListsArr(new Array<ListModel>());
  }

  const DeleteAllSelected = () => {
    setListsArr(current =>
      current.filter(obj => {
        return obj.Selected !== true;
      }),
    );
  }

  return (
    <div className="d-flex flex-column">

      <h1 className="my-5 text-center">My Lists</h1>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="New List..."
          aria-label="New List Name"
          value={listNameInput}
          onChange={(e) => { updateListNameInput(e.target.value) }}
          onKeyUp={(e) => { ListNameInputOnKeyUp(e) }}
        />
        <Button variant="primary" onClick={OnCreateNew}>
          Create New
        </Button>
      </InputGroup>

      <Row className="mb-3">
        <Col sm="auto"><Button variant="primary" size="sm" onClick={DeleteAllSelected}>Delete Selected</Button></Col>
        <Col sm="auto"><Button variant="primary" size="sm" onClick={DeleteAllLists}>Delete All</Button></Col>
      </Row>

      <MyListsList lists={listsArr} updateList={UpdateListInListsArr}></MyListsList>

    </div>
  )
}

export default MyListsPage