<template>
<div>
  <div :id="tdtMapDivID" class="divTdtMap"> </div>


    <div>
      <div class="catch-box">
        <!-- <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch> -->
        <span >拾取坐标点位置：  </span>
        <el-row>

            <el-input type="text" :value="lng"  readonly="readonly" size="mini">
              <template slot="prepend">经度</template>
            </el-input>
          
            <el-input type="text" :value="lat"  readonly="readonly" size="mini">
              <template slot="prepend">纬度</template>
            </el-input>
        </el-row>
        <!-- <input type="text" :value="lnglat"  readonly="readonly"/> -->
      </div>

      <el-radio-group v-model="searchType" size="small" @change="changeSearch()">
        <el-radio-button label="all">任意搜索</el-radio-button>
        <el-radio-button label="name">疗护机构搜索</el-radio-button>
        <el-radio-button label="area">疗护机构区域筛选</el-radio-button>
      </el-radio-group>
      <div class="search-box" id="searchBox">
        <input type="text" id="keyWord" v-model="inputText"/>
        <button id="searchbtn" @click="search()">搜索</button>
      </div>
      <el-cascader id="selectBox" size="large" :options="options" v-model="selectedOptions" @change="handleSelect"></el-cascader>
      <div class="item-list" id="itemList" style="display:none">
        <div>
          <span>搜索结果</span>
          <el-button style="float: right; padding:3px 0" type="text" @click="closeSearchBox()">关闭</el-button>
        </div>
        <el-divider></el-divider>
        <div >
          <!-- 提示词面板 -->
          <div id="promptDiv" class="prompt"></div>
          <!-- 统计面板 -->
          <div id="statisticsDiv" class="statistics"></div>
          <!-- 建议词面板 -->
          <div id="suggestsDiv" class="suggests"></div>
          <!-- 公交提示面板 -->
          <div id="lineDataDiv" class="lineData"></div>
          <!-- 任意搜索结果面板 -->
          <div id="resultDiv" class="result" style="display:none">
              <div id="searchDiv"></div>
              <el-divider></el-divider>
              <div id="pageDiv">
                  <el-button type="text" @click.native="localSearch.firstPage()">首页</el-button>
                  <el-button  type="text" @click.native="localSearch.previousPage()">上一页</el-button>
                  <el-button type="text" @click.native="localSearch.nextPage()">下一页</el-button>
                  <el-button  type="text" @click.native="localSearch.lastPage()">尾页</el-button>
                  <!-- <input type="button" value="首页" @Click="localSearch.firstPage()"/>
                  <input type="button" value="上一页" @Click="localSearch.previousPage()"/>
                  <input type="button" value="下一页" @Click="localSearch.nextPage()"/>
                  <input type="button" value="尾页" @Click="localSearch.lastPage()"/> -->
                  <br/>
                  转到第<input type="text" v-model="changePage" id="pageId" size="3"/>页
                  <input type="button" @click="localSearch.gotoPage(parseInt(changePage));"
                        value ="搜索"/>
              </div>
          </div>
          <!-- 机构搜索结果面板 -->
          <div id="insitutionDiv" ></div>
        </div>

      </div>
    </div>


    <!-- <div id="map">
      <div class="search-box">
        <input type="text" id="keyword" value="天安门"/>
        <button id="searchbtn">搜索</button>
      </div>
      <div class="item-list">
            <div id="close" class="list-close"></div>
            <div class="list-title">结果列表</div>
            <ul id="items">
            </ul>
            <div class="page-ctrl">
              <p>
                <a class="button" id="firstpage">首页</a>|
                <a class="button" id="prevpage">上一页</a>|
                <a class="button" id="nextpage">下一页</a>|
                <a class="button" id="lastpage">尾页</a>
              </p>
              <p id="countdiv"></p>
            </div>
        </div>
    </div> -->
</div>

 
</template>

