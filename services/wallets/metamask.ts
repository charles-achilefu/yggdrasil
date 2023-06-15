import { CHAIN_IDS } from '@/constants'
import { iNotification } from '@/types/notification'
import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'
import { ethers } from 'ethers'

export class MetamaskClass implements WalletClass {
  static icon: string = '/wallets/metamask.svg'
  address: walletAddresses = {}
  windowProvider = window.ethereum as any

  constructor() {
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
  }

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

  async changeChain(
    chain: string
  ) {
    const chainId = CHAIN_IDS[chain as keyof typeof CHAIN_IDS]
    const provider = new ethers.providers.Web3Provider(this.windowProvider)
    const currentChain = (await provider.getNetwork()).chainId

    if (currentChain === chainId) return undefined

    try {
      await this.windowProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethers.utils.hexlify(chainId) }],
      })
    } catch (e) {
      console.error('Failed to switch networks!', e)
      return generateError('Failed to switch networks! Please try again.')
    }
  }

  async send(
    amount: number,
    decimals: number,
    destination: string,
    chain: string
  ) {
    await this.changeChain(chain)

    const provider = new ethers.providers.Web3Provider(this.windowProvider)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    const value = (amount * 10 ** decimals).toString()

    // TODO: CHECK IF TOKEN IS ERC20 TO APPRIVE

    try {
      const transaction = await signer.sendTransaction({
        from: address,
        to: destination,
        value: value,
      })

      return transaction.hash
    } catch (e) {
      return generateError(
        'Unable to send asset on Metamask. Please try again!'
      )
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
