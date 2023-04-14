import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('THOR.RUNE') }

  try {
    const res = await axios.get(
      `https://thornode.ninerealms.com/cosmos/bank/v1beta1/balances/${address}`
    )

    return res.data.balances.map((entry: { denom: string; amount: number }) => {
      const asset = {
        ...getFullAssetFromName(`THOR.${entry.denom.toUpperCase()}`),
      }
      if (asset) asset.balance = (entry.amount / 10 ** 8).toString()

      return asset
    })
  } catch (e) {
    console.error(`ERROR: Failed to get RUNE balance ${e}`)
    return [asset]
  }
}
