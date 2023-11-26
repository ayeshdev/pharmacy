"use client";

import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Input } from "postcss";
import React, { useRef, useState } from "react";

import { Button, Modal } from "flowbite-react";

export default function Quotations({ auth }) {

    const { quotations } = usePage().props;
    const pardedData = JSON.stringify(quotations);
    console.log(pardedData[0]['name']);

    const [openModal, setOpenModal] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const handleModalOpen = (id) => {
        setSelectedId(id);
        setOpenModal(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="flex flex-row items-center justify-center">
                <div className="dark:bg-gray-700 p-4">
                    <div>Quotations</div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Id
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        View Quotation
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {quotations.map((quotation, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {quotation.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Button onClick={() => handleModalOpen(quotation.id)}>
                                                Toggle modal
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4">
                                            {quotation.data && quotation.data.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    <p>Name: {item.name}</p>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>


                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                        <div className="p-8 bg-white shadow-lg rounded-xl">
                            <div className="flex flex-row items-center justify-between border-solid border-2 mb-8">

                                <div className="w-full p-5 space-y-3">
                                    <div className="h-full w-48 flex items-center justify-center">
                                        <div className="w-full h-full">

                                        </div>
                                    </div>

                                    <div
                                        className="h-12 w-48 flex flex-row items-center justify-around flex-wrap">

                                    </div>
                                </div>
                                <div className="w-full p-5">
                                    <table className="w-96 table-auto" id="quotation_table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">
                                                    Drug
                                                </th>
                                                <th className="text-right">
                                                    Quantity
                                                </th>
                                                <th className="text-right">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {quotations
                                            .find((quotation) => quotation.id === selectedId)
                                            ?.data.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td className="py-2">{item.name}</td>
                                                    <td className="py-2 text-right">{item.quantity}</td>
                                                    <td className="py-2 text-right">{item.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="flex flex-row mb-8 mt-5 justify-end">
                                        <p className="text-xl font-bold text-right">
                                            Total:
                                        </p>
                                    </div>

                                    <hr className="w-full mt-2 mb-6 border-gray-400" />

                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor="drug" className="w-1/3 text-right px-4">Drug:</label>

                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor="quantity" className="w-1/3 text-right px-4">Quantity:</label>

                                        </div>
                                        <div className="flex justify-end">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-2/3" >Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-row items-center justify-end">
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                    Send Quotation
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button>
                        I accept
                    </Button>
                    <Button color="gray">
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
