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

    // Sort quotations by id in descending order
    const sortedQuotations = [...quotations].sort((a, b) => b.id - a.id);


    const calculateTotal = () => {
        const selectedQuotation = quotations.find((quotation) => quotation.id === selectedId);

        if (selectedQuotation) {
            return selectedQuotation.data.reduce((total, item) => {
                // Assuming amount is a string with a numeric value
                const amount = parseFloat(item.amount.replace(/[^0-9.-]+/g, ''));
                return total + amount;
            }, 0).toFixed(2); // Rounds the total to 2 decimal places
        }

        return 0;
    };


    //handle accept and decline payment
    const handleAccept = async () => {
        try {
            const response = await fetch('/change-quotation-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

                },
                body: JSON.stringify({
                    accepted: true, // Sending accepted as true
                    quotationId: selectedId, // Sending the selected quotation ID
                }),
            });

            if (response.ok) {
                // Handle success response from the server if needed
                const data = await response.json();
                console.log(data);
            } else {
                // Handle error response
                console.error('Failed to process quotation');
            }
        } catch (error) {
            // Handle any exception during the fetch
            console.error(error);
        }
    };

    const handleDecline = async () => {
        try {
            const response = await fetch('/change-quotation-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),

                },
                body: JSON.stringify({
                    accepted: false, // Sending accepted as false for decline
                    quotationId: selectedId, // Sending the selected quotation ID
                }),
            });

            if (response.ok) {
                // Handle success response from the server if needed
                const data = await response.json();
                console.log(data);
            } else {
                // Handle error response
                console.error('Failed to process quotation');
            }
        } catch (error) {
            // Handle any exception during the fetch
            console.error(error);
        }
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
                    <div className="text-2xl mb-4">Quotations</div>

                    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[500px]">
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
                                {sortedQuotations.map((quotation, index) => (
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
                                                View Quotation
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
                <Modal.Header>Quotation</Modal.Header>
                <Modal.Body>


                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                        <div className="p-8 bg-white shadow-lg rounded-xl">
                            <div className="flex flex-row items-center justify-between border-solid border-2 mb-8">
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
                                    <hr className="w-full mt-2 mb-6 border-gray-400" />

                                    <div className="flex flex-row mb-6 mt-5 justify-end">
                                        <p className="text-xl font-bold text-right">
                                            Total: Rs.{calculateTotal()}
                                        </p>
                                    </div>

                                    <hr className="w-full mt-1 mb-6 border-gray-400" />

                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAccept}>
                        I accept
                    </Button>
                    <Button color="gray" onClick={handleDecline}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
