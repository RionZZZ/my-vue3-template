import { defineComponent, h, createVNode, ref, nextTick } from 'vue'
import Reload from '@/components/reload.vue'
import NProgress from '@utils/progress'

export function createNameComponent(component: any) {
  return () => {
    return new Promise(res => {
      component().then((comm: any) => {
        const name = `${comm.default.name || 'ryAdmin'}_${Date.now()}`
        const tempComm = defineComponent({
          name,
          setup() {
            const isReload = ref(false)
            let timeOut: any = null
            const handleReload = () => {
              isReload.value = true
              timeOut && clearTimeout(timeOut)
              NProgress.start()
              timeOut = setTimeout(() => {
                nextTick(() => {
                  NProgress.done()
                  isReload.value = false
                })
              }, 250)
            }
            return {
              isReload,
              handleReload
            }
          },
          render: function () {
            return h(
              'div',
              { class: 't-content-box' },
              this.isReload ? [h(Reload)] : [createVNode(comm.default)]
            )
          }
        })
        res(tempComm)
      })
    })
  }
}
