import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/database";

export const NotesContext = createContext();

const NotesProvider = ({ children }) => {
    
    const [selectedNote, setSelectedNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState();

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const response = await db.notes.list();
            setNotes(response.documents || []); // Default to an empty array if no documents
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
            setLoading(false); // Stop loading even if there's an error
        }
    };
    

    const contextData = { notes, setNotes,selectedNote,setSelectedNote };

    return (
        <NotesContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NotesContext.Provider>
    );
};
export default NotesProvider;