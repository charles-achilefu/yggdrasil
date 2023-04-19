import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess } from '@/utils/notification'
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

  canConnect() {
    return generateSuccess(
      'All checks passed, ready to connect with your WalletConnect wallet.'
    )
  }

  async connect() {
    try {
      if (!this.connector.connected) await this.connector.createSession()

      // Subscribe to connection events
      this.connector.on(
        'connect',
        (
          error: any,
          payload: { params: { accounts: any; chainId: any }[] }
        ) => {
          if (error) {
            return generateError('User request connect rejected, Try again!')
          }
          // After the connection is successful, the wallet account and chain ID will be returned
          const { accounts } = payload.params[0]
          this.address['eth'] = accounts[0]
          this.address['avax'] = accounts[0]

          return generateSuccess('WalletConnect wallet has been connected!')
        }
      )
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
