import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "postcss";
import { useEffect, useRef, useState } from "react";

export default function Dashboard({ auth, districts, timeSlots }) {
    const [selectedValue, setSelectedValue] = useState("");

    // State to hold the image URLs for preview
    const [imagePreviews, setImagePreviews] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        note: "",
        street_1: "",
        street_2: "",
        district_id: "",
        delivery_time_id: "",
        images: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("prescription.store"));
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        setData('images', selectedFiles);

        const previews = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previews.push(e.target.result);
                if (previews.length === selectedFiles.length) {
                    setImagePreviews([...previews]); // Update the previews state after all images are loaded
                }
            };
            reader.readAsDataURL(selectedFiles[i]);
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
            <Head title="Dashboard" />

            <div className="flex flex-row items-center justify-center mt-5 mb-5">
                <div className="dark:bg-gray-700 p-4 w-full sm:max-w-md bg-white rounded-lg shadow-md">
                    <div className="text-xl font-semibold mb-4">Add Prescription</div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="note" value="Note" />
                            <textarea
                                className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                                name="note"
                                onChange={(e) => setData("note", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="street_1" value="Street 1" />
                            <TextInput
                                id="street_1"
                                name="street_1"
                                onChange={(e) => setData("street_1", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="street_2" value="Street 2" />
                            <TextInput
                                id="street_2"
                                name="street_2"
                                onChange={(e) => setData("street_2", e.target.value)}
                            />
                        </div>

                        {/* More form inputs... */}

                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="district" value="District" />
                            <select
                                id="district"
                                name="district"
                                onChange={(e) => setData("district", e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            >
                            <option>Select Time District</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* More form selects... */}

                        <div className="flex flex-col space-y-2">
                            <InputLabel htmlFor="delivery_time" value="Delivery Time" />
                            <select
                                id="delivery_time"
                                name="delivery_time"
                                onChange={(e) => setData("delivery_time", e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            >
                                <option>Select Time Slot</option>
                                {timeSlots.map((slot) => (
                                    <option key={slot.id} value={slot.id}>
                                        {slot.time_slot}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            />
                        </div>
                        <div className="flex flex-wrap mt-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="w-24 h-24 mr-2 mb-2">
                                    <img
                                        src={preview}
                                        alt={`Image Preview ${index}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                        <PrimaryButton>Add Prescription</PrimaryButton>
                    </form>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
