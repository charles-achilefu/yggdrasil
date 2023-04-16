import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('BCH.BCH') }

  try {
    const res = await axios.get(
      `https://api.haskoin.com/bch/address/${address}/balance`
    )

    if (asset)
      asset.balance =
        (Number(res.data.confirmed) + Number(res.data.unconfirmed)) / 10 ** 8

    return [asset]
  } catch (e) {
    console.error(`ERROR: Failed to get BCH balance ${e}`)
    return [asset]
  }
}
