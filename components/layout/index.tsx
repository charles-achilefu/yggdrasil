import { FC, ReactNode } from 'react'
import Toasty from '../common/Toasty'
import Header from './header'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Toasty />

      <div className="bg-gray2 h-screen no-overflow-x no-overflow-y">
        <Header />
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </>
  )
}

export default Layout
