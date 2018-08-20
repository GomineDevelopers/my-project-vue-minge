<template>
    <div>
      <div class="application_header"></div>
      <div class="application_bg">
        <div class="container">
          <div class="content">
            <el-row>曾参加党派团队</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addParty">+添加党派经历</div></el-row>
            <el-row v-for="(item,index) in partyTeam" :key="index">
              <el-input class="inputText" v-model="partyTeam[index]" clearable readonly @focus="goPartyTeamDetail(index)"></el-input>
            </el-row>
            <el-row><span class="necessary">*</span>家庭成员状况</el-row>
            <el-row class="addDiv"><div class="addSome" @click="addMember">+添加家庭成员信息</div></el-row>
            <el-row v-for="(item,index) in familyMember" :key='index+"a"'>
              <el-input class="inputText" v-model="familyMember[index]" clearable readonly @focus="goMemberDetail(index)"></el-input>
            </el-row>
            <el-row>社会关系</el-row>
            <el-row class="addDiv"><div class="addSome"  @click="addRelation">+添加社会关系</div></el-row>
            <el-row v-for="(item,index) in socialRelation" :key='index+"b"'>
              <el-input class="inputText" v-model="socialRelation[index]" clearable readonly @focus="goRelationDetail(index)"></el-input>
            </el-row>
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
            partyTeam:[],
            familyMember:[],
            socialRelation:[]
          }
      },
      mounted(){
          this.getExitData();
      },
      methods:{
        getExitData(){
          let vm = this;
          if(vm.$commonTools.getCookie("cookieData")){
            let cookieData = JSON.parse(vm.$commonTools.getCookie("cookieData"));
            if(cookieData.partisan != undefined){
              cookieData.partisan.forEach(function (ele,index,arr) {
                let str = ele.name + ',' + ele.position+ ',' + ele.start_time+','+ele.end_time;
                vm.partyTeam.push(decodeURI(str));
              });
            }
            if(cookieData.family_member != undefined){
              cookieData.family_member.forEach(function (ele,index,arr) {
                let str = ele.name + ',' + ele.relationship+ ',' + ele.birth+ ','+ ele.culture+ ',' + ele.political
                  +','+ele.address+','+ele.unit+','+ele.position;
                vm.familyMember.push(decodeURI(str));
              });
            }

            if(cookieData.social_relationship != undefined){
              cookieData.social_relationship.forEach(function (ele,index,arr) {
                let str = ele.name + ',' + ele.relationship+ ',' + ele.political +','+ele.address;
                vm.socialRelation.push(decodeURI(str));
              });
            }
          }
        },
        nextPage:function () {
          this.$router.push({name:'ApplicationSix'});
        },
        addParty:function () {
          this.$router.push({name:'ApplicationPartyTeam'});
        },
        goPartyTeamDetail(index){
          this.$router.push({name:'ApplicationPartyTeam',query: { index: index }});
        },
        addMember:function () {
          this.$router.push({name:'ApplicationFamily'});
        },
        goMemberDetail(index){
          this.$router.push({name:'ApplicationFamily',query: { index: index }});
        },
        addRelation:function () {
          this.$router.push({name:'ApplicationRelationship'});
        },
        goRelationDetail:function (index) {
          this.$router.push({name:'ApplicationRelationship',query: { index: index }});
        }
      }
    }
</script>

<style scoped>
  @import '../../../static/css/application.css';
</style>
