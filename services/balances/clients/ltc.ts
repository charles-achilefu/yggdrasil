import { getFullAssetFromName } from '@/utils/format'
import axios from 'axios'

export const getBalance = async (address: string) => {
  const asset = { ...getFullAssetFromName('LTC.LTC') }

  try {
    const res = await axios.get(
      `https://api.blockchair.com/litecoin/dashboards/address/${address}?key=B___JP18TAE0ngM6sVv8BZjRiLUfuDHq`
    )

    if (asset)
      asset.balance = (
        res.data.data[address].address.balance /
        10 ** 8
      ).toString()

    return [asset]
  } catch (e) {
    console.error(`ERROR: Failed to get LTC balance ${e}`)
    return [asset]
  }
}
