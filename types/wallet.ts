import { AppDispatch } from "@/redux/store"

export interface WalletClass {
  address: walletAddresses
  connect(): void
  disconnect(): void
  getAddress(): walletAddresses
}

export interface Wallet {
  name: string
  icon: string
  connect: (dispatch: AppDispatch, phrase?: string) => Promise<void>
}

export type ConnectionWallets =
  | 'xdefi'
  | 'keystore'
  | 'ledger'
  | 'metamask'
  | 'kelpr'
  | 'coinbase'
  | 'brave'
  | 'walletconnect'
  | 'trustwallet'

export type Chains =
  | 'avax'
  | 'bnb'
  | 'thor'
  | 'eth'
  | 'btc'
  | 'bch'
  | 'ltc'
  | 'doge'
  | 'gaia'

export enum Chain {
  Avalanche = 'avax',
  BNB = 'bnb',
  THORChain = 'thor',
  Ethereum = 'eth',
  Bitcoin = 'btc',
  BitcoinCash = 'bch',
  Litecoin = 'ltc',
  Dogecoin = 'doge',
  Cosmos = 'gaia',
}

export type walletAddresses = Partial<Record<Chains, string>>
