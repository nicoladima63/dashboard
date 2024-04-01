import React from 'react'
import {
BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
from 'react-icons/bs'
import {  Link } from "react-router-dom";


function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsCart3 className='icon_header' /> SHOP
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to="/pages/dashboard">
                        <BsGrid1X2Fill className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/pages/compiti">
                        <BsFillArchiveFill className='icon' /> Compiti
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/pages/lavorazioni">
                        <BsFillGrid3X3GapFill className='icon' /> Lavorazioni
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/pages/fornitori`}>
                        <BsMenuButtonWideFill className='icon' /> Fornitori
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/pages/utenti`}>
                        <BsListCheck className='icon' /> Utenti
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/pages/grid`}>
                        <BsMenuButtonWideFill className='icon' /> Grid
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/pages/fasi`}>
                        <BsMenuButtonWideFill className='icon' /> Fasi
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar