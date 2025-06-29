import { Navigate, Route, Outlet, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import TaskDetails from './pages/TaskDetails'
import Tasks from './pages/Tasks'
import Trash from './pages/Trash'
import Users from './pages/Users'
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'


function Layout (){
  const user = useSelector((state) => state.auth.user)

  const location = useLocation()
  return user ? (
    <>
    <div className='w-full h-screen flex flex-col md:flex-row bg-white'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
      <Sidebar/>
      </div>

      {/* <MobileSlidebar></MobileSlidebar> */}
      <div className=' flex-1 overflow-y-auto'>
        <Navbar/>
        <div className='p-4 2xl:px-10'>
           <Outlet/>
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

    <main className='w-[100vw] min-h-screen bg-[#fef4f5]'> 
        <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={ <Navigate to ="/dashboard"/>} />  
          <Route path='/dashboard' element= {<Dashboard/> }/>  
          <Route path='/tasks' element= {<Tasks/> }/>  
          <Route path='/completed' element={<Tasks />} />
          <Route path='/in-process' element={<Tasks />} />
          <Route path='/todo' element={<Tasks />} />
          <Route path='/team' element= {<Users/> }/>  
          <Route path='/trashed' element= {<Trash/> }/>  
          <Route path='/task/:id' element= {<TaskDetails/> }/>  
          <Route path="/tasks/:id" element={<Navigate to={({ params }) => `/task/${params.id}`} replace />} />
          </Route>

          <Route path='/log-in' element= {<Login/> }/>  

        </Routes>
        <Toaster  richColors> </Toaster>
    </main>


  )
}

export default App
