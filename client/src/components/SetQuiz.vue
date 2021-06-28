<template>
  <div class = "setquiz">
      <div class = "title">Set New Quiz</div>
      <div class = "content">
          <div class = "quiz-title">Create Question (Quiz ID : 999456)</div>
          <div class = "set-time">
              <a class = "has-time selected">Time Limit</a>
              <select>
                  <option selected>hours</option>
              </select>
              <select>
                  <option selected>mins</option>
              </select>
              <select>
                  <option selected>seconds</option>
              </select>
          </div>
          <div class = "questions">
                <div class = "item">
                    <div class = "statement">
                        <div class = "left">
                            <span class = "seq">1</span>
                            <span>How object oriented programming concept is helpful in Software Development?</span>
                        </div>
                        <div class = "right">
                            <a class = "edit">
                                <i class = "fa fa-edit"></i>
                            </a>
                            <a class = "edit">
                                <i class = "fa fa-trash-o"></i>
                            </a>
                        </div>
                    </div>
                    <div class = "options">
                        <div class = "mark">
                            Mark: <input type="text" />
                        </div>
                        <div class = "option-list">
                            <div class = "option">
                                <span class = "seq">a</span>
                                <span>Two dimensional Array</span>
                            </div>
                            <div class = "option">
                                <span class = "seq">b</span>
                                <span>Two dimensional Array</span>
                            </div>
                            <div class = "option selected">
                                <span class = "seq">c</span>
                                <span>Two dimensional Array</span>
                            </div>
                        </div>
                        <div class = "add">
                            <a class = "add-button">
                                <i class = "fa fa-plus-circle"></i>
                                Add Option
                            </a>
                        </div>                        
                    </div>

                    <div class = "add">
                        <a class = "add-button">
                            <i class = "fa fa-plus-circle"></i>
                            Add Option
                        </a>
                    </div>                

                </div>
          </div>
      </div>
  </div>

</template>

<script>
export default {
  name: 'SetQuiz',

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
                            a{
                                font-size: $font18;
                                display: block;
                                color: $black;
                                margin-left: 30px;
                                cursor: pointer;
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
                            }
                        }
                        .add{
                            margin : $margin;
                        }
                    }
                    .add{
                        margin : $margin;
                    }
                }
            }
        }
    }
</style>
