<template>
  <div>
    <div class="selector">
      <ul>
        <li v-for="(banner, index) in bannerArr" @click="showIf(index)"><span>{{banner.name}}</span><img class="serchArrow" :src="pullIcon" /></li>
      </ul>
    </div>
    <!--热门商圈选择-->
    <div class="city-scroller" v-if="bannerArr[0].show">
      <scroller lock-x class="area" style="height:200px;">
        <div class="box2" :style="cityAreaHeight">
          <!-- <p v-for="(addArea, index) in addCityArea" :data-key="index" @click="changeAddArea(index)" :class="{'click': index == 0}">{{addArea}}</p> -->
          <p v-for="(area, index) in cityArea" :data-key="index" @click="changeArea(index)" :class="{'click': index == cityCricleKey}">{{area}}</p>
        </div>
      </scroller>
      <scroller lock-x class="shop-cricle" style="height:200px;" ref="scroller">
        <div class="box3" :style="cityCricleHeight">
          <p v-for="(cricle, index) in cityCricle[cityCricleKey]"  :data-key="index" @click="choseCricle(index)" >{{cricle.name}} </p>
        </div>
      </scroller>
    </div>
    <!--菜系筛选-->
    <div class="dish-scroller" v-if="bannerArr[1].show">
      <scroller lock-x class="dish-name" style="height:200px;" ref="scroller">
        <div class="box4">
          <p v-for="(dish, index) in dishArr"  :data-key="index" @click="choseDishText(index)" :class="{'click': dish.selected}">{{dish.name}} </p>
        </div>
      </scroller>
    </div>
    <!--智能排序筛选-->
    <div class="sort-scroller" v-if="bannerArr[2].show">
      <scroller lock-x class="sort-name" style="height:200px;" ref="scroller">
        <div class="box4">
          <p v-for="(sort, index) in sortArr"  :data-key="index" @click="choseSortText(index)" :class="{'click': sort.selected}">{{sort.name}} </p>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import { Scroller, Divider, Spinner} from '../components'
import pullIcon from './../images/index/pull.png'
import cityData from './../city/city.json'

