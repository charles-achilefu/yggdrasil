import { atomClientUrls, thorChainIds } from '@/constants/common/ids'
import { WalletClass, walletAddresses } from '@/types/wallet'
import { Client as clientATOM } from '@xchainjs/xchain-cosmos'
// import { client as clientBTC } from './clients/btc'
import { Client as clientDOGE, defaultDogeParams } from '@xchainjs/xchain-doge'
// import { client as clientLTC } from './clients/ltc'
import { iNotification } from '@/types/notification'
import { Client as clientBNB } from '@xchainjs/xchain-binance'
import {
  BlockcypherDataProviders,
  SochainDataProviders,
  Client as clientBTC,
  defaultBTCParams,
} from '@xchainjs/xchain-bitcoin'
import {
  Client as clientBCH,
  defaultBCHParams,
} from '@xchainjs/xchain-bitcoincash'
import { Network, UtxoClientParams } from '@xchainjs/xchain-client'
import { Client as clientETH } from '@xchainjs/xchain-ethereum'
import {
  NodeAuth,
  NodeUrls,
  Client as clientLTC,
  defaultLTCParams,
} from '@xchainjs/xchain-litecoin'
import { Client as clientTHOR } from '@xchainjs/xchain-thorchain'

export class KeystoreClass implements WalletClass {
  static icon: string = '/wallets/keystore.svg'
  address: walletAddresses = {}
  atomClient!: clientATOM
  bchClient!: clientBCH
  bnbClient!: clientBNB
  btcClient!: clientBTC
  dogeClient!: clientDOGE
  ethClient!: clientETH
  ltcClient!: clientLTC
  thorClient!: clientTHOR

  constructor(phrase: string) {
    const initBchParams: UtxoClientParams = {
      ...defaultBCHParams,
      dataProviders: [BlockcypherDataProviders, SochainDataProviders],
      phrase: phrase,
    }

    const initBtcParams: UtxoClientParams = {
      ...defaultBTCParams,
      dataProviders: [BlockcypherDataProviders, SochainDataProviders],
      phrase: phrase,
    }

    const initDogeParams: UtxoClientParams = {
      ...defaultDogeParams,
      dataProviders: [BlockcypherDataProviders, SochainDataProviders],
      phrase: phrase,
    }

    const initLtcParams: UtxoClientParams & {
      nodeUrls: NodeUrls
      nodeAuth?: NodeAuth
    } = {
      ...defaultLTCParams,
      dataProviders: [BlockcypherDataProviders, SochainDataProviders],
      phrase: phrase,
      nodeUrls: {
        [Network.Mainnet]: 'https://litecoin.ninerealms.com',
        [Network.Stagenet]: 'https://litecoin.ninerealms.com',
        [Network.Testnet]: 'https://testnet.ltc.thorchain.info',
      },
    }

    this.atomClient = new clientATOM({ phrase, clientUrls: atomClientUrls })
    this.bchClient = new clientBCH(initBchParams)
    this.bnbClient = new clientBNB({ phrase })
    this.btcClient = new clientBTC(initBtcParams)
    this.dogeClient = new clientDOGE(initDogeParams)
    this.ethClient = new clientETH({ phrase })
    this.ltcClient = new clientLTC(initLtcParams)
    this.thorClient = new clientTHOR({
      phrase,
      chainIds: thorChainIds,
    })
  }

  canConnect(): iNotification {
    throw new Error('Method not implemented.')
  }

  async connect() {
    this.address['gaia'] = this.atomClient.getAddress()
    this.address['bch'] = this.bchClient.getAddress()
    this.address['bnb'] = this.bnbClient.getAddress()
    this.address['btc'] = this.btcClient.getAddress()
    this.address['doge'] = this.dogeClient.getAddress()
    this.address['eth'] = this.ethClient.getAddress()
    this.address['avax'] = this.ethClient.getAddress()
    this.address['ltc'] = this.ltcClient.getAddress()
    this.address['thor'] = this.thorClient.getAddress()
  }

  async disconnect(): Promise<void> {}

  getAddress(): walletAddresses {
    return this.address
  }
}
