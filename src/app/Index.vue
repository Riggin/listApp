<template>
  <div @touchmove="test()" class="margin_top_46px">
      <div :class="{titleFixed:titleFixed}">
      <span class="searchCity">{{ city }}&nbsp;&nbsp;<router-link to="/city"><img class="serchArrow" :src="pullIcon" /></router-link></span>
      <router-link to="/search"><input class="searchInput" type="text"  name="search" v-model="value"></router-link>
      <img class="searchIcon" slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png"/>
      </div>
    <!--首页推荐轮播-->
    <!-- <search class="searchInput" @on-submit="onSubmit" :auto-fixed="false" v-model="value"></search> -->
    <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange">
      
    </swiper>
    <!-- <p>current index: {{demo06_index}}</p> -->
    <!--预约中间三个图标-->
    <ul class="appointment" ref='aa'>
      <li v-for="(info, index) in appointment"><img :src="info.src" /><p class="title">{{info.title}}</p><p class="desc">{{ info.desc }}</p></li>
    </ul>

    <!--占位行-->
    <div class="line-10px"></div>

    <!--条件搜索-->
    <div class="case-search">
      <div class="title">
        <div class="left">
          <img class="title-icon" slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png"/>
          <span class="title-desc">1212121</span>
        </div>
        <div class="right">
          <span class="title-desc">1212121</span>
        </div>
      </div>
      <div class="search-input">
        <div class="input" @click="openFace()"><span class="input-value">{{date}}{{time}}{{peopleNum}}</span><img class="serchArrow" :src="pullIcon"></div>
        <span class="submit">btn</span>
      </div>
    </div>
    <!--占位行-->
    <div class="line-10px"></div>
    
    <!--附近商圈推荐-->
    <flexbox  :gutter="0">
      <flexbox-item :span="1/10"><div class="flex-cityNear"><img class="xyIcon" style="width:20px;height:20px;margin-top:10px;" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png"></div></flexbox-item>
      <flexbox-item :span="3/7"><div class="flex-cityNear">华侨城商业广场</div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-cityNear">10家餐厅</div></flexbox-item>
      <flexbox-item :span="1/6"><div class="flex-cityNear">0.79km</div></flexbox-item>
      <flexbox-item><div class="flex-cityNear">></div></flexbox-item>
    </flexbox>
    
    <!--占位行-->
    <div class="line-10px"></div>
    
    <!--活动推荐部分-->
    <div class="recommendImg"></div>
    <div class="preferential">
      <ul class="activePart">
        <li v-for="(info, index) in activePart" :class="'left_'+info.class"><router-link :to="info.href"><img :src="info.imgSrc"></router-link></li>
      </ul>
    </div>

    <!--占位行-->
    <div class="line-10px"></div>
    
    <!--推荐商家-->
    <div class="hotShop">
      <div class="title" style="">
        <div class="red-line" style=""></div>
        <span class="desc" style="">热门商家</span>
      </div>
      <ul class="shopList">
        <li class="shop_1" v-for="(hot, index) in hotShop" :class="{shop_3:index%3==0}">
          <router-link :to="hot.href"><img :src="hot.imgSrc"/><br><span>{{hot.title}}</span></router-link>
        </li>
      </ul>
    </div>
    <!--占位行-->
    <div class="line-10px"></div>
    <!--推荐商家-->
    <div class="hotShop" :class="{fixed:isfixed}">
      <div class="title" style="">
        <div class="red-line" style=""></div>
        <span class="desc" style="">精选商家</span>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <!-- <p v-for="(shop, index) in listdata">{{shop.name}}</p> -->
        <div style="margin: 10px;overflow: hidden;" v-for="(item, index) in listdata">
          <masker style="border-radius: 2px;">
            <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
            <div class="right_tips">
              <ul class="cricle">
                <li class="cricle_desc" style="">限量桌椅</li>
                <li class="cricle_desc" style="">独家预订</li>
              </ul>
            </div>
            <div slot="content" class="m-title">
              {{item.title}}
              <br/>
              <span class="m-time">
                <ul class="shop_tips">
                  <li class="tips">1212</li>
                  <li class="tips">1212</li>
                  <li class="tips">1212</li>
                </ul>
              </span>
            </div>
          </masker>
        </div>
      </div>
    </div>
    
    

    <!--弹出选择框层-->
    <div class="search-face" @click="" v-if="serch_face">
      <div class="content">
        <divider>日期<span style="color: red;">（{{date}}）</span></divider>
        <scroller lock-y scrollbar-x>
          <div class="box1">
            <div class="box1-item" v-for="(data, index) in date_arr" :class="{'border-red':data.selected}" @click="setDateCur(index)"><span class="data">{{data.data}}</span><span  class="week">{{ data.week }}</span></div>
          </div>
        </scroller>
        <divider>时间<span style="color: red;">（{{time}}）</span></divider>
        <scroller lock-y scrollbar-x>
          <div class="box2">
            <div class="box2-item" v-for="(tm, index) in time_arr" :class="{'border-red':tm.selected}" @click="setTimeCur(index)"><span>{{tm.time}}</span></div>
          </div>
        </scroller>
        <divider>人数<span style="color: red;">（{{peopleNum}}人）</span></divider>
        <scroller lock-y scrollbar-x>
          <div class="box3">
            <div class="box2-item" v-for="(pn, index) in people_arr" :class="{'border-red':pn.selected}" @click="setNumCur(index)"><span>{{pn.num}}</span></div>
          </div>
        </scroller>
        <!-- <divider><span>&nbsp;</span></divider> -->
        <div class="line-F0F0F0"></div>
        <box gap="30px 10px">
          <flexbox>
            <flexbox-item>
              <x-button type="warn" @click="closeFace()">取消</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="primary" @click="closeFace()">确定</x-button>
            </flexbox-item>
          </flexbox>
        </box>
      </div>
    </div>
  </div>

