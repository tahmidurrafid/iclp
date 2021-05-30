<template>
    <div id = "login" class = "auth">
        <div class = "floating">
            <div class = "card-item">
                <div class = "logo">
                    <img src = "@/assets/logo.svg" />
                </div>
                <h3>Login to ICLP</h3>         
                <form @submit.prevent = "submitForm">
                    <input type = "text" v-model="form.email" placeholder="Enter Email"/>
                    <input type = "password"  v-model="form.password" placeholder="Your password"/>

                    <div class = "line">
                        <div class = "elem half">
                        </div>
                        <div class = "elem half">
                            <input type = "submit" class = "button solid small white" value = "Login" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : "Login",
    data(){
        return {
            form : {
                email : '',
                password : ''
            }
        }
    },
    methods : {
        submitForm : function(){
            console.log(this.form);
            axios.post(`api/users/login`, this.form)
                .then((response) => {
                    console.log(response.data)
                    if(response.data.success == 1){
                        localStorage.setItem("token", response.data.token);
                        this.$router.push('/')
                    }
                    this.$login.check();
                    console.log(this.$login.status)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/_auth.scss";

</style>