<template>
  <div>
    <div class="comment-container">
      <div v-for="(name,index) in userNames" :class="[index == 0 ? 'comment-list':'comment-list-border']" v-show="type == 1">
          <el-row>
            <el-col :span="3">
              <div class="comment-avatar">
                <img src="http://192.168.0.5/leather/gomineWechat/attachment/images/8/2018/04/NL1aKaMckKZ05ko1kp5kWKwg3d6kd1.jpg">
              </div>
            </el-col>
            <el-col :span="21" class="comment-right">
                <el-row>
                  <el-col :span="22">
                    <span class="comment-userName" v-text="name"></span>
                  </el-col>
                  <el-col :span="2">
                    <span class="comment-icon">
                      <i class="el-icon-star-on" v-show="item.status" @click="collect(item.id)"></i>
                      <i class="el-icon-star-off" v-show="!item.status" @click="collect(item.id)"></i>
                    </span>
                  </el-col>
                  <el-col :span="24">
                    <div class="comment-content">很多组件的渲染输出由它的 props 决定。事实上，如果一个组件的渲染输出完全取决于它的 props，那么它会让测试变得简单，就好像断言不同参数的纯函数的返回值。看下面这个例子：</div>
                    <div class="comment-reply">
                      <div class="comment-reply-container">
                        <div><span class="comment-reply-userName">哈尔的移动城堡：</span><span class="comment-reply-content">去看看吧。如果可以的话就这样办吧，这是最好的决定。</span></div>
                        <div><span class="comment-reply-userName">风之谷：</span><span class="comment-reply-content">可以带你飞～</span></div>
                        <div @click="Reply(2)"><span class="comment-reply-userName">共有10条回复<i class="el-icon-d-arrow-right"></i></span></div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <el-row>
                      <el-col :span="20">
                        <span class="comment-time">05-22&nbsp;13:57</span>
                      </el-col>
                      <el-col :span="4">
                        <span class="comment-rep"><i class="el-icon-edit-outline"></i>&nbsp;回复</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
            </el-col>
          </el-row>
      </div>
        <div class="comment-transition">
          <transition name="el-fade-in-linear">
            <div class="comment-detail" v-show="type == 2">
              <div v-for="(nameD,index) in userNames" :class="[index == 0 ? 'comment-list':'comment-list-border']">
                <el-row>
                  <el-col :span="3">
                    <div class="comment-avatar">
                      <img src="http://192.168.0.5/leather/gomineWechat/attachment/images/8/2018/04/NL1aKaMckKZ05ko1kp5kWKwg3d6kd1.jpg">
                    </div>
                  </el-col>
                  <el-col :span="21" class="comment-right">
                    <el-row>
                      <el-col :span="24"><span class="comment-userName" v-text="nameD"></span></el-col>
                      <el-col :span="24">
                        <div class="comment-content">很多组件的渲染输出由它的 props 决定。事实上，如果一个组件的渲染输出完全取决于它的 props，那么它会让测试变得简单，就好像断言不同参数的纯函数的返回值。看下面这个例子：</div>
                      </el-col>
                      <el-col :span="24">
                          <span class="comment-time">05-22&nbsp;13:57</span>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </transition>
        </div>
    </div>
    <div class="reply-box"  @click="Reply(3)" v-show="type != 3">
      <el-row class="reply-box-row">
        <el-col :span="19">
          <el-input size="small" :placeholder="placeholderText" v-model="inputReply" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <div class="reply-box-span">
            <span>回复</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="reply-content" v-show="type == 3">
      111111
    </div>
  </div>

</template>

<script>
    export default {
        name: "MyCommentList",
        data(){
          return{
            userNames:['龙猫','幽灵公主','天空之城','悬崖上的金鱼姬','借东西的小人'],
            inputReply:'',
            type:1,
            placeholderText:'请输入您的留言内容~'
          }
        },
        methods:{
          Reply:function (temp) {
            let vm = this;
            vm.type = temp;
            console.info(vm.type)
            if(vm.type == 2){
              vm.placeholderText = '请输入您的回复内容~';
            }

          }
        },
        collect: function (commentId) {
          let vm = this;
          vm.axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: "8",
              c: "entry",
              p: "api_detail",
              do: "shop",
              m: "ewei_shop",
              comment_id: commentId,
            }
          })
            .then(function (response) {
              if (response.status == "200") {
                vm.common_list.forEach(function (element, index, array) {
                  if (element.id == commentId) {
                    element.status = !element.status;
                    tempStatus = element.status;
                  }
                })
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }
</script>

<style scoped>
  .comment-container{
    clear: both;
    border: 1px dashed #cccccc;
    border-radius: 5px;
    padding: 0 10px;
    margin: 15px 25px 60px 25px;
  }
  .comment-list-border{
    padding: 10px 0;
    border-top: 1px solid #ccc;
  }
  .comment-list{
    padding: 10px 0;
  }
  .comment-right{
    text-align: justify;
  }
  .comment-avatar img{
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
  .comment-userName{
    font-size: 12px;
  }
  .comment-icon{
    color: #0064ba;
    position: absolute;
    right: 0
  }
  .comment-content{
    font-size: 14px;
    padding: 5px 0;
  }
  .comment-time,.comment-rep{
    font-size: 12px;
    color: #cccccc;
  }
  .comment-reply-container{
    background: #f0f5f9;
    border: 1px dashed #f0f5f9;
    border-radius: 5px;
    padding: 10px;
  }
  .comment-reply-container div{
    margin-bottom: 5px;
  }
  .comment-reply-userName{
    font-size: 10px;
    color: #0064ba;
  }
  .comment-reply-content{
    font-size: 10px;
  }
  .comment-transition{
    display: flex;
  }
  .reply-box{
    background-color: #f2f6f9;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
  }
  .reply-box-span{
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .reply-box-row{
    padding: 10px 20px;
  }
  </style>

<style>
  .el-input__inner{
    border-radius: 15px;
  }
</style>
<!--  <style>
    .el-collapse{
      border-bottom: none;
      border-top: none;
    }
  .el-collapse-item__header{
    border-bottom: none;
    height: 20px;
    line-height: 20px;
    background-color:#f0f5f9 ;
    font-size: 10px;
    color:#0064ba;
  }
  .el-collapse-item__arrow{
    line-height: 20px;
  }
  .el-collapse-item__wrap{
    background-color:#f0f5f9 ;
    border-bottom: none;
  }
  .el-collapse-item__content{
    padding-bottom: 0;
    font-size: 10px;
  }
  .el-icon-arrow-right{
     display: none;
   }
  </style>-->
