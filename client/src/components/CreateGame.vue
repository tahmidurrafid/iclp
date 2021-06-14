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
    <div class="success" v-if="activePart==='success'">
    <div>
        <span>Game Upload Successful</span>
        <span class = "count"><i class="fa fa-check-circle"></i></span>
    </div>
    </div>
    <div class="fail" v-if="activePart==='fail'">
    <div>
        <span>Sorry Game upload failed</span>
        <span class = "count"><i class="fa fa-times-circle"></i></span>
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
    }
}
</script>

<style lang="scss" scoped>
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