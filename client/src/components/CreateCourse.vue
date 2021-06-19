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
                <div class = "topic" v-if="topic.type == 'topic'">
                    <div class="list-item">
                        <div class="title"><input type = "text" v-model="topic.title" 
                        placeholder="Your title goes here..."/> </div>
                        <div><i class="fa" 
                        v-bind:class="selected!=i? 'fa-edit': 'fa-save' " @click="saveTopic(i)"></i></div>
                        <div><i class="fa fa-trash"></i></div>
                    </div>
                    <div class="media" v-bind:class="selected!=i? 'collapsed': '' ">
                        <div class="media-list">
                            <div v-for = "(video, j) in topic.files" v-bind:key="j" class="list-item">
                                <div class="number">{{j}}</div>
                                <div class = "icon"><i class="fa fa-file-movie-o"></i></div>
                                <div class="media-name">{{video.name}}</div>
                            </div>
                        </div>
                        <div class="add-media" >
                            <label :for="'addVideo' + '_' + i">
                                <input type = "file" :id="'addVideo' + '_' + i" @change="fileChanged($event ,i)"/>                        
                                <span><i class="fa fa-plus-circle"></i></span>
                                <span> Add Video</span>
                            </label>
                        </div>

                        <quill-editor
                            :ref="'quill_' + i"
                            v-model="topic.html"
                            @ready="onEditorReady(i)"
                        />
                    </div>
                </div>
                <div class = "assignment" v-if="topic.type == 'assignment'">
                    <div class="list-item">
                        <div class="title"><input type = "text" v-model="topic.title" 
                        placeholder="Your title goes here..."/> </div>
                        <div><i class="fa" 
                        v-bind:class="selected!=i? 'fa-edit': 'fa-save' " @click="saveAssignment(i)"></i></div>
                        <div><i class="fa fa-trash"></i></div>
                    </div>
                    <div class="media" v-bind:class="selected!=i? 'collapsed': '' ">
                        <div class="media-list">
                            <div v-for = "(file, j) in topic.files" v-bind:key="j" class="list-item">
                                <div class="number">{{j}}</div>
                                <div class = "icon"><i class="fa fa-file-movie-o"></i></div>
                                <div class="media-name">{{file.name}}</div>
                            </div>
                        </div>
                        <div class="add-media" >
                            <label :for="'addFile' + '_' + i">
                                <input type = "file" :id="'addFile' + '_' + i" @change="addAssignmnetFile($event ,i)"/>                        
                                <span><i class="fa fa-plus-circle"></i></span>
                                <span> Add File</span>
                            </label>
                        </div>
                        <textarea placeholder="Your Assignmnet description goes here..." v-model="topic.content">

                        </textarea>
                        <div class = "marks">
                            <div class = "caption">Marks: </div>
                            <input type = "text" v-model="topic.marks" />
                        </div>
                    </div>
                </div>
            </div>

            <div class = "add-new">
                <div class = "plus">
                    <div class = "icon">
                        <i class = "fa fa-plus"></i>
                    </div>
                    <div class = "options">
                        <div class = "option" @click="addTopic()">Topic</div>
                        <div class = "option" @click="addAssignmnet()">Assignment</div>
                    </div>                    
                </div>
            </div>

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
                brief : "",

                topics : [
                ]
            },
            selected : -1,
            files : ""
        }
    },

    mounted(){
        if(!this.$route.query.id){
            return;
        }

        this.course.id = this.$route.query.id;
        axios.get(`api/courses/${this.course.id}/all`).then(res => {
            let data = res.data;
            console.log(data);
            this.course.title = data.title;
            this.course.brief = data.brief;
            for(let i in data.topics){
                let content = data.topics[i].content;
                if(data.topics[i].type == "topic"){
                    let topic = {
                        id : data.topics[i].topic_id,
                        title : data.topics[i].title,
                        html : "",
                        loaded : JSON.parse(content),
                        files : 
                            data.media.filter( ( e ) => {
                                return e.media_type == "mp4" && e.topic_id == data.topics[i].topic_id;
                            }),
                        type : "topic"
                    }
                    this.course.topics.push(topic);
                }else{
                    let parsed =  data.topics[i];
                    let topic = {
                        id : parsed.id,
                        title : parsed.title,
                        html : "",
                        content : parsed.brief,
                        files : [{
                            name : parsed.file_name
                        }],
                        type : "assignment",
                        marks : parsed.total_mark
                    }
                    this.course.topics.push(topic);
                }
            }
        })


    },
    methods : {

        fileChanged : function(event, index){
            if(!event.target.files.length){
                return;
            }
            let file = event.target.files[0];
            this.course.topics[index].files.push(file);
            let formData = new FormData();
            formData.append("video", file);
            let data = {
                course_id : this.course.id,
                topic_id : this.course.topics[index].id,
                seq : this.course.topics[index].files.length - 1
            };
            formData.append("data", JSON.stringify(data));
            axios.post('api/courses/video', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then( () => {

            });
        },

        addAssignmnetFile : function(event, index){
            if(!event.target.files.length){
                return;
            }
            let file = event.target.files[0];
            console.log(file)
            this.course.topics[index].files.push(file);
        },

        saveAssignment : function(index){
            if(index != this.selected){
                this.selected = index;
                return;
            }
            let me = this;
            console.log(this.course.topics[index]);
            let formData = new FormData();
            let assignment = this.course.topics[index];
            if(assignment.files.length){
                formData.append("pdf", assignment.files[0]);
            }
            let data = {
                course_id : this.course.id,
                topic_id : assignment.id,
                seq : 0,
                title : assignment.title,
                content : assignment.content,
                marks : assignment.marks
            };
            console.log(data);
            formData.append("data", JSON.stringify(data));
            axios.post('api/courses/assignment', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            }).then( (res) => {
                console.log(res);
                me.selected = -1;
            });
        },

        createCourse : function(){
            axios.post("api/courses/create", this.course).then(
                () => {
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
                html : "",
                files : [],
                type : "topic"
            })
            this.selected = this.course.topics.length-1;
        },

        addAssignmnet : function(){            
            let id = 1;
            for(let i = 0; i < this.course.topics.length; i++){
                id = Math.max(this.course.topics[i].id + 1, id);
            }
            this.course.topics.push({
                id : id,
                title : "",
                content : "",
                html : "",
                files : [],
                type : "assignment",
                marks : 0
            })
            this.selected = this.course.topics.length-1;
        },

        saveTopic : function(i){
            if(i != this.selected){
                this.selected = i;
                return;
            }

            let editor = this.$refs["quill_" + i][0].quill;
            let data = this;
            let contents = editor.getContents().ops;


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
                await axios.put('api/courses/content', course);
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
                        border: none;
                        background-color: transparent;
                        justify-content: flex-start;
                        align-items: center;
                        .number{
                            font-size: 14px;
                            $dim : 20px;
                            width : $dim;
                            height: $dim;
                            background-color: #404040;
                            // border: 1px solid #707070;
                            border-radius: 100px;
                            color : white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 15px;
                        }
                        .icon{
                            margin-right: 15px;
                        }
                    }
                    
                }
                .add-media{
                    position: relative;
                    label { 
                        width: max-content;
                        background-color: #EFEFEF;
                        border: 1px solid #CBCBCB;
                        border-radius: 10px;
                        font-weight: 500;
                        padding : 10px 25px;
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                    }
                    input{
                        height: 0;
                        position : absolute;
                        left: 0;
                        top : 0;
                    }
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 30px;                    
                    margin-bottom : 50px;
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
            .assignment{
                textarea{
                    width : 100%;
                    min-height: 200px;
                    box-sizing: border-box;
                    padding : 20px;
                }

                .marks{
                    margin : 20px 0;
                    display: flex;
                    align-items: center;
                    .caption{
                        margin-right: 20px;
                    }
                    input{
                        outline: none;
                        padding : 10px;
                        border: solid 1px $grey2;
                        border-radius: 10px;
                        width: 30px;
                        text-align: center;
                        transition : border-color .5s;
                        &:focus{
                            outline : none;
                            border-color: $orange;
                        }
                    }
                }
            }
            .add-new{
                padding-bottom: 70px;
                padding-top : 50px;
                .plus{
                    $dim : 50px;
                    width : $dim;
                    height : $dim;
                    position : relative;
                    .icon{
                        width : 100%;
                        height : 100%;
                        background-color: $orange;
                        color : $white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 100%;
                        cursor: pointer;                        
                    }
                    &:hover .options{
                        display: block;
                    }
                    .options{
                        position: absolute;
                        display: none;
                        left : 100%;
                        top : 0;
                        box-shadow: $shadowMid;
                        border-radius: 20px;
                        overflow: hidden;
                        .option{
                            padding: 10px 20px;
                            font-size: $font15;
                            font-weight: $medium;
                            cursor: pointer;
                            &:hover{
                                background-color: $orange;
                                color : $white;
                            }
                        }
                    }
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
