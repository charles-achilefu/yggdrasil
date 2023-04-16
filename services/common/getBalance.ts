import { getBalance as getBalanceATOM } from './clients/atom'
import { getBalance as getBalanceAVAX } from './clients/avax'
import { getBalance as getBalanceBCH } from './clients/bch'
import { getBalance as getBalanceBNB } from './clients/bnb'
import { getBalance as getBalanceBTC } from './clients/btc'
import { getBalance as getBalanceDOGE } from './clients/doge'
import { getBalance as getBalanceETH } from './clients/eth'
import { getBalance as getBalanceLTC } from './clients/ltc'
import { getBalance as getBalanceTHOR } from './clients/thorchain'

export const getBalanceFromAddress = async (
  network: string,
  address: string
) => {
  try {
    switch (network) {
      case 'avax':
        return await getBalanceAVAX(address)
      case 'eth':
        return await getBalanceETH(address)
      case 'thor':
        return await getBalanceTHOR(address)
      case 'bnb':
        return await getBalanceBNB(address)
      case 'doge':
        return await getBalanceDOGE(address)
      case 'btc':
        return await getBalanceBTC(address)
      case 'ltc':
        return await getBalanceLTC(address)
      case 'bch':
        return await getBalanceBCH(address)
      case 'gaia':
        return await getBalanceATOM(address)
      default:
        return { status: 'error' }
    }
  } catch (error) {
    console.error(`ERROR: Failed to get balance ${error}`)
  }
}
