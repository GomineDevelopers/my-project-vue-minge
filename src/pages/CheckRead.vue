<template>
 <div class="center_no_bg">
     <el-row>
       <el-col :span="24" class="book-outwraper" >
           <div class="book-wrap ">
               <div class="book">
                  <img src="../../static/image/book-default.png" alt="" srcset="">
               </div>
               
           </div>
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="24">
         <div class="invite-message">
           <span>您好，您的好友</span>
           <span class="colored-text">张传一</span>
           <span>正在邀请您一
            起读</span>
           <span  class="colored-text" >《镜头里的世界名校》</span>
         </div>
       </el-col>
     </el-row>
     <el-row>
          <el-col :span="24" class="proposal-button-wrap">
              <el-button type="primary" size="medium">通过</el-button>
              <el-button class="color-button" type="" plain size="medium">拒绝</el-button>
          </el-col>
        </el-row>
 </div>

</template>

<script>
export default {
  name: 'check-read'
}
</script>

<style scoped>
.book-outwraper {
  display: flex;
  justify-content: center;
  margin-top: 10%;
}
.book-wrap {
  border: 2px solid #92c1e4;
  margin: 1vh;

  width: 25vh;
}
.book-wrap .book {
  margin: 1vh;
  padding: 1vh;
  border: 2px dashed #92c1e4;
}
.book-wrap .book img {
  width: 100%;
  height: 100%;
}
.proposal-button-wrap {
  margin: 2vh 0;
  text-align: center;
}
.invite-message {
  color: #333333;
  width: 80%;
  margin: 3vh auto;
}
.invite-message .colored-text {
  color: #dc9705;
}
</style>
