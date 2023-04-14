import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
  onClose: () => void
}

const PopupModal: FC<Props> = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    setIsOpen(true)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div className="bg-gray4 rounded-20 shadow-lg  transition-all duration-300 max-w-xl w-full">
        {children}
      </div>
    </div>,
    document.body
  )
}

export default PopupModal
