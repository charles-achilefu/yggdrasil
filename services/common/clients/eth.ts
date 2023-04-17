import { ETH_RPC } from '@/constants'
import erc20 from '@/constants/abi/erc20.json'
import {
  getAllErc20Tokens,
  getContractAddressFromToken,
  getFullAssetFromName,
} from '@/utils/format'
import { ethers } from 'ethers'

const getErc20Balance = (chain: string, address: string, provider: any) => {
  const tokens = getAllErc20Tokens(chain)

  return tokens.map(async (tkn) => {
    const token = { ...tkn }

    const contractAddress = getContractAddressFromToken(token.fullAsset)
    const contract = new ethers.Contract(
      contractAddress.toLowerCase(),
      erc20,
      provider
    )
    const tokenBalance = await contract.balanceOf(address)
    if (tokenBalance > 0) {
      token.balance = tokenBalance / 10 ** token.decimals
      return token
    }
  })
}

export const getBalance = async (address: string) => {
  const assetEth = { ...getFullAssetFromName('ETH.ETH') }

  try {
    const provider = new ethers.providers.JsonRpcProvider(ETH_RPC)
    const ethBalance = await provider.getBalance(address)
    const etherBalance = Number(ethers.utils.formatEther(ethBalance))

    const ethTokens = getErc20Balance('ETH', address, provider)

    const filteredEthTokens = (await Promise.all(ethTokens)).filter(function (
      element
    ) {
      return element !== undefined
    })

    if (assetEth) assetEth.balance = etherBalance

    return [assetEth, ...filteredEthTokens]
  } catch (e) {
    console.error(`ERROR: Failed to get EVM balance ${e}`)
    return [assetEth]
  }
}
