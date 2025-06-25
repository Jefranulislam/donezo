import React from 'react'
import { MdDashboard, MdTaskAlt, MdGroupWork, MdDelete, MdSettings, MdOutlinePendingActions, MdOutlineAddTask } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../redux/slices/authSlice';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
const linkData = [
    {label:"Dashboard", link: "/dashboard", icon : <MdDashboard/>},
    {label:"Tasks", link: "/tasks", icon : <MdTaskAlt/>},
    {label:"Completed", link: "/completed/completed", icon : <MdTaskAlt/>},
    {label:"In Process", link: "/in-process/in-process", icon : <MdOutlinePendingActions/>},
    {label:"To Do", link: "/todo/to-do", icon : <MdOutlinePendingActions/>},
    {label:"Team", link: "/team", icon : <MdGroupWork/>},
    {label:"Trashed", link: "/trashed", icon : <MdDelete/>},
    {label:"Settings", link: "/settings", icon : <MdSettings/>},
]

const Sidebar = () => {

    const {user} = useSelector((state) => state.auth.user)

    const dispatch = useDispatch()
    const location = useLocation()
    const path = location.pathname.split('/')[1];

    // Always show all sidebar links for all users
    const sidebarLinks = linkData;
    const closeSidebar = () => {
        dispatch(setOpenSidebar(false));
    }


    const NavLink = ({el}) => {
        return (
           <Link to ={el.link} onClick={closeSidebar} 
           className = {clsx(
            "flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-gray-100",
            path === el.link.split('/')[0] && "bg-gray-200 font-semibold"
           )}
           >
               {el.icon}
               <span>{el.label}</span>
           </Link>
        )
    }
  return (
    <div className='w-full h-full flex flex-col gap-4 p-4 bg-white shadow-md'>
        <h1 className='flex gap-1 items-center'>
        <p className='bg-blue-600 p-2 rounded-b-full'> 
            <MdOutlineAddTask className='text-white text-2xl font-black' />

        </p>
        <span className='text-2xl font-bold text-gray-800'>Donezo</span>
        </h1>
        <p className='text-gray-500'>Welcome, {user?.name}</p>

        <div className='flex flex-col flex-1 overflow-y-auto'>
          {sidebarLinks.map((link) => (
            <NavLink el = {link} key= {link.label}/>
          ))}
        </div>
    </div>
  )
}

export default Sidebar