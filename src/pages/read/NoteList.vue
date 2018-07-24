<template>
  <div class="container">
    <div class="card" v-for="(item, index) in notelists" :key="index"  @click="goNoteDetail(item.id)">
      <el-row type="flex" justify="space-between" >
        <el-col :span="24">
          <div class="bookTitle"><span>《<span v-text="item.title"></span>》</span></div>
          <el-row class="row-item">
            <el-col :span="24">
              <div class="author" v-text="item.chapter"></div>
            </el-col>
          </el-row>
          <el-row class="row-item">
            <el-col :span="24">
                 <div class="publish" v-text="item.content">
                </div>
            </el-col>
          </el-row>
          <el-row class="row-item">
            <el-col :span="12" ><div class="time" v-text="$commonTools.formatDate(item.create_time)"></div></el-col>
             <el-col :span="12">
                 <div class="translate" v-show="item.is_private==0"><i class="el-icon-edit-outline"></i>{{item.total}}条评论</div>
                 <div class="private-note" v-show="item.is_private==1"><i class="iconfont icon-lock"></i>私人笔记</div>
             </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'note-list',
  data() {
    return {
      notelists: {}
    }
  },
  mounted: function() {
    this.getNoteListData()
  },
  methods: {
    goNoteDetail(id) {
      this.$router.push({ name: 'NoteDetail', params: { noteId: id } })
    },
    getNoteListData() {
      let vm = this
      vm
        .axios(vm.$commonTools.g_restUrl, {
          params: {
            i: '8',
            c: 'entry',
            p: 'bookmates',
            do: 'shop',
            m: 'ewei_shop',
            ac: 'private_experience'
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            vm.notelists = response.data.result
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.container {
  overflow-x: hidden;
  overflow-y: scroll;
}
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
.row-item {
  padding: 0.2vh 3vh;
}
.row-item .time {
  padding: 0.1rem 0;
  color: #8a969f;
  font-size: 0.7rem;
  margin: 5px 0;
  float: left;
}
.author {
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.2vh 0;
  color: #457094;
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
  padding: 0.1rem 0.5rem;
  color: #8a969f;
  font-size: 0.7rem;
  margin: 5px 0;
  float: right;
}
.private-note {
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  background-color: #e9eff4;
  color: #8a969f;
  font-size: 0.7rem;
  margin: 5px 0;
  float: right;
}
.publish {
  text-align: left;
  color: #8a969f;
  margin: 5px 0;
  font-size: 0.7rem;
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

.icon-lock {
  font-size: 12px;
}
</style>

