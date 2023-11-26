"use client";

import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Input } from "postcss";
import { useRef, useState } from "react";

import { Button, Modal } from "flowbite-react";
import AdminDashboardHeader from "@/Components/AdminDashboardHeader";

export default function Dashboard({ auth }) {
    const { prescriptions } = usePage().props;

    const [openModal, setOpenModal] = useState(false);
    const [fetchedData, setFetchedData] = useState({ data: {}, images: [] });

    const [fetchDataId, setFetchDataId] = useState('');


    const [selectedImage, setSelectedImage] = useState('');

    const [openQuotationModal, setOpenQuotationModal] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);


    // Quotation Table

    const [drug, setDrug] = useState("");
    const [quantity, setQuantity] = useState("");
    const [items, setItems] = useState([

    ]);

    // Function to handle the selection of an image
    const handleImageSelection = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    // Function to handle adding items to the table
    const handleAddItem = () => {
        if (drug && quantity) {
            const newItem = {
                name: drug,
                quantity: `10 x ${quantity}`,
                amount: (parseInt(quantity) * 10).toFixed(2)
            };
            setItems([...items, newItem]);
            setDrug("");
            setQuantity("");
        }
    };


    // Function to calculate the total
    const calculateTotal = () => {
        return items.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2);
    };

    const fetchData = async (id) => {

        setFetchDataId(id);

        try {
            const response = await fetch(`/prescription/${id}`); // Replace with your Laravel endpoint
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            setFetchedData(data);

            // Check if images exist and set the first image as selectedImage
            if (data.images.length > 0) {
                setSelectedImage(`/uploads/${data.images[0].filename}`);
            }

            setOpenModal(true);
            console.log(data); // Handle the fetched data here
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    //Send Quotation Data

    const sendQuotation = async (prescriptionId) => {

        const selectedPrescription = prescriptions.find(prescription => prescription.id === fetchDataId);

        if (selectedPrescription.quotation) {
            console.log('Quotation already exists for this prescription');
            // Optionally, inform the user that a quotation already exists
            return;
        }

        const user_id = selectedPrescription.user.id;

        console.log(items);

        try {
            const response = await fetch('/add-quotation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    user_id,
                    tableData: items, // Assuming 'items' holds the table data
                    prescriptionId,
                }),
            });

            if (response.ok) {
                // Handle success
                console.log('Quotation sent successfully!');

            } else {
                // Handle error
                console.error('Failed to send quotation.');
            }
        } catch (error) {
            console.error('Error sending quotation:', error);
        }
    };


    //get quotation data
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    const fetchQuotationData = async (quotationId) => {
        try {
            const response = await fetch('/show-quotation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    quotationId,
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setSelectedPrescription(data); // Set the fetched data here
            setOpenQuotationModal(true);
            console.log(data); // Handle the fetched quotation data here
        } catch (error) {
            console.error("Error fetching quotation data:", error);
        }
    };

    return (
        <>
            <AdminDashboardHeader />
            <Head title="Admin Dashboard" />

            <div className="flex flex-row items-center justify-center">
                <div className="dark:bg-gray-700 p-4">
                    <div className="text-2xl mb-4">Prescriptions</div>
                    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg h-[450px] mb-6">
                        <table className="w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Contact Number
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Note
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        View Prescription
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        View Quotation
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {prescriptions.map((prescription, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {prescription.user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {prescription.user.contact_no}
                                        </td>
                                        <td className="px-6 py-4">
                                            {prescription.note}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                onClick={() =>
                                                    fetchData(prescription.id)
                                                }
                                            >
                                                View Prescription
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                onClick={() =>
                                                    fetchQuotationData(prescription.quotation.id)
                                                }
                                            >
                                                View Quotation
                                            </Button>
                                        </td>
                                        <td className="px-6 py-4">
                                            {prescription.quotation ? (
                                                <span>
                                                    {prescription.quotation.status_id === 1 ? 'Not Accepted' : 'Accepted'}
                                                </span>
                                            ) : (
                                                <span>No Quotation</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
                <Modal.Header>Add Quotation</Modal.Header>
                <Modal.Body>


                    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                        <div className="p-8 bg-white shadow-lg rounded-xl">
                            <div className="flex flex-row items-center justify-between border-solid border-2 mb-8">

                                <div className="w-full p-5 space-y-3">
                                    <div className="h-full w-48 flex items-center justify-center">
                                        <div className="w-full h-full">
                                            {selectedImage && (
                                                <img src={selectedImage} alt="Prescription Image" />
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className="h-12 w-48 flex flex-row items-center justify-around flex-wrap">
                                        {fetchedData.images.slice(0, 5).map((image, index) => (
                                            selectedImage !== `/uploads/${image.filename}` && (
                                                <div
                                                    key={index}
                                                    className="w-1/5"
                                                    onClick={() => handleImageSelection(`/uploads/${image.filename}`)}
                                                >
                                                    <img src={`/uploads/${image.filename}`} alt={`Prescription Image ${index}`} className="block w-full h-auto" />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full p-5">
                                    <table className="w-96 table-auto">
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
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-2">{item.name}</td>
                                                    <td className="py-2 text-right">{item.quantity}</td>
                                                    <td className="py-2 text-right">{item.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="flex flex-row mb-8 mt-5 justify-end">
                                        <p className="text-xl font-bold text-right">
                                            Total: {calculateTotal()}
                                        </p>
                                    </div>

                                    <hr className="w-full mt-2 mb-6 border-gray-400" />

                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor="drug" className="w-1/3 text-right px-4">Drug:</label>
                                            <input type="text"
                                                id="drug"
                                                placeholder="Enter drug name"
                                                className="w-2/3 p-2 border border-gray-300 rounded"
                                                value={drug}
                                                onChange={(e) => setDrug(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mb-3">
                                            <label htmlFor="quantity" className="w-1/3 text-right px-4">Quantity:</label>
                                            <input type="text" id="quantity"
                                                placeholder="Enter quantity"
                                                className="w-2/3 p-2 border border-gray-300 rounded"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg w-2/3" onClick={handleAddItem}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => sendQuotation(fetchDataId)}>
                        Send Quotation
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={openQuotationModal} onClose={() => setOpenQuotationModal(false)} size="4xl">
                <Modal.Header>Quotation</Modal.Header>
                <Modal.Body>
                    {selectedPrescription && (
                        <div className="p-8 bg-white shadow-lg rounded-xl">
                            <div className="flex flex-row items-center justify-between border-solid border-2 mb-8">
                                <div className="w-full p-5">
                                    <table className="w-96 table-auto" id="quotation_table">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Drug</th>
                                                <th className="text-right">Quantity</th>
                                                <th className="text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPrescription.data.map((item, itemIndex) => (
                                                <tr key={itemIndex}>
                                                    <td className="py-2">{item.name}</td>
                                                    {/* Access other fields of 'item' as needed */}
                                                    <td className="py-2 text-right">{item.quantity}</td>
                                                    <td className="py-2 text-right">{item.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* Additional details or actions */}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}
