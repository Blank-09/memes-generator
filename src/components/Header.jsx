import React from "react";

export default function Header() {
    return (
        <nav className="navbar sticky-top bg-white shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img 
                        src="/memes.png" 
                        className="me-3"
                        style={{ width: '45px', height: '45px' }}
                    />
                    Memes Generator
                </a>
            </div>
        </nav>
    )
}