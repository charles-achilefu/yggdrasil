import PopupModal from '@/components/common/PopupModal'
import { decrypt } from '@/services/keystore/connect'
import { Wallet } from '@/types/wallet'
import { Keystore } from '@xchainjs/xchain-crypto'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  keystoreWallet: Wallet
  closeKeystoreMenuModal: () => void
  toggleKeystoreMenu: () => void
  toggleCreateKeystoreModal: () => void
}

const ConnectKeystore: FC<Props> = ({
  keystoreWallet,
  closeKeystoreMenuModal,
  toggleKeystoreMenu,
  toggleCreateKeystoreModal,
}) => {
  const dispatch = useDispatch()

  const [fileName, setFileName] = useState('')
  const [keystoreContent, setKeystoreContent] = useState<Keystore>()
  const [password, setPassword] = useState<string>('')

  const handleFileLoad = (event: any) => {
    try {
      const phrase = JSON.parse(event.target.result)
      setKeystoreContent(phrase)
    } catch (error) {
      console.error('ERROR: Could not parse file to JSON', error)
      closeKeystoreMenuModal()
    }
  }

  const readFileAsText = (files: FileList | null) => {
    if (files === null) return
    if (files.length <= 0) return

    setFileName(files[0].name)

    const reader = new FileReader()
    reader.onload = handleFileLoad
    reader.readAsText(files[0])
  }

  const connect = async () => {
    if (!password || !keystoreContent) return

    const response = await decrypt(keystoreContent, password)
    keystoreWallet.connect(dispatch, response)
    closeKeystoreMenuModal()
  }

  return (
    <PopupModal size={'medium'} onClose={closeKeystoreMenuModal}>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              className="cursor-pointer"
              src="/icons/back.svg"
              alt="back-icon"
              width="24"
              height="24"
              onClick={toggleKeystoreMenu}
            />
            <h2 className="text-base font-bold">Connect Keystore</h2>
          </div>
          <Image
            className="cursor-pointer"
            src="/icons/close.svg"
            alt="close-icon"
            width="24"
            height="24"
            onClick={closeKeystoreMenuModal}
          />
        </div>
        <label className="flex flex-row justify-center items-center p-4 gap-2 w-full h-14 bg-transparent border border-borderUnselected rounded-20 hover:border-borderSelected cursor-pointer">
          {fileName ? (
            fileName
          ) : (
            <>
              <Image
                src="/icons/upload.svg"
                alt="upload-icon"
                width="24"
                height="24"
                className="mr-2"
              />
              Choose file to upload
            </>
          )}
          <input
            type="file"
            placeholder="Choose file to upload"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              readFileAsText(e.target.files)
            }
            className="hidden"
          />
        </label>
        <input
          className="flex items-center p-4 h-14 w-full bg-transparent border border-borderUnselected rounded-20 focus:outline-none hover:border-borderSelected focus:border-borderSelected"
          type="password"
          placeholder="Input Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          className={`flex items-center justify-center font-bold text-gray3 h-14 rounded-20 bg-smoothgreen
          ${
            !true && 'opacity-25 cursor-default'
          } transition-opacity duration-300`}
          onClick={connect}
        >
          Connect
        </button>
        <div className="flex w-full gap-2 justify-center">
          <p>Don{"'"}t have a Keystore yet?</p>
          <button
            className="text-softgreen underline"
            onClick={toggleCreateKeystoreModal}
          >
            Create Keystore
          </button>
        </div>
      </div>
    </PopupModal>
  )
}

export default ConnectKeystore
