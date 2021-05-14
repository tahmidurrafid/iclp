
<template>
  <div id="app">
    <layout></layout>
  </div>
  
</template>

<script>

import Layout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  },
  data : function () {
    return {
      name : 'rhythm',
    }
  }
}
</script>

<style lang = "scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Subrayada:wght@400;700&display=swap');
  @import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
  
  router-link { 
      cursor : pointer;
  }

  #app , input, select, textarea{

    font-family: poppins, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    margin : 0;
    padding : 0;

  }

  a{
    text-decoration: none;
    color : white;
  }
  body{
    margin : 0 !important;
  }

</style>
