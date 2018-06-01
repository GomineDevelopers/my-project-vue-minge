<template>
  <div class="bg1 proposal-cover">
    <vue-headful title="提案"/>
    <div class="proposal-list">
      <scroller
        :on-infinite="infinite" class="scroller-container">
        <!-- content goes here -->
        <div style="height: 44px;"></div>

        <div class="row status"
             :class="[item.type == 1 ? 'status-success':[item.type == 2 ? 'status-uncheck':'status-wait']]"
             v-for="item in listData">
          <div class="note" v-text="item.name"></div>
          <div class="block">
            <div class="title" v-text="item.title"></div>
            <div class="content" v-text="item.content"></div>
            <div class="btn-row" v-if="item.type == 3"><span class="edit"><i
              class="el-icon-edit-outline"></i>修改</span><span class="delete"><i class="el-icon-delete"></i>删除</span>
            </div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3" v-if="item.type == 1">已通过</div>
            <div class="c3" v-else-if="item.type == 2">审核中</div>
            <div class="c3" v-else-if="item.type == 3">待提交</div>
          </div>
        </div>

        <!--<div class="row status status-uncheck">
          <div class="note">提案2</div>
          <div class="block">
            <div class="title">本次党建工作十分重要大家要积极参与。本次党建工作十分重要大家要积极参与。</div>
            <div class="content">培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵</div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3">审核中</div>
          </div>
        </div>
        <div class="row status status-wait">
          <div class="note">提案3</div>
          <div class="block">
            <div class="title">本次党建工作十分重要大家要积极参与。本次党建工作十分重要大家要积极参与。</div>
            <div class="content">培训会上，陈应副主委希望大家重视宣传和 作，发挥好培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵</div>
            <div class="btn-row"><span class="edit"><i class="el-icon-edit-outline"></i>修改</span><span class="delete"><i class="el-icon-delete"></i>删除</span>
            </div>
            <div class="c1"></div>
            <div class="c2"></div>
            <div class="c3">待提交</div>
          </div>
        </div>-->
      </scroller>
    </div>
    <el-button type="primary" round class="bottom-btn">填写提案</el-button>
  </div>
</template>

<script>
  export default {
    name: "proposal",
    data() {
      return {
        isLast: false,
        listData: [{"name": "提案1", "title": "本次党建工作十分重要大家要积极参与。", "content": "民革贵阳市委召开八届三次会议", "type": 1},
          {
            "name": "提案2",
            "title": "本次党建工作十分重要大家要积极参与。本次党建工作十分重要大家要积极参与。",
            "content": "培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵",
            "type": 2
          },
          {"name": "提案3", "title": "本次党建工作十分重要大家要积极参与。本次党建工作十分重要大家要积极参与。。", "content": "民革贵阳市委召开八届三次会议", "type": 3},
          {
            "name": "提案4",
            "title": "本次党建工作十分重要大家要积极参与333333333。",
            "content": "培训会上，陈应副主委希望大家重视宣传和 作，发挥好培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵",
            "type": 1
          },
          {
            "name": "提案5",
            "title": "本次党建工作十分重要大家要积极参与4444444444444。",
            "content": "民革贵阳市委召开八届三次会议,培训会上，陈应副主委希望大家重视宣传和 作，发挥好培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵",
            "type": 3
          },
          {
            "name": "提案6",
            "title": "本次党建工作十分重55555555555。",
            "content": "民革贵阳市委召开八届三次会议,培训会上，陈应副主委希望大家重视宣传和 作，发挥好培训会上，陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵",
            "type": 3
          },
          {"name": "提案7", "title": "本次党建工作十分66666666。", "content": "民革贵阳市委召开八", "type": 2},
          {"name": "提案8", "title": "本次党建工作十分7777777774。", "content": "陈应副主委希望大家重视宣传和 作，发挥好各支部的宣传的阵", "type": 3},
        ]
      }
    },
    created: function () {
    },
    methods: {
      infinite: function (done) {
        let vm = this;
        if (!vm.isLast) {
          vm.getListData(done);
        } else {
          done(true);
        }
      },
      getListData: function () {
      },
      del: function () {
      },
      reWrite: function () {
      }
    }

  }
</script>

<style scoped>
  .proposal-cover {
    height: 100vh;
    position: relative;
  }

  .proposal-cover .proposal-list {
    padding-top: 3vh;
    height: 87vh;
    position: relative;
  }

  .proposal-cover .proposal-list .row {
    width: 88%;
    margin: auto;
  }

  .proposal-cover .proposal-list .row .note {
    text-align: left;
    color: #687177;
    font-size: 14px;
  }

  .proposal-cover .proposal-list .row .block {
    text-align: left;
    background: #ffffff;
    margin-top: 5px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-left: 3px solid #56b0f0;
    box-shadow: 0px 0px 20px 5px #E9E9E9;
    position: relative;
  }

  .proposal-cover .proposal-list .row .block .title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #cccccc;
    color: #80919c;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    padding: 5px 60px 5px 8px;
  }

  .proposal-cover .proposal-list .row .block .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 25px;
    padding: 5px 60px 5px 8px;
  }

  .proposal-cover .proposal-list .row .block .btn-row {
    text-align: right;
    color: #2192e0;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

  .btn-row .edit {
    margin-right: 20px;
  }

  .btn-row .delete {
    margin-right: 10px;
  }

  .proposal-cover .bottom-btn {
    position: absolute;
    bottom: 4vh;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    padding: 12px 0;
    letter-spacing: 1px;
    box-shadow: 0px 0px 20px 5px #E9E9E9;
  }

  .status .c1 {
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    position: absolute;
    top: 0;
    right: 0;

  }

  .status .c2 {
    width: 0;
    height: 0;
    border-top: 20px solid white;
    border-left: 20px solid transparent;
    position: absolute;
    top: 0;
    right: 0;
  }

  .status .c3 {
    top: 12px;
    right: -11px;
    color: white;
    position: absolute;
    width: 60px;
    height: 20px;
    transform: rotate(45deg);
    z-index: 111;
    font-size: 12px;
    text-align: center;
    letter-spacing: .5px;
  }

  .status-success .c1 {
    border-top: 60px solid #66C661;
  }

  .status-uncheck .c1 {
    border-top: 60px solid #4798C5;
  }

  .status-wait .c1 {
    border-top: 60px solid #D26E7A;
  }
</style>
