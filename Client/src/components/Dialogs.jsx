import React from "react";
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModelWrapper";
 

// General Dialog (e.g., for delete confirmation)
export default function Dialogs({ open, setOpen, msg, onClick, type = "delete", setMsg, setType }) {
  const closeDialog = () => {
    if (setType) setType("delete");
    if (setMsg) setMsg(null);
    setOpen(false);
  };


  return (
    <ModalWrapper open={open}  setOpen={closeDialog}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <DialogTitle as="h3" className="text-lg font-bold text-red-600 flex items-center gap-2">
          <span className={clsx("p-3 rounded-full bg-red-100")}>
            <FaQuestion />
          </span>
          {type === "delete" ? "Delete Confirmation" : "Action"}
        </DialogTitle>
        <div className="text-center text-gray-500">{msg || "Are you sure you want to proceed?"}</div>
        <div className="flex gap-4 mt-4">
          <Button
            label="Cancel"
            type="button"
            className="bg-white border border-gray-300 px-4 py-2 rounded text-gray-900"
            onClick={closeDialog}> Cancel </Button>
          
          <Button
            label={type === "delete" ? "Delete" : "Confirm"}
            type="button"
            className="bg-red-600 text-white px-4 py-2"
            onClick={onClick}> Delete </Button>
          
        </div>
      </div>
    </ModalWrapper>
  );
}

// User Action Dialog (activate/deactivate user)
export function UserAction({ open, setOpen, onClick }) {
  const closeDialog = () => setOpen(false);

  return (
    <ModalWrapper open={open} setOpen={closeDialog}>
      <div className="py-4 w-full flex flex-col gap-4 items-center justify-center">
        <DialogTitle as="h3" className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <span className={clsx("p-3 rounded-full bg-blue-100")}>
            <FaQuestion />
          </span>
          User Action
        </DialogTitle>
        <div className="text-center text-gray-500">
          Are you sure you want to activate or deactivate this account?
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            label="Cancel"
            type="button"
            className="bg-white border text-gray-900"
            onClick={closeDialog}
          />
          <Button
            label="Confirm"
            type="button"
            className="bg-blue-600 text-white"
            onClick={onClick}
          />
        </div>
      </div>
    </ModalWrapper>
  );
}