/* eslint-disable react/prop-types */
//import React from "react";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import { db } from "../appwrite/database";

const Color = ({ color }) => {
    const { selectedNote, notes, setNotes } = useContext(NotesContext);

    const changeColor = async () => {
      if (!selectedNote) {
          alert("You must select a note before changing colors");
          return;
      }
  
      try {
          const currentNoteIndex = notes.findIndex(
              (note) => note.$id === selectedNote.$id
          );
  
          if (currentNoteIndex === -1) return;
  
          const updatedNote = {
              ...notes[currentNoteIndex],
              colors: JSON.stringify(color),
          };
  
          const newNotes = [...notes];
          newNotes[currentNoteIndex] = updatedNote;
  
          setNotes(newNotes);
  
          await db.notes.update(selectedNote.$id, {
              colors: JSON.stringify(color),
          });
  
          console.log("Color updated successfully.");
      } catch (error) {
          console.error("Failed to update color:", error);
      }
  };
  
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};

export default Color;