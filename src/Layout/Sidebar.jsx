//import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from '../assets/Images/shortlogo.jpeg'

import contact from '../assets/Images/contacts.png'
import { AiOutlineLogout } from "react-icons/ai"
import project from '../assets/Images/project.png'
import { toast } from "react-toastify"


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handlelogout = () => {
        localStorage.clear();
        navigate('/login')
        toast.success("Logout Successfully!")
    }
    return (
        <>

            <div className="w-full  h-[100%] overflow-x-hidden overflow-y-au
            to relative bg-gradient-to-r from-[#2b0a0a] via-[#4a0909] to-[#2b0a0a]">
                <div className="w-full flex justify-center py-2 bg-[#faf7f2]">
                    <img src={logo} alt="Logo" className="h-15 rounded-md" />
                </div>

                <ul className="*:py-1 px-3 *:text-sm *:font-light *:text-primary">
                    <li>
                        <Link to={'/contact'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/contact" ? "text-secondary" : ""}`}>
                                    <img src={contact} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/' ? "text-secondary" : "text-white"}`}>
                                    Contact
                                </div>
                            </div>
                        </Link>
                    </li>
                      <li>
                        <Link to={'/project'} className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center">
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/projectcontact-enquiry" ? "text-secondary" : ""}`}>
                                    <img src={project} className="h-[30px]" />

                                </div>
                                <div className={` font-[500] text-[16px] ${location.pathname === '/project' ? "text-secondary" : "text-white"}`}>
                                    Projects
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link className='w-full  py-2  text-start block  text-white'>
                            <div className="w-full flex gap-2 items-center" onClick={handlelogout}>
                                <div className={`h-[40px] w-[40px] flex justify-center items-center ${location.pathname === "/" ? "text-secondary" : ""}`}>
                                    <AiOutlineLogout className="text-light text-2xl  " />

                                </div>
                                <div className={` font-[500]  text-[16px] ${location.pathname === '/' ? "text-secondary" : "text-white"}`}>
                                    Logout
                                </div>
                            </div>
                        </Link>
                    </li>










                </ul>
            </div>
        </>
    )
}

export default Sidebar