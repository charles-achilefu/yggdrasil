import {
  decryptFromKeystore,
  encryptToKeyStore,
  generatePhrase,
  Keystore,
} from '@xchainjs/xchain-crypto'

/**
 * Generate & encrypt a new phrase.
 *
 * @param {string} password The encryption password for the new phrase.
 * @param {number} entropy The new phrase size.
 * @returns {Keystore} The generated encrypted phrase.
 */
export const encrypt = async (
  password: string,
  entropy: number = 24
): Promise<Keystore> => {
  const phrase = generatePhrase(entropy)

  const encrypted_phrase: Keystore = await encryptToKeyStore(phrase, password)

  return encrypted_phrase
}

/**
 * Decrypts a keystore to a phrase.
 *
 * @param {Keystore} keystore The encrypted phrase in the form of a keystore.
 * @param {string} password The encryption password.
 * @returns {string} The decrypted phrase.
 */
export const decrypt = async (
  keystore: Keystore,
  password: string
): Promise<string> => {
  try {
    const decryptedKeystore = await decryptFromKeystore(keystore, password)
    return decryptedKeystore
  } catch (e) {
    // TODO: GENERATE ERROR
    return ''
  }
}
