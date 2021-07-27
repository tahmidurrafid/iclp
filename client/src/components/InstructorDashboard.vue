<template>
    <div>
        <div class="heading"><img src="../assets/doubleLines.png" alt="">Instructor Dashboard<img class="flip" src="../assets/doubleLines.png" alt=""></div>
        <div class = "instructorDashboard">
            <div class = "leftBar">
                <div class = "item">
                    <div class = "wrap">
                        <div class = "heading"><span class = "marker"></span><span class = "text">Course Type</span></div>
                        <div class = "list">
                            <div class = "list-item link" @click="activePart='YourCourses'" :style="[activePart==='YourCourses'?{'background-color': '#7E7978','color':'white'}:{}]">
                                <span>Your Courses</span>
                            </div>
                            <div class = "list-item link" @click="activePart='PendingAssignments'" :style="[activePart==='PendingAssignments'?{'background-color': '#7E7978','color':'white'}:{}]">
                                <span>Pending Assignments</span>
                            </div>
                            <router-link to="/instructordashboard/createcourse" class = "list-item link" @click="activePart='CreateNewCourse'" :style="[activePart==='CreateNewCourse'?{'background-color': '#7E7978','color':'white'}:{}]">
                                <span> Create New Course </span>
                            </router-link>
                            <div class = "list-item link" @click="activePart='SeeReviews'" :style="[activePart==='SeeReviews'?{'background-color': '#7E7978','color':'white'}:{}]">
                                <span>See Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "yourCourses" v-if="activePart==='YourCourses'">

                <div class = "wrap">
                    <div class = "title"><span class = "marker"></span><span class = "text">Courses You have created</span></div>
                    <hr class="horizontalLine">
                    <div v-if="courseLoading" class = "loader">
                        <div class = "loading"></div>
                    </div>
                    <div class="course-list">
                        <div v-for = "(item, i) in courses" v-bind:key="i" class="list-item">
                            <span class="courseID">Course ID : {{item.id}}</span>
                            <span class="courseTitle">
                                <span class="course-title">{{item.title}}</span>
                                <router-link class = "button" :to = "'createcourse?id=' + item.id">View</router-link>
                            </span>
                            <hr class="horizontalLine">
                        </div>
                    </div>
                </div>
            </div>
            <div class="pendingAssignments" v-if="activePart==='PendingAssignments'">
               <div class = "wrap">
                    <div class = "title"><span class = "marker"></span><span class = "text">Submitted Assignments</span></div>
                    <hr class="horizontalLine">
                    <div class="course-list">
                        <div v-for = "(item, i) in assignments" v-bind:key="i" class="list-item">
                            <span class="courseID">Course: {{item.course_title}} (ID: {{item.course_id}})</span>
                            <span class="assignmentTitle">
                                <div class = "left">
                                    <a :href="item.file_link" 
                                    class="course-title">Assignment: {{item.assignment_title}} </a>
                                    <span class="assignmnet-title"> </span>
                                </div>
                                <div class = "right">
                                    <a :href="item.submission_link" class="download"><i class="fa fa-download"></i></a>
                                </div>
                            </span>
                            <span class="submittedby">
                                <span><i>Submitted By : (User_id) {{item.user_id}} </i></span>
                            </span>
                            <div class = "assignment-grade">
                                <div class = "mark">
                                    <input type ="text" v-model="item.mark" /> 
                                    <span class = "total">/ {{item.total_mark}} </span>
                                </div>
                                <div class = "grade_action">
                                    <div v-if="item.loading" class = "loader-small">
                                        <div class = "loading"></div>
                                    </div>

                                    <div class = "button solid small white" @click="updateMark(item, i)">Grade</div>
                                </div>
                            </div>
                            <hr class="horizontalLine">
                        </div>
                    </div>
                </div>
            </div>
            <div class="reviews" v-if="activePart==='SeeReviews'">
                <div class="wrap">
                    <div class="title"><span class="marker"></span><span class="text">Reviews</span></div>
                    <hr class="horizontalLine">
                    <div class="course-list">
                        <div v-for = "(item, i) in reviews" v-bind:key="i" class="list-item">
                            <span class="courseID">Course ID : {{item.id}}</span>
                            <span class="review">
                                <span class="image"><img src="../assets/blankprofilepicture.png"></span>
                                <span class="review-details">
                                     <div class="reviewer">{{item.name}}</div>
                                     <div class="review-description">{{item.review}}</div>
                                     <div class = "rating">
                                         <i v-for="n in 5" v-bind:key="n" class = "fa"
                                         :class="n <= item.rating? 'fa-star' : 'fa-star-o'"></i>
                                     </div>
                                </span>
                            </span>
                            <hr class="horizontalLine">
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
    name : 'InstructorDashboard',
    data(){
        return{
            activePart: 'YourCourses',
            assignments : [
            ] ,
            courses : [
            ]  ,
            courseLoading : true,
            reviews : [
                {courseID : 'CSE11100',name:'Rabeeb Ibrat',stars:5,description:'Even slightly believable. If you are going use a passage of Lorem Ipsum need some Proin gravida nibh vel velit auctor aliquet.aenean sollicitudin, lorem quis bibendum auctor...'},
                {courseID : 'CSE11100',name:'Rabeeb Ibrat',stars:5,description:'Even slightly believable. If you are going use a passage of Lorem Ipsum need some Proin gravida nibh vel velit auctor aliquet.aenean sollicitudin, lorem quis bibendum auctor...'},
                {courseID : 'CSE11100',name:'Rabeeb Ibrat',stars:5,description:'Even slightly believable. If you are going use a passage of Lorem Ipsum need some Proin gravida nibh vel velit auctor aliquet.aenean sollicitudin, lorem quis bibendum auctor...'},
                {courseID : 'CSE11100',name:'Rabeeb Ibrat',stars:5,description:'Even slightly believable. If you are going use a passage of Lorem Ipsum need some Proin gravida nibh vel velit auctor aliquet.aenean sollicitudin, lorem quis bibendum auctor...'}
            ]
        }
    },
    mounted(){
        axios.get('api/courses/for/instructor').then(res => {
            this.courses = res.data;
            this.courseLoading = false;
        });
        axios.get('api/assignment/all').then(res => {
            for(let i = 0; i < res.data.length; i++){
                res.data[i].submission_link = axios.defaults.baseURL + res.data[i].submission_link;
                res.data[i].file_link = axios.defaults.baseURL + res.data[i].file_link;
                if(res.data[i].mark == -1)
                    res.data[i].mark = null;
            }

            for(let i = 0; i < res.data.length; i++){
                res.data[i].loading = false;
            }

            this.assignments = res.data;
            console.log(this.assignments, "assignment")
        });
        axios.get('api/courses/instructor/reviews').then(res => {
            this.reviews = res.data
        })
    },
    methods : {
        updateMark : function(item, index){
            this.assignments[index].loading = true;
            console.log(this.assignments[index].loading)
            axios.put(`api/assignment/mark/${item.submission_id}`, item).then(
                res => {
                    console.log(res);
                    this.assignments[index].loading = false;                    
                }
            )
        }
    }
};
</script>

