import { FC, useState } from 'react'
import ConnectKeystore from './ConnectKeystore'
import CreateKeystore from './CreateKeystore'
import KeystoreMenu from './KeystoreMenu'
import { Wallet } from '@/types/wallet'

interface Props {
  keystoreWallet: Wallet
  closeKeystoreMenuModal: () => void
}

const KeystoreDialogMenu: FC<Props> = ({ keystoreWallet, closeKeystoreMenuModal }) => {
  const [isKeystoreMenu, setIsKeystoreMenu] = useState(true)
  const [isCreateKeystore, setIsCreateKeystore] = useState(false)
  const [isConnectKeystore, setIsConnectKeystore] = useState(false)

  const toggleKeystoreMenu = () => {
    setIsKeystoreMenu(true)
    setIsConnectKeystore(false)
    setIsCreateKeystore(false)
  }

  const toggleCreateKeystoreModal = () => {
    setIsKeystoreMenu(false)
    setIsConnectKeystore(false)
    setIsCreateKeystore(true)
  }

  const toggleConnectKeystoreModal = () => {
    setIsKeystoreMenu(false)
    setIsConnectKeystore(true)
    setIsCreateKeystore(false)
  }

  return (
    <>
      {isKeystoreMenu && (
        <KeystoreMenu
          closeKeystoreMenuModal={closeKeystoreMenuModal}
          toggleCreateKeystoreModal={toggleCreateKeystoreModal}
          toggleConnectKeystoreModal={toggleConnectKeystoreModal}
        />
      )}
      {isCreateKeystore && (
        <CreateKeystore
          closeKeystoreMenuModal={closeKeystoreMenuModal}
          toggleKeystoreMenu={toggleKeystoreMenu}
          toggleConnectKeystoreModal={toggleConnectKeystoreModal}
        />
      )}
      {isConnectKeystore && (
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
