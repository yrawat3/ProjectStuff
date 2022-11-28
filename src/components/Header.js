import { Link } from "react-router-dom"
import React from 'react';

const Header = () => {
    return (
        <header className="Header">
            <h1>Campus Discovery</h1>
            <nav>
                <ul>
                    <li><Link to="/">View</Link></li>
                    <li><Link to="post">Create</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header