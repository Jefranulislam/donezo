import React from 'react';
import { useForm } from 'react-hook-form';
import ModalWrapper from './ModelWrapper';
import Textbox from './Textbox';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';

const AddSubTask = ({ open, setOpen, onAdd }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleOnSubmit = async (data) => {
    try {
      // Simulate async action, replace with your API call
      // const res = await yourApiCall(data);
      toast.success('Sub-task added!');
      if (onAdd) onAdd(data);
      setTimeout(() => setOpen(false), 500);
      reset();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.error || 'Error adding sub-task');
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          ADD SUB-TASK
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Date"
            type="date"
            name="date"
            label="Task Date"
            className="w-full rounded"
            register={register("date", { required: "Date is required!" })}
            error={errors.date ? errors.date.message : ""}
          />
          <Textbox
            placeholder="Tag"
            type="text"
            name="tag"
            label="Tag"
            className="w-full rounded"
            register={register("tag", { required: "Tag is required!" })}
            error={errors.tag ? errors.tag.message : ""}
          />
        </div>
        <div className="py-3 mt-4 flex gap-4 sm:flex-row-reverse">
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded hover:bg-blue-700 sm:ml-3 sm:w-auto"
          >
            Add Task
          </button>
          <button
            type="button"
            className="bg-white border text-sm font-semibold text-gray-900 px-6 py-2 rounded sm:w-auto"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;