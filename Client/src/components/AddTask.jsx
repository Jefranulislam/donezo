/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ModalWrapper from './ModelWrapper'
import { useForm } from 'react-hook-form'
import { Dialog } from '@headlessui/react'
import UserList from './UserList'
import Textbox from './Textbox'
import SelectedLList from './SelectedLIst'
import { BiImages } from 'react-icons/bi'
import api from "../utils/api";
import { createTask } from '../utils/taskService'

const LISTS = ["todo", "in progress", "completed"];
const PRIORITY = ["High", "Medium", "Low", "Normal"];



import { updateTask } from '../utils/taskService';

const AddTask = ({ open, setOpen, onTaskAdded, task }) => {
    const isEdit = !!task;
    const {register, handleSubmit, reset, setValue, formState: { errors }} = useForm({
      defaultValues: {
        title: task?.title || '',
        date: task?.date ? task.date.slice(0,10) : '',
      }
    });
    const [team, setTeam] = useState(task?.team || []);
    const [stage, setStage] = useState(task?.stage || LISTS[0]);
    const [priority, setPriority] = useState(task?.priority || PRIORITY[2]);
    const [uploading, setUploading] = useState(false);

    // Update form values if task changes (for edit mode)
    React.useEffect(() => {
      if (isEdit && task) {
        setValue('title', task.title || '');
        setValue('date', task.date ? task.date.slice(0,10) : '');
        setTeam(task.team || []);
        setStage(task.stage || LISTS[0]);
        setPriority(task.priority || PRIORITY[2]);
      }
    }, [task, isEdit, setValue]);

    const submitHandler = async (data) => {
      try {
        const payload = {
          title: data.title,
          date: data.date,
          team,
          stage,
          priority,
        };
        if (isEdit) {
          await updateTask(task._id, payload);
        } else {
          await createTask(payload);
        }
        reset();
        if (onTaskAdded) onTaskAdded();
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    };

    const handleSelect = (e) => {
        const files = Array.from(e.target.files);
    };


    
    return (
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-lg font-semibold leading-6 text-gray-900 mb-4"
          >
            {isEdit ? "Update Task" : "Add New Task"}
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
              team={team}
              selected={stage}
              setSelected={setStage}
            />
            <div>
              <SelectedLList label="Task Stage" lists={LISTS} selected={stage} setSelected={setStage} />
            </div>
            <div>
              <Textbox
                placeholder="date"
                type="date"
                name="date"
                className="w-full rounded text-gray-600"
                label="Task Date"
                register={register("date", { required: "Date is required" })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
            <div>
              <SelectedLList label="Task Priority" lists={PRIORITY} selected={priority} setSelected={setPriority} />
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
                  // onChange={handleSelect}
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
              <span className="text-sm py-2 text-red-500">Uploading assets</span>
            )}
            <button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto rounded"
            >
              {isEdit ? "Update" : "Submit"}
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