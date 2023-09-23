const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path')
const cors = require('cors')

const app = express();


app.use(cors())
app.use(bodyParser.json());

var id = 1;

function findIndex(arr, id) {
  for(let i=0; i<arr.length; i++) {
    if(arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex (arr, index) {
  let newarr = []
  for(let i=0; i<arr.length; i++) {
    if(i !== index) newarr.push(arr[i]);
  }
  return newarr;
}

app.get('/todos', (req,res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if(err) throw err;
    res.send(data)
  })
})

app.post('/todos', (req, res) => {
  const newTodo = {
    id : id++,
    title : req.body.title,
    description : req.body.description
  }
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if(err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo)
    fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', (err,data) => {
      if(err) throw err;
      res.status(200).send(newTodo)
    })
  })
})

app.delete('/todos/:id', (req,res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if(err) throw err;
    let todos = JSON.parse(data);
    const todoindex = findIndex(todos, parseInt(req.params.id))

    if (todoindex == -1) {
      res.status(404).send();      
    }
    else{
      todos = removeAtIndex(todos, todoindex)
      fs.writeFile('todos.json', JSON.stringify(todos), 'utf8', (err, data) => {
        if(err) throw err;
        res.status(200).send();
      })
    }
  })
})

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(3000, (res) => {
  console.log('Listening..')
})