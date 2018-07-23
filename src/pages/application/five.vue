<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row>曾参加党派团队</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addParty">+添加党派经历</div></el-row>
            <el-row><el-input v-model="partyTeam" class="inputText" clearable></el-input></el-row>
            <el-row><span class="necessary">*</span>家庭成员状况</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addMember">+添加家庭成员信息</div></el-row>
            <el-row><el-input v-model="familyMember" class="inputText" clearable></el-input></el-row>
            <el-row>社会关系</el-row>
            <el-row class="addDiv"><div class="addSome"  @click="addRelation">+添加社会关系</div></el-row>
            <el-row><el-input v-model="socialRelation" class="inputText" clearable></el-input></el-row>
          </div>
          <el-row>
            <el-button type="primary" round class="bottom-btn" @click="nextPage">下一页</el-button>
          </el-row>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "five",
      data(){
          return {
            partyTeam:'',
            familyMember:'',
            socialRelation:'',
            temp:''
          }
      },
      /*mounted(){
        let vm = this;
        vm.temp = sessionStorage.setItem("temp",JSON.stringify(vm.temp));
      },*/
      methods:{
        nextPage:function () {
          let vm = this;
          vm.temp = JSON.parse(sessionStorage.getItem("temp"));
          vm.temp.partisan = '';
          vm.temp.family_member = '';
          vm.temp.social_relationship = '';
          vm.$router.push({name:'ApplicationSix'});
        },
        addParty:function () {
          this.$router.push({name:'ApplicationPartyTeam'});
        },
        addMember:function () {
          this.$router.push({name:'ApplicationFamily'});
        },
        addRelation:function () {
          this.$router.push({name:'ApplicationRelationship'});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
