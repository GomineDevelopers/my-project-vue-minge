<template>
<div class="quick_validate_bg">

        <div class="container">
                <!-- <div class="title">入党申请</div> -->
                    <div class="content">
                    <el-row class="item-content"> 
                        <el-col :span="24"> 姓名：<span class="coloredText" v-text="realname"></span></el-col>
                        
                    </el-row>
                    <el-row class="item-content"> 
                         <el-col :span="24">曾用名：<span class="coloredText" v-text="username"></span></el-col>
                       
                    </el-row>
                    <el-row class="item-content"> 
                         <el-col :span="24">性别：<span class="coloredText" v-text="sex==0?'男':'女'"></span></el-col>
                        
                    </el-row>
                     <el-row class="item-content"> 
                         <el-col :span="24">民族：<span class="coloredText" v-text="nationality"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">宗教信仰：<span class="coloredText" v-text="religion"></span></el-col>
                        
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24"> 出生日期： <span class="coloredText" v-text="birth"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24"> 籍贯：<span class="coloredText" v-text="birthplace"></span></el-col>
                        
                    </el-row>
                     <el-row class="item-content"> 
                        <el-col :span="24"> 出生地：<span class="coloredText" v-text="place"></span></el-col>
                        
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">职位：<span class="coloredText" v-text="job"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">身份证：<span class="coloredText" v-text="identity"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 学位学历：</span></el-col>
                        <el-col :span="24">
                        <div class="bordered" v-for="item of education" :key="item.index" >
                           <div class="coloredText">学制类型：{{item.education_type||item.education_type=="暂无"}}</div>
                           <div class="coloredText">毕业院校：{{item.school}}</div>
                           <div class="coloredText">所属专业：{{item.profession}}</div>
                           <div class="coloredText">入学时间：{{item.admission_time}}</div>
                           <div class="coloredText">毕业时间：{{item.graduation_time}}</div>
                           <div class="coloredText">学历信息：{{item.education}}</div>
                           <div class="coloredText">学位信息：{{item.degree}}</div>
                        </div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                       <el-col :span="24">工作单位：<span class="coloredText" v-text="employer"></span></el-col>
                       
                    </el-row>
                     <el-row class="item-content"> 
                         <el-col :span="24">职务：<span class="coloredText" v-text="position"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">单位地址：<span class="coloredText" v-text="unit_address"></span></el-col>
                       
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">单位电话：<span class="coloredText" v-text="unit_phone"></span></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                       <el-col :span="24">单位邮箱：<span class="coloredText" v-text="unit_email"></span></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                         <el-col :span="24">家庭住址：<span class="coloredText" v-text="family_address"></span></el-col>
                      
                    </el-row>
                    <el-row class="item-content"> 
                          <el-col :span="24">家庭电话：<span class="coloredText" v-text="family_phone"></span></el-col>
                     
                    </el-row>
                   <el-row class="item-content"> 
                       <el-col :span="24">家庭邮编：<span class="coloredText" v-text="family_code"></span></el-col>
                    </el-row>
                   <el-row class="item-content">
                       <el-col :span="24">通讯地址：<span class="coloredText" v-text="mailing_address == 0? '家庭地址': '单位地址'"></span></el-col>
                       
                    </el-row>
                    <el-row class="item-content"> 
                         <el-col :span="24">手机：<span class="coloredText" v-text="phone"></span></el-col>
                        
                    </el-row>
                    <el-row class="item-content"> 
                         <el-col :span="24">人大政协职务：<span class="coloredText" v-text="people_position"></span></el-col>
                       
                    </el-row>
                   <el-row class="item-content"> 
                       <el-col :span="24">其他社会职务：<span class="coloredText" v-text="parttime"></span></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                       <el-col :span="24">专长：<span class="coloredText" v-text="expertise"></span></el-col>
                       
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="24">享受待遇：<span class="coloredText" v-text="treatment"></span></el-col>  
                    </el-row>
                        <el-row class="item-content"> 
                        <el-col :span="24"> <span> 工作经历：</span></el-col>
                        <el-col :span="24">
                            <div class="coloredText bordered" v-for="item of resume" :key="item.index" >
                                <div>工作单位：{{item.unit}}</div>
                                <div>所在地区：{{item.location}}</div>
                                <div>所属职务：{{item.position}}</div>
                                <div>开始时间：{{item.start_time}}</div>
                                <div>结束时间：{{item.end_time}}</div>
                            </div>
                        </el-col>
                    </el-row>               
                    <el-row class="item-content"> 
                        <el-col :span="24"> <span> 获奖信息：</span></el-col>
                        <el-col :span="24">
                            <div class="coloredText bordered" v-for="item of award" :key="item.index" >
                                <div>成就及获奖情况：{{item.achievement ||"暂无"}}</div>
                                <div>获奖级别成果水平：{{item.level ||"暂无"}}</div>
                                <div>获奖时间：{{item.award_time ||"暂无"}}</div>
                            </div>
                        </el-col>
                    </el-row>  
                     <el-row class="item-content"> 
                         <el-col  :span="24">处分：<span class="coloredText" v-text="dispose"></span></el-col>  
                    </el-row>  
                      <el-row class="item-content"> 
                        <el-col :span="24">处分撤销信息：<span class="coloredText" v-text="cancel"></span></el-col>  
                        
                    </el-row> 
                    <el-row class="item-content"> 
                         <el-col :span="24">党派经历：<span class="coloredText"  v-text="partisan"></span></el-col>
                    </el-row>              
                    <el-row class="item-content"> 
                        <el-col :span="24"> <span> 家庭成员：</span></el-col>
                        <el-col :span="24">
                            <div class="coloredText bordered" v-for="item of family_member" :key="item.index" >
                                <div>姓名：{{item.name||"暂无"}}</div>
                                <div>关系：{{item.relationship||"暂无"}}</div>
                                <div>出生日期：{{item.birth||"暂无"}}</div>
                                <div>文化程度：{{item.culture||"暂无"}}</div>
                                <div>政治面貌：{{item.political||"暂无"}}</div>
                                <div>所在地：{{item.address||"暂无"}}</div>
                                <div>工作单位：{{item.unit||"暂无"}}</div>
                                <div>职务：{{item.position||"暂无"}}</div>
                            </div>
                        </el-col>
                    </el-row>              
                      <el-row class="item-content"> 
                        <el-col :span="24"> <span> 社会关系：</span></el-col>
                        <el-col :span="24">
                            <div class="coloredText bordered" v-for="item of social_relationship" :key="item.index" >
                                <div>姓名：{{item.name||"暂无"}}</div>
                                <div>关系：{{item.relationship||"暂无"}}</div>
                                <div>出生日期：{{item.birth||"暂无"}}</div>
                                <div>文化程度：{{item.culture||"暂无"}}</div>
                                <div>政治面貌：{{item.political||"暂无"}}</div>
                                <div>所在地：{{item.address||"暂无"}}</div>
                                <div>工作单位：{{item.unit||"暂无"}}</div>
                                <div>职务：{{item.position||"暂无"}}</div>
                                <div>现有无联系：<span v-if="item.contact==1">是</span><span v-else>否</span></div>
                               
                            </div>
                        </el-col>
                    </el-row>               
                      <el-row class="item-content"> 
                        <el-col :span="24"> <span> 申请书：</span></el-col>
                        <el-col :span="24"><div class="imgsize" ><img :src="img" ></div></el-col>
                    </el-row>             
                    
                    </div> 
            </div>
       
