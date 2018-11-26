import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
