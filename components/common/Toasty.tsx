import Image from 'next/image'
import { FC, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../redux/notification'
import { store } from '../../redux/store'

const Toasty: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return store.subscribe(handleToast)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToast = () => {
    const notification = store.getState().notifcation.notification

    if (!notification) return

    toast(`${notification.message}`, {
      duration: 4000,
      position: 'top-center',
      className: 'toasty',
      style: {
        borderRadius: '20px',
        background: `${
          notification.type === 'success' ? '#2FBC86' : '#EF5B5B'
        }`,
        fontSize: '14px',
        padding: '20px 34px',
        color: 'white',
        lineHeight: '16.8px',
        maxWidth: '1000px',
      },
      // Custom Icon
      icon: (
        <Image
          src={`/toast/${notification.type}.svg`}
          alt={`${notification.type}-toast-icon`}
          width="16"
          height="12"
        />
      ),
    })

    dispatch(setNotification())
  }

  return <Toaster />
}

export default Toasty
