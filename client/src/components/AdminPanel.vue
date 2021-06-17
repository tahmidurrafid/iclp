<template>
    <div class = "admin">
        <div class = "title">Admin Panel</div>
        <div class = "content">
            <div class = "left-bar">
                <div class = "caption">
                    Panel Type
                </div>
                <div class = "links">
                    <a href = "#" :class = "{'selected' : selected == 'reassign' }" @click="selected='reassign'">Instructor Assignment</a>
                    <a href = "#" :class = "{'selected' : selected == 'categories' }"  @click="selected='categories'">Manage Categories</a>
                    <a href = "#" :class = "{'selected' : selected == 'games' }" @click="selected='games'" >Manage Games</a>
                </div>
            </div>
            <div class = "panel">
                <div class = "reassign-instructor" v-if="selected == 'reassign'">
                    <div class = "heading">
                        <div class = "caption">Reassign Instructor</div>
                        <div class = "search">
                            <input type = "text" placeholder="Search for courses"/>
                            <a class = "box-button"><i class = "fa fa-search"></i></a>
                        </div>
                    </div>
                    <div class= "items" >
                        <div class = "item" v-for="(item,i) in courses" v-bind:key="i" >
                            <div class = "about-course">
                                <div class = "course-title">{{item.title}}</div>
                                <div class = "instructor">
                                    <span>Instructor</span>
                                    <select :id="item.id">
                                        <option v-for="instructor in instructors" v-bind:key="instructor.id" :value="instructor.id">ID : {{instructor.id}} - {{instructor.name}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class = "action">
                                <button class = "button white solid small" @click="reassignInstructor(item.id)">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class = "categories" v-if="selected == 'categories'">
                    <div class = "caption">Modify Categories</div>
                    <div v-for = "(item,i) in categories" v-bind:key="i" class = "items">
                        <div class = "item">
                            <div class = "wrap">
                                <div class = "left">
                                    {{item.value}}
                                </div>
                                <div class = "right">
                                    <span class = "edit" @click="renameCategory[i].visibility=!renameCategory[i].visibility">
                                        <i class = "fa fa-edit"></i>
                                    </span>
                                    <span class = "edit" @click="deleteCategory(item.id)">
                                        <i class = "fa fa-trash-o"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="catagoryInput" v-if="renameCategory[i].visibility">
                            <div class="textinput">
                                <input type = "text" v-model="renameCategory[i].newName" placeholder="Enter new catagory name..."/>
                            </div>
                            <div class="catagoryAdd">
                                <button class="button white solid small" @click="updateCategory(i)">Rename</button>
                            </div>
                                
                        </div>
                        
                    </div>
                    <div class = "add">
                            <div class = "add-button" @click="enableAdd=!enableAdd">
                                <i class = "fa fa-plus-circle"></i>
                                Add Category
                            </div>
                            <div class="catagoryInput" v-if="enableAdd">
                                <div class="textinput">
                                    <input type = "text" v-model="newCatagory" placeholder="Enter catagory name..."/>
                                </div>
                                <div class="catagoryAdd">
                                    <button class="button white solid small" @click="addCategory()">Add</button>
                                </div>
                                
                            </div>
                    </div>
                </div>


                <div class = "games" v-if="selected=='games'">
                    <div class = "heading">
                        <div class = "caption">Games you have created</div>
                    </div>
                     <div v-for = "(item,i) in games" v-bind:key="i" class = "items">
                        <div class = "item">
                            <div class = "wrap">
                                <div class = "left">
                                    {{item.gameName}}
                                </div>
                                <div class = "right">
                                    <span class = "edit" @click="renameGame[i].visibility=!renameGame[i].visibility">
                                        <i class = "fa fa-edit"></i>
                                    </span>
                                    <span class = "edit" @click="deleteGame(item.id)">
                                        <i class = "fa fa-trash-o"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="catagoryInput" v-if="renameGame[i].visibility">
                            <div class="textinput">
                                <input type = "text" v-model="renameGame[i].newName" placeholder="Enter new catagory name..."/>
                            </div>
                            <div class="catagoryAdd">
                                <button class="button white solid small" @click="updateGame(i)">Rename</button>
                            </div>
                                
                        </div>
                        
                    </div>
                    <div class = "add">
                            <router-link class = "add-button-game" to="/CreateGame">
                                <i class = "fa fa-plus-circle"></i>
                                Add Game
                            </router-link>
                    </div>
                </div>
                <div class="success" v-if="selected=='success'">
                    <div>
                        <span>Instructor Reassignment Successful</span>
                        <span class = "count"><i class="fa fa-check-circle"></i></span>
                    </div>
                </div>
                <div class="fail" v-if="selected=='fail'">
                    <div>
                        <span>Sorry Coudn't Reassign Instructor</span>
                        <span class = "count"><i class="fa fa-times-circle"></i></span>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name : "AdminPanel",
    data(){
        return { 
            selected : 'reassign',
            categories:[],
            enableAdd:false,
            newCatagory:"",
            renameCategory:[],
            games:[],
            renameGame:[],
            courses:[],
            instructors:[],
        }
    },
    mounted(){
        axios.get('api/admin/categories').then( response => {
            this.categories = response.data
            for(let i=0;i<this.categories.length;i++){
                let item={newName:"",visibility:false};
                this.renameCategory.push(item);
            }
        });
        axios.get('api/admin/games').then(response=>{
            this.games=response.data
             for(let i=0;i<this.games.length;i++){
                let item={newName:"",visibility:false};
                this.renameGame.push(item);
            }
        });
        axios.get('api/admin/courses').then(response=>{
            this.courses=response.data
        });
        axios.get('api/admin/instructors').then(response=>{
            this.instructors=response.data
        });
    },
    methods:{
        deleteCategory:function(id){
            axios.delete('api/admin/categories/deleteCategory/'+id).then( response => {
                if(response!="error")
                {
                    const index = this.categories.findIndex(category => category.id === id)
                    if (~index){
                        this.categories.splice(index, 1)
                    }
                }
            })

        },
        addCategory:function(){
            const  categoryName={categoryName:this.newCatagory};
            axios.post('api/admin/categories/addCategory',categoryName).then(response=>{
                if(response.data!="error"){
                    this.enableAdd=false;
                    axios.get('api/admin/categories').then( response => {
                        this.categories = response.data
                    })
                    this.newCatagory="";
                     let item={newName:"",visibility:false};
                     this.renameCategory.push(item);

                }
            })
        },
        updateCategory:function(i){
            const  category={id:this.categories[i].id,name:this.renameCategory[i].newName};
            axios.put('api/admin/categories/updateCategory',category).then(response=>{
                if(response.data!="error"){
                    this.renameCategory[i].visibility=false;
                    axios.get('api/admin/categories').then( response => {
                        this.categories = response.data
                    })
                    this.renameCategory[i].newName="";
                }
            })
        },
        deleteGame:function(id){
            axios.delete('api/admin/games/deleteGame/'+id).then( response => {
                if(response!="error")
                {
                    const index = this.games.findIndex(game => game.id === id)
                    if (~index){
                        this.games.splice(index, 1)
                    }
                }
            })
        },
        updateGame:function(i){
            const  game={id:this.games[i].id,name:this.renameGame[i].newName};
            axios.put('api/admin/games/updateGame',game).then(response=>{
                if(response.data!="error"){
                    this.renameGame[i].visibility=false;
                    axios.get('api/admin/games').then( response => {
                        this.games = response.data
                    })
                    this.renameGame[i].newName="";
                }
            })
        },
        reassignInstructor:function(courseID)
        {
            var e = document.getElementById(courseID);
            const data={courseID:courseID,instructorID:e.value};
            axios.put('api/admin/updateInstructor',data).then(response=>{
                if(response.data=="error"){
                    this.selected="fail"
                }
                else{
                    this.selected="success"
                }
            })

        }
        
    }
}
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";

    @mixin caption{
        font-size: $font20;
        font-weight: $semibold;
        display: flex;
        align-items: center;
        &::before{
            @include marker;
            margin-right: 10px;
        }        
    }

    .success{
        min-height : 30px;
        background-color: #2dda6f83;
        color : #255a3d;
        display: flex;
        padding :5px 30px;
        justify-content: space-between;
        font-size: 25px;
        font-weight: 500;
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
        font-weight: 500;
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
    .admin{
        .title{
            @include title;
        }
        .content{
            display: flex;
            margin : 50px auto;
            width : 90%;
            justify-content: space-between;
            .left-bar{
                width : 25%;
                border: solid 3px $greyLight;
                box-sizing: border-box;
                padding : 25px;
                .caption{
                    @include caption;
                }
                .links{
                    a{
                        display: block;
                        font-size: $font13;
                        font-weight: $semibold;
                        background-color: $greyLight;
                        color : $grey1;
                        line-height: 40px;
                        margin : 20px 0px;
                        padding: 5px 10px;
                        transition: color .3s, background-color .3s;
                        border-radius: 5px;
                        &.selected{
                            color : $white;
                            background-color: $grey1;
                            &:hover{
                                background-color: $grey1;
                            }
                        }
                        &:hover{
                            background-color: rgb(192, 192, 192);
                        }
                    }
                }
            }

            .panel{
                width: 70%;
                border: solid 3px $greyLight;
                padding : 25px 50px;
                box-sizing: border-box;
                .caption{
                    @include caption;
                }
                .reassign-instructor{
                    .heading{
                        display: flex;
                        justify-content: space-between;
                        border-bottom: solid 1px $greyLight;
                        padding: 0 0 30px;
                        .search{
                            display: flex;
                            input{
                                line-height: 45px;
                                outline: none;
                                border : none;
                                background-color: $greyLight;
                                font-size: $font13;
                                color : $grey1;
                                font-weight: $semibold;
                                padding : 0 20px;
                                text-align: left;
                            }
                            .box-button{
                                display: block;
                                line-height: 45px;
                                width : 45px;
                                background-color: $orange;
                                font-size: 22px;
                                color : $white;
                                text-align: center;
                                align-items: center;
                            }
                        }
                    }
                    .items{
                        .item{
                            border-bottom: solid 1px $greyLight;
                            padding : 20px 0;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .about-course{
                                font-weight: $semibold;
                                text-align : left;
                                &>*{
                                    margin : 15px 0;
                                }
                                .id{
                                    font-size: $font13;
                                    color : $grey2;
                                }
                                .course-title{
                                    font-size: $font18;
                                    color : $grey1;
                                }
                                .instructor{
                                    color: $grey2;
                                    font-size: $font15;
                                    font-weight: $regular;
                                    select{
                                        outline : none;
                                        border : solid 1px $grey3;
                                        background-color: $greyLight;
                                        padding : 5px 20px;
                                        border-radius: 10px;
                                        color: $grey1;
                                        margin-left: 30px;
                                    }
                                }
                            }
                        }
                    }
                    .new-game{
                        text-align: right;
                        margin : 30px 0;
                    }
                }

                .categories,.games{
                    .items{
                        .item>*{
                            padding-left: 40px;
                        }
                        .item{
                            margin : 20px 0;
                            .wrap{
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
                                }
                                .right{
                                    display: flex;
                                    span{
                                        font-size: $font18;
                                        display: block;
                                        color: $black;
                                        margin-left: 30px;
                                        cursor: pointer;
                                    }
                                }
                            }

                        }
                    }
                    .add{
                        .add-button{
                            text-align: left;
                            width: 180px;
                        }
                        .add-button-game{
                            text-align: left;
                            width: 160px;
                            cursor: pointer;
                            width: 20%;
                            display: inline-block;
                            @include grey-area;
                            color : $black;
                            font-size: $font15;
                            padding : 0 20px ;
                            line-height: 40px;
                            margin-right: 30px;
                            text-align: center;
                            i{
                                font-size: $font18;
                                margin-right : 20px;
                            }
                        }
                        .catagoryInput{
                            margin-top: 30px;
                            width: 100%;
                            display: flex;
                            justify-content: space-between;
                            .textinput{
                                width: 78%;
                                input{
                                    font-size: 16px;
                                    line-height: 35px;
                                    width: 100%;
                                    background-color: rgb(238, 238, 238);
                                    border: 1px solid rgb(136, 136, 136);
                                    border-radius: 5px;
                                }
                                ::placeholder{
                                    padding-left: 10px;
                                }
                            }
                            .catagoryAdd{
                                width: 18%;
                                .button{
                                    width: 100%;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    
                }
            }
        }
    }
    .catagoryInput{
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .textinput{
            width: 78%;
            input{
                font-size: 16px;
                line-height: 35px;
                width: 100%;
                background-color: rgb(238, 238, 238);
                border: 1px solid rgb(136, 136, 136);
                border-radius: 5px;
            }
            ::placeholder{
                padding-left: 10px;
            }
        }
        .catagoryAdd{
            width: 20%;
            .button{
                width: 100%;
                font-size: 16px;
            }
        }
    }
</style>