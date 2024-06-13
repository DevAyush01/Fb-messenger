import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputLabel , Input } from '@mui/material';
import './App.css';
import Message from './Message';           
import app from "./Firebase"
import { db } from './Firebase';
import {getDatabase , ref , set , push, get, onValue, child} from "firebase/database"
import { collection, onSnapshot } from 'firebase/firestore';



function App() {
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([{username : 'ayush', message:'hey'},{username : 'vinayak', message:'hello'}]);
  const [username,setUsername] = useState('');

  // const readData = async ()=>{
  //   const db = getDatabase(app);
  //   const dbRef = ref(db , "messages/users");
  //   const snapshot = await get(dbRef);
  //   if(snapshot.exists()){
  //     setMessages(Object.values(snapshot.val()))
  //   }else{
  //     alert("Something wrong!")
  //   }
  // }
   
  useEffect(() => {
    try {
      db.ref("messages/users").once("value", (snapshot) => {
        snapshot.forEach((dataSnapshot) => {
          console.log("datasnapshot", dataSnapshot);
        });
      });
    } catch (error) {
      console.error(error);
    }
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
       } ).then( ()=>{
        alert("data saved successfully")
       })
        setMessages([...messages, {username: username, message: input}])
       
        setInput('');
        
  }

  
  return (
    <div className="App">
       <h1>Hello Programmers!</h1>
       <h3>Welcome {username}</h3>
       <form>
       <FormControl>
         <InputLabel>Enter message...</InputLabel>
         <Input value={input} onChange={event=>setInput(event.target.value)}/>
         <Button disabled={!input} type='submit' variant='contained' endIcon={<SendIcon />} onClick={sendMessage}>Send</Button>
       </FormControl>
       </form>


        {/* <button onClick={readData}>show</button> */}
      {
      
      messages.map( message =>
      (      
           <Message  username={username} message={message} />
        )
      
      )
      }
      
    </div>
  );
}

export default App;
