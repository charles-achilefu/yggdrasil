import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  isDropdownOpen: boolean
}

const Dropdown: FC<Props> = ({ children, isDropdownOpen }) => {
  return (
    <div
      className={`${
        isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } absolute w-full bg-gray1 border-2 border-gray2 rounded-20 pt-2 pb-4 transition-all duration-500`}
    >
      {children}
    </div>
  )
}

export default Dropdown
