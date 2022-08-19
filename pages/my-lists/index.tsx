import { NextPage } from "next";
import { useEffect, useState } from "react";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import MyListsList from "../../components/MyListsList";
import { ListModel, GetAllLists, CreateList, DeleteAllListsAndTasks, DeleteSelectedLists } from "../../lib/firebase/ListController";
import { auth } from "../../lib/firebase/Setup";
import firestoreAutoId from "../../lib/firebase/utils/IdGenerator";

const MyListsPage: NextPage = () => {
  const [listsArr, setListsArr] = useState(new Array<ListModel>())

  function UpdateListInListsArr(list: ListModel) {
    setListsArr(current =>
      current.map(obj => {
        if (obj.Id === list.Id) {
          return { ...obj, ...list };
        }
        return obj;
      }),
    );
  }

  const [listNameInput, updateListNameInput] = useState('')

  const onCreateNew = async () => {
    const newList: ListModel = {
      Id: firestoreAutoId(),
      ListName: listNameInput,
      Selected: false
    }
    setListsArr(current => [...current, newList]);
    if (auth.currentUser) {
      await CreateList(newList)
    }
    updateListNameInput('')
  }

  const listNameInputOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && listNameInput !== '') {
      onCreateNew()
    }
  }

  const onDeleteAllLists = async () => {
    setListsArr(new Array<ListModel>());
    DeleteAllListsAndTasks()
  }

  const deleteAllSelected = async () => {
    const selectedLists = new Array<ListModel>()
    const remainingLists = [...listsArr]
    for (let i = 0; i < remainingLists.length;) {
      const list = remainingLists[i]
      if (list.Selected) {
        selectedLists.push(list)
        remainingLists.splice(i, 1)
      } else {
        i++
      }
    }
    setListsArr(remainingLists)
    await DeleteSelectedLists(selectedLists)
  }

  useEffect(() => {
    const fetchData = async () => {
      setListsArr(await GetAllLists())
    };
    fetchData()
  }, [])

  return (
    <div className="d-flex flex-column">

      <h1 className="my-5 text-center">My Lists</h1>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="New List..."
          aria-label="New List Name"
          value={listNameInput}
          onChange={(e) => { updateListNameInput(e.target.value) }}
          onKeyUp={(e) => { listNameInputOnKeyUp(e) }}
        />
        <Button variant="primary" onClick={onCreateNew}>
          Create New
        </Button>
      </InputGroup>

      <Row className="mb-3">
        <Col sm="auto"><Button variant="primary" size="sm" onClick={deleteAllSelected}>Delete Selected</Button></Col>
        <Col sm="auto"><Button variant="primary" size="sm" onClick={onDeleteAllLists}>Delete All</Button></Col>
      </Row>

      <MyListsList lists={listsArr} updateList={UpdateListInListsArr}></MyListsList>

    </div>
  )
}

export default MyListsPage