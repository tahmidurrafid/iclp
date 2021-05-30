import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import Vuex from 'vuex'
import Vueditor from 'vueditor'
import 'vueditor/dist/style/vueditor.min.css'
import axios from 'axios'

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  uploadUrl: '',
  id: '',
  classList: []
};
Vue.use(Vuex);
Vue.use(Vueditor, config);
Vue.use(VueRouter)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");


const login = Vue.observable({
  status : false,

  check : () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");    
    axios.get('api/users/me')
    .then( response => {
        let data = response.data;
        if(data.success == 1){
            login.status = true;
            login.user = data.data;
            login.user.profile_photo = axios.defaults.baseURL + login.user.profile_photo;
        }else{
          login.status = false;
        }
        console.log("status: " + login.status);
        console.log(data);
    })
  }
})

Vue.prototype.$login = login;
Vue.prototype.$login.check();

const router = new VueRouter({
   routes
});


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
