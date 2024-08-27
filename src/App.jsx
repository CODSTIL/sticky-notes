import {Client,Account,ID} from 'appwrite'
import NotesPage from './pages/NotesPage';
import NotesProvider from './context/NotesContext';


const client = new Client();

client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65ca1dcde1a2fcf3db94');
       



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
