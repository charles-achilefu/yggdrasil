import Dropdown from '@/components/common/Dropdown'
import { store } from '@/redux/store'
import {
  Chains,
  ConnectionWallets,
  Wallet,
  walletAddresses,
} from '@/types/wallet'
import { formatAddress } from '@/utils/format'
import Image from 'next/image'
import { FC, useEffect, useMemo, useState } from 'react'
import ConnectModal from './ConnectModal'
import KeystoreDialogMenu from './keystore'
import ConnectLedger from './ledger'

const Wallet: FC = () => {
  const [walletAddress, setWalletAddress] = useState<
    walletAddresses | undefined
  >()
  const [walletType, setWalletType] = useState<ConnectionWallets | undefined>()

  const [keystoreWallet, setKeystoreWallet] = useState<Wallet | undefined>()
  const [ledgerWallet, setLedgerWallet] = useState<Wallet | undefined>()

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [isKeystoreModalOpen, setIsKeystoreModalOpen] = useState(false)
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false)

  const [currentAddress, setCurrentAddress] = useState('')
  const [, setCurrIndex] = useState(0)
  const [addressChain, setAddressChain] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isConnected = useMemo(() => {
    return walletAddress && walletType
  }, [walletAddress, walletType])

  useEffect(() => {
    return store.subscribe(updateState)
  }, [])

  useEffect(() => {
    if (walletAddress && Object.keys(walletAddress).length > 0) {
      nextAddress()

      const interval = setInterval(() => {
        nextAddress()
      }, 3000)
      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress])

  const toggleIsConnectModal = () => setIsConnectModalOpen(!isConnectModalOpen)
  const toggleKeystoreMenuModal = () =>
    setIsKeystoreModalOpen(!isKeystoreModalOpen)
  const toggleLedgerModal = () => setIsLedgerModalOpen(!isLedgerModalOpen)

  const updateState = () => {
    setWalletAddress(store.getState().wallet.address)
    setWalletType(store.getState().wallet.type)
  }

  const nextAddress = () => {
    if (!walletAddress) return
    setCurrIndex((prev) => {
      const keys = Object.keys(walletAddress)
      setCurrentAddress(walletAddress[keys[prev % keys.length] as Chains] ?? '')
      setAddressChain(keys[prev % keys.length])

      return prev + 1
    })
  }

  return (
    <>
      {isConnected ? (
        <div
          className="relative w-1/6 bg-gray1 border-2 border-gray2 rounded-20  cursor-pointer md:w-1/3 sm:w-1/2"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="flex items-center justify-center gap-3 h-16 py-1">
            <div className="relative">
              <Image
                src={`/wallets/${walletType}.svg`}
                alt={`${walletType}-wallet`}
                width="20"
                height="20"
              />
              <Image
                className="absolute"
                style={{ right: '-4px', bottom: '-4px' }}
                src={`/tokens/${addressChain}.svg`}
                alt={`${addressChain}-token`}
                width="12"
                height="12"
              />
            </div>
            <p>{formatAddress(currentAddress)}</p>
            <Image
              className={`transition-all duration-500 ${
                isDropdownOpen ? '-rotate-180' : 'rotate-0'
              }`}
              src="/icons/dropdown.svg"
              alt="dropdown-icon"
              width="18"
              height="18"
            />
          </div>
          <Dropdown isDropdownOpen={isDropdownOpen}>
            <div>
              <div>
                <p>Addresses</p>
              </div>
              <div>
                <p>Disconnect</p>
              </div>
            </div>
          </Dropdown>
        </div>
      ) : (
        <button
          className="flex items-center justify-center font-bold text-gray3 w-1/6 bg-smoothgreen border-2 border-gray2 rounded-20 h-16 py-1 md:w-1/3 sm:w-1/2"
          onClick={toggleIsConnectModal}
        >
          Connect
        </button>
      )}
      {isConnectModalOpen && (
        <ConnectModal
          openKeystoreMenuModal={toggleKeystoreMenuModal}
          setKeystoreWallet={setKeystoreWallet}
          openLedgerModal={toggleLedgerModal}
          setLedgerWallet={setLedgerWallet}
          closeModal={toggleIsConnectModal}
        />
      )}
      {isKeystoreModalOpen && keystoreWallet && (
        <KeystoreDialogMenu
          keystoreWallet={keystoreWallet}
          closeKeystoreMenuModal={toggleKeystoreMenuModal}
        />
      )}
      {isLedgerModalOpen && ledgerWallet && (
        <ConnectLedger
          ledgerWallet={ledgerWallet}
          closeLedgerModal={toggleLedgerModal}
        />
      )}
    </>
  )
}

export default Wallet
