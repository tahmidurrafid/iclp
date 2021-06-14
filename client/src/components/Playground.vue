<template>
    <div class = "playground">
        <div class = "cover">
            <div class = "features">
                <div class = "left">
                    <div class = "caption">Play Games</div>
                    <div class = "sub">Learn to Code</div>
                </div>
                <div class = "right">   
                    <div class = "logo">
                        <img src="@/assets/logo-white.svg" />
                    </div>
                    <div class = "text">
                        Specially designed for kids School/College students who are willing to learn coding.
                    </div>
                </div>
            </div>
            <div class = "background">
                <div class = "overlay"></div>
                <img src = "@/assets/game-background.jpg" />
            </div>
        </div>
        <div class = "content">
            <div class = "items">
                <div v-for="item in games" v-bind:key="item.id"  class = "item">
                    <div class = "wrap">
                        <div class = "description">
                            <a class = "tag" :href="'http://localhost:3000/'+item.filePath">Play</a>
                            <div class = "title">{{item.gameName}}</div>
                            <div class = "about">
                                {{item.details}}
                            </div>
                        </div>
                        <div class = "image">
                            <div class = "overlay" />
                            <img :src = "'http://localhost:3000/'+item.coverPic"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : "Playground",
    data(){
        return{
            games:[]
        }
    },
    mounted(){
        axios.get('api/game/allgames').then( response => {
            this.games = response.data;
            console.log(this.games);
        })
    }  
}
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";

    .playground{
        .cover{
            position : relative;            
            .background{
                img{                    
                    width : 100%;
                }
                .overlay{
                    position : absolute;
                    left : 0;
                    top : 0;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(0,0,0, .8);
                }
            }
            .features{
                position: absolute;
                width: 100%;
                height: 100%;
                left : 0;
                top : 0;
                z-index: 100;
                color: $white;
                text-align: left;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding : 0 80px;
                .left{
                    font-weight: $semibold;
                    .caption{
                        font-size: $font40;
                        margin : 20px 0;
                    }
                    .sub{
                        font-size: $font20;
                        margin : 20px 0;
                    }
                }
                .right{
                    text-align: center;
                    .logo, .text{
                        margin : 20px 0;
                    }
                }
            }
        }
        .content{
            margin: 100px auto;
            width : 85%;
            display: flex;
            justify-content: space-between;
            .items{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .item{
                    width: 33%;
                    box-sizing: border-box;
                    padding : 15px;
                    height: max-content;                    
                    .wrap{
                        position : relative;
                        .description{
                            z-index: 100;
                            text-align: left;
                            color : $white;
                            position : absolute;
                            left : 0;
                            bottom: 0;
                            box-sizing: border-box;
                            padding : 20px;
                            &>*{
                                margin-top: 15px;
                            }
                            .tag{
                                display:inline-block;
                                margin-bottom: 100px;
                                background-color: $orange;
                                padding : 5px 10px;
                            }
                            .title{
                                font-size: $font20;
                                font-weight: $medium;
                            }
                            .about{
                                font-size: $font13;
                            }
                            .react{
                                display: flex;
                                justify-content: space-between;
                                &>div{
                                    vertical-align: middle;
                                    span{
                                        font-size: $font15;
                                        font-weight: $semibold;
                                    }
                                    i{
                                        color: $orange;
                                        font-size: $font20;
                                    }
                                }
                            }
                        }
                        .image{
                            .overlay{
                                position : absolute;
                                height : 100%;
                                width : 100%;
                                background-color: rgba(0,0,0, .8);
                                left : 0;
                                top : 0;
                            }
                            img{
                                display: block;
                                width : 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }

        }
    }
</style>