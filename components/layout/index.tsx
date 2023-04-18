import { FC, ReactNode } from 'react'
import Header from './header'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex bg-gray2 justify-center w-screen h-screen">
      <Header />
      <div className="flex-col container mx-auto px-4 sm:px-6 md:px-8">{children}</div>
    </div>
  )
}

export default Layout
