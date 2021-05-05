<template>
    <div class="createCourse">
        <div class="heading"><img src="../assets/doubleLines.png" alt="">Create New Course<img class="flip" src="../assets/doubleLines.png" alt=""></div>
        <div class = "wrap">
           <input type="text" class="coursetitle" placeholder="Course Title Goes Here" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Course Title Goes Here'"> 
            <div class="descriptionlevel">Description</div>
            <textarea class="description" placeholder="Put your course description here ..." onfocus="this.placeholder = ''" onblur="this.placeholder = 'Put your course description here ...'"></textarea>
            <div class="lecturelist">
                <div  v-for = "(item, i) in lectures" v-bind:key="i" class="list-item">
                    <div class="title">{{item.title}}</div>
                    <div><i :class="['fa',item.symbol]"></i></div>
                    <div><i class="fa fa-trash"></i></div>
                </div>
            </div>
            <div class="media">
                <table class="media-list">
                    <tr v-for = "(item, i) in media" v-bind:key="i" class="list-item">
                        <td class="number">{{i+1}}</td>
                        <td><i class="fa fa-files-o"></i></td>
                        <td class="media-name">{{item}}</td>
                    </tr>
                </table>
                <button class="add-media">
                    <span><i class="fa fa-plus-circle"></i></span>
                    <span> Add Media </span>
                </button>
                <Vueditor class="editor"></Vueditor>
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
export default{
    name : 'CreateCourse',
    data(){
        return{
            lectures : [
                {title: 'Introduction to object Oriented Programming with C++', symbol:'fa-edit'},
                {title: 'Setup Compiler and write you first program', symbol:'fa-edit'},
                {title: 'Basic of structured programming and Input Output', symbol:'fa-save'}],
            media : ['SegmentTree.jpeg','Lecutre 42.mp4']
        }
    }
}
</script>
<style lang="scss" scoped>
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
