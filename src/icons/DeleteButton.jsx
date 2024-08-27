/* eslint-disable react/prop-types */

import Trash from "./Trash"
import { db } from "../appwrite/database"
import { useContext } from "react"
import { NotesContext } from "../context/NotesContext"

const DeleteButton = ({noteId}) => {

  const {setNotes} = useContext(NotesContext);
   
  const handleDelete = async () => {
    try {
        await db.notes.delete(noteId);
        setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
    } catch (error) {
        console.error("Failed to delete note:", error);
    }
};


  return (
    <div onClick={handleDelete}>
       <Trash/>
    </div>
  )
}

export default DeleteButton
