import Image from 'next/image'
import { FC, useState } from 'react'
import NavigationItem from './NavigationItem'

const Navigation: FC = () => {
  const [showNavItems, setShowNavItems] = useState(false)

  const toggleNavItems = () => {
    setShowNavItems(!showNavItems)
  }

  return (
    <div className="flex items-center gap-8 w-2/3 bg-gray1 border-2 border-gray2 rounded-20 h-16 pl-14 py-1 sm:w-1/2 md:w-1/3 md:pl-10 sm:pl-8">
      <Image src="/logo/header.svg" alt="header-logo" width="32" height="32" />
      <div className={`flex gap-5 lg:gap-3 lg:text-xs md:hidden sm:hidden`}>
        <NavigationItem link={'Market'} />
        <NavigationItem link={'Trade'} />
        <NavigationItem link={'Earn'} />
        <NavigationItem link={'THORFi'} />
        <NavigationItem link={'Liquidity'} />
        <NavigationItem link={'THORName'} />
        <NavigationItem link={'Dashboard'} />
      </div>
      <button
        className="hidden md:flex sm:flex"
        onClick={toggleNavItems}
        aria-label="Toggle navigation"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div
        className={`flex w-full h-full z-50 ${
          showNavItems ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleNavItems}
      >
        <div
          className={`flex flex-col gap-5 fixed top-0 left-0 w-full h-full bg-black z-50 shadow-lg transform ease-in-out transition-all duration-300 ${
            showNavItems ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex justify-end">
            <button
              className="w-8 h-8 mt-2 mr-2 text-gray-600"
              onClick={toggleNavItems}
              aria-label="Close navigation"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <NavigationItem link={'Market'} />
            <NavigationItem link={'Trade'} />
            <NavigationItem link={'Earn'} />
            <NavigationItem link={'THORFi'} />
            <NavigationItem link={'Liquidity'} />
            <NavigationItem link={'THORName'} />
            <NavigationItem link={'Dashboard'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
