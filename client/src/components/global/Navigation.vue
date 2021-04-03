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
            <div class = "item">
                <router-link to = "/route1">Login</router-link>                
            </div>
            <div class = "item">
                <router-link to = "/route1">Register</router-link>                
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name : 'Navigation',
    data(){
        return{
            menu : [
                {link : '/', caption : 'Home'},
                {link : '/course', caption : 'Courses'},
                {link : '#', caption : 'challenges'},
                {link : '#', caption : 'Playground'},
                {link : '#', caption : 'Blog'}
            ]
        }
    }
};
</script>

<style lang = "scss" scoped>
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
            .item{
                padding : 0 10px;
                display: block;
            }
        }
    }
</style>