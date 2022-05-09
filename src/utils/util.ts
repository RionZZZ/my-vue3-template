import CryptoJS from 'crypto-js'
import { MessagePlugin, MessageThemeList } from 'tdesign-vue-next'

export const showToast = (
  content: string,
  theme: MessageThemeList = 'success'
): void => {
  MessagePlugin[theme]({ content, duration: 25000, closeBtn: true })
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
