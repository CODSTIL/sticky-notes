import {Client,Account,ID} from 'appwrite'
import NotesPage from './pages/NotesPage';
import NotesProvider from './context/NotesContext';


const client = new Client();

client
      .setEndpoint()
      .setProject();
       



const App = () => {
  return (
    <div id="app">
      <NotesProvider>
          <NotesPage/>
      </NotesProvider>
    </div>
  )
}

export default App
