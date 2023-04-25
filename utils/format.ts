import { mainnetTokens } from '@/services/tokens/tokens'
import { iToken } from '@/types/token'

export const getFullAssetFromName = (fullAsset: string): iToken | undefined => {
  for (let i = 0; i < mainnetTokens.length; i++) {
    if (mainnetTokens[i].fullAsset.toUpperCase() === fullAsset) {
      return mainnetTokens[i]
    }
  }

  return undefined
}

export const getAllErc20Tokens = (chain: string) => {
  let allErc20Tokens = []

  for (let i = 0; i < mainnetTokens.length; i++) {
    if (
      mainnetTokens[i].chain === chain &&
      mainnetTokens[i].type !== 'NATIVE'
    ) {
      allErc20Tokens.push(mainnetTokens[i])
    }
  }

  return allErc20Tokens
}

export const getContractAddressFromToken = (tokenName: string) => {
  try {
    return tokenName.split('-')[1]
  } catch (_) {
    return ''
  }
}

export const formatAddress = (address: string) => {
  return `${address.toLowerCase().slice(0, 4)}...${address
    .toLowerCase()
    .slice(address.length - 4, address.length)}`
}
