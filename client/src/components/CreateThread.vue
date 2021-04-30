<template>
    <div class="discussionThread">
        <div class="heading"><img src="../assets/doubleLines.png" alt="">Discussion Thread<img class="flip" src="../assets/doubleLines.png" alt=""></div>
        <div class = "wrap">
            <form>
            <div class = "title"><span class = "marker"></span><span class = "text">Create New Thread</span></div>
            <input type="text" id="threadtitle" class="greystyle" placeholder="Your Thread Title goes here..." onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Thread Title goes here...'">
            <select id="selectCourse" class="greystyle">
            <option value="">Select Course</option>
            <option value="">Object Oriented Programming</option>
            <option value="">Machine Learning</option>
            <option value="">Computer Architecture</option>
            </select>
            <Vueditor class="editor"></Vueditor>
            <div style="text-align: right">
            <button id="createThread" type="submit" class="greystyle">
                <i class="fa fa-plus-circle" style="padding-right:10px"></i> Create Thread
            </button>
            </div>
            </form>
            
        </div>
    </div>
</template>
<script>
export default{
    name : 'CreateThread',
}
</script>
<style lang="scss" scoped>
    .marker{
        display: block;
        height : 3px;
        width : 25px;
        background: linear-gradient(90deg, rgba(252,90,52,1) 0%, rgba(252,90,52,1) 60%, rgba(255,255,255,0) 60.1%, rgba(255,255,255,0) 80%, rgba(252,90,52,1) 80.1%);        
    }
    .discussionThread{
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
            .title{
                position : relative;
                .marker{
                    position : absolute;
                    top : calc(50% - 2px);
                    left : -40px;
                }
                font-size: 18px;
                font-weight: 600;
                padding : 5px 0;
            }
            .greystyle{
                background-color: #EFEFEF;
                border: 1px solid #CBCBCB;
                border-radius: 10px;
                padding: 5px;
                padding-left: 10px;
            }
            #threadtitle{
                margin-top: 30px;
                width: 100%;
            }
            #selectCourse{
                 margin-top: 30px;
                 padding: 5px;
            }
            .editor{
                margin-top: 30px;
                margin-bottom: 30px;
                height: 300px;
            }
            #createThread{
                padding-right: 10px;
            }
        }
    }
</style>
