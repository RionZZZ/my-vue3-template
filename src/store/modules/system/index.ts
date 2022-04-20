import { defineStore } from 'pinia'
import { System } from './type'
import { style, Color } from '@/theme/index'

export default defineStore('system', {
  state: (): System => ({
    theme: 'light'
  }),
  actions: {
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      const userTheme = style[this.theme]
      const body = document.getElementsByTagName('body')[0]
      for (let i in userTheme) {
        const item: any = userTheme[i as keyof Color]
        for (let j in item) {
          let cssVarName =
            '--ry-' + i + '-' + j.replace(/([A-Z])/g, '-$1').toLowerCase()
          body.style.setProperty(cssVarName, item[j])
        }
      }
    }
  }
})