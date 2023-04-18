declare global {
  interface Window {
    ethereum?: unknown
    xfi: any
    keplr: any
    getOfflineSigner: any
    gtag: any
  }
}

export default global
