import { AVAX_RPC } from '@/constants'
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
      token.balance = (tokenBalance / 10 ** token.decimals).toString()
      return token
    }
  })
}

export const getBalance = async (address: string) => {
  const assetAvax = { ...getFullAssetFromName('AVAX.AVAX') }

  try {
    const provider = new ethers.providers.JsonRpcProvider(AVAX_RPC)
    const avaxBal = await provider.getBalance(address)
    const avaxBalance = ethers.utils.formatEther(avaxBal)

    const avaxTokens = getErc20Balance('AVAX', address, provider)

    const filteredAvaxTokens = (await Promise.all(avaxTokens)).filter(function (
      element
    ) {
      return element !== undefined
    })

    if (assetAvax) assetAvax.balance = avaxBalance ? avaxBalance : '0.00'

    return [assetAvax, ...filteredAvaxTokens]
  } catch (e) {
    console.error(`ERROR: Failed to get AVAX balance ${e}`)
    return [assetAvax]
  }
}
