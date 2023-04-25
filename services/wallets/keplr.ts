import { COSMOS_NODE_RPC_URL } from '@/constants'
import { WalletClass, walletAddresses } from '@/types/wallet'
import { generateError, generateSuccess, isError } from '@/utils/notification'
import { SigningStargateClient } from '@cosmjs/stargate'

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

  async send(amount: number, recipient: string, memo = '') {
    const response = await this.connect()

    if (isError(response) || !this.address.gaia)
      return generateError(
        'Kelpr wallet is not connected. Failed to send tokens!'
      )

    const address = this.address.gaia

    const client = await SigningStargateClient.connectWithSigner(
      COSMOS_NODE_RPC_URL,
      window.keplr.getOfflineSigner('cosmoshub-4')
    )

    const sendAmount = [
      {
        denom: 'uatom',
        amount: Math.floor(amount * 1000000).toString(),
      },
    ]

    const fee = { amount: [{ denom: 'uatom', amount: '5000' }], gas: '200000' }

    try {
      const result = await client.sendTokens(
        address,
        recipient,
        sendAmount,
        fee,
        memo
      )

      if (!result.transactionHash)
        return generateError(
          'Failed to retrieve transaction hash, check your wallet and try again!'
        )

      return result.transactionHash
    } catch (e) {
      return generateError(
        'Failed to send tokens using Kelpr. Please try again!'
      )
    }
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
