<template>
  <div>
    <el-row class="gender-picker">
      <el-col :span="24">
        <el-radio-group v-model="defaultValue" size="large" @change="emitValue()">
          <el-radio-button v-for="(item, index) in radioValues" :key="index" :label="item.value">{{item.text}}
          </el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'radio-picker',
    props: {
      radioValues: Array,
      radioValue: ''
    },
    data() {
      return {
        defaultValue: this.radioValue
      }
    },

    methods: {
      emitValue() {
        this.$emit('handleRadioValue', this.defaultValue)
      }
    }
  }
</script>