<script>
  import { provinceAndCityDataPlus, CodeToText } from "element-china-area-data";

  export default {
    name: 'TdtMap',
    data() {
      return {
        tdtMapDivID: "tdtMapDivID_"+this._uid,
        tdtMap: {},
        careInstitutions: [],
        markers: [],
        localSearch:{},
        inputText:'',
        changePage: 1,
        searchType: 'all',

        options: provinceAndCityDataPlus,
        selectedOptions: [],
        lnglat:'',
        lng:'',
        lat:'',
      }
    },
    created() {
    },
    mounted(){
      // 初始化天地图
      this.initTdtMap();

      console.log(this.options)
    },
    watch: {
      lng(newLng, oldLng) {
        this.$bus.$emit('lng',newLng);
        console.log(this.$bus)
      }
    },
    methods: {
      // 初始化天地图
      initTdtMap(){
        this.tdtMap = new T.Map(this.tdtMapDivID);
        if(this.$route.query.lng && this.$route.query.lat)
        {
          this.tdtMap.centerAndZoom(new T.LngLat(this.$route.query.lng, this.$route.query.lat), 11);
        }
        else {
          this.tdtMap.centerAndZoom(new T.LngLat(113.27, 23.13), 11);
        }
        this.addMarker();
        this.localSearch = new T.LocalSearch(this.tdtMap, {
                pageCapacity: 10,    //每页显示的数量
                onSearchComplete: () => {this.localSearchResult()}    //接收数据的回调函数
            });
        console.log(this.localSearch)

        var cp = new T.CoordinatePickup(this.tdtMap, {callback: this.getLngLat})
        cp.addEvent();
        if(this.$route.query.name) {
          this.inputText = this.$route.query.name;
          this.getCareInstitutionsByName(this.inputText);
        }

      },
      getLngLat(lnglat) {
        //this.lnglat = lnglat.lng.toFixed(6) + "," + lnglat.lat.toFixed(6);
        this.lng = lnglat.lng.toFixed(6);
        this.lat = lnglat.lat.toFixed(6);
      },

      addMarker() {
        //创建标注对象
        this.tdtMap.clearOverLays();
        //var markerIcon = new T.Icon({iconUrl:"http://api.tianditu.gov.cn/img/map/markerA.png"})
        //创建一个默认的标注点
        this.$axios.post('/api/careInstitution/getCareInstitutionsByLocation').then(res => {
          this.careInstitutions = res.data.data;
          console.log(res)
          this.careInstitutions.forEach(careInstitution => {
            var marker = new T.Marker(new T.LngLat(careInstitution.coordinateX, careInstitution.coordinateY))
            console.log(marker);
            marker.info = careInstitution;
            
            marker.addEventListener("click", () => {this.addMarkerInfoWin(marker.info)})
            this.tdtMap.addOverLay(marker);
            this.markers.push(marker);
          });
        })
      },
      addMarkerInfoWin(careInstitution) {
        
        var markerInfoWin = new T.InfoWindow();
        //markerInfoWin.setLngLat(new T.LngLat(careInstitution.coordinateX, careInstitution.coordinateY));
        var infoWinContent = `<div style="margin-top:5px;font-size:0.5rem">
                                <p>名称：${careInstitution.name}</p>
                                <p>时间：${careInstitution.officeHours}</a>
                                <p>电话：${careInstitution.phone}</a>
                                <p>邮箱：${careInstitution.email}</a>
                                <p>区划：${careInstitution.province} ${careInstitution.prefecture} ${careInstitution.county}  ${careInstitution.township}
                                </div>`;
        markerInfoWin.setContent(infoWinContent);
        this.tdtMap.openInfoWindow(markerInfoWin, new T.LngLat(careInstitution.coordinateX, careInstitution.coordinateY));
        // this.tdtMap.addOverLay(markerInfoWin);

      },
      handleSelect (value) {
        console.log(value)
        console.log(this.selectedOptions)
        this.getCareInstitutionsByLocation(value)
      },
      
      changeSearch() {
        this.tdtMap.centerAndZoom(new T.LngLat(113.27, 23.13), 11);
        this.addMarker();
        if(this.searchType == 'area') {
          document.getElementById("searchBox").style.display = "none";
          document.getElementById("selectBox").style.display = "inline-block";
          document.getElementById("searchDiv").innerHTML = "";
          document.getElementById("itemList").style.display = "none";
        }
        else {
          document.getElementById("searchBox").style.display = "block";
          document.getElementById("selectBox").style.display = "none";
          document.getElementById("searchDiv").innerHTML = "";
          document.getElementById("itemList").style.display = "none";
        }
      },
      showCareInstitutionsRes(res) {
        var that = this;
        document.getElementById("insitutionDiv").innerHTML = "";
        document.getElementById("itemList").style.display = "block";
        if(res.data.code == 200) {
          
          var ins = res.data.data
          //显示搜索列表
          var divMarker = document.createElement("div");
          //坐标数组，设置最佳比例尺时会用到
          var zoomArr = [];
          for (let i = 0; i < ins.length; i++) {
            (function (i) {
              var lnglat = new T.LngLat(ins[i].coordinateX,ins[i].coordinateY);
              var marker = new T.Marker(lnglat);
              console.log(marker);
              
              marker.addEventListener("click", () => {that.addMarkerInfoWin(ins[i])})
              that.tdtMap.addOverLay(marker);
              zoomArr.push(lnglat);

               //在页面上显示搜索的列表
                var a = document.createElement("a");
                a.href = "javascript://";
                a.innerHTML = ins[i].name;
                a.onclick = function () {
                    that.addMarkerInfoWin(ins[i])
                }
                divMarker.appendChild(document.createTextNode((i + 1) + "."));
                divMarker.appendChild(a);
                divMarker.appendChild(document.createElement("br"));
            })(i);
          }
            console.log(2)
              //显示地图的最佳级别
              that.tdtMap.setViewport(zoomArr);
              //显示搜索结果
              divMarker.appendChild(document.createTextNode('共' + ins.length + '条记录' ));
              document.getElementById("insitutionDiv").appendChild(divMarker);
              document.getElementById("insitutionDiv").style.display = "block";
              console.log(divMarker)
          
        }
      },

      getCareInstitutionsByLocation(value) {
        var province = '';
        var prefecture = '';
        if(value[0]) {
          province = CodeToText[value[0]];
          if (value[1]) {
            prefecture = CodeToText[value[1]];
          }
        }
        console.log(province)
        this.$axios.post('/api/careInstitution/getCareInstitutionsByLocation', this.$qs.stringify({province:province, prefecture:prefecture})).then(res => {
          this.careInstitutions = res.data.data;
          console.log(res)
          this.showCareInstitutionsRes(res);
        })
      },
      getCareInstitutionsByName(name) {
        this.$axios.post('/api/careInstitution/getCareInstitutionsByName',this.$qs.stringify({name:name})).then(res => {
          console.log(res)
          this.showCareInstitutionsRes(res);
        })
      },
      search() {
        if(this.searchType == 'all') {
          this.localSearch.search(this.inputText,1);
          console.log(1)
          console.log(this.inputText)
          document.getElementById("itemList").style.display = "block";
        }
        else {
          console.log(2)
          this.getCareInstitutionsByName(this.inputText);
        }
      },
      localSearchResult() {
        console.log(1)
        var result = this.localSearch.getResults();
        console.log(result)
            var that = this;
            //清空地图及搜索列表
            clearAll();

            //添加提示词
            prompt(result);

            //根据返回类型解析搜索结果
            switch (parseInt(result.getResultType())) {
                case 1:
                    //解析点数据结果
                    pois(result.getPois());
                    break;
                case 2:
                    //解析推荐城市
                    statistics(result.getStatistics());
                    break;
                case 3:
                    //解析行政区划边界
                    area(result.getArea());
                    break;
                case 4:
                    //解析建议词信息
                    suggests(result.getSuggests());
                    break;
                case 5:
                    //解析公交信息
                    lineData(result.getLineData());
                    break;
            }
        

        //解析提示词
        function prompt(obj) {
          console.log(obj)
            var prompts = obj.getPrompt();
            if (prompts) {
              console.log(prompts)
                var promptHtml = "";
                for (var i = 0; i < prompts.length; i++) {
                    var prompt = prompts[i];
                    var promptType = prompt.type;
                    var promptAdmins = prompt.admins;
                    var meanprompt = prompt.DidYouMean;
                    if (promptType == 1) {
                        promptHtml += "<p>您是否要在" + promptAdmins[0].name + "</strong>搜索更多包含<strong>" + obj.getKeyword() + "</strong>的相关内容？<p>";
                    }
                    else if (promptType == 2) {
                        promptHtml += "<p>在<strong>" + promptAdmins[0].name + "</strong>没有搜索到与<strong>" + obj.getKeyword() + "</strong>相关的结果。<p>";
                        if (meanprompt) {
                            promptHtml += "<p>您是否要找：<font weight='bold' color='#035fbe'><strong>" + meanprompt + "</strong></font><p>";
                        }
                    }
                    else if (promptType == 3) {
                        promptHtml += "<p style='margin-bottom:3px;'>有以下相关结果，您是否要找：</p>"
                        for (i = 0; i < promptAdmins.length; i++) {
                            promptHtml += "<p>" + promptAdmins[i].name + "</p>";
                        }
                    }
                }
                if (promptHtml != "") {
                    document.getElementById("promptDiv").style.display = "block";
                    document.getElementById("promptDiv").innerHTML = promptHtml;
                }
            }
        }

        //解析点数据结果
        function pois(obj) {
            if (obj) {
                //显示搜索列表
                var divMarker = document.createElement("div");
                //坐标数组，设置最佳比例尺时会用到
                var zoomArr = [];
                for (var i = 0; i < obj.length; i++) {
                    //闭包
                    (function (i) {
                        //名称
                        var name = obj[i].name;
                        //地址
                        var address = obj[i].address;
                        //坐标
                        var lnglatArr = obj[i].lonlat.split(" ");
                        var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);

                        var winHtml = "名称:" + name + "<br/>地址:" + address;

                        //创建标注对象
                        var marker = new T.Marker(lnglat);
                        //地图上添加标注点
                        that.tdtMap.addOverLay(marker);
                        //注册标注点的点击事件
                        var markerInfoWin = new T.InfoWindow(winHtml, {autoPan: true});
                        marker.addEventListener("click", function () {
                            marker.openInfoWindow(markerInfoWin);
                        });

                        zoomArr.push(lnglat);

                        //在页面上显示搜索的列表
                        var a = document.createElement("a");
                        a.href = "javascript://";
                        a.innerHTML = name;
                        a.onclick = function () {
                            showPosition(marker, winHtml);
                        }
                        divMarker.appendChild(document.createTextNode((i + 1) + "."));
                        divMarker.appendChild(a);
                        divMarker.appendChild(document.createElement("br"));
                    })(i);
                }
                //显示地图的最佳级别
                that.tdtMap.setViewport(zoomArr);
                //显示搜索结果
                divMarker.appendChild(document.createTextNode('共' + that.localSearch.getCountNumber() + '条记录，分' + that.localSearch.getCountPage() + '页,当前第' + that.localSearch.getPageIndex() + '页'));
                document.getElementById("searchDiv").appendChild(divMarker);
                document.getElementById("resultDiv").style.display = "block";
            }
        }

        //显示信息框
        function showPosition(marker, winHtml) {
            var markerInfoWin = new T.InfoWindow(winHtml, {autoPan: true});
            marker.openInfoWindow(markerInfoWin);
        }

        //解析推荐城市
        function statistics(obj) {
            var divMarker = document.createElement("div");
            if (obj) {
                //坐标数组，设置最佳比例尺时会用到
                var pointsArr = [];
                var priorityCitysHtml = "";
                var allAdminsHtml = "";
                var priorityCitys = obj.priorityCitys;
                if (priorityCitys) {
                    //推荐城市显示
                    priorityCitysHtml += "在中国以下城市有结果";
                    for (var i = 0; i < priorityCitys.length; i++) {
                      (function(i) {
                        //priorityCitysHtml += "<li>" + priorityCitys[i].name + "(" + priorityCitys[i].count + ")</li>";
                        var city = priorityCitys[i];
                        let a = document.createElement("a");
                        a.href = "javascript://";
                        a.innerHTML = city.name + "(" + city.count + ")";
                        console.log(city.lon)
                        a.onclick = function () {
                          changeCity(city)
                          
                        }
                        divMarker.appendChild(document.createTextNode((i + 1) + "."));
                        divMarker.appendChild(a);
                        divMarker.appendChild(document.createElement("br"));
                      })(i);
                    }
                    //priorityCitysHtml += "</ul>";
                }

                // var allAdmins = obj.allAdmins;
                // if (allAdmins) {
                //     allAdminsHtml += "更多城市<ul>";
                //     for (var i = 0; i < allAdmins.length; i++) {
                //         allAdminsHtml += "<li>" + allAdmins[i].name + "(" + allAdmins[i].count + ")";
                //         var childAdmins = allAdmins[i].childAdmins;
                //         if (childAdmins) {
                //             for (var m = 0; m < childAdmins.length; m++) {
                //                 allAdminsHtml += "<blockquote>" + childAdmins[m].name + "(" + childAdmins[m].count + ")</blockquote>";
                //             }
                //         }
                //         allAdminsHtml += "</li>"
                //     }
                //     allAdminsHtml += "</ul>";
                // }
                document.getElementById("statisticsDiv").style.display = "block";
                //document.getElementById("statisticsDiv").innerHTML = priorityCitysHtml + allAdminsHtml;
                document.getElementById("statisticsDiv").innerHTML = priorityCitysHtml
                document.getElementById("statisticsDiv").appendChild(divMarker);
            }
        }
        
        function changeCity(city) {
          console.log(city)
          that.tdtMap.panTo(new T.LngLat(city.lon, city.lat), 11);
          that.search();
        }


        //解析行政区划边界
        function area(obj) {
            if (obj) {
                //坐标数组，设置最佳比例尺时会用到
                var pointsArr = [];
                var points = obj.points;
                for (var i = 0; i < points.length; i++) {
                    var regionLngLats = [];
                    var regionArr = points[i].region.split(",");
                    for (var m = 0; m < regionArr.length; m++) {
                        var lnglatArr = regionArr[m].split(" ");
                        var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                        regionLngLats.push(lnglat);
                        pointsArr.push(lnglat);
                    }
                    //创建线对象
                    var line = new T.Polyline(regionLngLats, {
                        color: "blue",
                        weight: 3,
                        opacity: 1,
                        lineStyle: "dashed"
                    });
                    //向地图上添加线
                    that.tdtMap.addOverLay(line);
                }
                //显示最佳比例尺
                that.tdtMap.setViewport(pointsArr);
            }
        }

        //解析建议词信息
        function suggests(obj) {
            if (obj) {
                //建议词提示，如果搜索类型为公交规划建议词或公交站搜索时，返回结果为公交信息的建议词。
                var suggestsHtml = "建议词提示<ul>";
                for (var i = 0; i < obj.length; i++) {
                    suggestsHtml += "<li>" + obj[i].name + "  <font style='color:#666666'>" + obj[i].address + "</font></li>";
                }
                suggestsHtml += "</ul>";
                document.getElementById("suggestsDiv").style.display = "block";
                document.getElementById("suggestsDiv").innerHTML = suggestsHtml;
            }
        }

        //解析公交信息
        function lineData(obj) {
            if (obj) {
                //公交提示
                var lineDataHtml = "公交提示<ul>";
                for (var i = 0; i < obj.length; i++) {
                    lineDataHtml += "<li>" + obj[i].name + "  <font style='color:#666666'>共" + obj[i].stationNum + "站</font></li>";
                }
                lineDataHtml += "</ul>";
                document.getElementById("lineDataDiv").style.display = "block";
                document.getElementById("lineDataDiv").innerHTML = lineDataHtml;
            }
        }

        //清空地图及搜索列表
        function clearAll() {
            that.tdtMap.clearOverLays();
            document.getElementById("searchDiv").innerHTML = "";
            document.getElementById("resultDiv").style.display = "none";
            document.getElementById("statisticsDiv").innerHTML = "";
            document.getElementById("statisticsDiv").style.display = "none";
            document.getElementById("promptDiv").innerHTML = "";
            document.getElementById("promptDiv").style.display = "none";
            document.getElementById("suggestsDiv").innerHTML = "";
            document.getElementById("suggestsDiv").style.display = "none";
            document.getElementById("lineDataDiv").innerHTML = "";
            document.getElementById("lineDataDiv").style.display = "none";
        }

      },
      closeSearchBox() {
        document.getElementById("itemList").style.display = "none";
      }



      
    }
  }
</script>

<style scoped>
  .divTdtMap {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 80vh;
    z-index: 0;
  }
  .search-box{
    top:120px;
    left:20px;
    position: absolute;
    z-index: 999;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #666;
    background: #fff;
  }
  .item-list{
    position: absolute;
    top:170px;
    left: 20px;
    z-index: 999;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #666;
    width: 250px;
    background: #fff;
  }
  .el-divider--horizontal {
    margin: 4px 0;
  }
  .el-button {
    padding: 2px;
  }
  .el-radio-group {
    position: absolute;
    top:80px;
    left:20px;
  }
  .el-cascader {
    display: none;
    position: absolute;
    top:120px;
    left:20px;
  }
  .catch-box {
    width: 180px;
    top:80px;
    right:20px;
    position: absolute;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 1px 1px 1px #666;
    background: #fff;
  }
</style>
