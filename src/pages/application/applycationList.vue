<template>
<div class="quick_validate_bg">

        <div class="container">
                <div class="title">入党申请</div>
                    <div class="content">
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 姓名：</span></el-col>
                        <el-col :span="18"><div v-text="realname"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 曾用名：</span></el-col>
                        <el-col :span="18"><div v-text="username"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 性别：</span></el-col>
                        <el-col :span="18"><div v-if="sex==1">女</div><div v-else>男</div></el-col>
                    </el-row>
                     <el-row class="item-content"> 
                        <el-col :span="6"> <span> 民族：</span></el-col>
                        <el-col :span="18"><div v-text="nationality"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 宗教信仰：</span></el-col>
                        <el-col :span="14"><div v-text="religion"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="9"> <span> 出生日期：</span></el-col>
                        <el-col :span="15"><div v-text="birth"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 籍贯：</span></el-col>
                        <el-col :span="18"><div v-text="birthplace"></div></el-col>
                    </el-row>
                     <el-row class="item-content"> 
                        <el-col :span="7"> <span> 出生地：</span></el-col>
                        <el-col :span="17"><div v-text="place"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 职位：</span></el-col>
                        <el-col :span="18"><div v-text="job"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="7"> <span> 身份证：</span></el-col>
                        <el-col :span="17"><div > <span v-text="identity"></span> </div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 学位学历：</span></el-col>
                        <el-col :span="24">
                        <div v-for="item of education" :key="item.index" >
                           <div>学制类型：{{item.education_type}}</div>
                           <div>毕业院校：{{item.school}}</div>
                           <div>专业：{{item.profession}}</div>
                           <div>入学时间：{{item.admission_time}}</div>
                           <div>毕业时间：{{item.graduation_time}}</div>
                           <div>院校类型：{{item.education}}</div>
                           <div>学历：{{item.degree}}</div>
                        </div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="10"> <span> 工作单位：</span></el-col>
                        <el-col :span="14"><div v-text="employer"></div></el-col>
                    </el-row>
                     <el-row class="item-content"> 
                        <el-col :span="6"> <span> 职务：</span></el-col>
                        <el-col :span="18"><div v-text="position"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 单位地址：</span></el-col>
                        <el-col :span="14"><div v-text="unit_address"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 单位电话：</span></el-col>
                        <el-col :span="14"><div v-text="unit_phone"></div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="10"> <span> 单位邮箱：</span></el-col>
                        <el-col :span="14"><div v-text="unit_email"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 家庭住址：</span></el-col>
                        <el-col :span="14"><div v-text="family_address"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 家庭电话：</span></el-col>
                        <el-col :span="14"><div v-text="family_phone"></div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="10"> <span> 家庭邮编：</span></el-col>
                        <el-col :span="14"><div v-text="family_code"></div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="10"> <span> 通讯地址：</span></el-col>
                        <el-col :span="14"><div v-text="mailing_address"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="6"> <span> 手机：</span></el-col>
                        <el-col :span="18"><div v-text="phone"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="12"> <span> 人大政协职务：</span></el-col>
                        <el-col :span="12"><div v-text="people_position"></div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="12"> <span> 其他社会职务：</span></el-col>
                        <el-col :span="12"><div v-text="parttime"></div></el-col>
                    </el-row>
                   <el-row class="item-content"> 
                        <el-col :span="6"> <span> 专长：</span></el-col>
                        <el-col :span="18"><div v-text="expertise"></div></el-col>
                    </el-row>
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 享受待遇：</span></el-col>
                        <el-col :span="14"><div v-text="treatment"></div></el-col>
                    </el-row>
                        <el-row class="item-content"> 
                        <el-col :span="9"> <span> 工作简历：</span></el-col>
                        <el-col :span="15"><div v-text="resume"></div></el-col>
                    </el-row>               
                    <el-row class="item-content"> 
                        <el-col :span="9"> <span> 获奖信息：</span></el-col>
                        <el-col :span="15"><div v-text="award"></div></el-col>
                    </el-row>  
                     <el-row class="item-content"> 
                        <el-col :span="6"> <span> 处分：</span></el-col>
                        <el-col :span="18"><div v-text="dispose"></div></el-col>
                    </el-row>  
                      <el-row class="item-content"> 
                        <el-col :span="12"> <span> 处分撤销信息：</span></el-col>
                        <el-col :span="12"><div v-text="cancel"></div></el-col>
                    </el-row> 
                    <el-row class="item-content"> 
                        <el-col :span="10"> <span> 党派经历：</span></el-col>
                        <el-col :span="14"><div v-text="partisan"></div></el-col>
                    </el-row>              
                    <el-row class="item-content"> 
                        <el-col :span="9"> <span> 家庭成员：</span></el-col>
                        <el-col :span="15"><div v-text="family_member"></div></el-col>
                    </el-row>              
                      <el-row class="item-content"> 
                        <el-col :span="9"> <span> 社会关系：</span></el-col>
                        <el-col :span="15"><div v-text="social_relationship"></div></el-col>
                    </el-row>               
                      <el-row class="item-content"> 
                        <el-col :span="9"> <span> 申请书：</span></el-col>
                        <el-col :span="15"><div ><img :src="img" ></div></el-col>
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
      username: "无",
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
            id: "5"
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            vm.realname = decodeURI(response.data.result.realname);
            vm.username = decodeURI(response.data.result.username);
            vm.sex = response.data.result.sex;
            vm.nationality = response.data.result.nationality;
            vm.religion = response.data.result.religion;
            vm.birth = response.data.result.birth;
            vm.birthplace = response.data.result.birthplace;
            vm.place = response.data.result.place;
            vm.job = response.data.result.job;
            vm.identity = response.data.result.identity;
            vm.education = response.data.result.education;
            vm.employer = response.data.result.employer;
            vm.position = response.data.result.position;
            vm.unit_address = response.data.result.unit_address;
            vm.unit_phone = response.data.result.unit_phone;
            vm.unit_email = response.data.result.unit_email;
            vm.family_address = response.data.result.family_address;
            vm.family_phone = response.data.result.family_phone;
            vm.family_code = response.data.result.family_code;
            vm.mailing_address = response.data.result.mailing_address;
            vm.phone = response.data.result.phone;
            vm.email = response.data.result.email;
            vm.people_position = response.data.result.people_position;
            vm.parttime = response.data.result.parttime;
            vm.expertise = response.data.result.expertise;
            vm.treatment = response.data.result.treatment;
            vm.resume = response.data.result.resume;
            vm.award = response.data.result.award;
            vm.dispose = response.data.result.dispose;
            vm.cancel = response.data.result.cancel;
            vm.partisan = response.data.result.partisan;
            vm.family_member = response.data.result.family_member;
            vm.social_relationship = response.data.result.social_relationship;
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
}
.content .item-content {
  padding: 1vh 0 1vh 0;
  height: auto;
  word-wrap: break-word;
  border-bottom: 1px dashed #a2bbcf;
  text-align: left;
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
</style>

