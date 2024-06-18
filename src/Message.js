import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import {React , forwardRef} from 'react'
import './Message.css'

const Message = forwardRef(({message , username}, ref)=> {
  const isUser = username === message.username;

  return (
       <div ref={ref} className={`message ${isUser && 'messageUser'}`}>
           <Card className={isUser ? "message__userCard" : "message__guestCard"}>
             <CardContent>
               <Typography
               color="black"
               variant='h5'
               component='h2'
               >
               {!isUser && `${message.username} :`}  {message.message}
               </Typography>
             </CardContent>
           </Card>
    </div>
  )
})

export default Message

// function Message({username,message}) {
//     const isUser = username === message.username
//   return (
//      <div className={`message ${isUser && 'message__user'}`}>
      
//       <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
//       <CardContent>
//         <Typography
//         color="black"
//         variant='h5'
//         component='h2'
//         >
//         {message.username} : {message.message}
//         </Typography>
//       </CardContent>
//     </Card>


//      </div>
//     // <>
//     // {props.username} : {props.message}
//     // </>
  
//   )
// }
/* <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
       <CardContent>
        <Typography
        color="black"
        variant="h5"
        component="h2"
        >
        {message.username} : {message.text}
        </Typography>
       </CardContent>
     </Card> */
