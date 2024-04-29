// FloatingButton.js
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const FloatingButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={'/doner/register'}
            className="fixed bottom-8 right-8 flex items-center justify-center cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-blue-500 rounded-full p-3 flex items-center justify-center text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
                {isHovered && <span className="hidden md:block transition-opacity duration-300 ms-2"> Become a donor </span>}
            </div>
        </Link>
    );
};

export default FloatingButton;
