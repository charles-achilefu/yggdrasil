import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('BNB.BNB') }

  try {
    const res = await axios.get(
      `https://dex.binance.org/api/v1/account/${address}`
    )

    return res.data.balances.map((entry: { symbol: any; free: any }) => {
      const asset = { ...getFullAssetFromName(`BNB.${entry.symbol}`) }
      if (asset) asset.balance = entry.free.toString()

      return asset
    })
  } catch (e) {
    console.error(`ERROR: Failed to get BNB balance ${e}`)
    return [asset]
  }
}
