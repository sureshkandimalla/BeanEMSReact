import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import "./Header.scss";

const Header = () => {
    return (
        <header>
            <nav className='app-header-nav'>
                <div className='left-wrapper'>
                    <span><FaUserTie className="mr-2" /></span>
                    <a href='/employee' className='nav-link'>Employee Management App</a>
                </div>
                {/* <div className='right-wrapper'>
                    <a href='/employees' className='nav-link'><span>Employee</span></a>
                    <a href='/projects' className='nav-link'>Project</a>
                    <a href='/assignments' className='nav-link'>Assignment</a>
                </div> */}

            </nav>
        </header>

    )
}

export default Header
