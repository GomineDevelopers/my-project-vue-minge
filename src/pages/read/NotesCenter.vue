<template>
  <div class="container">
    <div class="card" v-for="(item, index) in notelists" :key="index" @click="goNoteDetail(item.id)">
      <el-row type="flex" justify="space-between">

        <el-col :span="18">
          <div class="bookTitle"><span >《<span v-text="item.title"></span>》</span></div>
          <el-row>
            <el-col :span="16">
              <div class="author" v-text="item.chapter " ></div>
            </el-col>
            <el-col :span="8">
              <div class="translate"><i class="el-icon-edit-outline"></i>   <span>{{item.total}}条评论</span> </div>
            </el-col>
          </el-row>
          <div class="publish" v-text="item.content "> </div>
        </el-col>

        <el-col :span="6" class="reader">
          <div class="reader-container">
            <div class="readerTime" >分享人 &nbsp; <i class=" iconfont icon-aixin"></i></div>
            <div class="readerName" v-text="item.realname "></div>
            <div class="readerTime" v-text="$commonTools.formatDate(item.create_time)"></div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: 'notes-center',
  data() {
    return {
      notelists: {}
    }
  },
  mounted: function() {
    this.getNoteListData()
  },
  methods: {
    getNoteListData() {
      let vm = this
      vm.axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'public_experience'
          }
        })
        .then(function(response) {
          vm.notelists = response.data.result
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    goNoteDetail(id){
      this.$router.push({ name: 'NotesCenterDetail', params: { noteId: id } })
    }

  }
}
</script>

<style scoped>
.card {
  margin: 2vh 3vh;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 20px 5px #e9e9e9;
  border-radius: 5px;
}

.bookTitle {
  text-align: left;
  color: #457094;
  font-weight: bold;
  margin: 1vh 0;
}

.bookTitle > span {
  font-size: 18px;
  border-left: 4px solid #419ddc;
}

.author {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.2vh 0;
  color: #457094;
  padding: 0.6vh 3vh;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.circle span {
  color: #8a969f;
  font-size: 0.7rem;
}

.translate {
  margin: 0.2vh 0;
  padding: 0.6vh 0;
  color: #5452a0;
  font-size: 0.7rem;
  text-align: left;
}

.publish {
  text-align: left;
  color: #8a969f;
  margin: 5px 0;
  font-size: 0.7rem;
  padding: 0.2rem;
  padding-left: 3vh;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.reader {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reader-container {
  background-color: #419ddc;
  color: #ffffff;
  font-size: 0.6rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: relative;
}

.icon-aixin {
  font-size: 14px;
}

.readerName {
  font-size: 1rem;
  font-weight: bold;
  border-top: 1px dashed #ffffff;
  border-bottom: 1px dashed #ffffff;
  padding: 2px 0;
}

.readerTime {
  padding: 4px 0;
}
</style>
