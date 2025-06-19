import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import TaskDetails from './pages/TaskDetails'
import Tasks from './pages/Tasks'
import Trash from './pages/Trash'
import Users from './pages/Users'


function Layout (){
  const user =""

  const location = useLocation()
  return user ? (
    <>
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
      {/* <Slidebar></Slidebar> */}
      </div>

      {/* <MobileSlidebar></MobileSlidebar> */}
      <div className=' flex-1 overflow-y-auto'>
        {/* <Navbar></Navbar> */}
        <div className='p-4 2xl:px-10'>
           {/* <Outlet></Outlet> */}
        </div>
      </div>

    </div>

    </>
  ):(
    <Navigate to="/log-in" state={{from:location}} replace/>
  )
}


function App() {

  return (

    <main className='w-[100vw] min-h-screen bg-[#fef4f5]'> Login
        <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={ <Navigate to ="/dashboard"/>} />  
          <Route path='/dashboard' element= {<Dashboard/> }/>  
          <Route path='/tasks' element= {<Tasks/> }/>  
          <Route path='/completed/:status' element= {<Tasks/> }/>  
          <Route path='/in-process/:status' element= {<Tasks/> }/>  
          <Route path='/todo/:status' element= {<Tasks/> }/>  
          <Route path='/team' element= {<Users/> }/>  
          <Route path='/trashed' element= {<Trash/> }/>  
          <Route path='/task/:id' element= {<TaskDetails/> }/>  
          </Route>

          <Route path='/log-in' element= {<Login/> }/>  

        </Routes>
        <Toaster  richColors> </Toaster>
    </main>


  )
}

export default App
