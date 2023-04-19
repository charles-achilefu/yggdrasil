import Image from 'next/image'
import { FC, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children: ReactNode
  title: string
  size?: 'small' | 'medium' | 'large'
  onClose: () => void
}

const PopupModal: FC<Props> = ({ children, title, onClose, size }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

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

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 500)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return createPortal(
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center z-50 transition-all duration-500 ${
        isClosing ? 'bg-opacity-0' : 'bg-opacity-50'
      } ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-gray4 rounded-20 shadow-lg transition-all duration-500 ${
          size === 'large'
            ? 'max-w-xl'
            : size === 'medium'
            ? 'max-w-md'
            : size === 'small' && 'max-w-sm'
        } w-full ${isClosing ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
      >
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">{title}</h2>
            <Image
              className="cursor-pointer"
              src="/icons/close.svg"
              alt="close-icon"
              width="24"
              height="24"
              onClick={handleOverlayClick}
            />
          </div>

          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default PopupModal
