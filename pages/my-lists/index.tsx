import { onAuthStateChanged } from "firebase/auth";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { InputGroup, Form, Button, Row, Col, Alert } from "react-bootstrap";
import MyListsList from "../../components/MyListsList";
import { ListModel, GetAllLists, CreateList, DeleteSelectedLists, DeleteAllListsAndTasksInLists } from "../../lib/firebase/ListController";
import { auth } from "../../lib/firebase/Setup";
import firestoreAutoId from "../../lib/firebase/utils/IdGenerator";

const MyListsPage: NextPage = () => {
  const [listsArr, setListsArr] = useState(new Array<ListModel>())
  const [signedIn, setSignedIn] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async () => {
      if (auth.currentUser) {
        setListsArr(await GetAllLists())
        setSignedIn(true)
      } else {
        setSignedIn(false)
      }
    })
  }, [])

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
      Selected: false,
    }
    setListsArr(current => [...current, newList]);
    updateListNameInput('')
    if (signedIn) {
      CreateList(newList)
    }
  }

  const listNameInputOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && listNameInput !== '') {
      onCreateNew()
    }
  }

  const onDeleteAllLists = async () => {
    if (signedIn) {
      DeleteAllListsAndTasksInLists()
    }
    setListsArr(new Array<ListModel>());
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
    if (signedIn) {
      DeleteSelectedLists(selectedLists)
    }
  }

  return (
    <>
      {!signedIn &&
        <Alert className="mt-5" variant="danger">You must be signed in to create lists.</Alert>
      }
      {signedIn &&
        <div className="d-flex flex-column">

        <h1 className="mt-5 mb-1 text-center">My Lists</h1>

        <InputGroup className="mb-3 mt-5">
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
      }
    </>
  )
}

export default MyListsPage