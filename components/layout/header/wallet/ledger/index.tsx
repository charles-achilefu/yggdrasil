import PopupModal from '@/components/common/PopupModal'
import { Wallet } from '@/types/wallet'
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
    <PopupModal
      title={'Select Ledger Path'}
      size={'medium'}
      onClose={closeLedgerModal}
    >
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

export default ConnectLedger
