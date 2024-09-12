import Link from 'next/link';
import React from 'react';
import './app.css'

const image1 = 'https://static.vecteezy.com/system/resources/thumbnails/008/190/897/small_2x/human-blood-donate-on-white-background-free-vector.jpg';

const imgArray = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2Zzagk-dS5pR_dZS3mCCc2ZO7l6DvAscKQ&usqp=CAU',
  'https://famt.ac.in/wp-content/uploads/2024/06/narendra-750x410.jpg',
  'https://www.ewubd.edu/storage/app/uploads/public/62b/d55/65c/62bd5565c896b786080408.jpg',
  'https://www.ewubd.edu/storage/app/uploads/public/62b/d55/662/62bd5566265e6976021645.jpg',
  'https://www.bracu.ac.bd/sites/default/files/news-image/Blood%20Donation%20Camp%202019.jpg',
  'https://www.aiub.edu/Files/Uploads/original/blooddonationaiubshomoyclub1402202401.jpeg',
]

const Testimonials = [
  {
    "id": 1,
    "name": "Peter Renolds",
    "img": "https://randomuser.me/api/portraits/men/10.jpg",
    "comment": "The fitness apparel I bought here fits perfectly and feels amazing. I highly recommend this store to anyone looking for quality gear.",
  },
  {
    "id": 2,
    "name": "Peter Renolds",
    "img": "https://randomuser.me/api/portraits/men/10.jpg",
    "comment": "The fitness apparel I bought here fits perfectly and feels amazing. I highly recommend this store to anyone looking for quality gear.",
  },
  {
    "id": 3,
    "name": "Peter Renolds",
    "img": "https://randomuser.me/api/portraits/men/10.jpg",
    "comment": "The fitness apparel I bought here fits perfectly and feels amazing. I highly recommend this store to anyone looking for quality gear.",
  },
]

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="hero md:py-24">
        <div className="hero-content flex-col lg:flex-row-reverse   rounded-lg shadow-lg">
          <img
            src={image1}
            alt="Donate Blood"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="p-4 lg:p-8">
            <h2 className="text-4xl font-semibold text-gray-50 mb-4">Donate Blood, Save Lives</h2>
            <p className="text-lg text-gray-600 mb-8">Your donation can make a difference.</p>
            <Link href="/doner/register" className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
              Donate Now
            </Link>
          </div>
        </div>
      </div>

      {/* New Section with Related Images */}
      <div className="py-16  ">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-gray-50 mb-8 text-center">Our Campains</h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {
              imgArray.map((img, ind) => (
                <img
                  key={ind}
                  src={img}
                  alt="Related Image 1"
                  className="w-36 h-36 object-cover rounded-lg shadow-lg"
                />
              ))
            }

          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section id="testimonials" aria-label="What our customers are saying" class=" py-16 mb-8 bg-slate-800 rounded-xl">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl md:text-center">
            <h2 class="font-display text-3xl tracking-tight text-slate-100 sm:text-4xl font-bold">What People Saying About us</h2>
          </div>
          <ul role="list"
            class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3 text-white">

            {
              Testimonials.map((user, index) => (
                <li key={index} className='shadow-lg'>
                  <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8">
                    <li>
                      <figure class="relative rounded-2xl   p-6 shadow-xl shadow-slate-900/10"><svg aria-hidden="true"
                        width="105" height="78" class="absolute left-6 top-6 fill-slate-900">
                        <path
                          d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                        </path>
                      </svg>
                        <blockquote class="relative">
                          <p class="text-lg tracking-tight">{user.comment}</p>
                        </blockquote>
                        <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <div>
                            <div class="font-display text-base">{user.name}</div>
                          </div>
                          <div class="overflow-hidden rounded-full  ">
                            <img alt="" class="h-14 w-14 object-cover transparent-text" src={user.img} />
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </li>
              ))
            }

          </ul>
        </div>
      </section>


    </div>
  );
};

export default Page;
