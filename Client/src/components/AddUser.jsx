import React from "react";
import ModalWrapper from "./ModelWrapper";
import { useForm } from "react-hook-form";

const AddUser = ({ open, setOpen, onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    onAdd(data);
    reset();
    setOpen(false);
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 p-4 text-gray-950">
        <h2 className="text-lg font-bold mb-2">Add New User</h2>
      <label htmlFor="name" className="font-medium">Full Name</label>

        <input
          className="border border-gray-100 text-gray-600 rounded px-3 py-2"
          placeholder="Full Name"
          
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        <label htmlFor="Title" className="font-medium">Title</label>

        <input
          className="border rounded px-3 py-2  border-gray-100 text-gray-6"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
              <label htmlFor="Email" className="font-medium">Email</label>
        <input
          className="border rounded px-3 py-2  border-gray-100 text-gray-6"
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              <label htmlFor="Role" className="font-medium">Role</label>
        <input
          className="border rounded px-3 py-2  border-gray-100 text-gray-6"
          placeholder="Role"
          {...register("role", { required: "Role is required" })}
        />
        {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
        <div className="flex gap-4 justify-end mt-2">
          <button
            type="button"
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;