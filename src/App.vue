<template>
  <div style="height:100%;">
    <!-- <loading :show="isLoading" position="absolute"></loading> -->
    <loading :show="isLoading" position="absolute" text="加载中"></loading>
    <view-box ref="viewbox" :class="{'weui_tab_bd_no':this.route.path === '/'}">
      <!--header slot-->
      <div class="vux-demo-header-box" slot="header" v-if="this.route.path !== '/'">
        <x-header :left-options="leftOptions" :transition="headerTransition" :title="title" @on-click-title="scrollTop"></x-header>
      </div>
      <!--default slot-->
      <router-view
      :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"
      ></router-view>
      <!--bottom slot-->
      <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="!isTabbarDemo" slot="bottom">
        <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
          <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon">&#xe637;</span>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/nearby'}" :selected="isnearby" badge="9">
          <img class="demo-icon-22" slot="icon" src="https://o84lhz5xo.qnssl.com/master/src/assets/demo/icon_nav_msg.png"></img>
          <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>附近</span></span>
        </tabbar-item>
        <tabbar-item :link="{path:'/square'}" :selected="route.path === '/square'" show-dot>
          <span class="demo-icon-22" slot="icon">&#xe631;</span>
          <span slot="label">广场</span>
        </tabbar-item>
        <tabbar-item :link="{path:'/userCenter'}" :selected="route.path === '/userCenter'" show-dot>
          <span class="demo-icon-22" slot="icon">&#xe632;</span>
          <span slot="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Loading, ViewBox, XHeader } from './components'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Loading,
    ViewBox,
    XHeader
  },
  data () {
    return {
      routerTransition: {
        forward: 'slideRL',
        back: 'slideLR',
        showHeader: true
      }
    }
  },
  methods: {
    scrollTop () {
      this.$refs.viewbox.$refs.viewboxbody.scrollTop = 0
    }
  },
  computed: {
    route(){
        return this.$store.state.route
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if(!this.route.path) return false
      const parts = this.route.path.split('/');
      // console.log(parts[2]);
      if (/component/.test(this.route.path) && parts[2]) return parts[2]
    },
    isNearby () {
      return /component|nearby/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    title () {
      // if (this.route.path === '/') return '首页'
      if (this.route.path === '/square') return '广场'
      if (this.route.path === '/nearby') return '附近'
      if (this.route.path === '/userCenter') return '个人中心'
      if (this.route.path === '/search') return '搜索查询'
      // return this.componentName ? `Demo/${this.componentName}` : '租赁空间，省时省力。'
    },
    fetchDate () {

    }
  },
  mounted(){    
    console.log(this.route.path);
  },
  created () {
    // this.$watch("$route",()=>this.fetchDate())
  }
}
</script>

<style lang="less">
@import 'styles/index.less';
@import './styles/weui/base/reset';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}
.hidden{
  display: none;
}
/* v-r-transition, default is {forward: 'forward', back: 'back'}*/
.forward-enter, .forward-leave {
  transform: translate3d(-100%, 0, 0);
}
.back-enter, .back-leave {
  transform: translate3d(100%, 0, 0);
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui_tabbar.vux-demo-tabbar {
  backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 255, 250, .8);
}
.vux-demo-tabbar .weui_bar_item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
  color: #35495e;
}
.vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui_tabbar_icon + .weui_tabbar_label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.weui_tab_bd {
   padding-top: 46px; 
}
.weui_tab_bd_no {
  // margin-top: -46px;
  // margin-bottom: 46px;
}

/**
* vue-router transition
*/
.vux-pop-out-transition,
.vux-pop-in-transition {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter,
.vux-pop-out-leave,
.vux-pop-in-enter,
.vux-pop-in-leave {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter {
  animation-name: popInLeft;
}
.vux-pop-out-leave {
  animation-name: popOutRight;
}
.vux-pop-in-enter {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave {
  animation-name: popOutLeft;
}
.line-10px {
  width: 100%;
  height: 10px;
  display: inline-table;
  background: #F0F0F0;
}
.line-5px {
  width: 100%;
  height: 5px;
  display: -webkit-inline-box;
  background: #F0F0F0;
}
@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
