<template>
    <div class = "courseView">
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

        <div class = "courseItems">
            <div class = "heading">Recommended Course For You</div>

            <div class = "course-list">
                <div v-for="i in 5" v-bind:key="i" class = "list-item">
                    <div class = "list-item-wrap">
                        <div class = "title"><span class = "marker"></span><span class = "text">Object Oriented Programming with Java</span></div>
                        <div class = "description">
                            Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible
                        </div>
                        <div class = "line">
                            <div class = "upvote">
                                <span>378</span><i class = "fa fa-heart-o"></i>
                            </div>
                            <div class = "rating">
                                <i v-for="n in 5" v-bind:key="n" class = "fa fa-star"></i>
                            </div>
                        </div>
                        <div class = "line">
                            <router-link class = "button" to = "/course/details">SEE DETAILS</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name : 'CourseView',
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
};
</script>

<style lang = "scss" scoped>
    .marker{
        display: block;
        height : 3px;
        width : 25px;
        background: linear-gradient(90deg, rgba(252,90,52,1) 0%, rgba(252,90,52,1) 60%, rgba(255,255,255,0) 60.1%, rgba(255,255,255,0) 80%, rgba(252,90,52,1) 80.1%);        
    }
    .courseView{
        padding-top: 70px;
        display: flex;
        box-sizing: border-box;
        padding : 70px 70px 0;
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

        .courseItems{
            text-align: left;

            padding : 0 0 0 50px;
            .heading{
                font-weight: 600;
                font-size: 29px;
                padding-bottom: 30px;
            }

            .course-list{
                .list-item{
                    padding-bottom: 30px;
                    .list-item-wrap{
                        border: solid 3px #E9E9E9;
                        padding : 22px 50px 22px 70px;
                        box-sizing: border-box;
                        .title{
                            position : relative;
                            .marker{
                                position : absolute;
                                top : calc(50% - 2px);
                                left : -40px;
                            }
                            font-size: 18px;
                            font-weight: 600;
                            padding : 5px 0;
                        }
                        .description{
                            font-size: 14px;
                            padding : 5px 0;
                            text-align: justify;
                        }
                        .line{
                            padding : 5px 0;
                            display: flex;
                            justify-content: space-between;
                            .upvote{
                                font-weight: 600;
                                font-size: 15px;
                                color: #828282;
                                i{
                                    padding-left: 10px;
                                    font-weight: bold;
                                    color: #FC5A34;
                                }
                            }
                            .rating{
                                color: #FC5A34;
                            }
                            .button{
                                background-color: #FC5A34;
                                font-weight: bold;
                                font-size: 15px;
                                padding : 7px 20px;
                            }
                        }

                    }
                }
            }
        }
    }
</style>