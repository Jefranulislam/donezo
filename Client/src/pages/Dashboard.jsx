import React from 'react'
import { summary } from '../assets/data.js'
import { FaNewspaper } from "react-icons/fa"
import { MdAdminPanelSettings } from "react-icons/md"
import { BiSolidMessageRounded } from "react-icons/bi"
import { HiBellAlert } from "react-icons/hi2"
import Chart from '../components/Chart.jsx'
import moment from 'moment'
import { userName } from '../utils/userName.js' // Adjust path as needed

const Dashboard = () => {
  const totals = summary?.tasks
  const stats = [
    {
      _id: "1",
      label: 'Total tasks',
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: 'bg-blue-500'
    },
    {
      _id: "2",
      label: 'Completed tasks',
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: 'bg-green-400'
    },
    {
      _id: "3",
      label: 'In process',
      total: totals["in progress"] || 0,
      icon: <BiSolidMessageRounded />,
      bg: 'bg-yellow-400'
    },
    {
      _id: "4",
      label: 'To-do',
      total: totals["todo"] || 0,
      icon: <HiBellAlert />,
      bg: 'bg-purple-500'
    },
  ]

  const getPriorityColor = (priority) => {
    switch ((priority || '').toLowerCase()) {
      case 'high':
        return "bg-red-100 text-red-700"
      case 'medium':
        return "bg-yellow-100 text-yellow-700"
      case 'low':
        return "bg-green-100 text-green-700"
      case 'normal':
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Task Title</th>
        <th className="py-2">Team Members</th>
        <th className="py-2">Priority</th>
        <th className="py-2">Stage</th>
        <th className="py-2 hidden md:table-cell">Created At</th>
      </tr>
    </thead>
  )

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-50">
      <td className="py-2 font-medium">{task.title}</td>
      <td className="py-2">
        <div className="flex flex-wrap gap-1">
          {task.team && task.team.length > 0
            ? task.team.map((member) => (
                <span
                  key={member._id}
                  className="px-2 py-0.5 rounded bg-gray-200 text-xs text-gray-700"
                  title={`${member.name} (${member.title})`}
                >
                  {member.name}
                </span>
              ))
            : <span className="text-xs text-gray-400">-</span>
          }
        </div>
      </td>
      <td className="py-2">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
          {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "—"}
        </span>
      </td>
      <td className="py-2 capitalize">
        {task.stage || "—"}
      </td>
      <td className="py-2 hidden md:table-cell">{moment(task.createdAt).format("ll")}</td>
    </tr>
  )

  const TaskTable = () => (
    <div className="bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded mt-8">
      <h2 className="text-lg font-semibold mb-2">Tasks</h2>
      <table className="w-full">
        <TableHeader />
        <tbody>
          {summary.last10Task && summary.last10Task.map((task) => (
            <TableRow key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )

  const Card = ({ icon, bg, label, count }) => {
    return (
      <div className={`p-4 rounded-lg shadow-md ${bg}`}>
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{label}</div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-inner">
            <span className="text-3xl">{icon}</span>
          </div>
        </div>
        <div className="flex flex-row items-end gap-3">
          <span className="text-2xl font-bold">{count}</span>
          <span className="flex flex-col items-start">
            <span className="text-sm text-gray-500">Last Month</span>
          </span>
        </div>
      </div>
    )
  }

  const UserTable = () => (
    <div className="w-full bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded mt-8">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Name</th>
            <th className="py-2">Status</th>
            <th className="py-2 hidden md:table-cell">Created At</th>
          </tr>
        </thead>
        <tbody>
          {summary.users && summary.users.map((user) => (
            <tr key={user._id} className="border-b border-gray-300 text-gray-600 hover:bg-gray-50">
              <td className="py-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                  {userName(user.name, 2)}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
              </td>
              <td className="py-2">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  user.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : "—"}
                </span>
              </td>
              <td className="py-2 hidden md:table-cell">{moment(user.createdAt).format("ll")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="p-4 w-full ">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      <div className="grid  grid-cols-3 gap-4 w-full bg-violet-100">
              <div className="col-span-3 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ icon, bg, label, total }, index) => (
                  <Card key={index} icon={icon} bg={bg} label={label} count={total} />
                ))}
              </div>

          <div className=" grid items-end ">
            <Chart/> 
          </div>

          <div className=" col-span-2 ">
            <TaskTable />
          </div>

          <div className="col-span-3">
           <UserTable />
          </div>
      </div>
    </div>
  )
}

export default Dashboard