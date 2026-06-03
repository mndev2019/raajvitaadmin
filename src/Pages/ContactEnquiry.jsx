import React, { useState } from 'react'
import TopHeader from '../Layout/TopHeader'
import Footer from '../Layout/Footer'
import { AiOutlineDelete } from 'react-icons/ai'
import SectionTitle from '../Layout/SectionTitle'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Base_Url } from '../API/Base_Url'

const ContactEnquiry = () => {
    const [data, setdata] = useState([]);
    const fetchcontact = async () => {
        try {
            const resp = await axios.get(`${Base_Url}/contact-enquiry`)
            if (resp.data.success) {
                console.log(resp.data)
                setdata(resp.data.data);

            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch User")
        }
    }

    React.useEffect(() => {
        fetchcontact()
    }, [])

    const handleDelete = async (id) => {
        try {
            const resp = await axios.delete(`${Base_Url}/contact-enquiry/${id}`);

            if (resp.data.success) {
                toast.success(resp.data.message);
                fetchcontact();
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Delete failed");
        }
    };
  

    return (
        <>
            <TopHeader />
            <section className="py-4 px-4">
                <div className="container mx-auto">
                    <div className='flex justify-between'>
                        <SectionTitle title="Contact" />
                     
                    </div>


                    <div className="pt-6 overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-[#FAFAFA] text-sm font-semibold">

                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Mobile</th>
                                    <th className="p-3 text-left">Message</th>
                                    <th className="p-3 text-left">Action</th>


                                </tr>
                            </thead>

                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td className="text-center py-6 text-gray-500">
                                            No data found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((itm) => (
                                        <tr
                                            key={itm._id}
                                            className="bg-white shadow-sm rounded"
                                        >
                                            {/* NAME */}
                                            <td className="p-3">{itm.name}</td>
                                            {/* PHONE */}
                                            <td className="p-3">{itm.email}</td>
                                            <td className="p-3">{itm.mobile}</td>
                                            <td className="p-3">{itm.message}</td>

                                            {/* Action */}
                                            <td className="p-3">



                                                <button
                                                    onClick={() => handleDelete(itm._id)}
                                                >
                                                    <AiOutlineDelete className="text-red-500 text-xl hover:scale-110 transition" />
                                                </button>

                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ContactEnquiry
