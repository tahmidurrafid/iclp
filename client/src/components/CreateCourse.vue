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

            <div v-for="(topic, i) in course.topics" v-bind:key="topic.id" class="lecturelist">
                <div class="list-item">
                    <div class="title"><input type = "text" v-model="topic.title" 
                    placeholder="Your title goes here..."/> </div>
                    <div><i class="fa" 
                    v-bind:class="selected!=i? 'fa-edit': 'fa-save' " @click="saveTopic(i)"></i></div>
                    <div><i class="fa fa-trash"></i></div>
                </div>
                <div class="media" v-bind:class="selected!=i? 'collapsed': '' ">
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
                        :ref="'quill_' + i"
                        v-model="topic.html"
                        @ready="onEditorReady(i)"
                    />

                        <!-- v-model="topic.content" -->                    
                </div>

            </div>

            <button class="add-new-topic" @click="addTopic()">
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
                id : 1,
                title : "",
                brief : "",

                topics : [
                ]
            },
            selected : -1
        }
    },

    mounted(){
        if(!this.$route.query.id){
            return;
        }

        this.course.id = this.$route.query.id;
        axios.get(`api/courses/${this.course.id}/all`).then(res => {
            let data = res.data;
            this.course.title = data.title;
            this.course.brief = data.brief;
            for(let i in data.topics){
                console.log(data.topics[i]);
                let content = data.topics[i].content;
                let topic = {
                    id : data.topics[i].topic_id,
                    title : data.topics[i].title,
                    html : "",
                    loaded : JSON.parse(content)
                }
                console.log(content);
                this.course.topics.push(topic);
            }
        })
    },
    methods : {
        createCourse : function(){
            axios.post("api/courses/create", this.course).then(
                res => {
                    console.log("Inserted " + res)
                }
            )
        },

        onEditorReady : function(i){
            let editor = this.$refs["quill_" + i][0].quill;
            editor.setContents(this.course.topics[i].loaded)
        },

        addTopic : function(){
            let id = 1;
            for(let i = 0; i < this.course.topics.length; i++){
                id = Math.max(this.course.topics[i].id + 1, id);
            }
            this.course.topics.push({
                id : id,
                title : "",
                content : "",
                html : ""
            })
            this.selected = this.course.topics.length-1;
        },

        test : function(i){
            console.log("This is test" + i);
            console.log(this.$refs["quill_" + 0][0].quill.getContents())
        },

        saveTopic : function(i){
            if(i != this.selected){
                this.selected = i;
                return;
            }

            let editor = this.$refs["quill_" + i][0].quill;
            console.log(editor.getContents());
            let data = this;
            let contents = editor.getContents().ops;

            console.log(this.course.topics);

            let files = [];
            for(let i = 0; i < contents.length; i++){
                if(contents[i].insert && contents[i].insert.image && contents[i].insert.image.startsWith("data")){
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

            run().then( () => {
                if(this.selected == i){
                    this.selected = -1;
                }
            }).catch(err => console.log(err));

            async function run() {
                const formData = new FormData();
                for(let i = 0; i < files.length; i++){
                    const blob = await fetch(files[i].content).then(res => res.blob());
                    formData.append(files[i].format, blob);
                }

                let course = {
                    id : data.course.id,
                    topic : {
                        id : data.course.topics[i].id,
                        title : data.course.topics[i].title
                    }
                }

                formData.append("course", JSON.stringify(course))

                const res = await axios.post('api/courses/topic', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });

                if(res.data.success == 0){
                    return;
                }

                for(let x in res.data){
                    contents[x].insert.image = axios.defaults.baseURL + res.data[x].link
                    if(!contents[x].attributes){
                        contents[x].attributes = {};
                    }
                    contents[x].attributes.alt = res.data[x].media_id;
                }
                editor.setContents(contents);
                course.topic.content = editor.getContents().ops;
                course.topic.html = data.course.topics[i].html;
                let response = await axios.put('api/courses/content', course);
                console.log(response.data);
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

    .collapsed{
        display: none;
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

                    input{
                        background-color: transparent;
                        border: none;
                        outline: none;
                        font-weight: $semibold;
                        display: block;
                        width: 100%;
                    }

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
