import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote, showAlert } = props;
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="far fa-trash-alt" onClick={()=>{deleteNote(note._id);showAlert("Deleted Successfully", "success");}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
