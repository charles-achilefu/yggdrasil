import { FC, useMemo, useState } from 'react'
import ConnectModal from './ConnectModal'

const Wallet: FC = () => {
  const [isConnectModalOpen, setisConnectModalOpen] = useState(false)

  const isConnected = useMemo(() => {
    // TODO check if wallet is connected
    return true
  }, [])

  const openModal = () => setisConnectModalOpen(true)
  const closeModal = () => setisConnectModalOpen(false)

  return (
    <>
      {isConnected ? (
        <button
          className="flex items-center justify-center font-bold text-gray3 w-1/6 bg-smoothgreen border-2 border-gray2 rounded-20 h-16 py-1"
          onClick={openModal}
        >
          Connect
        </button>
      ) : (
        <button
          className="flex items-center justify-center font-bold text-gray3 w-1/6 bg-smoothgreen border-2 border-gray2 rounded-20 h-16 py-1"
          onClick={openModal}
        >
          Connect
        </button>
      )}
      {isConnectModalOpen && <ConnectModal closeModal={closeModal} />}
    </>
  )
}

export default Wallet
