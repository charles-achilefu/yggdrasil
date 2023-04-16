import PopupModal from '@/components/common/PopupModal'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  closeKeystoreMenuModal: () => void
  toggleCreateKeystoreModal: () => void
  toggleConnectKeystoreModal: () => void
}

const KeystoreMenu: FC<Props> = ({
  closeKeystoreMenuModal,
  toggleCreateKeystoreModal,
  toggleConnectKeystoreModal,
}) => {
  return (
    <PopupModal size={'medium'} onClose={closeKeystoreMenuModal}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Keystore Menu</h2>
          <Image
            className="cursor-pointer"
            src="/icons/close.svg"
            alt="close-icon"
            width="24"
            height="24"
            onClick={closeKeystoreMenuModal}
          />
        </div>
        <div
          className="flex items-center justify-center gap-2 h-14 cursor-pointer hover:border-borderSelected border border-borderUnselected rounded-20 transition-all duration-300 ease-in-out"
          onClick={toggleCreateKeystoreModal}
        >
          <Image
            className="cursor-pointer"
            src="/icons/plus.svg"
            alt="plus-icon"
            width="24"
            height="24"
          />
          <p>Create a Keystore</p>
        </div>
        <div
          className="flex items-center justify-center gap-2 h-14 cursor-pointer hover:border-borderSelected border border-borderUnselected rounded-20 transition-all duration-300 ease-in-out"
          onClick={toggleConnectKeystoreModal}
        >
          <Image
            className="cursor-pointer"
            src="/icons/connect.svg"
            alt="connect-icon"
            width="24"
            height="24"
          />
          <p>Connect Keystore</p>
        </div>
      </div>
    </PopupModal>
  )
}

export default KeystoreMenu
