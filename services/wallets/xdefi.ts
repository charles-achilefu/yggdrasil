import { iToken } from '@/types/token'
import { Chain, Chains, WalletClass, walletAddresses } from '@/types/wallet'
import { synthAssetName } from '@/utils/format'
import { getXdefiNetworkPrimitive } from '@/utils/network'
import { generateError, generateSuccess, isError } from '@/utils/notification'
import { assetFromString } from '@xchainjs/xchain-util'
import { ethers } from 'ethers'

export class XDEFIClass implements WalletClass {
  static icon: string = '/wallets/xdefi.svg'
  address: walletAddresses = {}
  xfiObject: any

  isXDEFI() {
    return 'xfi' in window
  }

  constructor() {
    if (!this.isXDEFI()) return

    this.xfiObject = window.xfi
  }

  canConnect() {
    if (!this.isXDEFI)
      return generateError(
        'XDEFI was not detected! Please install the extension.'
      )

    if (window.xfi.bitcoin?.network !== 'mainnet')
      return generateError('Change your XDEFI network to Mainnet.')

    return generateSuccess(
      'All checks passed, ready to connect with your XDEFI wallet.'
    )
  }

  async getChainAddress(chain: string, chainName: Chains) {
    return new Promise((resolve, reject) => {
      this.xfiObject[chain].request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err: any, accounts: any) => {
          if (err) {
            return reject(err)
          }
          this.address[chainName] = accounts[0]
          return resolve(true)
        }
      )
    })
  }

  async getEvmChainAddress(chainName: Chains[]) {
    try {
      const provider = new ethers.providers.Web3Provider(window.xfi.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      chainName.forEach((chain) => (this.address[chain] = address))
      return generateSuccess('XDEFI wallet has been connected!')
    } catch (e) {
      return generateError('User request connect rejected, Try again!')
    }
  }

  async connect() {
    const notification = await this.getEvmChainAddress([
      Chain.Ethereum,
      Chain.Avalanche,
    ])

    if (isError(notification)) return notification

    await this.getChainAddress('binance', Chain.BNB)
    await this.getChainAddress('thorchain', Chain.THORChain)
    await this.getChainAddress('bitcoin', Chain.Bitcoin)
    await this.getChainAddress('bitcoincash', Chain.BitcoinCash)
    await this.getChainAddress('litecoin', Chain.Litecoin)
    await this.getChainAddress('dogecoin', Chain.Dogecoin)
    // await this.getChainAddress('cosmos', Chain.Cosmos)

    return notification
  }

  async send(
    from: iToken,
    recipient: string | undefined,
    amount: number,
    memo = '',
    type: 'deposit' | 'transfer' = 'transfer'
  ) {
    const asset = assetFromString(synthAssetName(from.fullAsset))

    if (!asset)
      return generateError('Asset not found. Please contact a developer.')

    const network = getXdefiNetworkPrimitive(from.chain.toLowerCase())

    const tx = new Promise((resolve) => {
      window.xfi[network].request(
        { method: 'request_accounts', params: [] },
        (error: any, address: string[]) => {
          if (error) return generateError('Failed to get your wallet address!')

          window.xfi[network].request(
            {
              method: type,
              params: [
                {
                  asset: asset,
                  from: address[0],
                  recipient: recipient,
                  amount: {
                    amount: (Number(amount) * 10 ** from.decimals).toFixed(0),
                    decimals: from.decimals,
                  },
                  memo,
                },
              ],
            },
            (error: any, tx: string) => {
              if (error)
                return generateError('Failed to send tokens. Please try again.')

              resolve(tx)
            }
          )
        }
      )
    })

    return (await tx) as string
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
