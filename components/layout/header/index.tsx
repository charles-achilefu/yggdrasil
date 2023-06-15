import { FC } from 'react'
import RuneStats from './RuneStats'
import Navigation from './navigation'
import Wallet from './wallet'

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex flex-row items-center py-2 px-2 w-screen z-10 justify-center">
      <Navigation />
      <RuneStats />
      <Wallet />
    </div>
  );
};


export default Header
