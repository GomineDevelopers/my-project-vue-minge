<template>
  <div class="proposal_bg">
    <div class="Proposal-wrapper">
        <el-form ref="form" :model="form" >
          <el-form-item label="提案名称">
            <el-input v-model="form.ProposalName"></el-input>
          </el-form-item>
          <el-form-item label="提案背景">
            <el-input v-model="form.ProposalBackground"></el-input>
          </el-form-item>
          <el-form-item label="问题">
            <el-input type="textarea" :rows="4" v-model="form.ProposalQuestion"></el-input>
          </el-form-item>
          <el-form-item label="建议">
            <el-input type="textarea" :rows="4" v-model="form.ProposalAdvice"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="bottom-btn" round type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
   </div>
  </div>
</template>
<script>
export default {
  name: 'proposal-edit',
  data() {
    return {
      form: {
        ProposalName: '',
        ProposalBackground: '',
        ProposalQuestion: '',
        ProposalAdvice: ''
      },
      rules: {
        ProposalName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ProposalBackground: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ProposalQuestion: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ProposalAdvice: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
.Proposal-wrapper {
  margin: 5px 10px;
  padding: 50px;
}

.el-textarea__inner {
  height: 10vh !important;
}
.Proposal-frame {
  padding: 40px;
  margin: 5px;
}
.bottom-btn {
  width: 90%;
  margin-top: 5vh;
  padding: 12px 0;
  letter-spacing: 1px;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
</style>
<style>
.el-form-item .el-form-item__label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
}
</style>


