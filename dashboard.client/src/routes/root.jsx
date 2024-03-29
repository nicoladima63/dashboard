import { useState } from 'react';
import { Outlet, useLoaderData } from "react-router-dom";
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import "../App.css";


export default function Root() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return (

        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className="main-container">
                <Outlet />
            </div>

        </div>


    );
}