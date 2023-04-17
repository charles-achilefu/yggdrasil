import { FC } from 'react'
import RuneStats from './RuneStats'
import Navigation from './navigation'
import Wallet from './wallet'

const Header: FC = () => {
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <Navigation />
      <RuneStats />
      <Wallet />
    </div>
  )
}

export default Header
