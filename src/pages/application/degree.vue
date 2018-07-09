<template>
    <div class="application_inner_bg">
      <div class="container">
        <div class="title">学历学位</div>
        <div class="content">
          <el-row><span class="necessary">*</span>教育类型</el-row>
          <el-row>
            <el-select v-model="educationType" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row>毕业院校</el-row>
          <el-row>
            <el-input v-model="graduateSchool" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>专业</el-row>
          <el-row>
            <el-input v-model="major" class="inputText" clearable></el-input>
          </el-row>
          <el-row><span class="necessary">*</span>入学时间</el-row>
          <el-row>
            <el-date-picker v-model="enrolmentTime" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>毕业时间</el-row>
          <el-row>
            <el-date-picker v-model="graduateTime" type="date" size="large" placeholder="请选择"
                            class="dateInput inputText" :picker-options="pickerOptions1"></el-date-picker>
          </el-row>
          <el-row><span class="necessary">*</span>学历</el-row>
          <el-row>
            <el-select v-model="education" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
          <el-row><span class="necessary">*</span>学位</el-row>
          <el-row>
            <el-select v-model="degree" placeholder="请选择" class="inputText">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-row>
        </div>
        <el-row class="application_btn">
          <el-button type="primary" round>保存</el-button>
          <el-button type="primary" round plain>删除</el-button>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "degree",
      data(){
          return{
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            educationType:'',
            graduateSchool:'',
            major:'',
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
            enrolmentTime:'',
            graduateTime:'',
            education:'',
            degree:''
          }
      }
    }
</script>

<style scoped>
  .container {
    margin: 6vh 17vw;
  }

  .title {
    font-weight: bold;
    color: #185a88;
  }

  .content {
    text-align: left;
    margin-top: 2vh;
  }

  .necessary {
    color: #cb1414;
  }

  .content .inputText {
    padding: .6vh 0 1vh 0;
  }

  .dateInput {
    width: 100%;
  }

  .application_btn{
    padding-top: 2vh;
  }

</style>

