import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

// Icon mapping
const ICONS = {
  alert: (
    <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
  message: (
    <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
  notification: (
    <IoIosNotificationsOutline className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
};

const data = [
  {
    id: "65c5f12ab5204a81bde866ab",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
      "65c317360fd860f958baa08e",
    ],
    text: "New task has been assigned to you and 2 others. The task priority is set as high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!",
    task: {
      title: "Test task",
    },
    notiType: "alert",
    isRead: false,
    createdAt: "2024-02-08T10:15:00.000Z",
    updatedAt: "2024-02-08T10:15:00.000Z",
  },
  {
    id: "65c5f12ab5204a81bde866ac",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c30b96e639681a13def0b5",
    ],
    text: "You have a new message from your team lead. Please check your inbox for details.",
    task: {
      title: "Message from Team Lead",
    },
    notiType: "message",
    isRead: false,
    createdAt: "2024-02-10T09:00:00.000Z",
    updatedAt: "2024-02-10T09:00:00.000Z",
  },
  {
    id: "65c5f12ab5204a81bde866ad",
    team: ["65c317360fd860f958baa08e"],
    text: "Reminder: The project deadline is approaching. Please update your progress.",
    task: {
      title: "Project Deadline Reminder",
    },
    notiType: "notification",
    isRead: true,
    createdAt: "2024-02-11T14:30:00.000Z",
    updatedAt: "2024-02-11T14:30:00.000Z",
  },
  {
    id: "65c5f12ab5204a81bde866ae",
    team: [
      "65c202d4aa62f32ffd1303cc",
      "65c317360fd860f958baa08e",
    ],
    text: "Task 'Design Review' has been marked as completed by your teammate.",
    task: {
      title: "Design Review",
    },
    notiType: "alert",
    isRead: false,
    createdAt: "2024-02-12T16:45:00.000Z",
    updatedAt: "2024-02-12T16:45:00.000Z",
  },
];

const NotificationPanel = () => {
    // const {data, refetch}= useGetNotificationsQuery();
    // const [markAsRead] = useMarkAsReadMutation(); 
        

  return (
    <Popover className="relative">  
      <Popover.Button className="inline-flex items-center outline-none">
        <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
          <IoIosNotificationsOutline className="text-2xl" />
          {data?.length > 0 && (
            <span className="absolute text-center top-0 right-0 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600">
              {data?.length}
            </span>
          )}
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            {data.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
            )}
            {data.map((item) => (
              <div
                key={item.id}
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                title={item.text}
              >
                <span className="mr-2">{ICONS[item.notiType]}</span>
                <span className="truncate flex-1 text-sm text-gray-800">{item.text}</span>
                <span className="ml-2 text-xs text-gray-400 whitespace-nowrap">
                  {moment(item.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default NotificationPanel