import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';


function AddTodo() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("") 

  return <div>
    <TextField 
      variant="outlined" 
      label="Title"
      onChange={(e) => {
        setTitle(e.target.value)
      }}
    />
    <br /><br />
    <TextField 
      variant="outlined" 
      label="Description"
      onChange={(e) => {
        setDescription(e.target.value)
      }}
    />
    <br /><br />
    <Button 
      variant="contained"
      onClick={() => {
        fetch('http://localhost:3000/todos', {
          method: 'POST',
          body: JSON.stringify({
            title : title,
            description : description
          }),
          headers:{
            "Content-type" : "application/json"
          }
        }).then((res) => {
          res.json().then((data) => {
            console.log(data)
          })
        })
      }}
    >
      Add
    </Button>
  </div>
}

export default AddTodo;