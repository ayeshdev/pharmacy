import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "postcss";
import { useRef, useState } from "react";

export default function Dashboard({ auth }) {
    const [selectedValue, setSelectedValue] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        note: "",
        street_1: "",
        street_2: "",
        district: "",
        delivery_time: "",
        images: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("prescription.store"));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files;
        setData("images", selectedFile);
        console.log("Selected file:", selectedFile);
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

            <div className="flex flex-row items-center justify-center">
                <div className="dark:bg-gray-700 p-4">
                    <div>Add Prescription</div>

                    <div>
                        <form onSubmit={submit}>
                            <InputLabel htmlFor="note" value="Note" />
                            <textarea
                                name="note"
                                onChange={(e) =>
                                    setData("note", e.target.value)
                                }
                            />

                            <InputLabel htmlFor="street_1" value="Street 1" />
                            <TextInput
                                id="street_1"
                                name="street_1"
                                onChange={(e) =>
                                    setData("street_1", e.target.value)
                                }
                            />

                            <InputLabel htmlFor="street_2" value="Street 2" />
                            <TextInput
                                id="street_2"
                                name="street_2"
                                onChange={(e) =>
                                    setData("street_2", e.target.value)
                                }
                            />

                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                name="city"
                                onChange={(e) =>
                                    setData("city", e.target.value)
                                }
                            />
                            <br />
                            <InputLabel htmlFor="district" />
                            <select
                                id="district"
                                name="district"
                                onChange={(e) =>
                                    setData("district", e.target.value)
                                }
                            >
                                <option value="1">Ratnapura</option>
                                <option value="2">Colombo</option>
                            </select>

                            <br />
                            <InputLabel htmlFor="delivery_time" />
                            <select
                                id="delivery_time"
                                name="delivery_time"
                                onChange={(e) =>
                                    setData("delivery_time", e.target.value)
                                }
                            >
                                <option value={1}>10-12</option>
                                <option value={2}>12-1</option>
                            </select>

                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileChange(e)}
                            />

                            <br />
                            <PrimaryButton className="ms-4">Send</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