<style lang = "scss" scoped>

    @import "../scss/_variables.scss";

    .loader{
        padding : 100px 0;
        .loading{
            @include loader;
            margin : auto;
        }
    }
    .loader-small{
        padding-right: 10px;
        /* padding : 100px 0; */
        .loading{
            @include loader-small;
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
    .instructorDashboard{
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
                            margin : 15px 0;
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
        .yourCourses{
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
                        margin-bottom: 30px;
                    }
                    .horizontalLine{
                        background-color: #D2D2D2;
                        border: 0.5px solid #D2D2D2;
                        margin: 20px 0px;
                    }
                    .course-list{
                        .list-item{
                            margin : 20px 0px;
                            .courseID{
                                display: block;
                                font-size: 12px;
                                margin: 5px 0px;
                                color: #828282;
                                font-weight: 600;
                            }
                            .courseTitle{
                                display: flex;
                                justify-content: space-between;
                                .course-title{
                                    color: #707070;
                                    font-weight: 600;
                                }
                                .button{
                                    cursor: pointer;
                                    height: 35px;
                                    width : 100px;
                                    font-weight: 600;
                                    display: flex;
                                    background-color: #FC5A34;
                                    justify-content: center;
                                    align-items: center;
                                    border-radius: 5px;
                                }
                            }
                        }
                    }
                }
        }
        .pendingAssignments{
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
                        margin-bottom: 30px;
                    }
                    .horizontalLine{
                        background-color: #D2D2D2;
                        border: 0.5px solid #D2D2D2;
                        margin: 20px 0px;
                    }
                    .course-list{
                        .list-item{

                            .assignment-grade{
                                padding-top: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .mark{
                                    display: flex;
                                    align-items: center;
                                    input{
                                        border: solid 1px $grey2;
                                        width: 80px;
                                        text-align: center;
                                        border-radius: 5px;
                                        padding : 10px;
                                        display: block;
                                        box-sizing: border-box;
                                    }
                                    .total{
                                        display: block;
                                        padding-left: 10px;
                                    }
                                }
                                .grade_action{
                                    display: flex;
                                }
                                /* .grade */
                            }

                            margin : 20px 0px;
                            .courseID{
                                display: block;
                                font-size: 12px;
                                margin: 5px 0px;
                                color: #828282;
                                font-weight: 600;
                            }
                            .assignmentTitle{
                                display: flex;
                                justify-content: space-between;
                                margin: 10px 0px;
                                .course-title{
                                    color: #707070;
                                    font-weight: 600;
                                    width: 70%;
                                    transition: color .2s;
                                    &:hover{
                                        color: $orange;
                                    }                                    
                                }
                                .file-size{
                                    font-size: 10px;
                                    color: #9A9A9A;
                                    margin-top: 10px;
                                }
                                .download{
                                    cursor: pointer;
                                    height: 35px;
                                    width : 35px;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 16px;
                                    border-radius: 50px;
                                    background-color: #FBFBFB;
                                    border: 1px solid #D5D5D5;
                                    display: flex;
                                    color: $black;
                                }    
                            }
                            .submittedby{
                                display: flex;
                                justify-content: space-between;
                                font-size: 11px;
                                color: #828282;
                                font-weight: 500;
                            }   
                        }
                    }
                }
        }
        .reviews{
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
                        margin-bottom: 30px;
                    }
                    .horizontalLine{
                        background-color: #D2D2D2;
                        border: 0.5px solid #D2D2D2;
                        margin: 20px 0px;
                    }
                    .course-list{
                        .list-item{
                            margin : 20px 0px;
                            .courseID{
                                display: block;
                                font-size: 12px;
                                margin: 5px 0px;
                                color: #828282;
                                font-weight: 600;
                            }
                            .review{
                                display: flex;
                                justify-content: space-between;
                                margin: 10px 0px;
                                .image{
                                    width: 15%;
                                    img{
                                        height: auto;
                                        width: 100%;
                                        border: solid 3px rgb(175, 175, 182);
                                        border-radius: 50%;
                                    }
                                }
                                .review-details{
                                    width: 80%;
                                    font-size: 12px;
                                    color: #828282;
                                    .reviewer{
                                        font-weight: 600;

                                    }
                                    .review-description{
                                        margin: 10px 0px;
                                        font-style: italic;
                                        font-weight: 500;
                                    }
                                    .rating{
                                        color: #FC5A34;
                                    }
                                }

                               
                            }
                        }
                    }
                }
        }
    }
</style>