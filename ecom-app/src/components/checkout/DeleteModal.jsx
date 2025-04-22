import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export const DeleteModal = ({
  open,
  setOpen,
  title,
  onDeleteHandler,
  loader,
}) => {
  return (
    <Dialog open={open} onClose={setOpen} className='relative z-50'>
    <DialogBackdrop
    transition
    className='fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity'
    />

    <div className='fixed inset-0 z-10 flex items-center justify-center p-4 sm:p-6'>
        <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white shadow-xl max-w-sm sm:max-w-md w-full p-4 sm:p-6'>
            <div className='absolute right-2 top-2'>
                <button
                disabled={loader}
                type='button'
                onClick={() => setOpen(false)}
                className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'
                >
                    <span className='sr-only'>Close</span>
                    <FaTimes className='h-5 w-5'/>
                </button>
            </div>
            <div className='sm:flex sm:items-start'>
                <div className='mx-auto sm:mx-0 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100'>
                    <FaExclamationTriangle className='text-red-600 h-5 w-5'/>
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle
                    as='h3'
                    className='text-base sm:text-lg font-medium leading-6 text-gray-900'
                    >
                    {title}
                    </DialogTitle>
                    <div className='mt-2'>
                        <p className='text-sm text-gray-600'>
                            Are you sure you want to delete this item? <br />
                            <span className="font-semibold">This action cannot be undone.</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='mt-4 sm:mt-5 sm:flex sm:flex-row-reverse gap-2'>
                <button
                disabled={loader}
                type='button'
                onClick={onDeleteHandler}
                className={`inline-flex w-full sm:w-auto justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ${
                    loader ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                >
                    {loader ? "Loading..." : "Delete"}
                </button>
                <button
                disabled={loader}
                type='button'
                onClick={() => setOpen(false)}
                className='inline-flex w-full sm:w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition'
                >
                   Cancel
                </button>
            </div>
        </DialogPanel>
    </div>
</Dialog>
  );
};