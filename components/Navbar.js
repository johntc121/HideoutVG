import Link from 'next/link'
import React from 'react'

export default function Navbar({ children }) {
  return (
    <div className="navbar">
        <div className="page-title">
                <Link href="/">
                <a>
                    <h1>
                    <span className="title-main">Hideout<span className="title-sub">VG</span></span>
                    </h1>
                </a>
                </Link>
            </div>
            <div className="nav-links">
                <Link href="/reviews">
                <a className="nav-link">Reviews</a>
                </Link>
                <Link href="/news">
                <a className="nav-link">News</a>
                </Link>
                <Link href="/about">
                <a className="nav-link">About</a>
                </Link>
            </div>
    </div>
  )
}


