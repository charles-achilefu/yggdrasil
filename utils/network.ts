const networkSwitch = (network: string) => {
  switch (network) {
    case 'eth':
      return 'ethereum'
    case 'avax':
      return 'avalanche'
    case 'thor':
      return 'thorchain'
    case 'bnb':
      return 'binance'
    case 'doge':
      return 'dogecoin'
    case 'btc':
      return 'bitcoin'
    case 'ltc':
      return 'litecoin'
    case 'bch':
      return 'bitcoincash'
    default:
      return ''
  }
}

export const getXdefiNetworkPrimitive = (network: string) =>
  networkSwitch(network)
