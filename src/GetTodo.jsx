import { Button, Table } from "@mui/material";
import { useEffect, useState } from "react";

function GetTodo() {

  const [todo, setTodo] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/todos', {
      method: 'GET'
    }).then((res) => {
      res.json().then((data) => {
        setTodo(data)
      })
    })
  }, [])

  return <div>
    <h2>Todoist</h2>
    <table style={{ 
      borderCollapse: 'collapse', 
      width: '100%' 
      }}
    >
      <thead>
        <tr>
          <th style={{ 
            border: '1px solid #ddd', 
            padding: '8px', 
            backgroundColor: '#f2f2f2' 
            }}
          >
            ID
          </th>

          <th style={{ 
            border: '1px solid #ddd', 
            padding: '8px', 
            backgroundColor: '#f2f2f2' 
            }}>Title</th>

          <th style={{ 
            border: '1px solid #ddd', 
            padding: '8px', 
            backgroundColor: '#f2f2f2' 
            }}
          >
            Description
          </th>
          
          <th style={{ 
            border: '1px solid #ddd', 
            padding: '8px', 
            backgroundColor: '#f2f2f2' 
            }}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {todo.map((x) => {
          return (
            <tr id="mainArea">
              <td style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#f2f2f2' 
                }}
              >
                {x.id}
              </td>

              <td style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#f2f2f2' 
                }}
              >
                {x.title}
              </td>
              <td style={{ 
                border: '1px solid #ddd', 
                padding: '8px', 
                backgroundColor: '#f2f2f2' 
                }}
              >
                {x.description}
              </td>
              <td>
                <Button
                  variant="contained"
                  onClick={() => {
                    // window.location.href='/viewtodo'

                    fetch('http://localhost:3000/todos/' + x.id, {
                      method: "DELETE",
                      headers:{
                        "Content-type" : "application/json"
                      }
                    }).then((res) => {
                      res.json().then((data) => {
                      }) 
                    })
                  }}
                >
                  delete
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}

export default GetTodo;