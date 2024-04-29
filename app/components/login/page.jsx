'use client'
import React from 'react';
import { getSession, signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const page = () => {

    const Login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await signIn('credentials', {
                email: e.target.email.value,
                password: e.target.password.value,
                redirect: false,
            });

            if (loginData?.error) {
                toast.error(loginData.error)
                console.log(loginData.error);
                console.log(loginData);
            }
            else {
                // console.log(loginData);
                const session = await getSession();

                if (session?.user) {
                    const userId = session.user.id;
                    localStorage.setItem('userId', userId)
                    window.location.href = `${window.location.origin}/doner/register`;
                    return userId; 
                } else {
                    console.log("No user session found");
                }
            }
        } catch (error) {
            console.log("Error : ", error);
        }
    }

    return (
        <div>
            <ToastContainer />
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:my-20 lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <form
                                onSubmit={Login}
                                className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input
                                        type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input
                                        type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <div></div>
                                <button type="submit" className="w-full btn btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium ">Login</button>
                                <div></div>
                                <Link href={'/components/signup'} className="text-sm font-light text-gray-500 mt-4 ">
                                    Don’t have an account yet? <span href="#" className="font-medium text-primary-600 hover:underline">Sign up</span>
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