</div>   
</template>
<script>
export default {
  name: "applycationList",
  data() {
    return {
      realname: "",
      username: "",
      sex: "",
      nationality: "",
      religion: "",
      birth: "",
      birthplace: "",
      place: "",
      job: "",
      identity: "",
      education: "",
      employer: "",
      position: "",
      unit_address: "",
      unit_phone: "",
      unit_email: "",
      family_address: "",
      family_phone: "",
      family_code: "",
      mailing_address: "",
      phone: "",
      email: "",
      people_position: "",
      parttime: "",
      expertise: "",
      treatment: "",
      resume: "",
      award: "",
      dispose: "",
      cancel: "",
      partisan: "",
      family_member: "",
      social_relationship: "",
      img: ""
    };
  },
  mounted: function() {
    this.getApplycationData();
  },
  methods: {
    getApplycationData() {
      let vm = this;
      vm
        .axios(vm.$commonTools.g_restUrl, {
          method: "post",
          params: {
            i: "8",
            c: "entry",
            p: "user",
            do: "shop",
            m: "ewei_shop",
            ac: "get_joinparty",
            id: vm.$route.params.id,
            type: vm.$route.params.type
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            let tmp = "暂无";
            vm.realname = response.data.result.realname || tmp;
            vm.username = response.data.result.username || tmp;
            vm.sex = response.data.result.sex || tmp;
            vm.nationality = response.data.result.nationality || tmp;
            vm.religion = response.data.result.religion || tmp;
            vm.birth = response.data.result.birth || tmp;
            vm.birthplace = response.data.result.birthplace || tmp;
            vm.place = response.data.result.place || tmp;
            vm.job = response.data.result.job || tmp;
            vm.identity = response.data.result.identity || tmp;
            vm.education = response.data.result.education || tmp;
            vm.employer = response.data.result.employer || tmp;
            vm.position = response.data.result.position || tmp;
            vm.unit_address = response.data.result.unit_address || tmp;
            vm.unit_phone = response.data.result.unit_phone || tmp;
            vm.unit_email = response.data.result.unit_email || tmp;
            vm.family_address = response.data.result.family_address || tmp;
            vm.family_phone = response.data.result.family_phone || tmp;
            vm.family_code = response.data.result.family_code || tmp;
            vm.mailing_address = response.data.result.mailing_address || tmp;
            vm.phone = response.data.result.phone || tmp;
            vm.email = response.data.result.email || tmp;
            vm.people_position = response.data.result.people_position || tmp;
            vm.parttime = response.data.result.parttime || tmp;
            vm.expertise = response.data.result.expertise || tmp;
            vm.treatment = response.data.result.treatment || tmp;
            vm.resume = response.data.result.resume || tmp;
            vm.award = response.data.result.award || tmp;
            vm.dispose = response.data.result.dispose || tmp;
            vm.cancel = response.data.result.cancel || tmp;
            vm.partisan = response.data.result.partisan || tmp;
            vm.family_member = response.data.result.family_member;
            vm.social_relationship =
              response.data.result.social_relationship || tmp;
            vm.img = response.data.result.img || tmp;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.container {
  margin: 4vh 17vw 12vh 17vw;
  overflow-y: auto;
  overflow-x: hidden;
  height: 72vh;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #185a88;
}
.content {
  text-align: left;
  margin-top: 2vh;
  font-size: 0.9rem;
  color: #357baa;
}
.coloredText {
  color: black;
}
.content .item-content {
  padding: 1vh 0 1vh 0;
  height: auto;
  border-bottom: 1px dashed #a2bbcf;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}

.item-content .detail {
  margin: 0 20px;
  padding: 10px 0 0 0;
  text-align: left;
  height: 18vh;
  overflow-x: hidden;
  overflow-y: auto;
  word-wrap: break-word;
}
.bordered {
  border-bottom: 1px dashed #a2bbcf;
  padding: 1vh 0;
}
.bordered:last-child {
  border-bottom: none;
}
.imgsize {
  height: 25vh;
}
.imgsize img {
  width: 100%;
  height: 100%;
}
</style>

