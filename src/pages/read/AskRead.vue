<template>
  <div>
    <el-row>
      <el-col :span="24" class="title"> <div>当前书籍为 <span class="book-name">《{{bookName}}》</span></div></el-col>
      <el-col :span="24">
      <div class="content ">
            <div class="intro">1.请选择是否公开约伴读书信息</div>
            <el-row>
              <el-col :span="24">
                <radio-picker :radioValues="checkValues" :radioValue="radioValue"
                            @handleRadioValue="setRadioValues"></radio-picker>
              </el-col>
            </el-row>
            <div class="intro">2.请选择您要邀请的读书伙伴</div>
            <el-row>
              <el-col :span="24">
                <el-select v-model="selectFriends" filterable multiple placeholder="请选择" class="friends" :modal-append-to-body='false'>
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.realname"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                 <el-button class="bottom-btn"  type="primary" @click="sendAsk" round> 确定</el-button>
              </el-col>
            </el-row>

          </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import RadioPicker from '@/components/RadioPicker.vue'

export default {
  name: 'ask-read',
  data() {
    return {
      bookName: '',
      bookId: '',
      checkValues: [{ text: '是', value: '1' }, { text: '否', value: '0' }],
      radioValue: 1,
      selectFriends: [],
      options: []
    }
  },
  components: {
    'radio-picker': RadioPicker
  },
  created() {
    this.bookName = this.$route.query.bookName
    this.bookId = this.$route.query.bookId
    this.getFriendList()
  },
  methods: {
 
    setRadioValues: function(radioValue) {
      this.radioValue = radioValue
    },
    getFriendList: function() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'user',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'get_user_list',
            book_id: vm.bookId
          }
        })
        .then(function(response) {
          vm.options = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    sendAsk: function() {
      let vm = this
      let postData = {}
      postData.is_private = vm.radioValue
      postData.ids = vm.selectFriends
      postData.book_id = vm.bookId
      if (vm.selectFriends.length == 0) {
        vm.$message.error('请至少选择一个伙伴')
      } else {
        vm
          .axios(vm.$commonTools.g_restUrl, {
            method: 'post',
            params: {
              i: '8',
              c: 'entry',
              p: 'user',
              do: 'shop',
              m: 'ewei_shop',
              ac: 'add_invite'
            },
            data: vm.$qs.stringify(postData)
          })
          .then(function(response) {
            if ((response.data.status = '200'))
              vm.$router.push({ name: 'BookDetail', params: { id: vm.bookId } })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  margin: 2vh auto;
}

.title .book-name {
  color: #dc9705;
}

.content {
  background: #ffffff;
  height: 60vh;
  width: 80%;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 20px 5px #e9e9e9;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  text-align: left;
  margin: 0 auto;
  padding: 5vw;
}

.intro {
  height: 6vh;
  line-height: 6vh;
  margin: 1vh;
}

.radio {
  width: 90%;
  margin: auto;
}
.item-content {
  display: flex;
  align-items: center;
  text-align: center;
}
.bottom-btn {
  width: 90%;
  margin: 5vh 5%;
  padding: 12px 0;
  letter-spacing: 1px;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
}
</style>
