import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false


const Route1 = { template: '<div style = "border-radius:20px;background-color:cyan;width:200px;height:50px;margin:10px;font-size:25px;padding:10px;">This is router 1</div>' }
const Route2 = { template: '<div style = "border-radius:20px;background-color:green;width:200px;height:50px;margin:10px;font-size:25px;padding:10px;">This is router 2</div>' }
const routes = [
   { path: '/route1', component: Route1 },
   { path: '/route2', component: Route2 }
];
const router = new VueRouter({
   routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
