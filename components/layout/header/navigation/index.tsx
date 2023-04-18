import Image from 'next/image';
import { FC } from 'react';
import NavigationItem from './NavigationItem';

const Navigation: FC = () => {
  return (
    <div className="flex items-center gap-8 w-2/3 bg-gray1 border-2 border-gray2 rounded-20 h-16 pl-8 py-1">
      <Image src="/logo/header.svg" alt="header-logo" width="32" height="32" />
      <div className="hidden sm:flex gap-5"> {/* Hide on screens smaller than sm */}
        <NavigationItem link={'Market'} />
        <NavigationItem link={'Trade'} />
        <NavigationItem link={'Earn'} />
        <NavigationItem link={'THORFi'} />
        <NavigationItem link={'Liquidity'} />
        <NavigationItem link={'THORName'} />
        <NavigationItem link={'Dashboard'} />
      </div>
    </div>
  );
};

export default Navigation;
