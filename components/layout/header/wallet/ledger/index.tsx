import PopupModal from '@/components/common/PopupModal'
import { Wallet } from '@/types/wallet'
import Image from 'next/image'
import { FC, useMemo } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  ledgerWallet: Wallet
  closeLedgerModal: () => void
}

const ConnectLedger: FC<Props> = ({ ledgerWallet, closeLedgerModal }) => {
  const dispatch = useDispatch()

  const canConnect = useMemo(() => {
    return true
  }, [])

  const connect = () => {
    ledgerWallet.connect(dispatch)
  }

  return (
    <PopupModal size={'medium'} onClose={closeLedgerModal}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Select Ledger Path</h2>
          <Image
            className="cursor-pointer"
            src="/icons/close.svg"
            alt="close-icon"
            width="24"
            height="24"
            onClick={closeLedgerModal}
          />
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
    </PopupModal>
  )
}

export default ConnectLedger
