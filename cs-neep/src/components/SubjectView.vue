<template>
  <div id="main_pie" style="width: 100%; height: 450px"></div>
 </template>
  
 <script>
 import * as echarts from 'echarts';
  
 export default {
   name: "PieChart",
   data() {
     return {
       xy_data: [
         {name: '清华大学', value: 1615},
         {name: '北京大学', value: 1203},
         {name: '上海交通大学', value: 1021},
         {name: '浙江大学', value: 1020},
         {name: '西北工业大学', value: 1016},
         {name: '北京航空航天大学', value: 900},
         {name: '华中科技大学', value: 890},
         {name:'哈尔滨工业大学',value:825},
         {name:'国防科技大学',value:772},
         {name:'中国科学技术大学',value:661},
         {name:'南京大学',value:625},
         {name:'电子科技大学',value:577},
         {name:'北京理工大学',value:536},
         {name:'中山大学',value:530},
         {name:'湖南大学',value:510},
         {name:'东南大学',value:457},
         {name:'西安交通大学',value:453},
         {name:'中南大学',value:420},
         {name:'东北大学',value:389},
         {name:'武汉大学',value:389},
         {name:'同济大学',value:387},
         {name:'四川大学',value:375},
         {name:'复旦大学',value:362},
         {name:'天津大学',value:340},
         {name:'华南理工大学',value:324},
     

         
       ],
     };
   },
   created() {
     this.initPie();
   },
   methods: {
     initPie() {
       this.$nextTick(() =>{
         // 基于准备好的dom，初始化echarts实例
         let myChart = echarts.init(document.getElementById('main_pie'));
         // 指定图表的配置项和数据
         let option = {
           // 全局颜色配置
           color: [
             '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622',
           ],
           // echarts标题
           title: {
             text: '各院校计算机学科实力软科排名',
             left: 'center',
             textAlign: 'center'
           },
           tooltip: {},
           // legend中的data一定要跟series里面的data的name保持命名一致，否则无效，不会显示legend
           // legend: {
           //   data:  this.xy_data.map(item => {
           //     return {
           //       name: item.name.concat('月'),
           //     };
           //   })
           // },
           series: [
             {
               
               // 数据全为0也显示扇区
               stillShowZeroSum: true,
               // 是否高亮
               legendHoverLink: true,
               // 玫瑰图
               roseType: 'area',
               name: '软科评估得分',

               radius: '70%',
               // 饼状图标签
               label: {
                 show: true,
                 // 标签显示的位置，默认为outside
                 // position: 'inside',
                 // 字符串模板,可对文本标签内容进行设置
                 //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。等等，详细见网站
                 //formatter: '{b}:{d}%',
               },
               // 此系列自己的调色盘。优先级高于全局颜色配置
               // color: [
               //   '#dd6b66',
               //   '#759aa0',
               //   '#e69d87',
               //   '#8dc1a9',
               //   '#ea7e53',
               //   '#eedd78',
               //   '#73a373',
               // ],
               type: 'pie',
               data: this.xy_data.map(item => {
                 return {
                   name: item.name ,
                   value: item.value
                 };
               })
             }
           ]
         };
         // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(option);
       })
     },
   }
 };
 </script>

