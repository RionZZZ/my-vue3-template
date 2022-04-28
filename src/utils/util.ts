import { MessagePlugin } from 'tdesign-vue-next'

export const showError = (content: string) => {
  MessagePlugin.error({ content, duration: 2000 })
}
