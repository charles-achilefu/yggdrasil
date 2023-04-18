import { WalletClass, walletAddresses } from '@/types/wallet'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

export class WalletconnectClass implements WalletClass {
  static icon: string = '/wallets/walletconnect.svg'
  address: walletAddresses = {}
  connector: WalletConnect

  constructor() {
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal: QRCodeModal,
    })

    this.connector = connector
  }

  async connect() {
    try {
      if (!this.connector.connected) {
        // Create a dialogue
        await this.connector.createSession()
      }

      // Subscribe to connection events
      this.connector.on(
        'connect',
        (
          error: any,
          payload: { params: { accounts: any; chainId: any }[] }
        ) => {
          if (error) {
            throw error
          }
          // After the connection is successful, the wallet account and chain ID will be returned
          const { accounts, chainId } = payload.params[0]
          this.address['eth'] = accounts[0]
          this.address['avax'] = accounts[0]
        }
      )
    } catch (e) {
      return
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