</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Search, Divider ,Scroller, Spinner, Flexbox, FlexboxItem, Box, Masker} from '../components'
import app1 from './../images/index/1.jpeg'
import app2 from './../images/index/2.jpeg'
import app3 from './../images/index/3.jpeg'
import app4 from './../images/index/timg1.jpg'
import searchIcon from './../images/index/search.png'
import pullIcon from './../images/index/pull.png'

const baseList = [
                  {
                    url: 'javascript:',
                    img: 'http://og1rlwcj8.bkt.clouddn.com/20141111234454_AwKCm.thumb.700_0.jpeg',
                    title: '1111111111？'
                  }, {
                    url: 'javascript:',
                    img: 'http://og1rlwcj8.bkt.clouddn.com/u=897623406,24655471&fm=21&gp=0.jpg',
                    title: '22222222222?'
                  }, {
                    url: 'javascript:',
                    img: 'http://og1rlwcj8.bkt.clouddn.com/u=3737719926,1965507257&fm=21&gp=0.jpg',
                    title: '33333333333？'
                  }
                ]
var count = 0;
const urlList = baseList.map((item, index) => ({
  url: item.url,
  img: item.img,
  title: `${item.title}`
}))

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider,
    Search,
    Divider,
    Scroller,
    Spinner,
    Flexbox,
    FlexboxItem,
    Box,
    Masker
  },
  computed: {
    city () {
      return this.$store.state.searchCity
    }
  },
  methods: {
    demo06_onIndexChange (index) {
      this.demo06_index = index
    },
    setDateCur (index) {
        let that =  this;
        that.date_arr[index].selected = true;
        that.date = that.date_arr[index].data + that.date_arr[index].week;
        for(var i=0;i< that.date_arr.length; i++){
            if(i != index){
                that.date_arr[i].selected = false;
            }
        }
    },
    setTimeCur (index) {
        let that =  this;
        that.time_arr[index].selected = true;
        that.time = that.time_arr[index].time;
        for(var i=0;i< that.time_arr.length; i++){
            if(i != index){
                that.time_arr[i].selected = false;
            }
        }
    },
    setNumCur (index) {
        let that =  this;
        that.people_arr[index].selected = true;
        that.peopleNum = that.people_arr[index].num;
        for(var i=0;i< that.people_arr.length; i++){
            if(i != index){
                that.people_arr[i].selected = false;
            }
        }
    },
    openFace () {
      let that = this;
      that.serch_face = true;
    },
    closeFace () {
      let that = this;
      that.serch_face = false;
    },
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
    get_scrollTop_of_body () { 
        var scrollTop; 
        if(typeof window.pageYOffset != 'undefined'){//pageYOffset指的是滚动条顶部到网页顶部的距离
            scrollTop = window.pageYOffset; 
        }else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        { 
            scrollTop = document.documentElement.scrollTop; 
        }else if(typeof document.body != 'undefined'){ 
            scrollTop = document.body.scrollTop; 
        } 
        return scrollTop; 
    },
    test () {
         var scrollTop = this.get_scrollTop_of_body();
         console.log(scrollTop)
         if(document.getElementsByClassName('appointment')[0].offsetTop < scrollTop) {
          this.titleFixed = true;
         }
    },
    
  },
  mounted () {
    let self = this;
    // let mTop = document.getElementsByClassName('appointment')[0].offsetTop
    
    setTimeout(function () {
      // console.log(mTop)this.$refs.aa.offsetHeight
    }, 0)
  },
  created () {
    //this.scrollFn();
    // this.test();
  },
  data () {
    return {
      position: 0,
      demo06_list: urlList,
      titleFixed: false,
      demo06_index: 0,
      results: [],
      autoFixed: false,
      serch_face: false,
      value: '美食',
      date: '03月20日 周一',
      time: '18:00',
      peopleNum: 2,
      pullIcon: pullIcon,
      searchIcon: searchIcon,
      listdata: [],
      busy: false,
      activePart:[
          {
            'class':1,//这个是指的样式号 
            'title':'第一个',
            'imgSrc': app4,
            'href': '/1'
          },
          {
            'class':2,//这个是指的样式号 
            'title':'第二个',
            'imgSrc': app4,
            'href': '/2'
          },
          {
            'class':3,//这个是指的样式号 
            'title':'第三个',
            'imgSrc': app4,
            'href': '/3'
          },
          {
            'class':4,//这个是指的样式号 
            'title':'第四个',
            'imgSrc': app4,
            'href': '/4'
          },
          {
            'class':5,//这个是指的样式号 
            'title':'第五个',
            'imgSrc': app4,
            'href': '/5'
          },
          {
            'class':6,//这个是指的样式号 
            'title':'第六个',
            'imgSrc': app4,
            'href': '/6'
          },
      ],
      hotShop:[
          {
            'class':1,//这个是指的样式号 
            'title':'第一个',
            'imgSrc': app4,
            'href': '/1'
          },
          {
            'class':2,//这个是指的样式号 
            'title':'第二个',
            'imgSrc': app4,
            'href': '/2'
          },
          {
            'class':3,//这个是指的样式号 
            'title':'第三个',
            'imgSrc': app4,
            'href': '/3'
          },
          {
            'class':4,//这个是指的样式号 
            'title':'第四个',
            'imgSrc': app4,
            'href': '/4'
          },
          {
            'class':5,//这个是指的样式号 
            'title':'第五个',
            'imgSrc': app4,
            'href': '/5'
          },
          {
            'class':6,//这个是指的样式号 
            'title':'第六个',
            'imgSrc': app4,
            'href': '/6'
          },
      ],
      appointment:[
          {
            'title':'排队取号',
            'desc':'火爆餐厅取号不排队',
            'src': app1
          },
          {
            'title':'预约订座',
            'desc':'订座一秒成功不用等',
            'src':app2
          },
          {
            'title':'扫描号单',
            'desc':'随时掌控排队进展',
            'src':app3
          }
      ],
      date_arr: [
        {'data':'03月18日', 'week': '周五', 'selected': false},
        {'data':'03月19日', 'week': '周六', 'selected': false},
        {'data':'03月20日', 'week': '周日', 'selected': false},
        {'data':'03月21日', 'week': '周一', 'selected': true},
        {'data':'03月22日', 'week': '周二', 'selected': false},
        {'data':'03月23日', 'week': '周三', 'selected': false},
        {'data':'03月24日', 'week': '周四', 'selected': false},
        {'data':'03月25日', 'week': '周五', 'selected': false},
        {'data':'03月26日', 'week': '周六', 'selected': false},
        {'data':'03月27日', 'week': '周日', 'selected': false},
        {'data':'03月28日', 'week': '周一', 'selected': false},
        {'data':'03月29日', 'week': '周二', 'selected': false},
        {'data':'03月30日', 'week': '周三', 'selected': false},
        {'data':'03月31日', 'week': '周四', 'selected': false},
        {'data':'04月01日', 'week': '周五', 'selected': false},
        {'data':'04月02日', 'week': '周六', 'selected': false},
        {'data':'04月03日', 'week': '周日', 'selected': false},
        {'data':'04月04日', 'week': '周一', 'selected': false},
        {'data':'04月05日', 'week': '周二', 'selected': false},
        {'data':'04月06日', 'week': '周三', 'selected': false}
      ],
      time_arr: [
        {'time': '10:30', 'selected': true},
        {'time': '11:00', 'selected': false},
        {'time': '11:30', 'selected': false},
        {'time': '12:00', 'selected': false},
        {'time': '12:30', 'selected': false},
        {'time': '13:00', 'selected': false},
        {'time': '13:30', 'selected': false},
        {'time': '14:00', 'selected': false},
        {'time': '14:30', 'selected': false},
        {'time': '15:00', 'selected': false},
        {'time': '15:30', 'selected': false},
        {'time': '16:00', 'selected': false},
        {'time': '16:30', 'selected': false},
        {'time': '17:00', 'selected': false},
        {'time': '17:30', 'selected': false},
        {'time': '18:00', 'selected': false},
        {'time': '18:30', 'selected': false},
        {'time': '19:00', 'selected': false},
        {'time': '19:30', 'selected': false},
        {'time': '20:00', 'selected': false},
        {'time': '20:30', 'selected': false},
        {'time': '21:00', 'selected': false}
      ],
      people_arr: [
        {'num': '1', 'selected': true},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false},
        {'num': '1', 'selected': false}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}

/**下拉刷新**/
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}

