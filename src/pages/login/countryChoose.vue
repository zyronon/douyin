<template>
  <div class="countryChoose">
    <base-header>
      <template v-slot:center>切换城市</template>
      <template v-slot:bottom>
        <Search
          :isShowRightText="isShowRightText"
          rightText="取消"
          @click="isShowRightText = true"
          @notice="isShowRightText = false"
          @clear="isShowRightText = false"
          class="ml2r mr2r mt1r"
          placeholder="输入城市或区县名搜索"
          v-model="searchKey"
        ></Search>
      </template>
    </base-header>
    <div ref="list" class="content" @scroll="scroll">
      <div class="row no-active no-padding">默认位置</div>
      <div class="row no-active border no-padding">同城</div>
      <div class="top">
        <div class="row no-active no-padding">历史访问</div>
        <div class="cities">
          <span class="city">大连</span>
          <span class="city">深圳</span>
          <span class="city">北京</span>
          <span class="city">上海</span>
        </div>
      </div>
      <div class="top">
        <div class="row no-active no-padding">抖单热门城市</div>
        <div class="cities">
          <span class="city">深圳</span>
          <span class="city">北京</span>
          <span class="city">上海</span>
          <span class="city">成都</span>
          <span class="city">广州</span>
          <span class="city">重庆</span>
          <span class="city">西安</span>
          <span class="city">苏州</span>
          <span class="city">武汉</span>
          <span class="city">杭州</span>
          <span class="city">郑州</span>
          <span class="city">南京</span>
          <span class="city">合肥</span>
          <span class="city">长沙</span>
          <span class="city">福州</span>
        </div>
      </div>
      <div class="list">
        <div v-if="currentFixedIndicator" class="row no-active no-padding border index fixed">
          <span>{{ currentFixedIndicator }}</span>
        </div>
        <div :key="name" v-for="(value, name) of countryOk">
          <div :class="name" class="row no-active no-padding border index">
            <span>{{ name }}</span>
          </div>
          <div class="row no-active no-padding border" :key="i" v-for="(item, i) of value">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="indicator-ctn">
      <div class="indicator">
        <div class="item arrow" data-index="top"></div>
        <div class="item">A</div>
        <div class="item">B</div>
        <div class="item">C</div>
        <div class="item">D</div>
        <div class="item">E</div>
        <div class="item">F</div>
        <div class="item">G</div>
        <div class="item">H</div>
        <div class="item">I</div>
        <div class="item">J</div>
        <div class="item">K</div>
        <div class="item">L</div>
        <div class="item">M</div>
        <div class="item">N</div>
        <div class="item">O</div>
        <div class="item">P</div>
        <div class="item">Q</div>
        <div class="item">R</div>
        <div class="item">S</div>
        <div class="item">T</div>
        <div class="item">U</div>
        <div class="item">V</div>
        <div class="item">W</div>
        <div class="item">X</div>
        <div class="item">Y</div>
        <div class="item">Z</div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from '../../components/Search'

