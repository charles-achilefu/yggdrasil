import { getStats } from '@/api/stats'
import SkeletonLoading from '@/components/common/Skeleton'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

const RuneStats: FC = () => {
  const [price, setPrice] = useState(0)
  const [isPositive, setIsPositive] = useState<boolean | undefined>()

  useEffect(() => {
    getStats().then((result) => {
      try {
        setPrice(result.market_data.current_price.usd)
        setIsPositive(result.market_data.price_change_percentage_24h >= 0)
      } catch (err) {}
    })
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 w-1/6 bg-gray1 border-2 border-gray2 rounded-20 h-16 py-1 lg:gap-1.5 md:w-1/3 sm:hidden">
      <p className="text-sm md:text-sm text-white90 font-bold">RUNE/USD</p>
      <p
        className={`text-sm lg:text-xs ${
          isPositive ? 'text-softgreen' : 'text-smoothred'
        }`}
      >
        {price ? `$${price.toFixed(2)}` : <SkeletonLoading width={50} />}
      </p>
      {isPositive !== undefined ? (
        <Image
          className="w-auto h-auto"
          src={`/icons/${isPositive ? 'up' : 'down'}.svg`}
          alt={`${isPositive ? 'up' : 'down'}-icon`}
          width="18"
          height="18"
        />
      ) : (
        <SkeletonLoading width={20} />
      )}
    </div>
  )
}

export default RuneStats
