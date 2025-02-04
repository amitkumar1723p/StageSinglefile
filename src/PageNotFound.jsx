import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    const scrollHorizontal = () => {
        
        console.log("hiii")
        window.scrollBy({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      };
  return (
    <main className="grid min-h-[91vh] place-items-center  bg-white">
    <div className="text-center">
      <p className=" font-semibold text-[var(--main-dark-clr)] text-7xl">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[#333] sm:text-4xl">Page not found</h1>
      <p className="mt-6 text-lg font-medium text-pretty text-[var(--main-dark-clr)] sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink to={"/"} className={"rounded-md bg-[var(--main-dark-clr)] px-3.5 py-2.5 hover:bg-[var(--main-light-clr)] text-sm font-semibold text-white shadow-xs"}>
                Go back to home
            </NavLink>
        {/* <a href="#" >Contact support <span aria-hidden="true">&rarr;</span></a> */}
        <button onClick={scrollHorizontal} className="text-sm font-semibold text-[#333] hover:text-gray-600">Contact Support !</button>
      </div>
    </div>
  </main>
  )
}

export default PageNotFound
