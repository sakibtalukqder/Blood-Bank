'use client'
import Loader from "@/src/Loader";
import Logout from "@/src/Logout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BaseUrl = process.env.NEXT_PUBLIC_URL

const UserProfile = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const id = localStorage.getItem('userId')

    const getData = async () => {
        const responce = await fetch(`${BaseUrl}/user/${id}`)
        const result = await responce.json()
        if (!responce.ok) {
            console.log(result.error);
        }
        if (responce.ok) {
            setUser(result)
            console.log(result.messege);
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    if (loading) return (
        <Loader/>
    )

    if (!user) {
        return (
            <div className="text-center">
                <p className="text-lg font-semibold mb-4">Please sign in to view your profile.</p>
                <Link href="/components/signin">
                    <div className="text-blue-600 hover:underline">Sign in</div>
                </Link>
            </div>
        );
    }


    return (

        <div id="container" className="my-16">

            <div id="container" className=" lg:p-24 xl:p-20 w-auto flex items-center justify-center flex-col md:flex-row px-4 sm:px-8 md:px-24 lg:px-24 xl:px-24 relative">
                <div className="w-full flex items-center justify-center gap-8">

                    <div className="">
                        <img
                            className="rounded-lg w-full h-auto md:w-auto md:h-auto"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRElsLVGzfjhqQ6HJUk6z2Jb-mn53Hk5avIkyxWYgRgHA&s"
                            alt="image of myself"
                        />
                    </div>



                    <div id="social" className="flex flex-col items-center gap-4">
                        <a rel="noopener" target="_blank" href="https://github.com/iam-aydin" className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white">
                            <span>{user?.name}</span>
                        </a>
                        <a rel="noopener" target="_blank" href="https://www.linkedin.com/in/aydin-vesali-moghaddam-82a860275/" className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white">
                            <span>{user?.email}</span>
                        </a>
                        <a rel="noopener" target="_blank" href="https://twitter.com/ichbinaydin" className="bg-gray-800 rounded-lg p-5 w-64 flex items-center gap-2 text-white">
                            <span>{user?.phone}</span>
                        </a>
                    </div>


                </div>
            </div>
            <div className="btn my-2 flex items-center justify-center">
                <div className="w-1/4">
                    <Logout />
                </div>
            </div>
        </div>


    );
};

export default UserProfile;
