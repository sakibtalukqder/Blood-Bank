'use client'
import Loader from '@/src/Loader';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BaseUrl = process.env.NEXT_PUBLIC_URL

const page = () => {

    const { id } = useParams()
    const route = useRouter()

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        const responce = await fetch(`${BaseUrl}/user/${id}`)
        const result = await responce.json()

        if (!responce.ok) {
            console.log(result.error);
        }
        if (responce.ok) {
            setUser(result)
            // console.log(result);
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // const [status, setStatus] = useState()

    // console.log(status);

    const updateStatus = async (e) => {
        e.preventDefault()
        const role = e.target.role.value
        setLoading(true)
        const responce = await fetch(`${BaseUrl}/user/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role })
        })
        const result = await responce.json()
        if (!responce.ok) {
            toast.error(result.error)
            console.log(result.error);
        }
        
        if (responce.ok) {
            toast.success(result.message)
            console.log(result);
            setLoading(false)
            route.push('/admin')
        }
    }


    if (loading) return (
        <><Loader /><ToastContainer /></>
    )

    return (
        <div className='flex items-center justify-center'>
            <ToastContainer />
            <div className="w-full md:w-2/3 lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="mt-2 text-xl font-bold text-center text-gray-800 uppercase">Update Donation Status</h3>
                <form onSubmit={updateStatus}
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Full Name
                        </label>
                        <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                        >{user?.name}</div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                        >{user?.email}</div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Mobile No
                        </label>
                        <div
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                            >{user?.phone}</div>
                    </div>
                    
                    <div className="mb-4 md:flex w-full gap-3 ">
                        <div className="w-full">
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="role"
                                    name='role'
                                    defaultValue={user?.role}
                                >
                                    <option value="VISITOR">VISITOR</option>
                                    <option value="CONTRIBUTOR">CONTRIBUTOR</option>
                                    <option value="ADMIN">ADMIN</option>

                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700  focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Status
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default page;