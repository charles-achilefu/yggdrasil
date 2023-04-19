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
    <PopupModal
      title={'Keystore Menu'}
      size={'medium'}
      onClose={closeKeystoreMenuModal}
    >
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
    </PopupModal>
  )
}

export default KeystoreMenu
