import React from 'react'
import {summary} from '../assets/data.js';
import { FaNewspaper } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import Chart from '../components/Chart.jsx';

const Dashboard = () => {

  const totals = summary?.tasks;
  

    const stats = [
     { _id: "1",
      label:'Total tasks',
      total:  summary?.totalTasks || 0,
      icon: <FaNewspaper/>,
      bg: ' bg-blue-500'
    },
     { _id: "2",
      label:'Completed tasks',
      total:  totals["Completed"] || 0,
      icon: <MdAdminPanelSettings/>,
      bg: 'bg-green-400'
    },
     { _id: "3",
      label:'In process',
      total:  totals["In process"] || 0,
      icon: <BiSolidMessageRounded/>,
      bg: 'bg-yellow-400'
    },
     { _id: "4",
      label:'To-do',
      total:  totals["todo"] || 0,
      icon: <HiBellAlert/>,
      bg: 'bg-purple-500'
    },
    ]



const Card = ({ icon, bg, label, count }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${bg}`}>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">{label}</div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-400 shadow-inner">
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
      <div className="flex flex-row items-end gap-3 ">
        <span className="text-2xl font-bold">{count}</span>
        <span className="flex flex-col items-start ">
          <span className="text-sm text-gray-200">Last Month</span>
        </span>
      </div>
    </div>
  );
};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({icon, bg, label, total}, index ) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
  ))}

    <Chart/>
      </div>
    </div>
  )
}

export default Dashboard