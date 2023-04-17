import { WalletClass, walletAddresses } from '@/types/wallet'
import { ethers } from 'ethers'

export class MetamaskClass implements WalletClass {
  static icon: string = '/wallets/metamask.svg'
  address: walletAddresses = {}

  constructor() {
    if (!window.ethereum) return
    // generateError('Please install the Metamask extension.')

    if (window.xfi && !window.xfi.ethereum.isXDEFI) return
    // generateError('Please unprioritise XDEFI and refresh the page.')
  }

  async connect() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      this.address['eth'] = address
      this.address['avax'] = address
    } catch (e) {
      return
      // generateError('Failed to connect to Metamask!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
