import { COINGECKO_STATS_ENDPOINT } from '@/constants'
import axios from 'axios'

export const getStats = async () => {
  try {
    return (
      await axios.get(COINGECKO_STATS_ENDPOINT)
    ).data
  } catch (e) {
    console.error(`ERROR: Failed to get stats data ${e}`)
  }
}
