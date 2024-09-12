import React from 'react';

const api = process.env.NEXT_PUBLIC_URL

const page = () => {
    return (
        <div className='my-12'>
            Test Components <br />
            {api}
        </div>
    );
};

export default page;