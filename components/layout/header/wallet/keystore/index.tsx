import { Wallet } from '@/types/wallet'
import { FC, useState } from 'react'
import ConnectKeystore from './ConnectKeystore'
import CreateKeystore from './CreateKeystore'
import KeystoreMenu from './KeystoreMenu'

interface Props {
  keystoreWallet: Wallet
  closeKeystoreMenuModal: () => void
}

const KeystoreDialogMenu: FC<Props> = ({
  keystoreWallet,
  closeKeystoreMenuModal,
}) => {
  const [activeComponent, setActiveComponent] = useState<
    'menu' | 'create' | 'connect'
  >('menu')

  const toggleKeystoreMenu = () => setActiveComponent('menu')
  const toggleCreateKeystoreModal = () => setActiveComponent('create')
  const toggleConnectKeystoreModal = () => setActiveComponent('connect')

  return (
    <>
      {activeComponent === 'menu' && (
        <KeystoreMenu
          closeKeystoreMenuModal={closeKeystoreMenuModal}
          toggleCreateKeystoreModal={toggleCreateKeystoreModal}
          toggleConnectKeystoreModal={toggleConnectKeystoreModal}
        />
      )}
      {activeComponent === 'create' && (
        <CreateKeystore
          closeKeystoreMenuModal={closeKeystoreMenuModal}
          toggleKeystoreMenu={toggleKeystoreMenu}
          toggleConnectKeystoreModal={toggleConnectKeystoreModal}
        />
      )}
      {activeComponent === 'connect' && (
        <ConnectKeystore
          keystoreWallet={keystoreWallet}
          closeKeystoreMenuModal={closeKeystoreMenuModal}
          toggleKeystoreMenu={toggleKeystoreMenu}
          toggleCreateKeystoreModal={toggleCreateKeystoreModal}
        />
      )}
    </>
  )
}

export default KeystoreDialogMenu
