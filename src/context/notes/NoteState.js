
// import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => { //providing state
  const host = `http://localhost:5000`
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)




  //get Notes------------------------------------
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    // console.log(json)
    setNotes(json)
  }



  //Add Note------------------------------------
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    
    console.log("Add a note")
    // console.log(json)

    // const note = {
    //   "_id": "6332314acaaa5200c77bcb6979",
    //   "user": "632fea870804d93f4741cb81",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "timestamp": "2022-09-27T15:20:42.915Z",
    //   "__v": 0
    // }
  }


  // Delete Note---------------------------
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the Note " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Edit Note------------------------------------
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({title, description, tag})
    });
    let json = await response.json();
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))
    // logic to edit note
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      setNotes(newNote)

    }
  }


  // props.children will contain chiledren like name and class
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;