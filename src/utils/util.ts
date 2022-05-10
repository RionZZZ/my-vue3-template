import CryptoJS from 'crypto-js'
import { MessagePlugin, MessageThemeList, DialogPlugin } from 'tdesign-vue-next'

export const showToast = (
  content: string,
  theme: MessageThemeList = 'success'
): void => {
  MessagePlugin[theme]({ content, duration: 2500, closeBtn: true })
}

export const showDialog = (
  title: string = '提示',
  content: string,
  callback?: () => void
): void => {
  const dialog = DialogPlugin({
    header: title,
    body: content,
    theme: 'info',
    onConfirm: () => {
      callback && callback()
      dialog.destroy && dialog.destroy()
    },
    onClose: () => {
      dialog.destroy && dialog.destroy()
    }
  })
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

// 防抖
let timer: number
export const debounce = (callback: () => void, timeout: number = 500) => {
  return () => {
    timer && clearTimeout(timer)
    timer = setTimeout(callback, timeout)
  }
}
