"use client"
import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
    return (
        <button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/components/login`,
        })} className='text-red-500 w-full btn-sm'>Logout</button>
    );
};

export default Logout;