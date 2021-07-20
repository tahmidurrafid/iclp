<template>
    <div class = "course-complete">
        <div class = "title">Complete Course</div>


        <div class = "content">
            <div class = "caption">
                Course Contents
            </div>

            <div class = "loader" v-if="loading">
                <div class = "loading"></div>
            </div>

            <div class= "topics">
                <div class = "topic">
                    <div class = "topic-wrapper" v-if = "topic.type=='topic'">
                        <div class = "topic-title">
                            <div class = "text">{{topic.title}} </div>
                            <div class = "actions">
                                <a class = "expand">
                                    <i class="fa fa-angle-up"></i>
                                </a>
                            </div>
                        </div>
                        <div class = "topic-content ql-snow">
                            <div v-html="topic.html" class = "content-container ql-editor" >

                            </div>
                            <div v-for="(video, j) in topic.videos" v-bind:key="j" class = "video">
                                <video controls>
                                    <source :src="video.link" type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>

                </div>
                <div class = "quiz-button">
                    <router-link v-if="topic.quiz.length" 
                    :to="'/takeQuiz?id=' + topic.quiz[0].id" class = "button solid small white">
                        Take Quiz
                    </router-link>

                    <router-link v-if="!topic.quiz.length && next.course_id"
                    :to="next.assignment ? ('/course/submitassignment?course=' + next.course_id + '&assignment=' + next.topic_id) : 
                        ('/course/complete?id=' + next.course_id + '&topic=' + next.topic_id)" 
                        class = "button solid small white">
                        Next Topic
                    </router-link>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default{
    name : 'courseComplete',
    data(){
        return{
            course : {
                id : 0,
                topics : []
            },
            selected : -1,
            loading : true,
            topic : {
                quiz : []
            },
            next : {
                course_id : 0
            }
        }
    },
    watch: {
        '$route.query'() {
            this.reloadPage();
        }
    },
    mounted(){
        this.reloadPage();
    },
    methods : {
        reloadPage : function(){
            this.course.id = this.$route.query.id;
            axios.get(`api/courses/${this.course.id}/all`).then(res => {
                this.course = res.data;
                this.course.media = this.course.media.map( e => {
                    e.link = axios.defaults.baseURL + e.link;
                    return e;
                })
                let media = this.course.media;
                this.course.topics.map( e => e.videos = media.filter( 
                    item => item.media_type == "mp4" && item.topic_id == e.topic_id
                ) )
                this.course.topics.sort( (a, b) => {
                    let idA = a.type == "assignment" ? a.id : a.topic_id;
                    let idB = b.type == "assignment" ? b.id : b.topic_id;
                    return idA - idB;
                })
                console.log(this.course);
                if(this.course.topics.length){
                    let firstTopicId = this.course.topics[0].topic_id;
                    if(!this.$route.query.topic){
                        this.$router.push( {query : {
                            id : this.$route.query.id,
                            topic : firstTopicId
                        }});
                    }
                    this.topic = this.course.topics.filter( e => e.topic_id == this.$route.query.topic)[0];
                    console.log(this.topic, "TOPIC INFO");
                    axios.get(`api/courses/next/${this.topic.course_id}/${this.topic.topic_id}`).then(
                        res => {
                            this.next = res.data;
                        }
                    )
                }
                this.loading = false;
            });
        }
    }

};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";


    .loader{
        padding-top : 50px;
        .loading{
            @include loader;
            margin : auto;
        }
    }

    @mixin caption{
        font-size: $font20;
        font-weight: $semibold;
        display: flex;
        align-items: center;
        &::before{
            @include marker;
            margin-right: 10px;
        }        
    }

    .course-complete{
        .title{
            @include title;
        }

        .content{
            .caption{
                @include caption;
            }

            @include content;
            text-align: left;
            &>*{
                margin : 20px 0;
            }
            .topics{
                .topic{
                    margin: 15px 0 ;
                    .topic-title{
                        background-color: $greyLight;
                        color: $grey1;
                        font-weight: $semibold;
                        padding: 10px 30px;
                        box-sizing: border-box;                        
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .text{
                            flex-grow: 1;
                        }

                        .actions{
                            a{
                                cursor: pointer;
                                background-color: $orange;
                                border-radius: 100px;
                                display: block;
                                $dim : 30px;
                                height: $dim;
                                line-height: $dim;
                                width: $dim;
                                text-align: center;
                                i{
                                    font-weight: $bold;
                                }
                            }
                        }
                    }

                    .assignment-wrapper{
                        .topic-title{
                            background-color: $grey3;                            
                        }
                    }

                    .topic-content{
                        box-sizing: border-box;
                        padding : 20px 0;
                        a{
                            color: initial;
                            text-decoration: initial;
                        }

                        .video{
                            display: flex;
                            justify-content: center;
                            margin : 50px 0;
                            video{
                                width : 800px;
                                max-width: 100%;
                            }
                        }
                    }
                }
                .quiz-button{
                    display: flex;
                    justify-content: flex-end;
                }
            }
        }
    }

</style>