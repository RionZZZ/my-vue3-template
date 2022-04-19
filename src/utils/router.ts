import { defineComponent, h, createVNode, ref, nextTick } from 'vue'
import reload from '@/components/reload.vue'
import NProgress from '@/utils/progress'

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
              }, 260)
            }
            return {
              isReload,
              handleReload
            }
          },
          render: function () {
            return h(
              'div',
              { class: 'el-main-box' },
              this.isReload ? [h(reload)] : [createVNode(comm.default)]
            )
          }
        })
        res(tempComm)
      })
    })
  }
}
