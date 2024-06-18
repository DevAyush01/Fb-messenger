import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel , Input } from '@mui/material';
import './App.css';
import Message from './Message';           
import app from "./Firebase"
import { db } from './Firebase';
import {getDatabase , ref , set , push, get, onValue, child} from "firebase/database"
import { collection, onSnapshot } from 'firebase/firestore';
import FlipMove from 'react-flip-move';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';




function App() {
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState('');
   
  useEffect(() => {

    const dbRef = ref(getDatabase())

    get(child(dbRef,"messages/users")).then(snapshot =>{
     if (snapshot.exists()) {
      const data=snapshot.val()
      Object.values(data).forEach(mess =>{
        setMessages(prev => [...prev, mess])
      })
     } else {
      console.log("No data")
     }
    })
  }, []);
  
  useEffect(()=>{
    setUsername(prompt('Enter your name'));
  },[])

  console.log(input);
  console.log(messages);

  const sendMessage= async (event)=>{
       event.preventDefault();

       const db = getDatabase(app);
       const newDocRef = push(ref(db,"messages/users"));
       set(newDocRef , {
           username: username,
           message: input,
       } )
        setMessages([...messages, {username: username, message: input}])
       
        setInput('');
        
  }

  
  return (
    <div className="App">
       <h1>Hello Programmers!</h1>
       <h3>Welcome {username}</h3>
       <form className='app_form'>
       <FormControl>
         <InputLabel>Enter message...</InputLabel>
         <Input value={input} onChange={event=>setInput(event.target.value)}/>

         
         <IconButton disabled={!input} type='submit' variant='contained' color='primary' onClick={sendMessage}>
          <SendIcon variant="contained"/>
         </IconButton>
       </FormControl>
       </form>


        {/* <button onClick={readData}>show</button> */}
      
      <FlipMove>
      {
 
      messages.map( message =>
      (      
           <Message  username={username} message={message} />
        )
      
      )
      }
         
      </FlipMove>
      
    </div>
  );
}

export default App;
