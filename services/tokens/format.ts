import { iToken } from '@/types/token'

export const mergeBalance = (oldState: iToken[], newState: iToken[]) => {
  return oldState.map((oldToken) => {
    const matchingNewToken = newState.find((newToken) => {
      return oldToken.fullAsset === newToken.fullAsset
    })

    if (matchingNewToken) {
      return {
        ...oldToken,
        balance: matchingNewToken.balance,
      }
    } else {
      return oldToken
    }
  })
}

export const mergePrice = (oldState: iToken[], newState: iToken[]) => {
  return oldState.map((oldToken) => {
    const matchingNewToken = newState.find((newToken) => {
      return oldToken.fullAsset === newToken.fullAsset
    })

    if (matchingNewToken) {
      return {
        ...oldToken,
        price: matchingNewToken.price,
      }
    } else {
      return oldToken
    }
  })
}

export const removeBalance = (state: iToken[]) => {
  return state.map((token) => {
    return {
      ...token,
      balance: 0,
    }
  })
}
