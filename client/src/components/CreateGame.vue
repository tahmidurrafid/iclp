<template>
<div>
    <div class = "create-game" v-if="activePart==='create'">
        <div class = "title">Create Game</div>
        <div class = "content">
            <div class = "game-title">
                <input type="text" v-model="game.title" placeholder="Game Title Goes Here" />
            </div>
            <div class = "description">
                <span>Description</span>
                <textarea v-model="game.description" placeholder="Put Your Game Description Here">

                </textarea>
            </div>
            <div class = "add">
                <label class = "add-button">
                    Add Cover Photo
                </label>
                <input class = "add-file" type="file" id="pic" ref="pic" v-on:change="handlePicUpload()"/>
            </div>                
            <div class = "add">
                <label class = "add-button"> 
                    Upload Game
                </label>
                <input class = "add-file" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
            </div>
            <div class = "submit">
                <button v-on:click="submitGame()" class = "button white solid">Submit</button>
            </div>
        </div>
    </div>
    <div class="sucsees" v-if="activePart==='success'">
    <div>
        Sucessful
    </div>
    </div>
    <div class="failed" v-if="activePart==='fail'">
    <div>
        Failed
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name : 'CreateGame',
    data()
    {
        return{
            game : {
                title:'',
                description:'',
                pic: '',
                file:''
            },
            activePart: 'create',
        }

    },
    methods: {
    handlePicUpload(){
        this.game.pic = this.$refs.pic.files[0];
    },
    handleFileUpload(){
        this.game.file = this.$refs.file.files[0];
    },
    submitGame:function(){
        let formData = new FormData();
        formData.append('pic', this.game.pic);
        formData.append('file', this.game.file);
        formData.append('title', this.game.title);
        formData.append('description', this.game.description);
        axios.post( 'api/game/creategame',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response=>{
          this.activePart='success';
          console.log(response);
          console.log(this.activePart);
        });
     }
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";
    .add{
        display: flex;
        justify-content: space-between;
    }
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