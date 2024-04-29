import Link from 'next/link';
import React from 'react';

const image1 = 'https://static.vecteezy.com/system/resources/thumbnails/008/190/897/small_2x/human-blood-donate-on-white-background-free-vector.jpg'

const page = () => {
  return (

    <div className="hero md:py-24 bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={image1}
          className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">Donate Blood, Save Lives</h2>
            <p className="text-lg text-gray-600 mb-8">Your donation can make a difference.</p>
            <Link href={'/doner/register'} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;