/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ModalWrapper from './ModelWrapper'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import UserList from './UserList'
import Textbox from './Textbox'
import SelectedLList from './SelectedLIst'
import { BiImages } from 'react-icons/bi'

const LISTS = ["To-do", "In Progress", "Completed"];
const PRIORITY = ["High", "Medium", "Low", "Normal"];


const AddTask = ({open,setOpen}) => {
    const task =" ";
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage || LISTS[0]);
    const submitHandler = (data) => {
        console.log(data);
    };
    const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORITY[2]);

    const handleSelect = (e) => {
        const files = Array.from(e.target.files);
    };
    const [uploading, setUploading] = useState(false);
    return (
    <ModalWrapper open={open} setOpen={setOpen}>
  <form onSubmit={handleSubmit(submitHandler)}>
    <Dialog.Title
      as="h2"
      className="text-lg font-semibold leading-6 text-gray-900 mb-4"
    >
    {task? "Update Task" : "Add New Task"}
    </Dialog.Title>
    <div className="mt-2 flex flex-col gap-6">
      <Textbox
        placeholder="Task Title"
        type="text"
        name="title"
        label="Task Title"
        className="w-full rounded text-gray-600"
        register={register("title", { required: "Title is required" })}
        error={errors.title ? errors.title.message : ""}
      />
      <UserList
        setTeam={setTeam}
        team={team} selected ={stage}
        setSelected={setStage}
      />
      <div>
        <SelectedLList label ="Task Stage" lists = {LISTS} selected={stage} setSelected={setStage} />
      </div>
      <div>
        <Textbox 
        placeholder = "date"
        type="date"
        name="date"
        className="w-full rounded text-gray-600"
        label="Task Date"
        register={register("date", { required: "Date is required" })}
        error={errors.date ? errors.date.message : ""}
          />
      </div>
        <div>
            <SelectedLList label ="Task Priority" lists = {PRIORITY} selected={task?.priority} setSelected={task?.priority} />      
      </div>
       <div className="w-full flex items-center justify-center mt-4">
  <label
    className="flex items-center gap-1 text-base text-gray-600 hover:text-blue-600 cursor-pointer my-4"
    htmlFor="imgUpload"
  >
    <input
      type="file"
      className="hidden"
      id="imgUpload"
      onChange={handleSelect}
      accept=".jpg, .png, .jpeg"
      multiple
    />
    <BiImages className="text-xl" />
    <span>Add Assets</span>
  </label>
</div>

      </div>
      <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
  {uploading && (
    <span className="text-sm py-2 text-red-500">
      Uploading assets
    </span>
  )}
  <button
    type="submit"
    className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto rounded"
  >
    Submit
  </button>
  <button
    type="button"
    className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto rounded border border-gray-300"
    onClick={() => setOpen(false)}
  >
    Cancel
  </button>
</div>
  </form>
    </ModalWrapper>
  );
};

export default AddTask;