/**首页向上提46px**/
.margin_top_46px{
  margin-top:-46px;
}
/**搜索样式**/
p {
  padding: 10px 15px;
  font-size: 14px;
  color: #888;
}
.searchInput {
  width: 70%;
  height: 20px;
  position: absolute;
  z-index: 99;
  right: 8%;
  border: 0;
  outline: none;
  text-indent: 20px;
  background: rgba(255, 255, 255, .3);
  border-radius: 10px;
  border: 0.5px solid rgba(255, 0, 255, .9);
  margin-top: 5px;
}
.searchIcon {
  width: 16px;
  height: 16px;
  position: absolute;
  z-index: 99;
  left: 22.5%;
  margin-top: 9px;
}
.searchCity {
  width: 17%;
  height: 20px;
  line-height: 20px;
  color: #4e4e4e;
  position: absolute;
  z-index: 99;
  left: 2%;
  margin-top: 7px;
}
.serchArrow {
  width: 16px;
  display: inline-block;
}
.titleFixed {
  width: 100%;
  height: 30px;
  position: fixed;
  z-index: 99;
  background: #FFF;
  border-bottom: 1px solid #eee;
  color: #000;
  display: block;
  line-height: 30px;
}

/**下拉列表的样式**/
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.cricle {
  position: absolute;
  top: 10px;
  right: 10px;
}

