'use client'
import Loader from '@/src/Loader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BaseUrl = process.env.NEXT_PUBLIC_URL

const page = () => {


    const session = useSession()
    const user = (session?.data?.user);

    const router = useRouter()

    const [bloodType, setBloodType] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [lastDonate, setLastDonate] = useState();

    const [Division, setDivision] = useState();
    const [District, setDistrict] = useState();
    const [Upazilla, setUpazilla] = useState();
    const [Code, setCode] = useState();

    const Area = Division + "," + District + "," + Upazilla + "," + Code

    const ApplayForDonner = async (e) => {
        e.preventDefault()
        if (bloodType != null && dateOfBirth != null
            && lastDonate != null && Division != null && District != null
            && Upazilla != null && Code != null) {
            try {
                const data = {
                    Area, bloodType, dateOfBirth, lastDonate, userId: user?.id
                }

                const responce = await fetch(`${BaseUrl}/doner`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                const result = await responce.json()
                console.log(responce);

                if (!responce.ok) {
                    console.log(result.error);
                    toast.error(result.error)
                }
                if (responce.ok) {
                    console.log(result.message);
                    toast.success(result.message);
                    router.push('/doner/list')
                }

            } catch (error) {
                console.log("=========================================", error);
                toast.error("Submission Unsuccesfull")
            }
        } else {
            toast.error("Fill all the fields")
        }

    }

    if (!user) {
        return <Loader />
    }

    return (
        <>
            <div className="flex items-center justify-center p-12">
                {/* <!-- Author: Sakib Talukqder --> */}
                <ToastContainer />
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={ApplayForDonner} className='p-4'>
                        <div className="mb-5">
                            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#dbdbe3]">
                                Full Name
                            </label>
                            <input
                                value={user?.name} readOnly type="text" name="name" id="name" placeholder="Full Name"
                                className="w-full bg-slate-800 rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#dbdbe3]">
                                Email Address
                            </label>
                            <input
                                value={user?.email} readOnly type="email" name="email" id="email" placeholder="Enter your email"
                                className="w-full rounded-md border border-[#e0e0e0] bg-slate-800  py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>

                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-[#dbdbe3]">
                                        Date of birth
                                    </label>
                                    <input
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        type="date" name="date" id="date"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-slate-800  py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#dbdbe3]">
                                        Last Donate Date
                                    </label>
                                    <input
                                        onChange={(e) => setLastDonate(e.target.value)}
                                        type="date" name="time" id="time"
                                        className="w-full rounded-md border bg-slate-800 border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="bloodGroup" className="mb-3 block text-base font-medium text-[#dbdbe3]">
                                Blood Group
                            </label>
                            <select
                                onChange={(e) => setBloodType(e.target.value)}
                                id="bloodGroup"
                                name="bloodGroup"
                                className="w-full rounded-md border border-[#e0e0e0] bg-slate-800 py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            >
                                <option value="">Select your blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div className="mb-5 pt-3">
                            <label className="mb-5 block text-base font-semibold text-[#dbdbe3] sm:text-xl">
                                Address Details
                            </label>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <input
                                            onChange={(e) => setDivision(e.target.value)}
                                            type="text" name="area" id="area" placeholder="Division"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-slate-800  py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <input
                                            onChange={(e) => setDistrict(e.target.value)}
                                            type="text" name="city" id="city" placeholder="District"
                                            className="w-full rounded-md border border-[#e0e0e0]  bg-slate-800 py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <input
                                            onChange={(e) => setUpazilla(e.target.value)}
                                            type="text" name="state" id="state" placeholder="Upazilla"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-slate-800  py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <input
                                            onChange={(e) => setCode(e.target.value)}
                                            type="text" name="post-code" id="post-code" placeholder="Post Code"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-slate-800  py-3 px-6 text-base font-medium text-[#c2c2c2] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Applay for Donation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    );
};

export default page;