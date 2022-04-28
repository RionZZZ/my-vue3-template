import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  minimum: 0.2,
  easing: 'ease',
  speed: 500,
  trickle: true,
  trickleSpeed: 200,
  showSpinner: true
})

export default NProgress
