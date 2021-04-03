import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import CourseView from './components/CourseView.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
   { path : '/course', component: CourseView}
];
const router = new VueRouter({
   routes // short for `routes: routes`
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
