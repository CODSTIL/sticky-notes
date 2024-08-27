//import { fakeData as notes } from "../assets/fakeData";
import { useContext } from "react";
import NoteCard from "../component/NoteCard";
import  {NotesContext}  from "../context/NotesContext";
import Controls from '../component/Controls'

const NotesPage = () => {

    const {notes,setNotes} = useContext(NotesContext);
     


     return (  
        <div>
            {notes?.map( (note) => (
                <NoteCard note={note} key={note.$id} setNotes={setNotes}/>
            ) )}
            <Controls/>
        </div>
    );
}

export default NotesPage;

