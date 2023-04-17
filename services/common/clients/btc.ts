import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('BTC.BTC') }

  try {
    const res = await axios.get(
      `https://blockchain.info/q/addressbalance/${address}`
    )

    if (asset) asset.balance = Number(res.data) / 10 ** 8

    return [asset]
  } catch (e) {
    console.error(`ERROR: Failed to get BTC balance ${e}`)
    return [asset]
  }
}