export default {
  components: {
    Scroller,
    Divider,
    Spinner
  },
  pops: {

  },
  methods: {
    load (that) {
      setTimeout(function () {
        that.$emit('pulldown:reset', that.uuid)
      }, 1000)
    },
    scrollTop () {
      let that = this
      that.defaultList = !that.defaultList
      that.$nextTick(() => {
        that.$refs.scroller.reset({
          top: 0
        })
      })
    },
    changeArea (index) {
      let that = this
      that.cityCricleKey = index
      that.scrollTop()
      let pageHeight = 20
      that.cityCricleHeight = 'height:' + that.cityCricle[that.cityCricleKey].length*pageHeight + 'px'
    },
    showIf (index) {
      let that = this
      for (var i = that.bannerArr.length - 1; i >= 0; i--) {
        if(i == index) {
          that.bannerArr[i].show = !that.bannerArr[i].show
        } else {
          that.bannerArr[i].show =false
        }
      }
      console.log(that.bannerArr);
    },
    choseCricle (index) {
      let that = this
      that.area = that.cityArea[that.cityCricleKey]
      that.cricle = that.cityCricle[that.cityCricleKey][index].name
      console.log(that.area + that.cricle)
      that.bannerArr[0].name = that.cricle
      that.bannerArr[0].show = false
    },
    choseDishText (index) {
      let that = this
      that.choseDish = that.dishArr[index].name
      that.bannerArr[1].name = that.choseDish
      for (var i = that.dishArr.length - 1; i >= 0; i--) {
        if(i == index) {
          that.dishArr[i].selected = !that.dishArr[i].selected
        } else {
          that.dishArr[i].selected =false
        }
      }
      that.bannerArr[1].show = false
      console.log(that.choseDish)
    },
    choseSortText (index) {
      let that = this
      that.choseSort = that.sortArr[index].name
      that.bannerArr[2].name = that.choseSort
      for (var i = that.sortArr.length - 1; i >= 0; i--) {
        if(i == index) {
          that.sortArr[i].selected = !that.sortArr[i].selected
        } else {
          that.sortArr[i].selected =false
        }
      }
      that.bannerArr[2].show = false
      console.log(that.choseSort)
    }
  },
  created () {
    let that = this
    for(let i=0; i<that.cityData[that.cityKey].cities[that.cityKey].counties.length; i++) {
      that.cityArea.push(that.cityData[that.cityKey].cities[that.cityKey].counties[i].name)
      that.cityCricle.push(that.cityData[that.cityKey].cities[that.cityKey].counties[i].circles)
    }

    // for (var i = 0; i < that.addCricle.length; i++) {
    //   that.addCityArea.push(that.addCricle[i].name)
    //   that.addCityCricle.push(that.addCricle[i].counties[0].circles)
    // }
    // console.log(that.addCityCricle)

    that.cityAreaHeight = 'height:' + that.cityArea.length*20 + 'px'
    let pageHeight = 20
    that.cityCricleHeight = 'height:' + that.cityCricle[that.cityCricleKey].length*pageHeight + 'px'
  },
  data () {
    return {
      screenHeight: '20px',
      city:'北京市',
      area: '',
      cricle: '',
      defaultList:true,
      showNearCricle: false,
      showDish: false,
      cityKey: 0,
      cityArea: [],
      addCityArea: [],
      cityAreaHeight: '',
      cityCricleKey:0,
      addCityCricleKey: 0,
      cityCricle: [],
      addCityCricle: [],
      cityCricleHeight: '',
      cityData: cityData,
      pullIcon: pullIcon,
      choseDish:'',
      choseSort:'',
      bannerArr: [
        {'name':'附近全部','show':false},
        {'name':'全部菜系','show':false},
        {'name':'智能排序','show':false},
        {'name':'筛选','show':false},
      ],
      dishArr: [
        {'name':'全部菜系','selected':true},
        {'name':'川湘菜','selected':false},
        {'name':'粤菜','selected':false},
        {'name':'东北菜','selected':false},
        {'name':'云贵菜','selected':false},
        {'name':'西北菜','selected':false},
        {'name':'烤鱼','selected':false},
        {'name':'火锅','selected':false},
        {'name':'自助餐','selected':false},
        {'name':'小吃快餐','selected':false},
      ],
      sortArr: [
        {'name':'智能排序','selected':true},
        {'name':'距离最近','selected':false},
        {'name':'经济实惠','selected':false},
        {'name':'人气最高','selected':false},
      ],
      addCricle: [
          {
              "name": "附近",
              "counties": [
                  {
                      "circles": [
                          {
                              "name": "附近全部"
                          }
                      ],
                      "name": "附近全部"
                  }
              ]
          },
          {
              "name": "热门商圈",
              "counties": [
                  {
                      "circles": [
                          {
                              "name": "王府井"
                          },
                          {
                              "name": "灯市口"
                          },
                          {
                              "name": "沙子口"
                          },
                          {
                              "name": "崇文门"
                          },
                          {
                              "name": "东直门"
                          },
                          {
                              "name": "交道口"
                          }
                      ],
                      "name": "热门商圈"
                  }
              ]
          }
      ],
      list: [{
        title: '12',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '2',
        img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
      }, {
        title: '3',
        img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
      }, {
        title: '4',
        img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
      }, {
        title: '5',
        img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
      }, {
        title: '6',
        img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/1px.less';
.selector {
  width: 100%;
}
.selector ul {

}
.selector ul li{
  width: 25%;
  height: 30px;
  float: left;
  text-align: center;
  line-height: 30px;
}
.selector ul li span {
  padding-right: 5px;
}
.selector ul li .serchArrow {
  width: 14px;
  display: inline-block;
}

.city-scroller .area {
  width: 50%;float:left;background: #FFFFFF;color: #A6B3B7
}
.city-scroller p {
  width: 100%;height: 20px;text-indent: 8px;line-height: 20px;
}
.city-scroller .click {
  background: #EEEEEE;color: #FF8000; 
}
.city-scroller .bgcolor {
  background: #EEEEEE;
}
.city-scroller .shop-cricle {
  width: 50%;float:left;background: #EEEEEE;color: #A6B3B7
}

.dish-scroller .dish-name{
  background: #FFFFFF;color: #A6B3B7;width: 100%;
}

.dish-scroller .dish-name p{
  text-indent: 10px;
}

.dish-scroller .click {
  background: #EEEEEE;color: #FF8000; 
}

.sort-scroller .sort-name{
  background: #FFFFFF;color: #A6B3B7;width: 100%;
}

.sort-scroller .sort-name p{
  text-indent: 10px;
}

.sort-scroller .click {
  background: #EEEEEE;color: #FF8000; 
}
</style>
