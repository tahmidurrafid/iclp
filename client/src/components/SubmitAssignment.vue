<template>
    <div class = "assignment">
        <div class = "title">Submit Assignment</div>

        <div class = "content">
            <div class = "assignment-title">Assignment 1 : Class, Inheritance and Polymorphism</div>
            <div class = "description">
                Object-Oriented programming (OOP) refers to a type of programming in which programmers define the data type of a data structure and the type of operations that can be applied to the data structure.
                <br/><br/>
                As Java being the most sought-after skill, we will talk about object-oriented programming concepts in Java. An object-based application in Java is based on declaring classes, creating objects from them and interacting between these objects. I have discussed Java Classes and Objects which is also a part of object-oriented programming concepts, in my previous blog.
            </div>
            <div class = "downloads">
                <a class = "item" href = "#">
                    <div class = "file">
                        <i class = "fa fa-file-archive-o"></i>
                        <span>Assignment Description FIle.zip</span>
                    </div>
                    <div class = "file-details">
                        <span class = "size">File Size : 2mb</span>
                        <span class = "download-icon">
                            <i class = "fa fa-download"></i>
                        </span>
                    </div>
                </a>
            </div>
            <div class = "upload">
                <input type = "file" name = "upload"/>
                <a class = "upload-button">
                    <i class = "fa fa-link"></i>
                    <span>Upload File (.zip)</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name : 'InstructorDashboard',
};
</script>

<style lang = "scss" scoped>
    @import "../scss/_variables.scss";
    .assignment{
        .title{
            font-size: $font30;
            display: flex;
            font-weight: $semibold;
            justify-content: center;
            align-items: center;
            &::before, &::after{
                display: block;
                background: $wing;
                content: '';
                width : 40px;
                height: 15px;
                margin : 0 20px;
            }
            margin : 50px;
        }
        .content{
            margin : 60px auto;
            width : 85%;
            border: solid 2px $greyLight;
            box-sizing: border-box;
            padding : 40px 60px;
            text-align: left;
            .assignment-title{
                font-size: $font20;
                font-weight: $semibold;
                margin : 15px 0;
            }
            .description{
                font-size: $font15;
                margin : 40px 0;
            }
            .downloads{
                a.item{
                    margin : 40px 0;
                    color : $black;
                    display: block;
                    border-top : solid 1px $greyLight;
                    border-bottom : solid 1px $greyLight;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 15px 0;
                    .file{
                        display: flex;
                        align-items: center;                        
                        font-size: $font20;
                        i{
                            font-size: 40px;
                            color: $orange;
                        }
                        span{
                            padding-left: 20px;
                        }                        
                    }
                    .file-details{
                        display: flex;
                        align-items: center;                        
                        .size{
                            color: $grey3;
                        }
                        .download-icon{
                            text-align: center;
                            border-radius: 100px;
                            $size : 55px;
                            font-size: 31px;
                            margin-left: 20px;
                            height : $size;
                            width : $size;
                            line-height: $size;
                            border: solid 1px $grey3;
                            display: block;
                        }
                    }
                }
            }

            .upload{
                margin : 15px 0;
                display: flex;
                justify-content: space-between;
                input{
                    font-size: $font18;
                }
                a.upload-button{
                    background-color: $orange;
                    padding : 7px 20px;
                    border-radius: 10px;
                    font-size: $font18;
                    i{
                        padding-right: 10px;                        
                    }
                }
            }
        }
    }
</style>