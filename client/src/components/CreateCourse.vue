<template>
    <div class="createCourse">
        <div class="heading"><img src="../assets/doubleLines.png" alt="">Create New Course<img class="flip" src="../assets/doubleLines.png" alt=""></div>
        <div class = "wrap">
            <div class = "about">
                <input type="text" class="coursetitle" v-model="course.title" placeholder="Course Title Goes Here" /> 
                <div class="descriptionlevel">Description</div>
                <textarea class="description" v-model="course.brief" placeholder="Put your course description here ..." ></textarea>
                <div class = "flex-elem">
                    <a class = "button solid white" @click="createCourse()">Save</a>
                </div>
            </div>

            <!-- <div class="lecturelist">
                <div  v-for = "(item, i) in lectures" v-bind:key="i" class="list-item">
                    <div class="title">{{item.title}}</div>
                    <div><i :class="['fa',item.symbol]"></i></div>
                    <div><i class="fa fa-trash"></i></div>
                </div>
            </div> -->
            <div class="media">
                <!-- <table class="media-list">
                    <tr v-for = "(item, i) in media" v-bind:key="i" class="list-item">
                        <td class="number">{{i+1}}</td>
                        <td><i class="fa fa-files-o"></i></td>
                        <td class="media-name">{{item}}</td>
                    </tr>
                </table> -->
                <button class="add-media" @click="test()">
                    <span><i class="fa fa-plus-circle"></i></span>
                    <span> Add Media </span>
                </button>

                <quill-editor
                    ref="myQuillEditor"
                    v-model="content"
                />

                <Vueditor ref = "editor" class="editor"></Vueditor>
                <button class="create-new-quiz">
                    <span><i class="fa fa-plus-circle"></i></span>
                    <span> Create New Quiz </span>
                </button>
            </div>
            <button class="add-new-topic">
                    <span><i class="fa fa-plus-circle"></i></span>
                    <span> Add New Topic </span>
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name : 'CreateCourse',
    data(){
        return{
            course : {
                id : 0,
                title : "",
                brief : ""
            },
            content : "<h2>Hello world</h2><img src = 'http://localhost:8080/img/logo.00a80a24.svg'/>"
        }
    },
    methods : {
        createCourse : function(){
            axios.post("api/courses/create", this.course).then(
                res => {
                    console.log("Inserted " + res)
                }
            )
        },

        test : function(){
            let editor = this.$refs.myQuillEditor.quill;
            console.log(editor.getContents());

            let contents = editor.getContents().ops;
            // let base64 = 'data:image/png;base64,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';
            let files = [];
            for(let i = 0; i < contents.length; i++){
                if(contents[i].insert && contents[i].insert.image && contents[i].insert.image.startsWith("data")){
                    // base64 = contents[i].insert.image;
                    let name = contents[i].insert.image.split(";");
                    let saveAs = i + "." + name[0].replace("data:image/", "");
                    let file = {
                        content : contents[i].insert.image,
                        format : saveAs,
                        index : i
                    };
                    files.push(file);
                }
            }

            run().catch(err => console.log(err));

            async function run() {

                const formData = new FormData();
                for(let i = 0; i < files.length; i++){
                    const blob = await fetch(files[i].content).then(res => res.blob());
                    formData.append(files[i].index + "." + files[i].format, blob);
                }

                const res = await axios.post('api/courses/test', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(res.data);
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../scss/_variables.scss";

    .flex-elem{
        display: flex;
        justify-content: flex-end;
        margin-top : 20px;
    }

    .marker{
        display: block;
        height : 3px;
        width : 25px;
        background: linear-gradient(90deg, rgba(252,90,52,1) 0%, rgba(252,90,52,1) 60%, rgba(255,255,255,0) 60.1%, rgba(255,255,255,0) 80%, rgba(252,90,52,1) 80.1%);        
    }
    .createCourse{
        padding-top: 70px;
        padding : 70px 70px 0;
        text-align: left;
        .heading{
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
        .wrap{
            border: solid 3px #E9E9E9;
            padding : 22px 50px 22px 70px;
            box-sizing: border-box;  
            .coursetitle{
                margin-top: 30px;
                font-size: 25px;
                font-weight: 600;
                color: #545454;
                border: none;
                width: 100%;
            }
            .descriptionlevel{
                margin-top: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12;
                background-color: #EFEFEF;
                border: 1px solid #CBCBCB;
                width: 140px;
                height: 40px;
            }
            .description{
               width: 100%;
               height: 200px;
               border: 1px solid #CBCBCB;
            }
            .description::placeholder {
                font-style: italic;
                color: #373737;
                 padding: 20px;
            }
            .lecturelist{
                margin-top: 70px;
                .list-item{
                    display: flex;
                    justify-content: space-between;
                    background-color: #EFEFEF;
                    border: 1px solid #CBCBCB;
                    padding: 7px;
                    margin: 20px 0px;
                    padding-left: 50px;
                    padding-right: 30px;
                    border-radius: 5px;
                    color: #040404;
                    font-size: 14px;
                    font-weight: 450;
                    .title{
                        width: 88%;
                    }
                    .fa-save{
                        color: #FC5A34;
                    }
                    i{
                        cursor:pointer;
                    }
                }
            }
            .media{
                margin-left: 60px;
                margin-top: 60px;
                .media-list{
                    width: 400px;
                    font-weight: 500;
                    .list-item{
                        text-align: left;
                        font-size: 16px;
                        .number{
                            font-size: 14px;
                            width : 18px;
                            height: 18px;
                            background-color: #404040;
                            border: 1px solid #707070;
                            border-radius: 100px;
                            color : white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                    
                }
                .add-media{
                    width: 170px;
                    background-color: #EFEFEF;
                    border: 1px solid #CBCBCB;
                    border-radius: 10px;
                    font-weight: 500;
                    padding : 10px 25px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    margin-top: 30px;
                    cursor: pointer;
                }
                .editor{
                    margin-top: 30px;
                    margin-bottom: 30px;
                    height: 300px;
                }
                .create-new-quiz{
                    width: 210px;
                    background-color: #EFEFEF;
                    border: 1px solid #CBCBCB;
                    border-radius: 10px;
                    font-weight: 500;
                    padding : 10px 25px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    margin-top: 30px;
                    cursor: pointer;
                }
            }
            .add-new-topic{
                width: 195px;
                background-color: #EFEFEF;
                border: 1px solid #CBCBCB;
                border-radius: 10px;
                font-weight: 500;
                padding : 10px 25px;
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                margin-top: 40px;
                cursor: pointer;
            }

        }
    }
</style>
