'use client'
import React, { useEffect, useState } from 'react';
import Loader from '@/src/Loader';
import Pagination from '@/src/Pagenation';
import Link from 'next/link';

const BaseUrl = "http://localhost:3000/api"


const page = () => {

    const [doner, setDoner] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/doner`)
            const result = await response.json()

            if (!response.ok) {
                console.log(result.error);
            }

            if (response.ok) {
                setDoner(result)
                console.log(result);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const [currentPage, setCurrectPage] = useState(1);

    const Pagenate = (data, currentPage, pageSize) => {
        const startIndex = (currentPage - 1) * pageSize;
        return data.slice(startIndex, startIndex + pageSize);
    };

    const pageSize = 6;
    const onPageChenge = (page) => {
        setCurrectPage(page)
    }

    const pagenatedUser = Pagenate(doner, currentPage, pageSize)

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className='text-center w-full font-bold text-3xl mt-3 bg-blue-100 p-4'>Applayer List</h1>
            <div className="flex flex-col mt-4">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full text-center text-sm font-light text-surface">
                                <thead
                                    className="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Blood Group</th>
                                        <th scope="col" className="px-6 py-4">Approval Status</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Mobile No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pagenatedUser?.map((doner, index) => (
                                            <tr key={index} className="border-b border-neutral-200">
                                                <td className="whitespace-nowrap px-6 py-4">{doner.id}</td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Link href={`approval/${doner.id}`}>{doner.user.name}</Link>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 font-medium text-red-500">{doner.bloodType}</td>
                                                <td className={`whitespace-nowrap px-6 py-4 font-medium  ${doner.status === "DONNER" ? 'text-green-500' : 'text-red-500'}`}>
                                                    <Link href={`approval/${doner.id}`}>{doner.status}</Link>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">{doner.user.email}</td>
                                                <td className="whitespace-nowrap px-6 py-4">{doner.user.phone}</td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
                Array.isArray(doner) ? <>
                    <Pagination userCount={doner.length} currentPage={currentPage} pageSize={pageSize} onPageChenge={onPageChenge} />
                </> : ""
            }
        </div>
    );
};

export default page;