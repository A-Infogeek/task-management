import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import TaskPage from './pages/TaskPage';

function App() {
  return (
    <main>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tasks/:taskId' element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
