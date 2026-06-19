
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import { ToastContainer } from 'react-toastify'

// import Login from './Auth/Login'
import ContactEnquiry from './Pages/ContactEnquiry'
import Project from './Pages/Project'
import Login from './Auth/Login'
import ProjectList from './Pages/ProjectList'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/contact' element={<ContactEnquiry />} />
          <Route path='/project' element={<Project />} />
          <Route
            path="/project/:slug"
            element={<Project />}
          />

          <Route
            path="/project-list"
            element={<ProjectList/>}
          />




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
