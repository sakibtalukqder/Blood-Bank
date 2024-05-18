'use client'
import React, { useEffect, useState } from 'react';
import Loader from '@/src/Loader';
import Pagination from '@/src/Pagenation';
import Link from 'next/link';

const BaseUrl = "http://localhost:3000/api"


const page = () => {

    const [doner, setDoner] = useState([])
    const [loading, setLoading] = useState(true)

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

    const getData = async () => {
        try {
            const response = await fetch(`${BaseUrl}/doner/approved`)
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


    const [area, setArea] = useState();
    const [bloodType, setBloodType] = useState();

    console.log(area, bloodType);


    const Search = async () => {
        if (area != '' || bloodType != '') {
            try {

                const response = await fetch(`${BaseUrl}/doner/search?Area=${area}&bloodType=${bloodType}`)
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

    }


    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className='text-center w-full font-bold text-3xl mt-3 bg-blue-100 p-4'>Doner List</h1>
            <div className="flex flex-col mt-4">


                <div className='flex items-center justify-center gap-4 w-full'>

                    <label className="input input-bordered flex items-center gap-2 w-3/4">
                        <input
                            onChange={(e) => setArea(e.target.value)}
                            type="text" className="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>


                    <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setBloodType(e.target.value)}
                    >
                        <option value="">
                            Select Blood Group
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>

                    <button onClick={Search} className='btn'>Search</button>


                </div>


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
                                        <th scope="col" className="px-6 py-4">Last Donate at</th>
                                        <th scope="col" className="px-6 py-4">Area</th>
                                        <th scope="col" className="px-6 py-4">Mobile No</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pagenatedUser.length === 0 ? <h1 className=' text-orange-500 underline mt-16 font-bold text-center w-full text-2xl'>
                                            No donner Available righr now</h1> :
                                            pagenatedUser?.map((doner, index) => (
                                                <tr key={index} className="border-b border-neutral-200">
                                                    <td className="whitespace-nowrap px-6 py-4">{doner.id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <Link href={`list/${doner.id}`}>{doner.user.name}</Link></td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium text-red-500">{doner.bloodType}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 font-medium ">{doner.lastDonate}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{doner.Area}</td>
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
        </div >
    );
};

export default page;