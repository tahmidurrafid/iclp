<template>
    <div class = "nav">
        <div class = "logo">
            <img src = "@/assets/logo.svg" />
        </div>
        <div class = "menu">
            <div v-for="(item, i) in menu" v-bind:key = "i" class = "item" >
                <router-link :to = "item.link">{{item.caption}}</router-link>
            </div>
        </div>

        <div class = "account">
            <div v-if="!$login.status" class = "noAuth">
                <div class = "item">
                    <router-link to = "/login">Login</router-link>                
                </div>
                <div class = "item">
                    <router-link to = "/registration">Register</router-link>                
                </div>
            </div>

            <div v-if="$login.status" class = "settings" href= "#">
                <a href = "#" class = "dp" v-on:click="dropdown=!dropdown">
                    <div class = "dp-icon">
                        <img :src = "$login.user.profile_photo" />
                    </div>
                </a>
                <div class = "dropdown" v-if="dropdown">
                    <div class = "item" v-if="$login.user.type == 'instructor'">
                        <router-link to = "/instructordashboard/"><i class = "fa fa-align-center"></i>Dashboard</router-link>
                    </div>
                    <div class = "item" v-if="$login.user.type != 'instructor'">
                        <router-link to = "/user/profile/"><i class = "fa fa-user-circle"></i>Profile</router-link>
                    </div>
                    <div class = "item">
                        <a href = "/logout" 
                        @click.prevent="signout()"><i class = "fa fa-sign-out"></i>Logout</a>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
// import axios from 'axios';
export default{
    name : 'Navigation',
    data(){
        return{
            menu : [
                {link : '/', caption : 'Home'},
                {link : '/course', caption : 'Courses'},
                {link : '/playground', caption : 'Playground'},
            ],
            login : {
                status : false,
                user : {
                }
            },
            dropdown : false
        }
    },
    mounted(){

    },
    methods : {
        signout : function(){
            localStorage.setItem('token', '');
            this.$login.status = false;
            this.$login.check();
            this.$router.push('/');
        }
    }

};
</script>

<style lang = "scss" scoped>
    @import "../../scss/_variables.scss";

    a{
        color: black;
    }
    .nav{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width : 100%;
        height : 90px;
        box-sizing: border-box;
        padding : 0 60px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, .1);        
        .menu{
            display: flex;
            .item{
                padding : 0 20px;
                display: block;
            }
        }        
        .logo{
            display: block;
            img{
                max-height: 50px;
            }
        }
        .account{
            display : flex;            
            .noAuth{
                display: flex;
                .item{
                    padding : 0 10px;
                    display: block;
                }                
            }

            .settings{
                text-align: left;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .dp{
                    display: flex;
                    align-items: center;
                    .dp-icon{
                        width: 50px;
                        height: 50px;
                        border-radius: 100px;
                        box-sizing: border-box;
                        border : solid 3px $greyLight;
                        display: block;
                        overflow: hidden;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                    .name{
                        padding-left: 15px;
                        display: block;
                        color: $grey1;
                        font-size: $font15;
                        font-weight: $semibold;
                    }                
                }
                .dropdown{
                    z-index: 1000;
                    position: absolute;
                    color: $black;
                    width: max-content;
                    background-color: $white;
                    right: -50px;
                    top : 100%;
                    box-shadow: 1px 5px 9px rgb(0 0 0 / 9%);
                    border-radius: 21px;
                    border-top: none;
                    overflow: hidden;
                    .item{
                        a{
                            i{
                                font-size: $font18;
                                padding-right: 15px;
                            }
                            font-size: $font15;
                            color: $grey1;
                            padding : 15px 40px;
                            padding-left: 30px;
                            transition: color .3s;
                            display: block;
                            box-sizing: border-box;
                            &:hover{
                                background-color: $orange;
                                color : $white;
                            }
                        }
                    }
                }
            }
        }
    }
</style>