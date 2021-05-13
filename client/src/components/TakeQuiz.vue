<template>
    <div class = "quiz">
        <div class = "header">
            <div class = "title">Take Quiz</div>
            <div class = "topic-title">Advanced Algorithm with c++</div>
            <div class = "mark-time">
                <div class = "mark">Mark : 30</div>
                <div class = "time">Time : 20 mins</div>
            </div>
        </div>

        <div class = "content">
            <div class = "questions">
                <div class = "item">
                    <div class = "question">
                        <div class = "statement">1: Which of the following is an example of a deterministic algorithm?</div>
                        <label class = "option">
                            <input type="radio" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="radio" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="radio" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="radio" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                    </div>
                    <div class = "point">4 Points</div>
                </div>
                <div class = "item">
                    <div class = "question">
                        <div class = "statement">2: Which of the following is an example of a deterministic algorithm?</div>
                        <label class = "option">
                            <input type="checkbox" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="checkbox" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="checkbox" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                        <label class = "option">
                            <input type="checkbox" name = "radio" /> 
                            <span class = "checkmark"><i class= "fa fa-check"></i></span> 
                            <span class = "text">Option 1</span>
                        </label>
                    </div>
                    <div class = "point">4 Points</div>
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

export default{
    name : 'TakeQuiz',
    data(){
        return{
        }
    }
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";

    .quiz{
        .header{
            margin : 50px auto;            
            width : 300px;
            .title{
                position : relative;
                font-weight: $semibold;
                font-size: $font30;
                line-height: 20px;
                margin : 20px 0;
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
                font-size: $font16;
                font-weight: $medium;
                width : 100%;
                background-color: $grey1;
                color : $white;
                border-radius: 10px;
                padding : 5px 0;
            }
            .mark-time{
                display: flex;
                justify-content: space-between;
                font-size: $font16;
                margin : 10px 0;
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