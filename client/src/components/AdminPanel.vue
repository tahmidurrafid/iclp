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
                        <div class = "item" v-for="i in 5" v-bind:key="i" >
                            <div class = "about-course">
                                <div class = "id">Course ID : CSE11100</div>
                                <div class = "course-title">Object Oriented Programming with Java</div>
                                <div class = "instructor">
                                    <span>Instructor</span>
                                    <select>
                                        <option>ID : 1140 - Tahmidur Rafid</option>
                                    </select>
                                </div>
                            </div>
                            <div class = "action">
                                <a class = "button white solid small">Save</a>
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
                    <div class= "items" >
                        <div class = "item" v-for="i in 5" v-bind:key="i" >
                            <div class = "about-course">
                                <div class = "id">Course ID : CSE11100</div>
                                <div class = "course-title">Object Oriented Programming with Java</div>
                            </div>
                            <div class = "action">
                                <a class = "button white solid small">View</a>
                            </div>
                        </div>
                        <div class = "new-game">
                            <a class = "button white solid">Create New Game</a>
                        </div>
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
            renameCategory:[]
        }
    },
    mounted(){
        axios.get('api/admin/categories').then( response => {
            this.categories = response.data
            for(let i=0;i<this.categories.length;i++){
                let item={newName:"",visibility:false};
                this.renameCategory.push(item);
            }
        })
    },
    methods:{
        deleteCategory:function(id){
            axios.delete('api/admin/categories/deleteCategory/'+id).then( response => {
                const index = this.categories.findIndex(category => category.id === id)
                if (~index){
                    this.categories.splice(index, 1)
                }
                console.log(response)
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
                .reassign-instructor, .games{
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

                .categories{
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