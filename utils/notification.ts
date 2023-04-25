import { iNotification } from '@/types/notification'

export const generateError = (message: string): iNotification => {
  return {
    message,
    type: 'error',
  }
}

export const generateSuccess = (message: string): iNotification => {
  return {
    message,
    type: 'success',
  }
}

export const isNotification = (object: any): object is iNotification =>
  object.type === 'error' || object.type === 'success'

export const isError = (object: any): object is iNotification =>
  object.type === 'error'

export const isSuccess = (object: any): object is iNotification =>
  object.type === 'success'
