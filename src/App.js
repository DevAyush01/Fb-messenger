import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { FormControl, InputLabel , Input } from '@mui/material';
import './App.css';
import Message from './Message';
import db from './Firebase';

function App() {
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([{username: 'Ayush',message: 'Hey'},
    {username: 'Vinayak',message : 'Hello '}
  ]);
  const [username,setUsername] = useState('');

  useEffect(()=>{
     db.collection('messages').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc => doc.data()))
     })
  },[])

  useEffect(()=>{
    setUsername(prompt('Enter your name'));
  },[])

  console.log(input);
  console.log(messages);

  const sendMessage= (event)=>{
       event.preventDefault();
        setMessages([...messages, {username : username,text: input}]);
        setInput('')
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
