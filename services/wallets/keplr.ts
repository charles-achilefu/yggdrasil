import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'

export class KelprClass implements WalletClass {
  static icon: string = '/wallets/keplr.svg'
  address: walletAddresses = {}

  constructor() {}

  canConnect() {
    if (!window.keplr)
      return generateError(
        'Keplr wallet is not installed, please install it first and try again!'
      )

    return generateSuccess(
      'All checks passed, ready to connect with your Keplr wallet.'
    )
  }

  async connect() {
    try {
      const chainId = 'cosmoshub-4'
      await window.keplr.enable(chainId)

      const offlineSigner = window.keplr.getOfflineSigner(chainId)
      const accounts = await offlineSigner.getAccounts()

      this.address['gaia'] = accounts[0].address
      return generateSuccess('Keplr wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
