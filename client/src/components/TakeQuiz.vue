<template>
    <div class = "quiz">
        <div class = "header">
            <div class = "title">Take Quiz</div>
            <span class = "topic-title">{{topicname}}</span>
            <div class = "mark">Total Marks : {{mark}}</div>
            <div class = "mark">Marks to Pass : {{passmark}}</div>
            <div class = "time">
                Time : 
                <span v-if="totalTime.hours!=0"> {{totalTime.hours}} Hours </span>
                <span v-if="totalTime.minutes!=0"> {{totalTime.minutes}} Minutes </span>
                <span v-if="totalTime.seconds!=0"> {{totalTime.seconds}} Seconds </span>
            </div>
        </div>

        <div class = "content">
            <div class = "questions" v-for="(item,i) in questions" v-bind:key="i">
                <div class = "item">
                    <div class = "question" >
                        <div class = "statement">{{i+1}}: {{item.statement}}</div>
                        <label class = "option" v-for="(option,j) in questions[i].options" v-bind:key="j">
                            <input type="radio" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">{{option}}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class = "submit">
                <a class = "button solid white">
                    Submit
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name : 'TakeQuiz',
    data(){
        return{
            questions : [],
            totalTime:{hours:0,minutes:0,seconds:0},
            topicname:"",
            mark:0,
            passmark:0,
        }
    },
    mounted(){
        axios.get('api/quiz/quizdata/'+this.$route.query.id).then( response => {
            if(response.data!="error")
            {
                let quiz=JSON.parse(response.data[0].quiz);
                this.totalTime=quiz.totalTime;
                for(let i=0;i<quiz.displayQus;i++)
                {
                    let random = Math.floor(Math.random() * quiz.questions.length);
                    this.questions.push(quiz.questions[random]);
                    quiz.questions.splice(random,1);
                }
                this.mark=quiz.displayQus;
                this.passmark=quiz.passmark;
                axios.get('api/quiz/topicname/'+response.data[0].course_id+'/'+response.data[0].topic_id).then(res=>{
                    this.topicname=res.data[0].title;
                });
            }

        });
    }
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";

    .quiz{
        .header{
            margin : 50px auto; 
            text-align: center;           
            .title{
                position : relative;
                font-weight: $semibold;
                font-size: $font30;
                line-height: 20px;
                margin : 20px 0;
                text-align: center;
                &::before, &::after{
                    top : 15%;
                    display: block;
                    background: $wing;
                    content: '';
                    width : 40px;
                    height: 70%;
                    position: absolute;
                }
                &:before{
                    left : 0;
                }
                &:after{
                    right : 0;
                }
            }
            .topic-title{
                display: inline-block;
                text-align: center;
                font-size: 20px;
                font-weight: $medium;
                background-color: $grey1;
                color : $white;
                border-radius: 10px;
                padding : 2px 20px;
            }
            .mark,.time{
                text-align: center;
                font-size: 20px;
                margin : 10px 0;
                font-weight: $semibold;
            }
            
        }

        .content{
            border : solid 3px $greyLight;
            width : 80%;
            margin : auto;

            .questions{
                box-sizing: border-box;
                padding : 50px 50px 20px 50px;
                .item{
                    display: flex;
                    margin : 10px 30px;
                    .question{
                        text-align: left;
                        width: 100%;
                        .statement{
                            font-size: $font18;
                            font-weight: $semibold;
                        }
                        .option{
                            margin : 20px 50px;
                            padding : 0 10px;
                            box-sizing: border-box;
                            display: flex;
                            position : relative;
                            align-items: center;
                            input{
                                opacity: 0;
                                position: absolute;
                                right: 0;
                            }
                            input[type='checkbox'] ~ .checkmark{
                                border-radius: 0;
                            }
                            .checkmark{
                                border-radius: 100px;
                                height: 28px;
                                width : 28px;
                                border: solid 2px $grey3;
                                text-align: center;
                                box-sizing: border-box;
                                line-height: 28px;
                                font-size: 14px;
                                i{
                                    display: none;
                                    color: $white;
                                }
                            }
                            input:checked ~ .checkmark{
                                background-color: $orange;
                                border : none;
                                i{
                                    display: inline-block;
                                }
                            }
                            .text{
                                font-size: $font15;
                                padding : 0 20px
                            }
                        }
                    }
                    .point{
                        width : 70px;
                        text-align: right;
                        color: $grey3;
                    }
                }
            }
            .submit{
                display: flex;
                justify-content: flex-end;
                padding : 10px 60px 50px 60px;
            }
        }
    }

</style>