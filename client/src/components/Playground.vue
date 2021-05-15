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
            <div class = "leftBar">
                <div class = "item">
                    <div class = "wrap">
                        <div class = "heading"><span class = "marker"></span><span class = "text">Search</span></div>
                        <div class = "search">
                            <input type = "text" placeholder="Search for courses"/>
                            <div class = "button"><i class = "fa fa-search"></i></div>
                        </div>                    
                    </div>
                </div>
                <div class = "item">
                    <div class = "wrap">
                        <div class = "heading"><span class = "marker"></span><span class = "text">Course Categories</span></div>
                        <div class = "list">
                            <div v-for = "(item, i) in categories" v-bind:key="i" class = "list-item">
                                <span class = "caption">{{item.title}}</span>
                                <span class = "count">{{item.count}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "items">
                <div v-for="i in 5" v-bind:key="i"  class = "item">
                    <div class = "wrap">
                        <div class = "description">
                            <div class = "tag"><span>CODING</span></div>
                            <div class = "title">Color Bucket Paint Box</div>
                            <div class = "about">
                                Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible
                            </div>
                            <div class = "react">
                                <div>
                                    <span>375</span> <i class="fa fa-heart-o"></i>
                                </div>
                                <div>
                                    <span>RATING</span> <i class="fa fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div class = "image">
                            <div class = "overlay" />
                            <img src = "@/assets/game.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "Playground",
    data(){
        return{
            categories : [
                {title : 'Structured Language', count : 3},
                {title : 'Object Oriented', count : 1},
                {title : 'Machine Learning', count : 5},
                {title : 'COmputer Security', count : 3},
                {title : 'Software Development', count : 6}
            ]
        }
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
            .leftBar{
                width : 25%;
                .item{
                    padding-bottom: 30px;
                    .wrap{
                        border : solid 3px #E9E9E9;
                        box-sizing: border-box;
                        padding : 20px 30px;
                        .heading{
                            display: flex;
                            align-items: center;
                            padding : 10px 0;
                            .text{
                                padding-left: 10px;
                                color : #000;
                                font-size: 20px;
                                font-weight: 600;
                            }
                        }

                        .list{
                            display: block;
                            .list-item{
                                height : 45px;
                                background-color: #F6F6F6;
                                color : #828282;
                                box-sizing: border-box;
                                display: flex;
                                padding : 0 15px;
                                justify-content: space-between;
                                align-items: center;
                                font-size: 13px;
                                font-weight: 600;
                                color : #828282;
                                margin : 15px 0;
                                .count{
                                    width : 20px;
                                    height: 20px;
                                    background-color: #FC5A34;
                                    border-radius: 100px;
                                    color : white;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            }
                        }

                        .search{
                            display: flex;
                            justify-content: space-between;
                            padding : 17px 0 10px;
                            input{
                                flex-grow: 1;
                                border : none;
                                background-color: #F6F6F6;
                                padding-left: 10px;
                                font-size: 13px;
                                font-weight: 600;
                                color : #7A7A7A;
                                font-family: poppins;
                                display: block;
                            }
                            .button{
                                cursor: pointer;
                                height: 40px;
                                width : 40px;
                                display: flex;
                                background-color: #FC5A34;
                                justify-content: center;
                                align-items: center;
                                i{
                                    color: white;
                                }
                            }
                        }
                    }
                }
            }
            .items{
                width: 70%;
                display: flex;
                flex-wrap: wrap;
                .item{
                    width: 50%;
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
                                span{
                                    background-color: $orange;
                                    padding : 5px 10px;
                                }
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
                            }
                        }
                    }
                }
            }

        }
    }
</style>