'use client'
import Loader from '@/src/Loader';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const BaseUrl = process.env.NEXT_PUBLIC_URL

const page = () => {

    const { id } = useParams()
    const route = useRouter()

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    // console.log(user);

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
        const lastDonate = e.target.lastDonate.value
        setLoading(true)
        const responce = await fetch(`${BaseUrl}/doner/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ lastDonate })
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
            route.push('/doner/list')
        }
    }

    if (loading) return (
        <><Loader /><ToastContainer /></>
    )
    return (
        <div className='my-12 mx-6 md:mx-64'>
            <ToastContainer />
            <form onSubmit={updateStatus}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Full Name
                    </label>
                    <div
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        id="email"
                    >{user?.name}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <div
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        id="email"
                    >{user?.email}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Mobile No
                    </label>
                    <div
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        id="email"
                    >{user?.phone}</div>
                </div>

                {
                    user?.donner?.length <= 0 ? <></>
                        : user?.donner?.map((value, index) => (
                            <div key={index}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Location
                                    </label>
                                    <div
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        id="email"
                                    >{value?.Area}</div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="date" className="block mb-2 text-sm font-bold text-gray-700">
                                                Date of birth
                                            </label>
                                            <input
                                                value={value?.dateOfBirth} readOnly
                                                type="date" name="date" id="date"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="time" className="block mb-2 text-sm font-bold text-gray-700">
                                                Last Donate Date
                                            </label>
                                            <input defaultValue={value?.lastDonate}
                                                type="date" name="lastDonate" id="lastDonate"
                                                className="w-full rounded-md border border-[#eb7d7d] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))

                }

                {
                    user?.donner?.length <= 0 ? <div className='mt-4'>
                        <Link href={'/doner/register'}
                            className="hover:shadow-form w-full rounded-md bg-success py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Applay to become a donner
                        </Link>
                    </div> : <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Update last donation Date
                        </button>
                    </div>
                }


            </form>

        </div>
    );
};

export default page;