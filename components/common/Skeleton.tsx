import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  width?: number
  height?: number
}

const SkeletonLoading: FC<Props> = ({ width = 80, height = 20 }) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Skeleton width={width} height={height} />
    </SkeletonTheme>
  )
}

export default SkeletonLoading
