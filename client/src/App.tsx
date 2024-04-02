import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Stock from './components/Stock/Stock'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/' element={<Header />}>
        
        <Route index element={<Home />}/>

        <Route path='stocks' element={<Stock />}/>

        <Route path='*' 
        element={<NotFound />} />
      </Route>
      
      <Route path='auth'>
        <Route path='login' element={<Login />}/>

        <Route path='register' element={<Register />}/>
      </Route>
    </Route>
  ))

function App() {

  return (
    <RouterProvider router={router}/>
  )
}
export default App
