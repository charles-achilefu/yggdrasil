import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'
import { ethers } from 'ethers'

export class MetamaskClass implements WalletClass {
  static icon: string = '/wallets/metamask.svg'
  address: walletAddresses = {}
  windowProvider = window.ethereum as any

  constructor() {}

  canConnect() {
    if (!window.ethereum)
      return generateError('Please install the Metamask extension.')

    if ((window.ethereum as any).isBraveWallet)
      return generateError(
        'Please change your Brave Browser default Ethereum wallet to none and refresh the page.'
      )

    return generateSuccess(
      'All checks passed, ready to connect with your Metamask wallet.'
    )
  }

  async connect() {
    try {
      if (this.windowProvider.providers?.length) {
        this.windowProvider.providers.some(
          (provider: { isMetaMask: boolean }) => {
            if (provider.isMetaMask) {
              this.windowProvider = provider
              return true
            }
          }
        )
      }

      const provider = new ethers.providers.Web3Provider(this.windowProvider)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      this.address['eth'] = address
      this.address['avax'] = address

      return generateSuccess('Metamask wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
