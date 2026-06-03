
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { ToastContainer } from 'react-toastify'

// import Login from './Auth/Login'
import ContactEnquiry from './Pages/ContactEnquiry'
import Project from './Pages/Project'
import Login from './Auth/Login'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path='/' element={<Navigate to="/login" replace />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<ContactEnquiry />} />
          <Route path='/project' element={<Project/>}/>
        



        </Route>


      </>
    )
  )

  return (
    <>
       <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
