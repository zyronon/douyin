<template>
  <div id="TestImg">
    <img ref="img" src="../../assets/img/poster/0.jpg" alt=""
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
    >
  </div>
</template>

<script>
import globalMethods from "../../utils";

export default {
  name: "TestImg",
  data() {
    return {
      result: {
        width: 393,
        height: 699
      },
      x: 0,
      y: 0,
      scale: 1,
      point1: {x: 0, y: 0},
      point2: {x: 0, y: 0},
      lastPoint1: {x: 0, y: 0},
      lastPoint2: {x: 0, y: 0},
      lastCenter: {x: 0, y: 0},
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getCenter(a, b) {
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      return {x, y}
    },
    getDistance(start, stop) {
      return Math.hypot(stop.x - start.x, stop.y - start.y);
    },
    handlePointers(e, type) {
      for (let i = 0; i < this.touches.length; i++) {
        if (this.touches[i].pointerId === e.pointerId) {
          if (type === 'update') {
            this.touches[i] = e;
          } else if (type === 'delete') {
            this.touches.splice(i, 1);
          }
        }
      }
    },
    start(e) {
      // console.log('start')
      if (e.touches && e.touches.length === 1) {
      } else {
        this.isTwo = true
        this.$refs.img.style['transition-duration'] = '0ms';

        let events = e.touches[0];
        let events2 = e.touches[1];

        this.lastPoint1 = this.point1 = {x: events.pageX, y: events.pageY};
        this.lastPoint2 = this.point2 = {x: events2.pageX, y: events2.pageY};
        this.lastCenter = this.getCenter(this.lastPoint1, this.lastPoint2)
        // console.log('lastPoint1', this.lastPoint1)
      }
    },
    move(e) {
      if (e.touches && e.touches.length === 1) {
      } else {
        this.isTwo = true
        e.preventDefault();

        let current1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        let current2 = {x: e.touches[1].pageX, y: e.touches[1].pageY}

        // 双指缩放比例计算
        let ratio = this.getDistance(current1, current2) / this.getDistance(this.lastPoint1, this.lastPoint2);


        this.scale = this.scale * ratio
        console.log('ratio',ratio)
        console.log('scale',this.scale)

        // 计算当前双指中心点坐标
        let center = this.getCenter(current1, current2)
        // console.log('center', center)

        // 计算图片中心偏移量，默认transform-origin: 50% 50%
        // 如果transform-origin: 30% 40%，那origin.x = (ratio - 1) * result.width * 0.3
        // origin.y = (ratio - 1) * result.height * 0.4
        // 如果通过修改宽高或使用transform缩放，但将transform-origin设置为左上角时。
        // 可以不用计算origin，因为(ratio - 1) * result.width * 0 = 0
        const origin = {
          x: (ratio - 1) * this.result.width * 0.5,
          y: (ratio - 1) * this.result.height * 0.5
        };
        // 计算偏移量，认真思考一下为什么要这样计算(带入特定的值计算一下)
        this.x -= (ratio - 1) * (center.x - this.x) - origin.x - (center.x - this.lastCenter.x);
        this.y -= (ratio - 1) * (center.y - this.y) - origin.y - (center.y - this.lastCenter.y);

        // console.log('this.x', this.x)
        // console.log('this.y', this.y)

        // 图像应用缩放效果
        this.$refs.img.style.transform = `translate3d(${this.x}px,${this.y}px,0) scale(${this.scale})`;

        this.lastCenter = {x: center.x, y: center.y};
        this.lastPoint1 = {x: current1.x, y: current1.y};
        this.lastPoint2 = {x: current2.x, y: current2.y};
      }
    },
    end(e) {
      // console.log('end', e)
      // 图像应用缩放效果
      this.scale = 1
      this.x = this.y = 0
      this.$refs.img.style['transition-duration'] = '300ms';

      this.$refs.img.style.transform = `translate3d(0px,0px,0) scale(1)`;
      // this.point1 = {x: e.touches[0].pageX, y: e.touches[0].pageY}
    }
  }
}
</script>

<style scoped lang="less">

</style>

<style scoped lang="less">
#TestImg {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
}
</style>