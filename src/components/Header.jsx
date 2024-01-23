import React from 'react'

const Header = () => {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <a className="navbar-brand" href='/'>Task Management</a>
                        <a className="btn btn-outline-success" href="/login">Login</a>
            </div>
        </nav>
    )
}

export default Header
