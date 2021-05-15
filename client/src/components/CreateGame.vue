<template>
    <div class = "create-game">
        <div class = "title">Create Game</div>
        <div class = "content">
            <div class = "game-title">
                <input type="text" placeholder="Game Title Goes Here" />
            </div>
            <div class = "description">
                <span>Description</span>
                <textarea placeholder="Put Your Game Description Here">

                </textarea>
            </div>
            <div class = "add">
                <a class = "add-button">
                    <i class = "fa fa-plus-circle"></i>
                    Add Cover Photo
                </a>
            </div>                
            <div class = "add">
                <a class = "add-button">
                    <i class = "fa fa-plus-circle"></i>
                    Upload Game
                </a>
            </div>
            <div class = "submit">
                <a class = "button white solid">Submit</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'CreateGame'
}
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";

    .create-game{
        .title{
            @include title;
        }
        .content{
            @include content;
            text-align: left;
            &>*{
                margin : 20px 0;
            }
            .game-title{
                input{
                    font-size: $font25;
                    font-weight: $semibold;
                    width : 100%;
                    display: block;
                    outline : none;
                    border : none;
                    text-align: left;
                }
            }
            .description{
                span{
                    font-size: $font16;
                    padding : 10px;
                    border : solid 1px $grey3;
                    background-color: $greyLight;
                    color : $black;
                    display: inline-block;
                }
                textarea{
                    display: block;
                    width : 100%;
                    min-height: 100px;
                    text-align: left;
                    box-sizing: border-box;
                    padding : 20px;
                    font-size: $font15;
                    outline : none;
                    border : solid 1px $grey3;
                }
            }
            .submit{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
</style>