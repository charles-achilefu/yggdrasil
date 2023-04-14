import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('GAIA.ATOM') }

  try {
    const res = await axios.get(
      `https://cosmos.lcd.atomscan.com/bank/balances/${address}`
    )

    if (res.data.result.length > 0)
      asset.balance = (res.data.result[0].amount / 10 ** 6).toString()

    return [asset]
  } catch (e) {
    console.error(`ERROR: Failed to get ATOM balance ${e}`)
    return [asset]
  }
}
