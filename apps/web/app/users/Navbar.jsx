'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const navbarLinks=[
        {title:"home",href:'/'},
        {title:"about",href:'/about'},
        {title:"contact",href:'/contact'},
    ]
    const pathname =usePathname()
  return (
    <header className="fixed inset-0 h-16 mb-10 bg-red-600 flex items-center justify-center text-white">
        <nav className="flex gap-5 capitalize">
            {navbarLinks.map((item,index)=>(

             <Link className={`${pathname ==item.href?'active':''}`} key={index} href={item.href}>{item.title}</Link> 
            ))}
        </nav>
      </header>
  )
}

export default Navbar
