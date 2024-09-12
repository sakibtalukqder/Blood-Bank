
import Link from 'next/link';
import Logout from './Logout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth/auth';

const Navbar = async() => {

    const session = await getServerSession(authOptions);

    const user = session?.user



    const menu = <>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/doner/list'}>Doners</Link></li>
        <li><Link href={'/components/about'}>AboutUs</Link></li>
        <li><Link href={'/components/about'}>Contract</Link></li>

        {
            ((user?.role == "CONTRIBUTOR") || (user?.role == "ADMIN")) ? (
                <li className='bg-green-500 rounded-lg'>
                    <details className='w-full'>
                        <summary>Approval {'  '}</summary>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link className='text-green-500 underline' href={'/doner/approval'}>Donner</Link></li>
                            {
                                (user?.role == "ADMIN") ? 
                                <li className='w-full text-blue-500 underline' ><Link href={'/admin'}>Admin Options</Link></li> : ''
                            }
                        </ul>
                    </details>
                </li>
            ) : ''
        }

    </>


    const userIcon = <>

        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRElsLVGzfjhqQ6HJUk6z2Jb-mn53Hk5avIkyxWYgRgHA&s" />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <Link href={'/components/UserProfile'} className="justify-between">
                        Profile
                    </Link>
                </li>
                <li><Link href={`/doner/register/${user?.id}`}>My Donation Status</Link></li>
                <li><Logout/></li>
            </ul>
        </div>

    </>

    const authenTication = <>
        <ul className="menu menu-horizontal px-1 text-blue-800 underline">
            <li><Link href={'/components/login'}>Login</Link></li>
            <li><Link href={'/components/signup'}>Signup</Link></li>
        </ul>

    </>

    return (
        <div className="navbar bg-base-100 md:my-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold">Life<span className='text-red-600 -mx-2 text-2xl px-0'>S</span>tream</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        {userIcon}
                    </> : <>
                        {authenTication}
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;