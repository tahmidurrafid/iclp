<template>
    <div class = "assignment">
        <div class = "title">Submit Assignment</div>

        <div class = "content">
            <div class = "assignment-title">Assignment : {{details.title}}</div>
            <div class = "description">
                {{details.brief}}
            </div>
            <div class = "downloads">
                <a class = "item" :href = "details.file_link + ''">
                    <div class = "file">
                        <i class = "fa fa-file-archive-o"></i>
                        <span>{{details.file_name}}</span>
                    </div>
                    <div class = "file-details">
                        <span class = "size">File Size : 2mb</span>
                        <span class = "download-icon">
                            <i class = "fa fa-download"></i>
                        </span>
                    </div>
                </a>
            </div>
            <div class = "submitted">
                <div class = "item" v-for="(item, i) in details.submissions" v-bind:key="i">
                    <div class = "left">
                        <a class = "link" :href="item.file_link">Click To Download</a>
                        <div class = "date">Date: {{item.submission_time}}</div> 
                    </div>
                    <div class = "right">
                        Mark : <span>{{item.mark}} / {{details.total_mark}}</span>
                    </div>
                </div>
            </div>
            <div class = "upload">
                <input type = "file" name = "upload" @change="fileChanged($event)"/>
                <a class = "upload-button" @click="submit()">
                    <i class = "fa fa-link"></i>
                    <span>Upload File (.zip)</span>
                </a>
            </div>

            <div class = "next-button">
                <router-link v-if="next.course_id"
                :to="next.assignment ? ('/course/submitassignment?course=' + next.course_id + '&assignment=' + next.topic_id) : 
                    ('/course/complete?id=' + next.course_id + '&topic=' + next.topic_id)" 
                    class = "button solid white">
                    Next Topic
                </router-link>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name : 'InstructorDashboard',

    data(){
        return {
            details: {
                file : [],
                course_id : 0,
                id : 0
            },
            next : {
                course_id : 0,
                topic_id : 0,
                assignment : 0
            }
        }
    },

    mounted(){
        if(!this.$route.query.course || !this.$route.query.assignment){
            return;
        }
        this.details.course_id = this.$route.query.course;
        this.details.assignment_id = this.$route.query.assignment;
        this.init();
    },

    methods : {
        
        init : function(){
            axios.get(`api/assignment/${this.$route.query.course}/${this.$route.query.assignment}`).then(
                (res) => {
                    if(res.data && res.data.success != 0){
                        this.details = res.data;
                        this.details.file_link = axios.defaults.baseURL + this.details.file_link;
                        for(let i in this.details.submissions){
                            let x = this.details.submissions[i];
                            x.file_link = axios.defaults.baseURL + x.file_link;
                        }
                        axios.get(`api/courses/next/${this.details.course_id}/${this.details.id}`).then(
                            response => {
                                this.next = response.data;
                            }
                        )
                    }
                }
            );

        },

        fileChanged : function(event){
            if(event.target.files.length == 0){
                return;
            }
            this.details.file = event.target.files[0];
        },
        submit : function(){
            if(this.details.file.length == 0)
                return;
            let formData = new FormData();

            formData.append("file" , this.details.file);

            let data = {
                course_id : this.details.course_id,
                assignment_id : this.details.id,
            }

            formData.append("data", JSON.stringify(data));
            axios.post(`api/assignment/${data.course_id}/${data.assignment_id}`, 
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then( res => {
                console.log(res);
                this.init();
            })
        }
    }
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";
    .assignment{
        .title{
            font-size: $font30;
            display: flex;
            font-weight: $semibold;
            justify-content: center;
            align-items: center;
            &::before, &::after{
                display: block;
                background: $wing;
                content: '';
                width : 40px;
                height: 15px;
                margin : 0 20px;
            }
            margin : 50px;
        }
        .content{
            margin : 60px auto;
            width : 85%;
            border: solid 2px $greyLight;
            box-sizing: border-box;
            padding : 40px 60px;
            text-align: left;
            .assignment-title{
                font-size: $font20;
                font-weight: $semibold;
                margin : 15px 0;
            }
            .description{
                font-size: $font15;
                margin : 40px 0;
            }
            .downloads{
                a.item{
                    margin : 40px 0;
                    margin-bottom: 20px;
                    color : $black;
                    display: block;
                    border-top : solid 1px $greyLight;
                    border-bottom : solid 1px $greyLight;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 15px 0;
                    .file{
                        display: flex;
                        align-items: center;                        
                        font-size: $font20;
                        i{
                            font-size: 40px;
                            color: $orange;
                        }
                        span{
                            padding-left: 20px;
                        }                        
                    }
                    .file-details{
                        display: flex;
                        align-items: center;                        
                        .size{
                            color: $grey3;
                        }
                        .download-icon{
                            text-align: center;
                            border-radius: 100px;
                            $size : 55px;
                            font-size: 31px;
                            margin-left: 20px;
                            height : $size;
                            width : $size;
                            line-height: $size;
                            border: solid 1px $grey3;
                            display: block;
                        }
                    }
                }
            }

            .submitted{
                .item{
                    border-bottom : solid 1px $greyLight;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding : 20px 0;
                    .left{
                        .link{
                            color: $grey1;
                            font-size: $font20;
                        }
                        .date{
                            color: $grey3;
                        }
                    }
                    .right{
                        span{

                        }
                    }
                }
            }

            .upload{
                margin : 15px 0;
                display: flex;
                justify-content: space-between;
                input{
                    font-size: $font18;
                }
                a.upload-button{
                    background-color: $orange;
                    padding : 7px 20px;
                    border-radius: 10px;
                    font-size: $font18;
                    cursor: pointer;
                    i{
                        padding-right: 10px;                        
                    }
                }
            }
            .next-button{
                display: flex;
                justify-content: center;
                padding: 50px 0;
            }
        }
    }
</style>