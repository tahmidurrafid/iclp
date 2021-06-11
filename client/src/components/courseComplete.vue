<template>
    <div class = "course-complete">
        <div class = "title">Complete Course</div>

        <div class = "content">
            <div class = "caption">
                Course Contents
            </div>
            <div class= "topics">
                <div v-for="(topic,i) in course.topics" v-bind:key="i" class = "topic">
                    <div class = "topic-title">
                        <div class = "text">{{topic.title}} </div>
                        <div class = "actions">
                            <a class = "expand" @click="selected = (selected == i)? -1 : i">
                                <i class="fa" v-bind:class="selected == i ? 'fa-angle-up' : 'fa-angle-down' "></i>
                            </a>
                        </div>
                    </div>
                    <div v-if="i == selected" class = "topic-content ql-editor">
                        <div v-html="topic.html" class = "content-container" >

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
            selected : -1
        }
    },
    mounted(){
        this.course.id = this.$route.query.id;
        axios.get(`api/courses/${this.course.id}/all`).then(res => {
            this.course = res.data;
        })
    }

};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";

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

                    .topic-content{
                        box-sizing: border-box;
                        padding : 20px 0;
                    }
                }
            }
        }
    }

</style>