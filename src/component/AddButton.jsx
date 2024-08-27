import {useContext, useRef} from 'react'
import {db} from '../appwrite/database'
import {NotesContext} from '../context/NotesContext'
import Plus from '../icons/Plus'
import colors from '../assets/colors.json'
   
const AddButton = () => {

  const { setNotes } = useContext(NotesContext);
  
  
  const startingPos = useRef(10)
  
  const addNote = async () => {
    const payload = {
        position: JSON.stringify({
            x: startingPos.current,
            y: startingPos.current,
        }),
        colors: JSON.stringify(colors[1]),
    };

    startingPos.current += 10;

    try {
        const response = await db.notes.create(payload);
        setNotes((prevState) => [...prevState, response]);
    } catch (error) {
        console.error("Failed to add note:", error);
    }
};
  return (
    <div id="add-btn" onClick={addNote}>
      <Plus/>
    </div>
  )
}

export default AddButton
