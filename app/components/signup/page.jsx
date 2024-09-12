'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BaseUrl = process.env.NEXT_PUBLIC_URL

const page = () => {

    const route = useRouter();

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const Signup = async (e) => {
        e.preventDefault();
        if (name != null && email != null && phone != null && password != null && confirmPassword != null) {
            if (confirmPassword === password) {

                const data = { name, email, phone, password }

                const response = await fetch(`${BaseUrl}/user/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const notify = await response.json()

                if (!response.ok) {
                    toast.error(notify.message)
                    console.log(notify.message);
                }

                if (response.ok) {
                    toast.success(notify.message);
                    console.log(notify.message);
                    route.push('login')
                }

            } else {
                toast.error("Password Not match")
            }
        } else {
            toast.error("Fill all the fields")
        }
    }

    return (
        <div>
            <ToastContainer />
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:my-8 lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Create your account
                            </h1>
                            <form
                                onSubmit={Signup}
                                className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Full Name</label>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Your Full Name" required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Your Phone Number</label>
                                    <input
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="01234567890" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <div></div>
                                <button type="submit" className="w-full btn btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium ">Sign Up</button>
                                <div></div>
                                <Link href={'/components/login'} className="text-sm font-light text-gray-500 pt-4">
                                    Don’t have an account yet? <span href="#" className="font-medium text-primary-600 hover:underline">Login</span>
                                </Link>
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default page;