<template>
<div>
    <div class = "quiz" v-if="activePart=='takeQuiz'">
        <div class = "header">
            <div class = "title">Take Quiz</div>
            <div class = "topic-title">{{topicname}}</div>
            <div class = "mark">Total Marks : {{mark}}</div>
            <div class = "mark">Marks to Pass : {{passmark}}</div>
            <div class = "time">
                Time  
                <div class="clock">
                    <span> {{totalTime.hours}} : </span>
                    <span> {{totalTime.minutes}} : </span>
                    <span> {{totalTime.seconds}} </span>
                </div>
                
            </div>
        </div>

        <div class = "content">
            <div class = "questions" v-for="(item,i) in questions" v-bind:key="i">
                <div class = "item">
                    <div class = "question" >
                        <div class = "statement">{{i+1}}: {{item.statement}}</div>
                        <label class = "option" v-for="(option,j) in questions[i].options" v-bind:key="j">
                            <input type="radio" v-bind:name="'radio'+i" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">{{option}}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class = "submit">
                <button class = "button solid white" @click="submitquiz">
                    Submit
                </button>
            </div>
        </div>
    </div>
    <div class="success" v-if="activePart==='success'">
        <div>
            <span>Congratulations!! You got {{obtainedmark}}/{{mark}} .</span>
            <span class = "count"><i class="fa fa-check-circle"></i></span>
        </div>
    </div>
    <div class="fail" v-if="activePart==='fail'">
        <div>
            <span>You got {{obtainedmark}}/{{mark}} . Try again!!</span>
            <span class = "count"><i class="fa fa-times-circle"></i></span>
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
            obtainedmark:0,
            activePart : "takeQuiz",
            submitted:false,
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
                setInterval(this.handleTime,1000);
            }

        });
    },
    methods:{
        handleTime:function()
        {
            if(this.totalTime.seconds>0)
            {
                this.totalTime.seconds--;
                return;
            }
            if(this.totalTime.minutes>0)
            {
                this.totalTime.minutes--;
                this.totalTime.seconds=59;
                return;
            }
            if(this.totalTime.hours>0)
            {
                this.totalTime.hours--;
                this.totalTime.minutes=59;
                this.totalTime.seconds=59;
                return;
            }
            if(!this.submitted)
            {
                this.submitted=true;
                this.submitquiz();
            }
            
        },
        submitquiz:function()
        {
            this.obtainedmark=0;
            for(let i=0;i<this.mark;i++)
            {
                let options=document.getElementsByName("radio"+i);
                for(let j=0;j<options.length;j++)
                {
                    if(options[j].checked)
                    {
                        if(j==this.questions[i].correctdOption)
                        {
                            this.obtainedmark++;
                        }
                    }

                }
            }
            let quizResult={ 
                userId:7,
                quizId:this.$route.query.id,
                obtainedMark:this.obtainedmark
            }
            axios.put( 'api/quiz/userquiz',quizResult
                    ).then(response=>{
                        if(response.data!="error")
                        {
                            if(this.obtainedmark>=this.passmark)
                            {
                                this.activePart="success"
                            }
                            else
                            {
                                this.activePart="fail"
                            }
                        }
                    }).catch(err=>{
                        console.log(err);

                });
        }
    }
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";
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
    .quiz{
        .header{
            margin : 50px auto; 
            text-align: center;           
            .title{
                 @include title;
                 margin-bottom: 10px;
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
                .clock{
                    display: inline-block;
                    background-color: #dbdbdb;
                    border: 2px solid #6b6b6b;
                    border-radius: 3px;
                    padding:1px 5px;
                    margin-left: 5px;
                    color: #252525;
                }
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
                text-align: center;
                padding : 50px 60px 50px 60px;
            }
        }
    }

</style>