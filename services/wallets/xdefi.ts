import { Chain, Chains, WalletClass, walletAddresses } from '@/types/wallet'
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
    const provider = new ethers.providers.Web3Provider(window.xfi.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    chainName.forEach((chain) => (this.address[chain] = address))
  }

  async connect() {
    await this.getEvmChainAddress([Chain.Ethereum, Chain.Avalanche])

    await this.getChainAddress('binance', Chain.BNB)
    await this.getChainAddress('thorchain', Chain.THORChain)
    await this.getChainAddress('bitcoin', Chain.Bitcoin)
    await this.getChainAddress('bitcoincash', Chain.BitcoinCash)
    await this.getChainAddress('litecoin', Chain.Litecoin)
    await this.getChainAddress('dogecoin', Chain.Dogecoin)
    // await this.getChainAddress('cosmos', Chain.Cosmos)
    return true
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
