import PopupModal from '@/components/common/PopupModal'
import { WalletsProviders } from '@/services/wallets'
import { Wallet } from '@/types/wallet'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  openKeystoreMenuModal: (bool: boolean) => void
  setKeystoreWallet: (wallet: Wallet) => void
  openLedgerModal: (bool: boolean) => void
  setLedgerWallet: (wallet: Wallet) => void

  closeModal: () => void
}

const ConnectModal: FC<Props> = ({
  openKeystoreMenuModal,
  setKeystoreWallet,
  openLedgerModal,
  setLedgerWallet,
  closeModal,
}) => {
  const dispatch = useDispatch()

  const [isChecked, setIsChecked] = useState(false)

  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>()

  const canConnect = useMemo(() => {
    if (isChecked && selectedWallet) return true
    return false
  }, [isChecked, selectedWallet])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setIsChecked(event.target.checked)

  const connect = async () => {
    if (!canConnect || !selectedWallet) return

    try {
      // TODO: CHECK SUCCESS MESSAGE
      if (selectedWallet.name.toLowerCase() === 'keystore') {
        openKeystoreMenuModal(true)
        setKeystoreWallet(selectedWallet)
      } else if (selectedWallet.name.toLowerCase() === 'ledger') {
        openLedgerModal(true)
        setLedgerWallet(selectedWallet)
      } else await selectedWallet.connect(dispatch)
      closeModal()
    } catch (_err) {
      // TODO: CHECK ERROR MESSAGE
      closeModal()
    }

    return Promise.resolve()
  }

  return (
    <PopupModal title={'Connect Wallet'} size={'large'} onClose={closeModal}>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="appearance-none checked:bg-smoothgreen checked:border-transparent h-5 w-5 border border-smoothgreen rounded-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-smoothgreen focus:ring-opacity-50"
        />

        <label>
          I have read and accept the{' '}
          <a
            href="https://docs.lends.so/extras/terms-of-service"
            target="_blank"
            className="text-softgreen"
          >
            Disclaimers and Disclosures
          </a>
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-3 sm:grid-cols-2  sm:overflow-auto sm:h-52">
        {WalletsProviders().map((wallet, index) => {
          return (
            <div
              className={`flex flex-col justify-center items-center gap-4 cursor-pointer h-28 bg-transparent border border-borderUnselected hover:border-borderSelected hover:scale-105 transition-all duration-300 ease-in-out rounded-20 font-medium text-sm ${
                selectedWallet?.name === wallet.name
                  ? 'border-borderSelected scale-105 transition-all duration-300'
                  : selectedWallet && selectedWallet.name !== wallet.name
                  ? 'opacity-25 transition-all duration-300'
                  : ''
              }`}
              key={index}
              onClick={() => setSelectedWallet(wallet)}
            >
              <Image
                className="cursor-pointer"
                src={`${wallet.icon}`}
                alt="close-icon"
                width="32"
                height="32"
              />
              <p className="font-normal">{wallet.name}</p>
            </div>
          )
        })}
      </div>
      <button
        className={`flex items-center justify-center font-bold text-gray3 h-14 rounded-20 bg-smoothgreen ${
          !canConnect && 'opacity-25 cursor-default'
        } transition-opacity duration-300`}
        onClick={connect}
      >
        Connect
      </button>
    </PopupModal>
  )
}

export default ConnectModal
