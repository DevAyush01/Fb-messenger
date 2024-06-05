import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputLabel , Input } from '@mui/material';
import './App.css';
import Message from './Message';           
import app from "./Firebase"
import { db } from './Firebase';
import {getDatabase , ref , set , push, get, onValue} from "firebase/database"



function App() {
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState('');

  const readData = async ()=>{
    const db = getDatabase(app);
    const dbRef = ref(db , "messages/users");
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
      setMessages(Object.values(snapshot.val()))
    }else{
      alert("Something wrong!")
    }
  }

  // useEffect(()=>{
  //   onValue(ref(db), (snapshot) =>{
  //     setMessages([]);
  //     const data = snapshot.val();

  //     if(data !=null){
  //       Object.values(data).map((input)=>{
  //         setMessages((oldArray) => [...oldArray, input])
  //       });
  //     }
  //   })
  // },[])

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
        <button onClick={readData}>showData</button>
      {
      messages.map( (message) =>(   
        // <Message username={message.username} message={message.messages}/>
        <div>
          {message.username} : {message.messages}
        </div>
      ))
      }
      </div>
    </div>
  );
}

export default App;
