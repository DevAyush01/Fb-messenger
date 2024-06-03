import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputLabel , Input } from '@mui/material';
import './App.css';
import Message from './Message';           
import app from "./Firebase"
import {getDatabase , ref , set , push} from "firebase/database"
function App() {
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState('');


  useEffect(()=>{
     app.collection('messages').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => doc.data()))
     })
  },[])

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
           messages: input,
       } ).then( ()=>{
        alert("data saved successfully")
       })

      //  db.collection('messages').add({
      //   message: input,
      //   username: username,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp()
      //  })


    //   const{username,message} = messages

    // const res =  fetch(
    //   "https://facebook-messenger-clone-54e62-default-rtdb.firebaseio.com/userDataRecords.json",
    //  {
    //     method : "POST",
    //     Headers : {
    //     "Content-Type" : "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       message
    //     })
    //  }
    //   );
    //   if(res){
    //     alert("Data Stored")
    //   }else{
    //     alert("Please fill Data")
    //   }
       
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


      <div>
      {
      messages.map( message =>(
        <Message username={username} message={message}/>
      ))
      }
      </div>
    </div>
  );
}

export default App;
