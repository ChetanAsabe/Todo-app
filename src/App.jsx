import AddTodo from './AddTodo';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetTodo from './GetTodo';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/addtodo' element={<AddTodo/>}/>
        <Route path='/gettodos' element={<GetTodo/>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
