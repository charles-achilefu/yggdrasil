import Image from 'next/image'
import { FC } from 'react'
import NavigationItem from './NavigationItem'

const Header: FC = () => {
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <div className="flex items-center gap-8 w-2/3 bg-gray1 border-2 border-gray2 rounded-20 h-16 pl-14 py-1">
        <Image
          src="/logo/header.svg"
          alt="header-logo"
          width="32"
          height="32"
        />
        <div className="flex gap-5">
          <NavigationItem link={'Trade'} />
          <NavigationItem link={'Earn'} />
          <NavigationItem link={'THORFi'} />
          <NavigationItem link={'Liquidity'} />
          <NavigationItem link={'THORName'} />
          <NavigationItem link={'Dashboard'} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 w-1/6 bg-gray1 border-2 border-gray2 rounded-20 h-16 py-1">
        <p className="text-sm text-white90">RUNE/USD</p>
        <p className="text-sm text-softgreen">$12.83</p>
        <Image src="/icons/up.svg" alt="up-icon" width="18" height="18" />
      </div>
      <div className="flex items-center w-1/6 bg-gray1 border-2 border-gray2 rounded-20 h-16 py-1"></div>
    </div>
  )
}

export default Header
