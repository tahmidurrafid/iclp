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
                <div v-for="(topic,i) in course.topics" v-bind:key="i" class = "topic">
                    <div class = "topic-wrapper" v-if = "topic.type=='topic'">
                        <div class = "topic-title">
                            <div class = "text">{{topic.title}} </div>
                            <div class = "actions">
                                <a class = "expand" @click="selected = (selected == i)? -1 : i">
                                    <i class="fa" v-bind:class="selected == i ? 'fa-angle-up' : 'fa-angle-down' "></i>
                                </a>
                            </div>
                        </div>
                        <div v-if="i == selected" class = "topic-content ql-snow">
                            <div v-html="topic.html" class = "content-container ql-editor" >

                            </div>
                            <div v-for="(video, j) in topic.videos" v-bind:key="j" class = "video">
                                <video controls>
                                    <source :src="video.link" type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>

                    <div class = "assignment-wrapper" v-if = "topic.type=='assignment'">
                        <div class = "topic-title">
                            <div class = "text">{{topic.title}} </div>
                            <div class = "actions">
                                <router-link class = "expand" :to="'submitassignment?course=' + course.id + '&assignment=' + topic.id">
                                    <i class="fa fa-angle-right" ></i>
                                </router-link>
                            </div>
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
    name : 'courseComplete',
    data(){
        return{
            course : {
                id : 0,
                topics : []
            },
            selected : -1,
            loading : true
        }
    },
    mounted(){
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
            this.loading = false;
        });
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
            }
        }
    }

</style>