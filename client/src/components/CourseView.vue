<template>
    <div class = "courseView">
        <div class = "leftBar">
            <div class = "item">
                <div class = "wrap">
                    <div class = "heading"><span class = "marker"></span><span class = "text">Search</span></div>
                    <div class = "search">
                        <input type = "text" v-model="search" placeholder="Search for courses"/>
                        <div class = "button" @click="updateQuery()"><i class = "fa fa-search"></i></div>
                    </div>                    
                </div>
            </div>
            <div class = "item">
                <div class = "wrap">
                    <div class = "heading"><span class = "marker"></span><span class = "text">Course Categories</span></div>
                    <div class = "list">
                        <div v-for = "(item, i) in categories" v-bind:key="i"
                        class = "list-item" 
                        v-bind:class="{'selected' : (selected_category.includes(item.id))}" 
                        @click="updateCategory(item.id)">
                            <span class = "caption">{{item.value}}</span>
                            <!-- <span class = "count">{{item.count}}</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class = "item">
                <div class = "wrap">
                    <div class = "heading"><span class = "marker"></span><span class = "text">Levels</span></div>
                    <div class = "list">
                        <div v-for = "(item, i) in levels" v-bind:key="i"
                        class = "list-item" 
                        v-bind:class="{'selected' : (selected_level.includes(item.id))}" 
                        @click="updateLevel(item.id)">
                            <span class = "caption">{{item.level}}</span>
                            <!-- <span class = "count">-</span> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class = "courseItems">
            <div class = "heading">Recommended Course For You</div>

            <div class = "take-quiz" v-if="categories.length && categoryQuiz && selected_category.length">
                <div class = "message">Want to test your skill? </div>
                <router-link :to="'/testSkill?id=' + quizCategory " class = "click">Click Here</router-link>
            </div>

            <div class = "course-list">

                <div v-if="courseLoading" class = "loader">
                    <div class = "loading"></div>
                </div>
                <div v-else v-for="course in courses" :key="course.id" class = "list-item">
                    <div class = "list-item-wrap">
                        <div class = "title"><span class = "marker"></span><span class = "text">{{course.title}}</span></div>
                        <div class = "description">
                            {{course.brief}}
                        </div>
                        <div class = "line">
                            <div class = "upvote">
                                <span>378</span><i class = "fa fa-heart-o"></i>
                            </div>
                            <div class = "rating">
                                <i v-for="n in 5" v-bind:key="n" class = "fa"
                                :class="n <= course.rating ? 'fa-star' : 'fa-star-o'"></i>
                            </div>
                        </div>
                        <div class = "line">
                            <router-link class = "button" :to = "{path : '/course/details?id=' + course.id}">SEE DETAILS</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name : 'CourseView',
    data(){
        return{
            categories : [
            ],
            levels : [
                {level : 'Beginner', id : 1},
                {level : 'Intermediate', id : 2},
                {level : 'Advanced', id : 3}
            ],
            selected_category : [],
            selected_level : [],
            search : "",
            courses : [
            ],
            courseLoading : true,
            categoryQuiz : false,
            quizCategory : 0
        }
    },
    mounted(){
        if(this.$route.query.category){
            if(Array.isArray(this.$route.query.category)){
                this.selected_category = this.$route.query.category.map( (elem) => {
                    return elem = parseInt(elem, 10);
                });
            }else{
                this.selected_category.push(parseInt(this.$route.query.category, 10));
            }
        }
        axios.get('api/courses', {params : this.$route.query}).then( response => {
            this.courses = response.data.map( e => {
                if(e.rating == null){
                    e.rating = 0;
                }
                return e;
            });
            console.log(this.courses);
            this.courseLoading = false;
        });
        axios.get('api/courses/categories').then( response => {
            this.categories = response.data;
            console.log(this.categories , "categories")
        })
    },
    methods : {
        updateQuery : function(){
            let query = {};

            query.category = this.selected_category;            
            query.search = this.search;
            query.level = this.selected_level;
            this.$router.push({query : query });
            this.courseLoading = true;
            axios.get('api/courses', {params : this.$route.query}).then( response => {
                this.courses = response.data;
                this.courseLoading = false;
            });
        },
        updateLevel : function(id){
            if(id){
                if(this.selected_level.includes(id)){
                    this.selected_level.splice(this.selected_level.findIndex(
                        (elem) => elem.id == id
                    ), 1)
                }else{
                    this.selected_level = [];
                    this.selected_level.push(id)
                }
            }
            this.updateQuery();
        },
        updateCategory : function(id){
            if(id){
                if(this.selected_category.includes(id)){
                    this.selected_category.splice(this.selected_category.findIndex(
                        (elem) => elem.id == id
                    ), 1)
                }else{
                    this.selected_category = [];
                    this.selected_category.push(id)
                }
            }
            this.categoryQuiz = false;            
            if(this.selected_category.length){
                let selected = this.categories.filter( e => e.id == this.selected_category[0]);
                if(selected[0].quiz != null){
                    this.categoryQuiz = true;
                    this.quizCategory = this.selected_category[0];
                }
                if(selected[0].skill != null){
                    this.selected_level = [selected[0].skill];
                }
                // console.log(selected.quiz, selected.skill, this.categoryQuiz)
            }
            this.updateQuery();
        }
    }
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";


    .loader{
        .loading{
            @include loader;
            margin : auto;
        }
        display: block;
        width : 100%;
        padding-top: 70px;
        margin: auto;
    }

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
            width : 27%;
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
                            cursor: pointer;
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
                            &.selected{
                                background-color: $orange;
                                color : $white;
                                .count{
                                    background-color: $white;
                                    color: $orange;
                                }
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
            /* flex-grow: 1; */
            width : 73%;
            padding : 0 0 0 50px;
            .heading{
                font-weight: 600;
                font-size: 29px;
                padding-bottom: 30px;
            }

            .take-quiz{
                border: solid 3px #E9E9E9;
                padding : 20px 50px;
                box-sizing: border-box;
                display: flex;
                font-size: $font20;
                margin-bottom: 50px;
                .message{
                    font-weight: $medium;
                }
                .click{
                    background-color: $orange;
                    font-size: $font15;
                    display: flex;
                    align-items: center;
                    padding : 5px 10px;
                    margin-left: 30px;
                }
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
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2; /* number of lines to show */
                            -webkit-box-orient: vertical;                            
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