import { defineStore } from 'pinia'
import { System } from './type'
// import { style, Color } from '@/theme/index'

export default defineStore('system', {
  state: (): System => ({
    theme: 'light',
    collapseMenu: false
  }),
  actions: {
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('theme-mode', this.theme)
      // const userTheme: Color = style[this.theme]
      // const root = document.documentElement
      // for (let i in userTheme) {
      //   const item: any = userTheme[i as keyof Color]
      //   for (let j in item) {
      //     const cssVarName =
      //       '--ry-' + i + '-' + j.replace(/([A-Z])/g, '-$1').toLowerCase()
      //     root.style.setProperty(cssVarName, item[j])
      //   }
      // }
    },
    changeState(key: String, value: any): void {
      this[key as keyof System] = value
    }
  }
})
