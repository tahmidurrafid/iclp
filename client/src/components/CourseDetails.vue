<template>
    <div>
        <div class="heading"><img src="../assets/doubleLines.png" alt="">Course Details<img class="flip" src="../assets/doubleLines.png" alt=""></div>
        <div class = "courseDetails">
            <div class = "leftBar">
                <div class = "item">
                    <div class = "wrap">
                        <div class = "heading"><span class = "marker"></span><span class = "text">Course Type</span></div>
                        <div class = "list">
                            <div class = "list-item link" @click="activePart='CourseDescription'">
                                <span>Course Description</span>
                                <span class = "count"  v-if="activePart==='CourseDescription'"><i class="fa fa-check-circle"></i></span>
                            </div>
                            <div class = "list-item link" @click="activePart='CourseContents'">
                                <span>Course Contents</span>
                                <span class = "count"  v-if="activePart==='CourseContents'"><i class="fa fa-check-circle"></i></span>
                            </div>
                            <div class = "list-item link" @click="activePart='AboutInstructor'">
                                <span>About Instructor</span>
                                <span class = "count"  v-if="activePart==='AboutInstructor'"><i class="fa fa-check-circle"></i></span>
                            </div>
                            <div class = "list-item link" @click="activePart='EnrollCourse'">
                                <span>Enroll Course</span>
                                <span class = "count"  v-if="activePart==='EnrollCourse'"><i class="fa fa-check-circle"></i></span>
                            </div>
                            <div class = "list-item link" @click="activePart='reviewCourse'">
                                <span>Review Course</span>
                                <span class = "count"  v-if="activePart==='reviewCourse'"><i class="fa fa-check-circle"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "courseDescription" v-if="activePart==='CourseDescription'">

                <div class = "wrap">

                    <div class = "loader" v-if="loading">
                        <div class = "loading"></div>
                    </div>

                    <div class = "title"><span class = "marker"></span><span class = "text">{{details.title}}</span></div>
                    <div class = "description">
                        {{details.brief}}
                    </div>
                    <br>
                    <div class = "line">

                        <div class = "rating">
                            <span>Rating  </span>
                            <i v-for="n in 5" v-bind:key="n" class = "fa fa-star"></i>
                        </div>
                    </div>
                    <table class="information">
                        <tr class="infoitem">
                            <td class="infotitle">Instructor</td>
                            <td class="infodetails">{{details.i_name}}</td>
                        </tr>
                        <tr class="infoitem">
                            <td class="infotitle">Total time</td>
                            <td class="infodetails">12 hours 37 minutes</td>
                        </tr>
                        <tr class="infoitem">
                            <td class="infotitle">Number of quizes</td>
                            <td class="infodetails">08</td>
                        </tr>
                        <tr class="infoitem">
                            <td class="infotitle">Course Type</td>
                            <td class="infodetails">Premium</td>
                        </tr>
                        <tr class="infoitem">
                            <td class="infotitle">Number of Assignments</td>
                            <td class="infodetails">03</td>
                        </tr>
                    </table>

                </div>
            </div>
            <div class="courseContents" v-if="activePart==='CourseContents'">
                <div class="wrap">
                    <div class="title"><span class="marker"></span><span class="text">Course Contents</span></div>
                    <div class="list">
                        <div v-for = "(item, i) in details.topics" v-bind:key="i" class = "list-item" @click="item.shouldExpand=!item.shouldExpand">
                            <div class="contentTitle">
                                <span>{{item.title}}</span>
                                <!-- <span class = "count" v-if="!item.shouldExpand"><i class="fa fa-chevron-circle-up"></i></span>
                                <span class = "count" v-if="item.shouldExpand"><i class="fa fa-chevron-circle-down"></i></span> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="aboutInstructor" v-if="activePart==='AboutInstructor'">
                <div class="wrap">
                    <div class="title"><span class="marker"></span><span class="text">About Instructor</span></div>
                    <div class="content">
                        <div class="image">
                            <img src="../assets/blankprofilepicture.png">
                        </div>
                        <div class="instructorDetails">
                            <div class="instructorname">
                                <div><b>Instructor</b></div>
                                <div>{{details.i_name}}</div>
                            </div>
                            <div class="instructorDescription">
                                Object-Oriented programming (OOP) refers to a type of programming in which programmers define the data type of a data structure and the type of operations that can be applied to the data structure.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="enrollCourse" v-if="activePart==='EnrollCourse'">
                <div class="wrap">
                    <div class="title"><span class="marker"></span><span class="text">Enroll Course</span></div>
                    <div class="content">
                        <div class="enrolltext">
                            You can enroll into this course now or save it for later.
                        </div>
                        <div class="buttons">
                            <div v-if="!isEnrolled" class="enrollButton" @click="enroll()">
                                <div>Enroll Now</div>
                                <div>
                                    <i class="fa fa-chevron-circle-right"></i>
                                </div>
                            </div>
                            <router-link v-if="isEnrolled" :to = "'/course/complete?id=' + details.id">                            
                                <div class="enrollButton" @click="enroll()">
                                    <div>View Course</div>
                                    <div>
                                        <i class="fa fa-chevron-circle-right"></i>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reviewCourse" v-if="activePart==='reviewCourse'">
                <div class="wrap">
                    <div class="title"><span class="marker"></span><span class="text">Review</span></div>
                    <div class="content">
                        <div class="rating">
                            <i v-for="i in 5" v-bind:key="i" class = "fa" 
                            :class="i <= rating ? 'fa-star' : 'fa-star-o'" @click="changeRating(i)"></i>
                        </div>
                        <textarea class = "review" v-model="review" placeholder="Your review Here..."></textarea>
                        <div class="buttons">
                            <div class="enrollButton" @click="submitReview()">
                                <div>Submit</div>
                                <div>
                                    <i class="fa fa-chevron-circle-right"></i>
                                </div>
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
    name : 'CourseDetails',
    data(){
        return{
            activePart: 'CourseDescription',
            details : {
            },
            isEnrolled : false,
            loading : true,
            rating : 4,
            review : ""
        }
    },
    mounted(){
        axios.get('api/courses/' + this.$route.query.id).then( 
            response => {
                this.details = response.data[0];
                this.loading = false;
                console.log(this.details)
            }
        )

        axios.get('api/courses/enrolled/' + this.$route.query.id).then(
            (res) => {
                console.log("Enrollment");
                console.log(res);
                if(res.data.enrolled){
                    this.isEnrolled = true;
                }
            }
        )
    },

    methods : {
        enroll : function(){
            console.log("Enrolling");
            axios.post('api/courses/enroll/' + this.details.id).then( (res) => {
                if(res.data.success){
                    this.details.enrolled = true;   
                    this.isEnrolled = true;
                }
            })
        },
        changeRating : function(index){
            this.rating = index;
        },
        submitReview : function(){
            axios.post('api/courses/review', 
                {
                    rating : this.rating, 
                    review : this.review,
                    id : this.details.id
                } 
                ).then(
                res => {
                    console.log(res);
                }
            )
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

    .marker{
        display: block;
        height : 3px;
        width : 25px;
        background: linear-gradient(90deg, rgba(252,90,52,1) 0%, rgba(252,90,52,1) 60%, rgba(255,255,255,0) 60.1%, rgba(255,255,255,0) 80%, rgba(252,90,52,1) 80.1%);        
    }
    .heading{
        padding-top: 70px;
        font-weight: 600;
        font-size: 29px;
        padding-bottom: 30px;
        text-align: center;
        img{
        width: 60px;
        height: 18px;
        padding-right: 20px;
        }
        .flip{
            transform: scaleX(-1);
        }
    }
    .courseDetails{
        display: flex;
        box-sizing: border-box;
        padding : 10px 70px 0;
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
                                color: #FC5A34;
                                border-radius: 100px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                        .link{
                            cursor: pointer;
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
        .courseDescription{
            text-align: left;
            width: 70%;
            padding : 0 0 0 50px;
                .wrap{
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
                            span{
                                font-weight: 600;
                                font-size: 15px;
                                color: #828282;
                            }
                            
                        }
                    }
                    .information{
                        font-size: 14px;
                        padding : 5px 0;
                        margin-top: 20px;
                        width: 100%;
                        .infoitem{
                            padding : 5px 0;
                            .infotitle{
                                width: 40%;
                                font-weight: bold;
                            }
                            .infodetils{
                                width: 50%;
                                text-align: left;
                            }

                        }

                    }
                }
        }
        .courseContents{
            text-align: left;
            width: 70%;
            padding : 0 0 0 50px;
                .wrap{
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
                    .list{
                        display: block;
                        .list-item{
                            .contentTitle{
                                min-height : 45px;
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
                                clear: both;
                                .count{
                                    width : 20px;
                                    height: 20px;
                                    color: #FC5A34;
                                    border-radius: 100px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                }
                            }
                            .sublist{
                                display: block;
                                width: 90%;
                                float: right;
                                .sub-list-item{
                                    min-height : 45px;
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

                                }
                            }
                            
                        }
                        .link{
                            cursor: pointer;
                        }
                    }
                }
        }
        .aboutInstructor{
             text-align: left;
            width: 70%;
            padding : 0 0 0 50px;
                .wrap{
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
                    .content{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10vh;
                        .image{
                            width: 30%;
                            img{
                                height: auto;
                                width: 80%;
                                border: solid 5px rgb(175, 175, 182);
                                border-radius: 50%;
                            }
                        }
                        .instructorDetails{
                            width: 60%;
                            .instructorname
                            {
                                width: 70%;
                                display: flex;
                                font-size: 16px;
                                justify-content: space-between;

                            }
                            .instructorDescription{
                                margin: 30px 0px;
                                font-size: 14px;
                            }
                        }
                    }
                }

        }
        .enrollCourse{
            text-align: left;
            width: 70%;
            padding : 0 0 0 50px;
                .wrap{
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
                    .content{
                        padding : 5px 0;
                        margin-top: 20px;
                        .enrollText{
                            font-size: 18px;
                            padding : 5px 0;
                            margin-top: 20px;
                            width: 100%;
                        }
                        .buttons{
                            display: flex;
                            justify-content: space-between;
                            padding : 5px 0;
                            margin-top: 50px;
                            font-size: 18px;
                            min-width: 310px;
                            max-width: 450px;
                            .enrollButton{
                                width: 140px;
                                background-color: #FC5A34;
                                font-weight: bold;
                                padding : 7px 20px;
                                display: flex;
                                justify-content: space-between;
                                color : white;
                                cursor: pointer;
                            }
                            .saveButton{
                                width: 170px;
                                background-color: rgba(240, 240, 240, 0.521);
                                color: #FC5A34;
                                font-weight: bold;
                                padding : 7px 20px;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                }
        }

        .reviewCourse{
            text-align: left;
            width: 70%;
            padding : 0 0 0 50px;
                .wrap{
                    border: solid 3px #E9E9E9;
                    padding : 22px 50px 22px 70px;
                    box-sizing: border-box;
                    .rating{
                        i{
                            color: $orange;
                            font-size: $font20;
                            padding-right: 10px;
                            transition : transform .3s;
                            &:hover{
                                transform: scale(1.2);
                            }
                        }
                    }
                    .review{
                        display: block;
                        box-sizing: border-box;
                        width : 100%;
                        margin-top : 20px;
                        padding : 15px;
                    }


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
                    .content{
                        padding : 5px 0;
                        margin-top: 20px;
                        .enrollText{
                            font-size: 18px;
                            padding : 5px 0;
                            margin-top: 20px;
                            width: 100%;
                        }
                        .buttons{
                            display: flex;
                            justify-content: space-between;
                            padding : 5px 0;
                            margin-top: 50px;
                            font-size: 18px;
                            min-width: 310px;
                            max-width: 450px;
                            .enrollButton{
                                width: 140px;
                                background-color: #FC5A34;
                                font-weight: bold;
                                padding : 7px 20px;
                                display: flex;
                                justify-content: space-between;
                                color : white;
                                cursor: pointer;
                            }
                            .saveButton{
                                width: 170px;
                                background-color: rgba(240, 240, 240, 0.521);
                                color: #FC5A34;
                                font-weight: bold;
                                padding : 7px 20px;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                }
        }

    }
</style>