.cricle .cricle_desc {
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 16px;
  background:blue;
  float: right;
  font-size:0.6em;
  color:#FFFFFF;
  word-break: break-all;
  line-height:13px;
  float: right;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, .5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 3%;
  right: 0;
  width: 100%;
  text-align: left;
  top: 80%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}

/******/
.appointment {
  width: 99%;
  margin-left: 0.5%;
}
.appointment li{
  width: 33.33%;
  /* margin-right: 1%; */
  float: left;
  text-align: center;
  color: #333;
}
.appointment li p{
  text-align: center;
}
.appointment li img {
  width: 80%;
}
.appointment li .desc {
  color: #666;
  font-size: 10px;
  padding: 0;
}
.appointment li .title{
  color: #666;
  line-height: 10px;
  font-size: 14px;
}
.case-search {
  width: 100%;
  height: 80px;
  background: #FFFFFF;
}
.case-search .title {
  width: 94%;
  margin-left: 3%;
  height: 40px;
  line-height: 40px;
  text-align: left;
}

.case-search .title .left {
  width: 50%;
  float: left;
}
.case-search .title .left .title-icon {
  width: 32px;
  height: 32px;
  margin-top: 4px;
  float: left;
}
.case-search .title .left .title-desc {
  color: #544C64;
  padding-left: 10px;
}

.case-search .title .right {
  width: 50%;
  float: left;
}
.case-search .title .right .title-desc {
  color: #544C64;
  padding-left: 15px;
}

