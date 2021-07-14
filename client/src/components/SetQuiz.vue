<template>
    <div>
        <div class = "setquiz" v-if="activePart=='setQuiz'">
            <div class = "title">Set New Quiz</div>
            <div class = "content">
                <div class = "quiz-title">Create Question</div>
                <div class = "set-time">
                    <a class = "has-time selected">Time Limit</a>
                    <select v-model="hours" style="text-align-last:center;font-weight:600;">
                            <option disabled value="0">Hours</option>
                            <option v-for="i in 5" v-bind:value="i" v-bind:key="i">{{i}}</option>
                    </select>
                    <select v-model="minutes" style="text-align-last:center;font-weight:600;">
                            <option disabled value="0">Minutes</option>
                            <option v-for="i in 59" v-bind:value="i" v-bind:key="i">{{i}}</option>
                    </select>
                    <select v-model="seconds" style="text-align-last:center;font-weight:600;">
                            <option disabled value="0">Seconds</option>
                            <option v-for="i in 59" v-bind:value="i" v-bind:key="i">{{i}}</option>
                    </select>
                </div>
                <div class = "set-time">
                    <a class = "has-time selected">Number of questions to display on a single quiz</a>
                    <select v-model="displayQus" style="text-align-last:center;font-weight:600;">
                            <option disabled value="0">Select</option>
                            <option v-for="i in 30" v-bind:value="i" v-bind:key="i">{{i}}</option>
                    </select>
                </div>
                <div class = "set-time">
                    <a class = "has-time selected">Number of correct answer needed to pass</a>
                    <select v-model="passmark" style="text-align-last:center;font-weight:600;">
                            <option disabled value="0">Select</option>
                            <option v-for="i in 30" v-bind:value="i" v-bind:key="i">{{i}}</option>
                    </select>
                </div>
                <div class = "questions" v-for="(item,i) in questions" v-bind:key="i">
                        <div class = "item">
                            <div class = "statement">
                                <div class = "left">
                                    <span class = "seq">{{i+1}}</span>
                                    <span>{{questions[i].statement}}</span>
                                </div>
                                <div class = "right">
                                    <span class = "edit" @click="editQuestions[i].visibility=!editQuestions[i].visibility">
                                        <i class = "fa fa-edit"></i>
                                    </span>
                                    <span class = "edit" @click="removeQus(i)">
                                        <i class = "fa fa-trash-o"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="catagoryInput" v-if="editQuestions[i].visibility">
                                <div class="textinput" >
                                    <input type = "text" v-model="editQuestions[i].newQus" placeholder="Set Question Statement..."/>
                                </div>
                                <div class="catagoryAdd">
                                    <button class="button white solid small" @click="updateQuestion(i)">Set</button>
                                </div>
                            </div>
                            <div class = "options">
                                <div class = "option-list" v-for="(option,j) in questions[i].options" v-bind:key="j">
                                    <div class = "option" @click="questions[i].correctdOption=j">
                                        <span v-bind:class="['seq',(questions[i].correctdOption==j ? 'correctAns' : '')]">{{String.fromCharCode(97+j)}}</span>
                                        <span>{{option}}</span>
                                    </div>
                                </div>
                                <div class="catagoryInput" v-if="tempOptions[i].visibility">
                                    <div class="textinput" >
                                        <input type = "text" v-model="tempOptions[i].newOption" placeholder="Add Option..."/>
                                    </div>
                                    <div class="catagoryAdd">
                                        <button class="button white solid small large" @click="updateOption(i)">Add</button>
                                    </div>
                                </div> 
                                <div class = "add">
                                    <span class = "add-button" @click="tempOptions[i].visibility=!tempOptions[i].visibility">
                                        <i class = "fa fa-plus-circle"></i>
                                        Add Option
                                    </span>
                                </div>                       
                            </div>
                        </div>
                </div>
                <div class = "add">
                    <span class = "add-button" @click="addQus">
                        <i class = "fa fa-plus-circle"></i>
                        Add Question
                    </span>
                </div> 
                <div class="setQuiz">
                    <button class="button white solid large" @click="submitQuiz">Set Quiz</button>
                </div>
            </div>
            <div class="error" v-if="errorType=='option'">
                <div>
                    * Please select a correct answer for all the questions
                </div>
            </div>
            <div class="error" v-if="errorType=='displayQus'">
                <div>
                    * Please add at least {{displayQus}} questions
                </div>
            </div>
            <div class="error" v-if="errorType=='displayQusZero'">
                <div>
                    * Please select the number of the questions to be display
                </div>
            </div>
            <div class="error" v-if="errorType=='passmark'">
                <div>
                    * Pass mark can't be greater than total marks.
                </div>
            </div>
            <div class="error" v-if="errorType=='timeZero'">
                <div>
                    * Please give time for the quiz
                </div>
            </div>
        </div>
        <div class="success" v-if="activePart==='success'">
            <div>
                <span>Quiz setting successful</span>
                <span class = "count"><i class="fa fa-check-circle"></i></span>
            </div>
        </div>
        <div class="fail" v-if="activePart==='fail'">
            <div>
                <span>Sorry quiz could not be set</span>
                <span class = "count"><i class="fa fa-times-circle"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SetQuiz',
    data(){
        return { 
            questions : [],
            editQuestions : [],
            tempOptions :[],
            displayQus : 0,
            hours : 0,
            minutes : 0,
            seconds : 0,
            errorType : "",
            activePart : "setQuiz",
            passmark : 0,
        }
    },
    methods:{
        submitQuiz:function(){
            this.errorType="";
            for(let i=0;i<this.questions.length;i++)
            {
                if(this.questions[i].correctdOption<0)
                {
                    this.errorType="option"
                }
            }
            if(this.displayQus>this.questions.length)
            {
                this.errorType="displayQus"
            }
            if(this.displayQus==0)
            {
                this.errorType="displayQusZero"
            }
            if(this.passmark>this.displayQus)
            {
                this.errorType="passmark"
            }
            if(this.hours==0&&this.minutes==0&&this.seconds==0)
            {
                this.errorType="timeZero"
            }
            if(this.errorType=="")
            {
                let quiz={
                    totalTime:{
                        hours:this.hours,
                        minutes:this.minutes,
                        seconds:this.seconds
                    },
                    displayQus:this.displayQus,
                    questions:this.questions,
                    passmark:this.passmark
                };
                let formData = new FormData();
                formData.append('courseID',this.$route.query.courseID);
                formData.append('topicID',this.$route.query.topicID);
                formData.append('quiz',JSON.stringify(quiz));
                axios.post( 'api/quiz/setquiz',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    ).then(response=>{
                        if(response.data=="error")
                        {
                            this.activePart='fail';
                        }
                        else
                        {
                            this.activePart='success';
                        }
                        console.log(response);
                    }).catch(err=>{
                        this.activePart='fail';
                        console.log(err);

                });
            }

        },
        addQus:function(){
            let qus={statement:"Set Question Statement",options:[],correctdOption:-1};
            this.questions.push(qus);
            let editQus={newQus:"",visibility:false};
            this.editQuestions.push(editQus);
            let tempOption={newOption:"",visibility:false}
            this.tempOptions.push(tempOption);
        },
        removeQus:function(i){
            this.questions.splice(i,1);
            this.editQuestions.splice(i,1);
            this.tempOptions.splice(i,1);
        },
        updateQuestion:function(i){
            this.questions[i].statement=this.editQuestions[i].newQus;
            this.editQuestions[i].newQus="";
            this.editQuestions[i].visibility=false;
        },
        updateOption:function(i){
            this.questions[i].options.push(this.tempOptions[i].newOption);
            this.tempOptions[i].newOption="";
            this.tempOptions[i].visibility=false;
        }
    }
    

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss" scoped>
    @import "../scss/_variables.scss";

    $margin : 25px 0;

    @mixin seq{
        background-color: $black;
        line-height: 22px;
        height : 22px;
        text-align : center;
        width : 22px;
        font-size: $font12;
        color: $white;
        border-radius: 50px;        
        margin-right: 20px;
        cursor: pointer;
    }
    .success{
        min-height : 30px;
        background-color: #2dda6f83;
        color : #255a3d;
        display: flex;
        padding :5px 30px;
        justify-content: space-between;
        font-size: 25px;
        font-weight: 600;
        margin : 30px;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        .count{
            margin-left: 30px;
            width : 20px;
            height: 20px;
            border-radius: 100px;
        }
    }
    .fail{
        min-height : 30px;
        background-color: #eb6a6a7a;
        color : #b10600;
        display: flex;
        padding :5px 30px;
        justify-content: space-between;
        font-size: 25px;
        font-weight: 600;
        margin : 30px;
        align-items: center;
        text-align: center;
        border-radius: 5px;
        .count{
            margin-left: 30px;
            width : 20px;
            height: 20px;
            border-radius: 100px;
        }
    }

    .setquiz{
        .title{
            @include title;
        }
        .content{
            @include content;
            .quiz-title{
                font-size: $font25;
                font-weight: $semibold;
            }
            .set-time{
                margin : $margin;
                display: flex;
                .has-time.selected{
                    background-color: $orange;
                    color : $white;
                }
                a, select{
                    color: $black;
                    border: solid 1px $grey3;
                    background-color : $greyLight;
                    line-height : 40px;
                    padding : 0 15px;
                    margin-right : 20px; 
                    border-radius: 10px;
                    font-size: $font15;   
                }
            }
            .questions{
                .item{
                    margin : $margin;                                    
                    .statement{
                        margin : $margin;
                        background-color: $greyLight;
                        border : solid 1px $grey3;
                        box-sizing: border-box;
                        padding : 10px 20px;
                        border-radius: 10px;
                        display: flex;
                        justify-content: space-between;
                        .left{
                            display: flex;
                            justify-content: center;
                            span{
                                display: block;
                            }
                            .seq{
                                @include seq;
                            }
                        }
                        .right{
                            display: flex;
                            span{
                                font-size: $font18;
                                display: block;
                                color: $black;
                                margin-left: 30px;
                                cursor: pointer;
                            }
                        }
                    }
                    .catagoryInput{
                        margin-top: 30px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        .textinput{
                            width: 88%;
                            input{
                                font-size: 16px;
                                line-height: 35px;
                                width: 100%;
                                background-color: rgb(238, 238, 238);
                                border: 1px solid rgb(136, 136, 136);
                                border-radius: 5px;
                            }
                            ::placeholder{
                                padding-left: 10px;
                            }
                        }
                        .catagoryAdd{
                            width: 8%;
                            margin-right: 20px;
                            .button{
                                width: 100%;
                                font-size: 16px;
                            }
                        }
                    }
                    .options{
                        margin-left: 80px;
                        .mark{
                            margin : $margin;
                            input{
                                @include grey-area;
                                outline : none;
                                padding : 5px 0;
                                width : 50px
                            }
                        }
                        .option-list{
                            .option{
                                display: flex;
                                margin : 20px 0;
                                &.selected .seq{
                                    background-color : $orange;
                                }
                                .seq{
                                    @include seq;
                                    display: block;
                                }
                                .correctAns{
                                    background-color: $orange;

                                }
                            }
                        }
                        .add{
                            margin : $margin;
                        }
                    }
                    .add{
                        margin : $margin;
                    }
                    .catagoryInput{
                        margin-top: 30px;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        .textinput{
                            width: 82%;
                            input{
                                font-size: 16px;
                                line-height: 35px;
                                width: 100%;
                                background-color: rgb(238, 238, 238);
                                border: 1px solid rgb(136, 136, 136);
                                border-radius: 5px;
                            }
                            ::placeholder{
                                padding-left: 10px;
                            }
                        }
                        .catagoryAdd{
                            width: 12%;
                            .button{
                                width: 100%;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .setQuiz{
                margin-top: 50px;
                text-align: center;
                .large{
                    font-size: 16px;
                    font-weight: $semibold;
                }
                
            }
        }
        .error{
            text-align: center;
            color: rgb(255, 0, 0);
            margin-bottom: 100px;
            font-size: 18px;
            font-weight: $semibold;
        }
    }
</style>
