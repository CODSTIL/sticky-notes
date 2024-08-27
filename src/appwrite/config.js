import {Account, Client,Databases} from 'appwrite';
//import dotenv from 'dotenv'

//dotenv.config()

const endpoint = import.meta.env.VITE_ENDPOINT;
const projectId = import.meta.env.VITE_PROJECT_ID;

// console.log(`Project ID: ${projectId}`);
// console.log(`API Key: ${endpoint}`);

const client = new Client()
    .setEndpoint(`${endpoint}`)
    .setProject(`${projectId}`);


const databases = new Databases(client);
const account = new Account(client)

const collections = [
    {
        name:"notes",
        id:import.meta.env.VITE_COLLECTION_NOTES_ID,
        dbId: import.meta.env.VITE_DATABASE_ID
    }
]



export {client,databases,collections,account};
