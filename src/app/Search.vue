<template>
  <div>
    <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" top="46px"></search>
    <card :header="{title:'热门推荐'}">
      <ul slot="content" class="card-demo-flex card-demo-content01">
        <li v-for="(info, index) in recommendSearch" @click="changeOneSearch(info.name)">{{ info.name }}</li>
      </ul>
    </card>
    <!--搜索历史记录部分-->
    <group title="" v-if="!serachLog">
        <cell v-for="(log, index) in searchLog" :title="log.name" :link="log.link" inline-desc=''></cell>
    </group>
    <divider class="divider" v-if="!serachLog"><span @click="delSearchLog()">（图标）</span>：删除历史记录</divider>
  </div>
</template>

<script>
import { Search, Group, Cell , Divider, Card } from '../components'

export default {
  components: {
    Search,
    Group,
    Cell,
    Card,
    Divider
  },
  methods: {
    resultClick (item) {
      alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    },
    changeOneSearch (v) {
      let that = this;
      that.value = v;
    },
    delSearchLog () {
      let that = this;
      that.serachLog = true;
      that.searchLog = [];
    }
  },
  data () {
    return {
      results: [],
      value: '',
      serachLog: false,
      recommendSearch:[
        {
          'name': 1,
          'shopId' : 1
        },
        {
          'name': 2,
          'shopId' : 2
        },
        {
          'name': 3,
          'shopId' : 3
        },
        {
          'name': 4,
          'shopId' : 4
        },
        {
          'name': 5,
          'shopId' : 5
        },
        {
          'name': 6,
          'shopId' : 6
        },
        {
          'name': 7,
          'shopId' : 7
        }
      ],
      searchLog: [
        {
          'name': 4,
          'shopId' : 4,
          'link' : '/component/radio'
        },
        {
          'name': 5,
          'shopId' : 5,
          'link' : '/component/radio'
        },
        {
          'name': 6,
          'shopId' : 6,
          'link' : '/component/radio'
        },
        {
          'name': 7,
          'shopId' : 7,
          'link' : '/component/radio'
        }
      ],
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

<style scoped lang="less">
@import '../styles/1px.less';
.card-demo-flex {
  display: inline-block;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

ul { 
  width: 80%; 
  margin-left: 10%;
}
li { 
  float: left; 
  padding: 4px 6px; 
  width: 25%; 
  margin-right: 3%; 
  margin-top: 6px; 
  text-align: center; 
  border-radius: 3px; 
  background: rgba(0, 0, 0, 0.05);
}
.divider {
  margin-top: 10px;
}
</style>

