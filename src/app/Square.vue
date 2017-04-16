<template>
  <!--活动推荐部分-->
  <div>
    <div class="recommendImgRank">
      <span class="p1">排行榜</span><span>Rank</span>
    </div>
    <div class="comment">
      <span class="p1">评论</span><span>Comment</span>
    </div>
    <div class="pictures">
      <span class="p1">实景</span><span>Pictures</span>
    </div>
    <!--占位行-->
    <div class="line-5px"></div>
    <!--精选专题-->
    <div class="hotTopics" :class="{fixed:isfixed}">
      <div class="title" style="">
        <div class="red-line" style=""></div>
        <span class="desc" style="">精选专题</span>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <!-- <p v-for="(shop, index) in listdata">{{shop.name}}</p> -->
        <div style="margin: 10px;overflow: hidden;" v-for="(item, index) in listdata">
          <masker style="border-radius: 2px;">
            <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
            <div class="right_tips">
            </div>
            <div slot="content" class="m-title">
              {{item.title}}
              <br/>
              <span class="m-time">
                {{item.title}}
              </span>
            </div>
          </masker>
          <div class="rank_desc">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Masker from '../components/masker'
import app4 from './../images/index/timg1.jpg'
var count = 0;

export default {
  components: {
    Masker
  },
  methods: {
    loadMore () {
      this.busy = true;
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          count++;
          let arr = {
            'img': app4,
            'src': '/' + count,
            'name': count,
            'title': 'xxxxx' + count
          };
          this.listdata.push(arr);
        }
        this.busy = false;
        // console.log(this.listdata);
      }, 1000);
    },
  },
  data () {
    return {
      listdata: [],
    }
  }
}
</script>

<style lang="less">
.recommendImgRank {
  width:98%;
  margin-left: 1%;
  height:60px;
  margin-top: 10px;
  background:url("./../images/index/timg.jpg");
  background-size:100% 100%;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
}
.recommendImgRank .p1{
  display: block;
  height: 30px;
  line-height: 40px;
}
.comment {
  width:48%;
  margin-left: 1%;
  height:60px;
  float: left;
  margin-top: 5px;
  background:url("./../images/index/timg.jpg");
  background-size:100% 100%;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
}
.comment .p1{
  display: block;
  height: 30px;
  line-height: 40px;
}
.pictures {
  width:48%;
  margin-right: 1%;
  height:60px;
  float: right;
  margin-top: 5px;
  background:url("./../images/index/timg.jpg");
  background-size:100% 100%;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
}
.pictures .p1{
  display: block;
  height: 30px;
  line-height: 40px;
}

.hotTopics .title {
  width:100%;height:35px;line-height:30px;text-align:left;
}
.hotTopics .red-line {
  width:2px;height:16px;background:red;border-radius:20px;margin-top:7px;margin-left:3%;float:left;
}
.hotTopics .desc {
  color:#AD4E4E;display:inline-block;margin-left:10px;
}

/**下拉列表的样式**/
.hotTopics .m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.hotTopics .m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 3%;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.hotTopics .m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
.shop_tips .tips {
  padding:2px 3px;
  font-size:10px;
  line-height: 10px; 
  float: left; 
  margin-right:4px;
  border: 1px solid red; 
  background: red;
}
.hotTopics .rank_desc{
  height:20px;width:100%;text-align: left;
}
</style>
