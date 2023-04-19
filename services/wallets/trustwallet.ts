import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'

export class TrustwalletClass implements WalletClass {
  static icon: string = '/wallets/trustwallet.svg'
  address: walletAddresses = {}

  async getTrustWalletInjectedProvider() {
    const provider = this.getTrustWalletFromWindow()

    if (provider) {
      return provider
    }

    return this.listenForTrustWalletInitialized()
  }

  async listenForTrustWalletInitialized() {
    return new Promise((resolve) => {
      const handleInitialization = () => {
        resolve(this.getTrustWalletFromWindow())
      }

      window.addEventListener('trustwallet#initialized', handleInitialization, {
        once: true,
      })

      setTimeout(() => {
        ;(window as any).removeEventListener(
          'trustwallet#initialized',
          handleInitialization,
          { once: true }
        )
        resolve(null)
      })
    })
  }

  getTrustWalletFromWindow() {
    const isTrustWallet = (ethereum: { isTrust: any }) => {
      // Identify if Trust Wallet injected provider is present.
      const trustWallet = ethereum.isTrust

      return trustWallet
    }

    const injectedProviderExist =
      typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

    // No injected providers exist.
    if (!injectedProviderExist) {
      return null
    }

    // Trust Wallet was injected into window.ethereum.
    if (isTrustWallet(window.ethereum as any)) {
      return window.ethereum
    }

    // Trust Wallet provider might be replaced by another
    // injected provider, check the providers array.
    if ((window.ethereum as any).providers) {
      // ethereum.providers array is a non-standard way to
      // preserve multiple injected providers. Eventually, EIP-5749
      // will become a living standard and we will have to update this.
      return (window.ethereum as any).providers.find(isTrustWallet) ?? null
    }

    // Trust Wallet injected provider is available in the global scope.
    // There are cases that some cases injected providers can replace window.ethereum
    // without updating the ethereum.providers array. To prevent issues where
    // the TW connector does not recognize the provider when TW extension is installed,
    // we begin our checks by relying on TW's global object.
    return (window as any)['trustwallet'] ?? null
  }

  constructor() {}

  canConnect() {
    return generateSuccess(
      'All checks passed, ready to connect with your Trust wallet.'
    )
  }

  async connect() {
    try {
      const injectedProvider = await this.getTrustWalletInjectedProvider()
      if (!injectedProvider)
        return generateError('Please install the Trust Wallet extension.')

      const accounts = await injectedProvider.request({
        method: 'eth_requestAccounts',
      })

      this.address['eth'] = accounts[0]
      this.address['avax'] = accounts[0]

      return generateSuccess('Trust wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
