import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface Props {
  link: string
}

const NavigationItem: FC<Props> = ({ link }) => {
  const router = useRouter()
  const path = `/${link.toLowerCase()}`

  return (
    <Link href={path}>
      <p
        className={`${
          router.pathname === path ? 'text-white90' : 'text-white60'
        } cursor-pointer`}
      >
        {link}
      </p>
    </Link>
  )
}

export default NavigationItem
