import Modal from '@/components/common/PopupModal'
import { WalletsProviders } from '@/services/wallets'
import { Wallet } from '@/types/wallet'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  closeModal: () => void
}

const ConnectModal: FC<Props> = ({ closeModal }) => {
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
      // TODO ADD YOUR OWN PHRASE TO TEST CONNECT
      const phrase = ''
      await selectedWallet.connect(dispatch, phrase)
      closeModal()
    } catch (_err) {
      // TODO check error message
      closeModal()
    }

    return Promise.resolve()
  }

  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Connect Wallet</h2>
          <Image
            className="cursor-pointer"
            src="/icons/close.svg"
            alt="close-icon"
            width="24"
            height="24"
            onClick={closeModal}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="appearance-none checked:bg-smoothgreen checked:border-transparent h-5 w-5 border border-smoothgreen rounded-md focus:outline-none focus:ring-1 focus:ring-smoothgreen focus:ring-opacity-50"
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
        <div className="grid grid-cols-4 gap-2">
          {WalletsProviders().map((wallet, index) => {
            return (
              <div
                className={`flex flex-col justify-center items-center gap-4 cursor-pointer h-28 bg-transparent border border-borderUnselected hover:border-borderSelected hover:scale-105 transition-all duration-300 ease-in-out rounded-20 font-medium text-sm ${
                  selectedWallet?.name === wallet.name
                    ? 'border-borderSelected scale-105'
                    : selectedWallet && selectedWallet.name !== wallet.name
                    ? 'opacity-25'
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
      </div>
    </Modal>
  )
}

export default ConnectModal