.case-search .search-input {
  width: 94%;
  margin-left: 3%;
  height: 40px;
  line-height: 40px;
}
.case-search .search-input .input {
  width: 65%;
  float: left;
  border: 1px solid #919191;
  height: 30px;
  border-radius: 3px;
  margin-top: 5px;
  color: #919191;
  line-height: 32px;
}
.case-search .search-input .input .input-value {
  padding-left: 16px;
}
.case-search .search-input .input img{
  padding-left: 12px;
}
.case-search .search-input .submit {
  width: 29%;
  height: 32px;
  display: inline-block;
  background: #AD4E4E;
  border-radius: 6px;
  text-align: center;
  line-height: 32px;
  color: #FFFFFF;
  font-weight: bold;
  margin-left: 4%;
}

.search-face {
  position: absolute;
  z-index: 99999; 
  width: 100%; 
  height: 100%; 
  background: rgba(229, 229, 299, .2);
  top: 0px;
}

.search-face .content{
  width: 100%;
  height: 70%;
  background: #FFFFFF; 
  position: fixed; 
  bottom: 0px;
  z-index: 999999; 
}
.search-face .content .box1 {
  height: 60px;
/*  position: relative;*/
  width: 1630px;
}
.search-face .content .box1-item {
  width: 70px;
  height: 60px;
  background-color: #FFFFFF;
  display:inline-block;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 30px;
  /*border: 1px solid #FFFFFF;*/
}
.search-face .content .box1-item:first-child {
  margin-left: 5px;
}
.search-face .content .box1-item:last-child {
  margin-right: 5px;
}
.search-face .content .box2 {
  height: 40px;
/*  position: relative;*/
  width: 1600px;
}
.search-face .content .box2-item {
  width: 60px;
  height: 40px;
  background-color: #FFFFFF;
  display:inline-block;
  margin-left: 10px;
  float: left;
  text-align: center;
  line-height: 40px;
  /*border: 1px solid #FFFFFF;*/
}
.search-face .content .box2-item:first-child {
  margin-left: 5px;
}
.search-face .content .box2-item:last-child {
  margin-right: 5px;
}
.search-face .content .box3 {
  height: 20px;
/*  position: relative;*/
  width: 2500px;
}

.border-red { 
  border: 1px solid red;
 }

 .line-F0F0F0 {
  margin: 15px 0;
  border: 1px solid #F0F0F0;
 }

 .flex-cityNear {
  text-align: center;
  color: #000;
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 0;
  background-clip: padding-box;
}
.recommendImg {
  width:100%;
  height:60px;
  background:url("./../images/index/timg.jpg");
  background-size:100% 100%;
}
/**活动部分**/
.preferential {
  width: 100%;
}
.preferential .activePart li{
  width: 49.5%;float: left;
}
.preferential .activePart li img{
  width: 100%;
}
.preferential .activePart .left_1{
  border-right: 0.5px solid #04F4FB;border-bottom: 0.5px solid #04F4FB;
}
.preferential .activePart .left_2{
  border-bottom: 0.5px solid #04F4FB;
}
.preferential .activePart .left_3{
  border-right: 0.5px solid #04F4FB;border-bottom: 0.5px solid #04F4FB;
}
.preferential .activePart .left_4{
 border-bottom: 0.5px solid #04F4FB;
}
.preferential .activePart .left_5{
  border-right: 0.5px solid #04F4FB;
}
.preferential .activePart .left_6{
}
.hotShop .title {
  width:100%;height:35px;line-height:30px;text-align:left;
}
.hotShop .red-line {
  width:2px;height:16px;background:red;border-radius:20px;margin-top:7px;margin-left:3%;float:left;
}
.hotShop .desc {
  color:#AD4E4E;display:inline-block;margin-left:10px;
}
.hotShop .shopList {

}
.hotShop .shopList li {
  width: 33%;float: left;text-align: center;
}
.hotShop .shopList li img {
  width:80%;margin-top:8px;
}
.hotShop .shopList li span {}

.hotShop .shopList .shop_1 {
  border-right: 0.5px solid #04F4FB;border-top: 0.5px solid #04F4FB;
}
.hotShop .shopList .shop_3 {
  border-top: 0.5px solid #04F4FB;
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
/**可以设置颜色**/
.shop_tips .color {

}
</style>
