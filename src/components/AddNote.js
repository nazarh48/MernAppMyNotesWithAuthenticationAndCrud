import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext); // we are using context here that is created in note context and data is provided by the NoteStat.js by .Provider
    const {addNote} = context;  // destructuring of notes from NoteState.js and value is coming from provider in notestate.js


    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("Note Added Successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value}) //here taking the name and their values from the input fields
    }

  return (
    <div>
      <div className="container my-4">
        <h2>Add a Note</h2>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required  />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange} minLength={5} required  />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange} minLength={5} required  />
          </div>

          <button  type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
