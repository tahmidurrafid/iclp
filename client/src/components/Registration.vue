<template>
    <div id = "registration" class = "auth">
        <div class = "floating">
            <div class = "card-item">
                <div class = "logo">
                    <img src = "@/assets/logo.svg" />
                </div>
                
                <h3>Create Account</h3>                    
                <form @submit.prevent="checkForm">
                    <div class = "elem">
                        <input type = "text" name = "email" v-model="form.email" placeholder="Enter Email"/>
                    </div>
                    <div class = "elem">
                        <input type = "password" name = "password" v-model="form.password" placeholder="Your password"/>
                    </div>
                    <div class = "elem">
                        <input type = "text" name = "name" v-model="form.name" placeholder="Full Name"/>
                    </div>
                    <div class = "line">
                        <div class = "elem half">
                            <input type = "text" name = "birthDate" v-model="form.dateofbirth" placeholder="Choose Borthdate" />
                        </div>
                        <div class = "elem half">
                            <select name = "country" >
                                <option selected disabled class = "default">Country</option>
                                <option>bangladesh</option>
                            </select>
                        </div>
                    </div>
                    <div class = "elem">
                        <input type = "text" name = "address" v-model="form.address" placeholder="address" />
                    </div>
                    <div class = "elem">
                        <input type = "text" name = "phoneNo" v-model="form.phone" placeholder="Phone No." />
                    </div>

                    <div class = "line">
                        <div class = "elem half">
                        </div>
                        <div class = "elem half">
                            <input type = "submit" class = "button solid small white" value="Submit" />
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
    name : "Registration",
    data(){
        return {
            form : {
                email : '',
            }
        }
    },
    created() {
    },
    methods : {
        checkForm : function(){
            axios.post(`api/users/register`, this.form)
                .then((response) => {
                    console.log(response);
                    this.$router.push("/login")
                })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/_auth.scss";
    #registration input, select{
        text-align: left;
    }
</style>