export default {
  name: 'countryChoose',
  components: { Search },
  data() {
    return {
      country: [
        {
          code: '+1-264',
          name: '安圭拉',
          pinyin: 'A'
        },
        {
          code: '+1-268',
          name: '安地卡及巴布达',
          pinyin: 'A'
        },
        {
          code: '+244',
          name: '安哥拉',
          pinyin: 'A'
        },
        {
          code: '+353',
          name: '爱尔兰',
          pinyin: 'A'
        },
        {
          code: '+372',
          name: '爱沙尼亚',
          pinyin: 'A'
        },
        {
          code: '+376',
          name: '安道尔',
          pinyin: 'A'
        },
        {
          code: '+853',
          name: '澳门',
          pinyin: 'A'
        },
        {
          code: '+20',
          name: '埃及',
          pinyin: 'A'
        },
        {
          code: '+61',
          name: '澳大利亚  科科斯（基林）群岛  圣诞岛',
          pinyin: 'A'
        },
        {
          code: '+1-242',
          name: '巴哈马',
          pinyin: 'B'
        },
        {
          code: '+1-246',
          name: '巴巴多斯',
          pinyin: 'B'
        },
        {
          code: '+1-441',
          name: '百慕大',
          pinyin: 'B'
        },
        {
          code: '+226',
          name: '布吉纳法索',
          pinyin: 'B'
        },
        {
          code: '+229',
          name: '贝宁',
          pinyin: 'B'
        },
        {
          code: '+257',
          name: '布隆迪',
          pinyin: 'B'
        },
        {
          code: '+267',
          name: '博茨瓦纳',
          pinyin: 'B'
        },
        {
          code: '+354',
          name: '冰岛',
          pinyin: 'B'
        },
        {
          code: '+359',
          name: '保加利亚',
          pinyin: 'B'
        },
        {
          code: '+375',
          name: '白俄罗斯',
          pinyin: 'B'
        },
        {
          code: '+387',
          name: '波斯尼亚和黑塞哥维那',
          pinyin: 'B'
        },
        {
          code: '+389',
          name: '北马其顿',
          pinyin: 'B'
        },
        {
          code: '+501',
          name: '伯利兹',
          pinyin: 'B'
        },
        {
          code: '+507',
          name: '巴拿马',
          pinyin: 'B'
        },
        {
          code: '+591',
          name: '玻利维亚',
          pinyin: 'B'
        },
        {
          code: '+595',
          name: '巴拉圭',
          pinyin: 'B'
        },
        {
          code: '+675',
          name: '巴布亚新几内亚',
          pinyin: 'B'
        },
        {
          code: '+680',
          name: '帛琉',
          pinyin: 'B'
        },
        {
          code: '+970',
          name: '巴勒斯坦',
          pinyin: 'B'
        },
        {
          code: '+973',
          name: '巴林',
          pinyin: 'B'
        },
        {
          code: '+975',
          name: '不丹',
          pinyin: 'B'
        },
        {
          code: '+32',
          name: '比利时',
          pinyin: 'B'
        },
        {
          code: '+48',
          name: '波兰',
          pinyin: 'B'
        },
        {
          code: '+55',
          name: '巴西',
          pinyin: 'B'
        },
        {
          code: '+92',
          name: '巴基斯坦',
          pinyin: 'B'
        },
        {
          code: '+240',
          name: '赤道几内亚',
          pinyin: 'C'
        },
        {
          code: '+1-767',
          name: '多米尼克',
          pinyin: 'D'
        },
        {
          code: '+228',
          name: '多哥',
          pinyin: 'D'
        },
        {
          code: '+670',
          name: '东帝汶',
          pinyin: 'D'
        },
        {
          code: '+45',
          name: '丹麦',
          pinyin: 'D'
        },
        {
          code: '+49',
          name: '德国',
          pinyin: 'D'
        },
        {
          code: '+82',
          name: '大韩民国',
          pinyin: 'D'
        },
        {
          code: '+213',
          name: '阿尔及利亚',
          pinyin: 'E'
        },
        {
          code: '+247',
          name: '阿森松岛',
          pinyin: 'E'
        },
        {
          code: '+291',
          name: '厄立特里亚',
          pinyin: 'E'
        },
        {
          code: '+297',
          name: '阿鲁巴',
          pinyin: 'E'
        },
        {
          code: '+355',
          name: '阿尔巴尼亚',
          pinyin: 'E'
        },
        {
          code: '+593',
          name: '厄瓜多尔',
          pinyin: 'E'
        },
        {
          code: '+968',
          name: '阿曼',
          pinyin: 'E'
        },
        {
          code: '+971',
          name: '阿联酋',
          pinyin: 'E'
        },
        {
          code: '+994',
          name: '阿塞拜疆',
          pinyin: 'E'
        },
        {
          code: '+54',
          name: '阿根廷',
          pinyin: 'E'
        },
        {
          code: '+93',
          name: '阿富汗',
          pinyin: 'E'
        },
        {
          code: '+238',
          name: '佛得角',
          pinyin: 'F'
        },
        {
          code: '+298',
          name: '法罗群岛',
          pinyin: 'F'
        },
        {
          code: '+358',
          name: '芬兰',
          pinyin: 'F'
        },
        {
          code: '+379',
          name: '梵蒂冈',
          pinyin: 'F'
        },
        {
          code: '+500',
          name: '福克兰群岛和 南乔治亚和南桑威奇群岛',
          pinyin: 'F'
        },
        {
          code: '+594',
          name: '法属圭亚那',
          pinyin: 'F'
        },
        {
          code: '+679',
          name: '斐济',
          pinyin: 'F'
        },
        {
          code: '+689',
          name: '法属玻里尼西亚',
          pinyin: 'F'
        },
        {
          code: '+33',
          name: '法国',
          pinyin: 'F'
        },
        {
          code: '+63',
          name: '菲律宾',
          pinyin: 'F'
        },
        {
          code: '+1-473',
          name: '格瑞那达',
          pinyin: 'G'
        },
        {
          code: '+220',
          name: '冈比亚',
          pinyin: 'G'
        },
        {
          code: '+242',
          name: '刚果（布）',
          pinyin: 'G'
        },
        {
          code: '+243',
          name: '刚果（金）（即前 扎伊尔）',
          pinyin: 'G'
        },
        {
          code: '+299',
          name: '格陵兰',
          pinyin: 'G'
        },
        {
          code: '+506',
          name: '哥斯达黎加',
          pinyin: 'G'
        },
        {
          code: '+590',
          name: '瓜德罗普',
          pinyin: 'G'
        },
        {
          code: '+592',
          name: '圭亚那',
          pinyin: 'G'
        },
        {
          code: '+995',
          name: '格鲁吉亚',
          pinyin: 'G'
        },
        {
          code: '+53',
          name: '古巴',
          pinyin: 'G'
        },
        {
          code: '+57',
          name: '哥伦比亚',
          pinyin: 'G'
        },
        {
          code: '+504',
          name: '洪都拉斯',
          pinyin: 'H'
        },
        {
          code: '+509',
          name: '海地',
          pinyin: 'H'
        },
        {
          code: '+31',
          name: '荷兰',
          pinyin: 'H'
        },
        {
          code: '+224',
          name: '几内亚',
          pinyin: 'J'
        },
        {
          code: '+233',
          name: '加纳',
          pinyin: 'J'
        },
        {
          code: '+241',
          name: '加彭',
          pinyin: 'J'
        },
        {
          code: '+245',
          name: '几内亚比绍',
          pinyin: 'J'
        },
        {
          code: '+253',
          name: '吉布提',
          pinyin: 'J'
        },
        {
          code: '+420',
          name: '捷克',
          pinyin: 'J'
        },
        {
          code: '+686',
          name: '基里巴斯',
          pinyin: 'J'
        },
        {
          code: '+855',
          name: '柬埔寨',
          pinyin: 'J'
        },
        {
          code: '+996',
          name: '吉尔吉斯斯坦',
          pinyin: 'J'
        },
        {
          code: '+1',
          name: '加拿大',
          pinyin: 'J'
        },
        {
          code: '+1-345',
          name: '开曼群岛',
          pinyin: 'K'
        },
        {
          code: '+225',
          name: '科特迪瓦',
          pinyin: 'K'
        },
        {
          code: '+237',
          name: '喀麦隆',
          pinyin: 'K'
        },
        {
          code: '+254',
          name: '肯尼亚',
          pinyin: 'K'
        },
        {
          code: '+269',
          name: '科摩罗',
          pinyin: 'K'
        },
        {
          code: '+383',
          name: '科索沃',
          pinyin: 'K'
        },
        {
          code: '+385',
          name: '克罗地亚',
          pinyin: 'K'
        },
        {
          code: '+682',
          name: '库克群岛',
          pinyin: 'K'
        },
        {
          code: '+965',
          name: '科威特',
          pinyin: 'K'
        },
        {
          code: '+974',
          name: '卡塔尔',
          pinyin: 'K'
        },
        {
          code: '+218',
          name: '利比亚',
          pinyin: 'L'
        },
        {
          code: '+231',
          name: '利比里亚',
          pinyin: 'L'
        },
        {
          code: '+250',
          name: '卢旺达',
          pinyin: 'L'
        },
        {
          code: '+262',
          name: '留尼汪和 马约特',
          pinyin: 'L'
        },
        {
          code: '+266',
          name: '赖索托',
          pinyin: 'L'
        },
        {
          code: '+352',
          name: '卢森堡',
          pinyin: 'L'
        },
        {
          code: '+370',
          name: '立陶宛',
          pinyin: 'L'
        },
        {
          code: '+371',
          name: '拉脱维亚',
          pinyin: 'L'
        },
        {
          code: '+423',
          name: '列支敦斯登',
          pinyin: 'L'
        },
        {
          code: '+856',
          name: '老挝',
          pinyin: 'L'
        },
        {
          code: '+961',
          name: '黎巴嫩',
          pinyin: 'L'
        },
        {
          code: '+40',
          name: '罗马尼亚',
          pinyin: 'L'
        },
        {
          code: '+1-664',
          name: '蒙特塞拉特',
          pinyin: 'M'
        },
        {
          code: '+212',
          name: '摩洛哥',
          pinyin: 'M'
        },
        {
          code: '+222',
          name: '毛里塔尼亚',
          pinyin: 'M'
        },
        {
          code: '+223',
          name: '马里',
          pinyin: 'M'
        },
        {
          code: '+230',
          name: '模里西斯',
          pinyin: 'M'
        },
        {
          code: '+258',
          name: '莫桑比克',
          pinyin: 'M'
        },
        {
          code: '+261',
          name: '马达加斯加',
          pinyin: 'M'
        },
        {
          code: '+265',
          name: '马拉维',
          pinyin: 'M'
        },
        {
          code: '+356',
          name: '马尔他',
          pinyin: 'M'
        },
        {
          code: '+373',
          name: '摩尔多瓦',
          pinyin: 'M'
        },
        {
          code: '+377',
          name: '摩纳哥',
          pinyin: 'M'
        },
        {
          code: '+382',
          name: '蒙特内哥罗',
          pinyin: 'M'
        },
        {
          code: '+596',
          name: '马提尼克',
          pinyin: 'M'
        },
        {
          code: '+691',
          name: '密克罗尼西亚联邦',
          pinyin: 'M'
        },
        {
          code: '+692',
          name: '马绍尔群岛',
          pinyin: 'M'
        },
        {
          code: '+880',
          name: '孟加拉国 孟加拉国',
          pinyin: 'M'
        },
        {
          code: '+960',
          name: '马尔地夫',
          pinyin: 'M'
        },
        {
          code: '+976',
          name: '蒙古国',
          pinyin: 'M'
        },
        {
          code: '+51',
          name: '秘鲁',
          pinyin: 'M'
        },
        {
          code: '+52',
          name: '墨西哥',
          pinyin: 'M'
        },
        {
          code: '+95',
          name: '缅甸',
          pinyin: 'M'
        },
        {
          code: '+1',
          name: '美国',
          pinyin: 'M'
        },
        {
          code: '+211',
          name: '南苏丹',
          pinyin: 'N'
        },
        {
          code: '+227',
          name: '尼日尔',
          pinyin: 'N'
        },
        {
          code: '+234',
          name: '奈及利亚',
          pinyin: 'N'
        },
        {
          code: '+264',
          name: '纳米比亚',
          pinyin: 'N'
        },
        {
          code: '+505',
          name: '尼加拉瓜',
          pinyin: 'N'
        },
        {
          code: '+674',
          name: '瑙鲁',
          pinyin: 'N'
        },
        {
          code: '+683',
          name: '纽埃',
          pinyin: 'N'
        },
        {
          code: '+977',
          name: '尼泊尔',
          pinyin: 'N'
        },
        {
          code: '+27',
          name: '南非',
          pinyin: 'N'
        },
        {
          code: '+47',
          name: '挪威',
          pinyin: 'N'
        },
        {
          code: '+351',
          name: '葡萄牙',
          pinyin: 'P'
        },
        {
          code: '+41',
          name: '瑞士',
          pinyin: 'R'
        },
        {
          code: '+46',
          name: '瑞典',
          pinyin: 'R'
        },
        {
          code: '+81',
          name: '日本',
          pinyin: 'R'
        },
        {
          code: '+1-721',
          name: '圣马丁',
          pinyin: 'S'
        },
        {
          code: '+1-758',
          name: '圣卢西亚',
          pinyin: 'S'
        },
        {
          code: '+1-784',
          name: '圣文森特和格林纳丁斯',
          pinyin: 'S'
        },
        {
          code: '+221',
          name: '塞内加尔',
          pinyin: 'S'
        },
        {
          code: '+232',
          name: '塞拉利昂',
          pinyin: 'S'
        },
        {
          code: '+239',
          name: '圣多美和普林西比',
          pinyin: 'S'
        },
        {
          code: '+248',
          name: '塞舌尔',
          pinyin: 'S'
        },
        {
          code: '+249',
          name: '苏丹',
          pinyin: 'S'
        },
        {
          code: '+252',
          name: '索马利亚',
          pinyin: 'S'
        },
        {
          code: '+259',
          name: '桑给巴尔，但从未使用',
          pinyin: 'S'
        },
        {
          code: '+260',
          name: '尚比亚',
          pinyin: 'S'
        },
        {
          code: '+268',
          name: '斯威士兰',
          pinyin: 'S'
        },
        {
          code: '+290',
          name: '圣赫勒拿 和 特里斯坦-达库尼亚',
          pinyin: 'S'
        },
        {
          code: '+357',
          name: '赛普勒斯',
          pinyin: 'S'
        },
        {
          code: '+378',
          name: '圣马力诺',
          pinyin: 'S'
        },
        {
          code: '+381',
          name: '塞尔维亚',
          pinyin: 'S'
        },
        {
          code: '+386',
          name: '斯洛维尼亚',
          pinyin: 'S'
        },
        {
          code: '+421',
          name: '斯洛伐克',
          pinyin: 'S'
        },
        {
          code: '+503',
          name: '萨尔瓦多',
          pinyin: 'S'
        },
        {
          code: '+508',
          name: '圣皮埃尔和密克隆',
          pinyin: 'S'
        },
        {
          code: '+597',
          name: '苏里南',
          pinyin: 'S'
        },
        {
          code: '+677',
          name: '所罗门群岛',
          pinyin: 'S'
        },
        {
          code: '+685',
          name: '萨摩亚',
          pinyin: 'S'
        },
        {
          code: '+966',
          name: '沙乌地阿拉伯',
          pinyin: 'S'
        },
        {
          code: '+94',
          name: '斯里兰卡',
          pinyin: 'S'
        },
        {
          code: '+1-649',
          name: '特克斯和凯科斯群岛',
          pinyin: 'T'
        },
        {
          code: '+216',
          name: '突尼西亚',
          pinyin: 'T'
        },
        {
          code: '+255',
          name: '坦桑尼亚',
          pinyin: 'T'
        },
        {
          code: '+676',
          name: '汤加',
          pinyin: 'T'
        },
        {
          code: '+688',
          name: '图瓦卢',
          pinyin: 'T'
        },
        {
          code: '+690',
          name: '托克劳',
          pinyin: 'T'
        },
        {
          code: '+992',
          name: '塔吉克斯坦',
          pinyin: 'T'
        },
        {
          code: '+993',
          name: '土库曼斯坦',
          pinyin: 'T'
        },
        {
          code: '+66',
          name: '泰国',
          pinyin: 'T'
        },
        {
          code: '+90',
          name: '土耳其',
          pinyin: 'T'
        },
        {
          code: '+256',
          name: '乌干达',
          pinyin: 'W'
        },
        {
          code: '+380',
          name: '乌克兰',
          pinyin: 'W'
        },
        {
          code: '+502',
          name: '危地马拉',
          pinyin: 'W'
        },
        {
          code: '+673',
          name: '文莱',
          pinyin: 'W'
        },
        {
          code: '+678',
          name: '瓦努阿图',
          pinyin: 'W'
        },
        {
          code: '+681',
          name: '瓦利斯和富图纳',
          pinyin: 'W'
        },
        {
          code: '+998',
          name: '乌兹别克斯坦',
          pinyin: 'W'
        },
        {
          code: '+58',
          name: '委内瑞拉',
          pinyin: 'W'
        },
        {
          code: '+210',
          name: '西撒哈拉',
          pinyin: 'X'
        },
        {
          code: '+263',
          name: '辛巴威',
          pinyin: 'X'
        },
        {
          code: '+687',
          name: '新喀里多尼亚',
          pinyin: 'X'
        },
        {
          code: '+852',
          name: '香港',
          pinyin: 'X'
        },
        {
          code: '+963',
          name: '叙利亚',
          pinyin: 'X'
        },
        {
          code: '+30',
          name: '希腊',
          pinyin: 'X'
        },
        {
          code: '+34',
          name: '西班牙',
          pinyin: 'X'
        },
        {
          code: '+36',
          name: '匈牙利',
          pinyin: 'X'
        },
        {
          code: '+64',
          name: '新西兰',
          pinyin: 'X'
        },
        {
          code: '+65',
          name: '新加坡',
          pinyin: 'X'
        },
        {
          code: '+1-284',
          name: '英属维尔京群岛',
          pinyin: 'Y'
        },
        {
          code: '+246',
          name: '英属印度洋领地',
          pinyin: 'Y'
        },
        {
          code: '+251',
          name: '衣索比亚',
          pinyin: 'Y'
        },
        {
          code: '+374',
          name: '亚美尼亚',
          pinyin: 'Y'
        },
        {
          code: '+962',
          name: '约旦',
          pinyin: 'Y'
        },
        {
          code: '+964',
          name: '伊拉克',
          pinyin: 'Y'
        },
        {
          code: '+967',
          name: '叶门',
          pinyin: 'Y'
        },
        {
          code: '+972',
          name: '以色列',
          pinyin: 'Y'
        },
        {
          code: '+39',
          name: '义大利',
          pinyin: 'Y'
        },
        {
          code: '+44',
          name: '英国',
          pinyin: 'Y'
        },
        {
          code: '+62',
          name: '印尼',
          pinyin: 'Y'
        },
        {
          code: '+84',
          name: '越南',
          pinyin: 'Y'
        },
        {
          code: '+91',
          name: '印度',
          pinyin: 'Y'
        },
        {
          code: '+98',
          name: '伊朗',
          pinyin: 'Y'
        },
        {
          code: '+235',
          name: '乍得',
          pinyin: 'Z'
        },
        {
          code: '+236',
          name: '中非',
          pinyin: 'Z'
        },
        {
          code: '+350',
          name: '直布罗陀',
          pinyin: 'Z'
        },
        {
          code: '+850',
          name: '朝鲜民主主义人民共和国',
          pinyin: 'Z'
        },
        {
          code: '+886',
          name: '中华民国',
          pinyin: 'Z'
        },
        {
          code: '+56',
          name: '智利',
          pinyin: 'Z'
        },
        {
          code: '+86',
          name: '中国',
          pinyin: 'Z'
        }
      ],
      countryOk: {
        A: [
          {
            code: '+1-264',
            name: '安圭拉',
            pinyin: 'A'
          },
          {
            code: '+1-268',
            name: '安地卡及巴布达',
            pinyin: 'A'
          },
          {
            code: '+244',
            name: '安哥拉',
            pinyin: 'A'
          },
          {
            code: '+353',
            name: '爱尔兰',
            pinyin: 'A'
          },
          {
            code: '+372',
            name: '爱沙尼亚',
            pinyin: 'A'
          },
          {
            code: '+376',
            name: '安道尔',
            pinyin: 'A'
          },
          {
            code: '+853',
            name: '澳门',
            pinyin: 'A'
          },
          {
            code: '+20',
            name: '埃及',
            pinyin: 'A'
          },
          {
            code: '+61',
            name: '澳大利亚  科科斯（基林）群岛  圣诞岛',
            pinyin: 'A'
          }
        ],
        B: [
          {
            code: '+1-242',
            name: '巴哈马',
            pinyin: 'B'
          },
          {
            code: '+1-246',
            name: '巴巴多斯',
            pinyin: 'B'
          },
          {
            code: '+1-441',
            name: '百慕大',
            pinyin: 'B'
          },
          {
            code: '+226',
            name: '布吉纳法索',
            pinyin: 'B'
          },
          {
            code: '+229',
            name: '贝宁',
            pinyin: 'B'
          },
          {
            code: '+257',
            name: '布隆迪',
            pinyin: 'B'
          },
          {
            code: '+267',
            name: '博茨瓦纳',
            pinyin: 'B'
          },
          {
            code: '+354',
            name: '冰岛',
            pinyin: 'B'
          },
          {
            code: '+359',
            name: '保加利亚',
            pinyin: 'B'
          },
          {
            code: '+375',
            name: '白俄罗斯',
            pinyin: 'B'
          },
          {
            code: '+387',
            name: '波斯尼亚和黑塞哥维那',
            pinyin: 'B'
          },
          {
            code: '+389',
            name: '北马其顿',
            pinyin: 'B'
          },
          {
            code: '+501',
            name: '伯利兹',
            pinyin: 'B'
          },
          {
            code: '+507',
            name: '巴拿马',
            pinyin: 'B'
          },
          {
            code: '+591',
            name: '玻利维亚',
            pinyin: 'B'
          },
          {
            code: '+595',
            name: '巴拉圭',
            pinyin: 'B'
          },
          {
            code: '+675',
            name: '巴布亚新几内亚',
            pinyin: 'B'
          },
          {
            code: '+680',
            name: '帛琉',
            pinyin: 'B'
          },
          {
            code: '+970',
            name: '巴勒斯坦',
            pinyin: 'B'
          },
          {
            code: '+973',
            name: '巴林',
            pinyin: 'B'
          },
          {
            code: '+975',
            name: '不丹',
            pinyin: 'B'
          },
          {
            code: '+32',
            name: '比利时',
            pinyin: 'B'
          },
          {
            code: '+48',
            name: '波兰',
            pinyin: 'B'
          },
          {
            code: '+55',
            name: '巴西',
            pinyin: 'B'
          },
          {
            code: '+92',
            name: '巴基斯坦',
            pinyin: 'B'
          }
        ],
        C: [
          {
            code: '+240',
            name: '赤道几内亚',
            pinyin: 'C'
          }
        ],
        D: [
          {
            code: '+1-767',
            name: '多米尼克',
            pinyin: 'D'
          },
          {
            code: '+228',
            name: '多哥',
            pinyin: 'D'
          },
          {
            code: '+670',
            name: '东帝汶',
            pinyin: 'D'
          },
          {
            code: '+45',
            name: '丹麦',
            pinyin: 'D'
          },
          {
            code: '+49',
            name: '德国',
            pinyin: 'D'
          },
          {
            code: '+82',
            name: '大韩民国',
            pinyin: 'D'
          }
        ],
        E: [
          {
            code: '+213',
            name: '阿尔及利亚',
            pinyin: 'E'
          },
          {
            code: '+247',
            name: '阿森松岛',
            pinyin: 'E'
          },
          {
            code: '+291',
            name: '厄立特里亚',
            pinyin: 'E'
          },
          {
            code: '+297',
            name: '阿鲁巴',
            pinyin: 'E'
          },
          {
            code: '+355',
            name: '阿尔巴尼亚',
            pinyin: 'E'
          },
          {
            code: '+593',
            name: '厄瓜多尔',
            pinyin: 'E'
          },
          {
            code: '+968',
            name: '阿曼',
            pinyin: 'E'
          },
          {
            code: '+971',
            name: '阿联酋',
            pinyin: 'E'
          },
          {
            code: '+994',
            name: '阿塞拜疆',
            pinyin: 'E'
          },
          {
            code: '+54',
            name: '阿根廷',
            pinyin: 'E'
          },
          {
            code: '+93',
            name: '阿富汗',
            pinyin: 'E'
          }
        ],
        F: [
          {
            code: '+238',
            name: '佛得角',
            pinyin: 'F'
          },
          {
            code: '+298',
            name: '法罗群岛',
            pinyin: 'F'
          },
          {
            code: '+358',
            name: '芬兰',
            pinyin: 'F'
          },
          {
            code: '+379',
            name: '梵蒂冈',
            pinyin: 'F'
          },
          {
            code: '+500',
            name: '福克兰群岛和 南乔治亚和南桑威奇群岛',
            pinyin: 'F'
          },
          {
            code: '+594',
            name: '法属圭亚那',
            pinyin: 'F'
          },
          {
            code: '+679',
            name: '斐济',
            pinyin: 'F'
          },
          {
            code: '+689',
            name: '法属玻里尼西亚',
            pinyin: 'F'
          },
          {
            code: '+33',
            name: '法国',
            pinyin: 'F'
          },
          {
            code: '+63',
            name: '菲律宾',
            pinyin: 'F'
          }
        ],
        G: [
          {
            code: '+1-473',
            name: '格瑞那达',
            pinyin: 'G'
          },
          {
            code: '+220',
            name: '冈比亚',
            pinyin: 'G'
          },
          {
            code: '+242',
            name: '刚果（布）',
            pinyin: 'G'
          },
          {
            code: '+243',
            name: '刚果（金）（即前 扎伊尔）',
            pinyin: 'G'
          },
          {
            code: '+299',
            name: '格陵兰',
            pinyin: 'G'
          },
          {
            code: '+506',
            name: '哥斯达黎加',
            pinyin: 'G'
          },
          {
            code: '+590',
            name: '瓜德罗普',
            pinyin: 'G'
          },
          {
            code: '+592',
            name: '圭亚那',
            pinyin: 'G'
          },
          {
            code: '+995',
            name: '格鲁吉亚',
            pinyin: 'G'
          },
          {
            code: '+53',
            name: '古巴',
            pinyin: 'G'
          },
          {
            code: '+57',
            name: '哥伦比亚',
            pinyin: 'G'
          }
        ],
        H: [
          {
            code: '+504',
            name: '洪都拉斯',
            pinyin: 'H'
          },
          {
            code: '+509',
            name: '海地',
            pinyin: 'H'
          },
          {
            code: '+31',
            name: '荷兰',
            pinyin: 'H'
          }
        ],
        J: [
          {
            code: '+224',
            name: '几内亚',
            pinyin: 'J'
          },
          {
            code: '+233',
            name: '加纳',
            pinyin: 'J'
          },
          {
            code: '+241',
            name: '加彭',
            pinyin: 'J'
          },
          {
            code: '+245',
            name: '几内亚比绍',
            pinyin: 'J'
          },
          {
            code: '+253',
            name: '吉布提',
            pinyin: 'J'
          },
          {
            code: '+420',
            name: '捷克',
            pinyin: 'J'
          },
          {
            code: '+686',
            name: '基里巴斯',
            pinyin: 'J'
          },
          {
            code: '+855',
            name: '柬埔寨',
            pinyin: 'J'
          },
          {
            code: '+996',
            name: '吉尔吉斯斯坦',
            pinyin: 'J'
          },
          {
            code: '+1',
            name: '加拿大',
            pinyin: 'J'
          }
        ],
        K: [
          {
            code: '+1-345',
            name: '开曼群岛',
            pinyin: 'K'
          },
          {
            code: '+225',
            name: '科特迪瓦',
            pinyin: 'K'
          },
          {
            code: '+237',
            name: '喀麦隆',
            pinyin: 'K'
          },
          {
            code: '+254',
            name: '肯尼亚',
            pinyin: 'K'
          },
          {
            code: '+269',
            name: '科摩罗',
            pinyin: 'K'
          },
          {
            code: '+383',
            name: '科索沃',
            pinyin: 'K'
          },
          {
            code: '+385',
            name: '克罗地亚',
            pinyin: 'K'
          },
          {
            code: '+682',
            name: '库克群岛',
            pinyin: 'K'
          },
          {
            code: '+965',
            name: '科威特',
            pinyin: 'K'
          },
          {
            code: '+974',
            name: '卡塔尔',
            pinyin: 'K'
          }
        ],
        L: [
          {
            code: '+218',
            name: '利比亚',
            pinyin: 'L'
          },
          {
            code: '+231',
            name: '利比里亚',
            pinyin: 'L'
          },
          {
            code: '+250',
            name: '卢旺达',
            pinyin: 'L'
          },
          {
            code: '+262',
            name: '留尼汪和 马约特',
            pinyin: 'L'
          },
          {
            code: '+266',
            name: '赖索托',
            pinyin: 'L'
          },
          {
            code: '+352',
            name: '卢森堡',
            pinyin: 'L'
          },
          {
            code: '+370',
            name: '立陶宛',
            pinyin: 'L'
          },
          {
            code: '+371',
            name: '拉脱维亚',
            pinyin: 'L'
          },
          {
            code: '+423',
            name: '列支敦斯登',
            pinyin: 'L'
          },
          {
            code: '+856',
            name: '老挝',
            pinyin: 'L'
          },
          {
            code: '+961',
            name: '黎巴嫩',
            pinyin: 'L'
          },
          {
            code: '+40',
            name: '罗马尼亚',
            pinyin: 'L'
          }
        ],
        M: [
          {
            code: '+1-664',
            name: '蒙特塞拉特',
            pinyin: 'M'
          },
          {
            code: '+212',
            name: '摩洛哥',
            pinyin: 'M'
          },
          {
            code: '+222',
            name: '毛里塔尼亚',
            pinyin: 'M'
          },
          {
            code: '+223',
            name: '马里',
            pinyin: 'M'
          },
          {
            code: '+230',
            name: '模里西斯',
            pinyin: 'M'
          },
          {
            code: '+258',
            name: '莫桑比克',
            pinyin: 'M'
          },
          {
            code: '+261',
            name: '马达加斯加',
            pinyin: 'M'
          },
          {
            code: '+265',
            name: '马拉维',
            pinyin: 'M'
          },
          {
            code: '+356',
            name: '马尔他',
            pinyin: 'M'
          },
          {
            code: '+373',
            name: '摩尔多瓦',
            pinyin: 'M'
          },
          {
            code: '+377',
            name: '摩纳哥',
            pinyin: 'M'
          },
          {
            code: '+382',
            name: '蒙特内哥罗',
            pinyin: 'M'
          },
          {
            code: '+596',
            name: '马提尼克',
            pinyin: 'M'
          },
          {
            code: '+691',
            name: '密克罗尼西亚联邦',
            pinyin: 'M'
          },
          {
            code: '+692',
            name: '马绍尔群岛',
            pinyin: 'M'
          },
          {
            code: '+880',
            name: '孟加拉国 孟加拉国',
            pinyin: 'M'
          },
          {
            code: '+960',
            name: '马尔地夫',
            pinyin: 'M'
          },
          {
            code: '+976',
            name: '蒙古国',
            pinyin: 'M'
          },
          {
            code: '+51',
            name: '秘鲁',
            pinyin: 'M'
          },
          {
            code: '+52',
            name: '墨西哥',
            pinyin: 'M'
          },
          {
            code: '+95',
            name: '缅甸',
            pinyin: 'M'
          },
          {
            code: '+1',
            name: '美国',
            pinyin: 'M'
          }
        ],
        N: [
          {
            code: '+211',
            name: '南苏丹',
            pinyin: 'N'
          },
          {
            code: '+227',
            name: '尼日尔',
            pinyin: 'N'
          },
          {
            code: '+234',
            name: '奈及利亚',
            pinyin: 'N'
          },
          {
            code: '+264',
            name: '纳米比亚',
            pinyin: 'N'
          },
          {
            code: '+505',
            name: '尼加拉瓜',
            pinyin: 'N'
          },
          {
            code: '+674',
            name: '瑙鲁',
            pinyin: 'N'
          },
          {
            code: '+683',
            name: '纽埃',
            pinyin: 'N'
          },
          {
            code: '+977',
            name: '尼泊尔',
            pinyin: 'N'
          },
          {
            code: '+27',
            name: '南非',
            pinyin: 'N'
          },
          {
            code: '+47',
            name: '挪威',
            pinyin: 'N'
          }
        ],
        P: [
          {
            code: '+351',
            name: '葡萄牙',
            pinyin: 'P'
          }
        ],
        R: [
          {
            code: '+41',
            name: '瑞士',
            pinyin: 'R'
          },
          {
            code: '+46',
            name: '瑞典',
            pinyin: 'R'
          },
          {
            code: '+81',
            name: '日本',
            pinyin: 'R'
          }
        ],
        S: [
          {
            code: '+1-721',
            name: '圣马丁',
            pinyin: 'S'
          },
          {
            code: '+1-758',
            name: '圣卢西亚',
            pinyin: 'S'
          },
          {
            code: '+1-784',
            name: '圣文森特和格林纳丁斯',
            pinyin: 'S'
          },
          {
            code: '+221',
            name: '塞内加尔',
            pinyin: 'S'
          },
          {
            code: '+232',
            name: '塞拉利昂',
            pinyin: 'S'
          },
          {
            code: '+239',
            name: '圣多美和普林西比',
            pinyin: 'S'
          },
          {
            code: '+248',
            name: '塞舌尔',
            pinyin: 'S'
          },
          {
            code: '+249',
            name: '苏丹',
            pinyin: 'S'
          },
          {
            code: '+252',
            name: '索马利亚',
            pinyin: 'S'
          },
          {
            code: '+259',
            name: '桑给巴尔，但从未使用',
            pinyin: 'S'
          },
          {
            code: '+260',
            name: '尚比亚',
            pinyin: 'S'
          },
          {
            code: '+268',
            name: '斯威士兰',
            pinyin: 'S'
          },
          {
            code: '+290',
            name: '圣赫勒拿 和 特里斯坦-达库尼亚',
            pinyin: 'S'
          },
          {
            code: '+357',
            name: '赛普勒斯',
            pinyin: 'S'
          },
          {
            code: '+378',
            name: '圣马力诺',
            pinyin: 'S'
          },
          {
            code: '+381',
            name: '塞尔维亚',
            pinyin: 'S'
          },
          {
            code: '+386',
            name: '斯洛维尼亚',
            pinyin: 'S'
          },
          {
            code: '+421',
            name: '斯洛伐克',
            pinyin: 'S'
          },
          {
            code: '+503',
            name: '萨尔瓦多',
            pinyin: 'S'
          },
          {
            code: '+508',
            name: '圣皮埃尔和密克隆',
            pinyin: 'S'
          },
          {
            code: '+597',
            name: '苏里南',
            pinyin: 'S'
          },
          {
            code: '+677',
            name: '所罗门群岛',
            pinyin: 'S'
          },
          {
            code: '+685',
            name: '萨摩亚',
            pinyin: 'S'
          },
          {
            code: '+966',
            name: '沙乌地阿拉伯',
            pinyin: 'S'
          },
          {
            code: '+94',
            name: '斯里兰卡',
            pinyin: 'S'
          }
        ],
        T: [
          {
            code: '+1-649',
            name: '特克斯和凯科斯群岛',
            pinyin: 'T'
          },
          {
            code: '+216',
            name: '突尼西亚',
            pinyin: 'T'
          },
          {
            code: '+255',
            name: '坦桑尼亚',
            pinyin: 'T'
          },
          {
            code: '+676',
            name: '汤加',
            pinyin: 'T'
          },
          {
            code: '+688',
            name: '图瓦卢',
            pinyin: 'T'
          },
          {
            code: '+690',
            name: '托克劳',
            pinyin: 'T'
          },
          {
            code: '+992',
            name: '塔吉克斯坦',
            pinyin: 'T'
          },
          {
            code: '+993',
            name: '土库曼斯坦',
            pinyin: 'T'
          },
          {
            code: '+66',
            name: '泰国',
            pinyin: 'T'
          },
          {
            code: '+90',
            name: '土耳其',
            pinyin: 'T'
          }
        ],
        W: [
          {
            code: '+256',
            name: '乌干达',
            pinyin: 'W'
          },
          {
            code: '+380',
            name: '乌克兰',
            pinyin: 'W'
          },
          {
            code: '+502',
            name: '危地马拉',
            pinyin: 'W'
          },
          {
            code: '+673',
            name: '文莱',
            pinyin: 'W'
          },
          {
            code: '+678',
            name: '瓦努阿图',
            pinyin: 'W'
          },
          {
            code: '+681',
            name: '瓦利斯和富图纳',
            pinyin: 'W'
          },
          {
            code: '+998',
            name: '乌兹别克斯坦',
            pinyin: 'W'
          },
          {
            code: '+58',
            name: '委内瑞拉',
            pinyin: 'W'
          }
        ],
        X: [
          {
            code: '+210',
            name: '西撒哈拉',
            pinyin: 'X'
          },
          {
            code: '+263',
            name: '辛巴威',
            pinyin: 'X'
          },
          {
            code: '+687',
            name: '新喀里多尼亚',
            pinyin: 'X'
          },
          {
            code: '+852',
            name: '香港',
            pinyin: 'X'
          },
          {
            code: '+963',
            name: '叙利亚',
            pinyin: 'X'
          },
          {
            code: '+30',
            name: '希腊',
            pinyin: 'X'
          },
          {
            code: '+34',
            name: '西班牙',
            pinyin: 'X'
          },
          {
            code: '+36',
            name: '匈牙利',
            pinyin: 'X'
          },
          {
            code: '+64',
            name: '新西兰',
            pinyin: 'X'
          },
          {
            code: '+65',
            name: '新加坡',
            pinyin: 'X'
          }
        ],
        Y: [
          {
            code: '+1-284',
            name: '英属维尔京群岛',
            pinyin: 'Y'
          },
          {
            code: '+246',
            name: '英属印度洋领地',
            pinyin: 'Y'
          },
          {
            code: '+251',
            name: '衣索比亚',
            pinyin: 'Y'
          },
          {
            code: '+374',
            name: '亚美尼亚',
            pinyin: 'Y'
          },
          {
            code: '+962',
            name: '约旦',
            pinyin: 'Y'
          },
          {
            code: '+964',
            name: '伊拉克',
            pinyin: 'Y'
          },
          {
            code: '+967',
            name: '叶门',
            pinyin: 'Y'
          },
          {
            code: '+972',
            name: '以色列',
            pinyin: 'Y'
          },
          {
            code: '+39',
            name: '义大利',
            pinyin: 'Y'
          },
          {
            code: '+44',
            name: '英国',
            pinyin: 'Y'
          },
          {
            code: '+62',
            name: '印尼',
            pinyin: 'Y'
          },
          {
            code: '+84',
            name: '越南',
            pinyin: 'Y'
          },
          {
            code: '+91',
            name: '印度',
            pinyin: 'Y'
          },
          {
            code: '+98',
            name: '伊朗',
            pinyin: 'Y'
          }
        ],
        Z: [
          {
            code: '+235',
            name: '乍得',
            pinyin: 'Z'
          },
          {
            code: '+236',
            name: '中非',
            pinyin: 'Z'
          },
          {
            code: '+350',
            name: '直布罗陀',
            pinyin: 'Z'
          },
          {
            code: '+850',
            name: '朝鲜民主主义人民共和国',
            pinyin: 'Z'
          },
          {
            code: '+886',
            name: '中华民国',
            pinyin: 'Z'
          },
          {
            code: '+56',
            name: '智利',
            pinyin: 'Z'
          },
          {
            code: '+86',
            name: '中国',
            pinyin: 'Z'
          }
        ]
      },
      history: [],
      isShowRightText: false,
      searchKey: '',
      indexOffsetTop: {},
      // currentFixedIndicator: null,
      currentFixedIndicator: 'A'
    }
  },
  created() {
    this.history = localStorage.getItem('locationSearchHistory')
  },
  mounted() {
    let indexs = document.querySelectorAll('.index')
    indexs.forEach((v) => {
      this.indexOffsetTop[v.children[0].innerText] = v.offsetTop
    })
    console.log(this.indexOffsetTop)
    let items = document.querySelectorAll('.item')
    let item = document.querySelector(`.item:nth-child(2)`)
    let itemHeight = item.clientHeight
    let ul = document.querySelector('.indicator')
    let ulOffsetTop = ul.offsetTop
    let resetScale = 'scale(1)'
    let resetColor = 'rgb(143, 143, 158)'
    ul.addEventListener('touchstart', (e) => {
      let pageY = e.touches[0].pageY - ulOffsetTop
      let currentIndex = pageY / itemHeight
      currentIndex = Math.floor(currentIndex)
      render(currentIndex)
    })
    ul.addEventListener('touchmove', (e) => {
      let pageY = e.touches[0].pageY - ulOffsetTop
      let currentIndex = pageY / itemHeight
      currentIndex = Math.floor(currentIndex)
      if (currentIndex >= 0 && currentIndex < 27) {
        render(currentIndex)
      }
    })
    ul.addEventListener('touchend', function () {
      items.forEach((el) => {
        el.style.transform = `translate3d(0,0,0) ${resetScale}`
        el.style.color = resetColor
      })
    })
    let render = (currentIndex) => {
      // console.log('currentIndex', currentIndex)
      let scale = 'scale(1.2)'
      items[currentIndex].style.transform = `translate3d(${-itemHeight * 4}px,0,0) ${scale}`
      items[currentIndex].style.color = '#fff'
      this.goto(items[currentIndex])
      for (let i = 1; i < 5; i++) {
        let nextIndex = currentIndex + i
        let preIndex = currentIndex - i
        if (preIndex >= 0) {
          if (i === 4) {
            items[preIndex].style.transform = `translate3d(0,0,0) ${resetScale}`
            items[preIndex].style.color = resetColor
          } else {
            items[preIndex].style.transform = `translate3d(${-itemHeight * (4 - i)}px,0,0) ${scale}`
            items[preIndex].style.color = `#ffffff${22 * i}`
          }
        }
        if (nextIndex < 27) {
          if (i === 4) {
            items[nextIndex].style.transform = `translate3d(0,0,0) ${resetScale}`
            items[nextIndex].style.color = resetColor
          } else {
            items[nextIndex].style.transform =
              `translate3d(${-itemHeight * (4 - i)}px,0,0) ${scale}`
            items[nextIndex].style.color = `#ffffff${22 * i}`
          }
        }
      }
    }
  },
  computed: {},
  methods: {
    goto(el) {
      let list = this.$refs.list
      if (el.dataset['index']) {
        return (list.scrollTop = 0)
      }
      let py = el.innerText
      if (document.querySelector(`.${py}`)) {
        list.scrollTop = document.querySelector(`.${py}`).offsetTop - 100
      }
    },
    scroll(e) {
      // let isFixed = document.querySelector(`.fixed`)
      // console.log(isFixed)
      // let listScrollTop = e.target.scrollTop + (isFixed ? 110 : 110)
      let listScrollTop = e.target.scrollTop + 110
      // console.log('listScrollTop', listScrollTop)
      let currentKey = null
      for (const key in this.indexOffsetTop) {
        // if (currentKey) break
        let offsetTop = this.indexOffsetTop[key]
        // console.log('offsetTop',offsetTop)
        if (offsetTop < listScrollTop) {
          currentKey = key
        }
      }
      this.currentFixedIndicator = currentKey
      // console.log('currentKey', currentKey)
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.countryChoose {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: white;
  font-size: 14rem;
  overflow: hidden;

  .indicator-ctn {
    width: 25rem;
    height: calc(var(--vh, 1vh) * 100);
    position: fixed;
    z-index: 3;
    top: 0;
    right: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .indicator {
      width: 25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      div {
        color: var(--second-text-color);
        //transition: all .3s;
        font-size: 10rem;
        padding: 1rem;
      }

      .arrow {
        padding: 0 0 3rem 0;
        width: 0;
        height: 0;
        border: 5rem solid transparent;
        border-bottom: 10rem solid var(--second-text-color);
      }
    }
  }

  .fixed {
    position: fixed;
    top: 110rem;
    left: 20rem;
    right: 20rem;
  }

  .content {
    height: calc(100% - 110rem);
    margin-top: 110rem;
    padding: 0 25rem 0 20rem;
    box-sizing: border-box;
    width: 100%;
    overflow-y: scroll;

    .top {
      padding-bottom: 10rem;
      border-bottom: 1px solid var(--line-color);

      .cities {
        .city {
          margin-right: 4rem;
          margin-bottom: 4rem;
          border-radius: 2rem;
          height: 40rem;
          line-height: 40rem;
          background: var(--second-btn-color-tran);
          display: inline-block;
          width: 32%;
          text-align: center;
        }
      }
    }

    .list {
      //padding-right: 25rem;

      .row {
        background: var(--main-bg);
      }
    }
  }
}
</style>
