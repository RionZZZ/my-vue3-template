import CryptoJS from 'crypto-js'
import { MessagePlugin } from 'tdesign-vue-next'

export const showError = (content: string): void => {
  MessagePlugin.error({ content, duration: 2500 })
}

const ACCESS_KEY = '6df9003cc72a0c0cae912f3c9421275f'
export const encrypt = (message: string): string => {
  const keyHex = CryptoJS.enc.Utf8.parse(ACCESS_KEY)
  const encrypted = CryptoJS.AES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
