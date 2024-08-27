/* eslint-disable react/prop-types */
import DeleteButton from "../icons/DeleteButton";
import { useContext, useEffect, useRef, useState } from "react";
import { setNewOffset, autoGrow, setZindex, bodyParser } from "../utils";
import { db } from "../appwrite/database";
import Spinner from "../icons/Spinner";
import { NotesContext } from "../context/NotesContext";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);
  const body = bodyParser(note.body);
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const {setSelectedNote} = useContext(NotesContext)

  let mouseStartPos = { x: 0, y: 0 };

  // To grow size of card and text area increases
  useEffect(() => {
    autoGrow(textAreaRef);
    setZindex(cardRef.current);
  }, []);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setZindex(cardRef.current);
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setSelectedNote(note);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: e.clientX - mouseStartPos.x,
      y: e.clientY - mouseStartPos.y,
    };

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition({ x: newPosition.x, y: newPosition.y });

    mouseStartPos = { x: e.clientX, y: e.clientY };
  };

  //console.log(cardRef.offsetLeft);

  const handleKeyUp = async () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute", // Ensure the card is positioned absolutely
      }}
      onMouseDown={mouseDown} // Moved mouseDown to the root div to ensure it captures the event
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
          <DeleteButton noteId={note.$id}/>
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
         
      </div>
     
      <div className="card-body">
        <textarea
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => autoGrow(textAreaRef)}
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          onFocus={() => { 
                    setZindex(cardRef.current); 
                    setSelectedNote(note) 
                  }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
