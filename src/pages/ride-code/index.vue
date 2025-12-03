<template>
  <div class="ride-code-wrapper" id="ride-code-index">
    <!-- 页面头部 -->
    <div class="header">
      <div class="left" @click="goBack">
        <Icon icon="icon-park-outline:left" />
      </div>
      <div class="center">
        <span>{{ currentCity }}</span>
        <span class="subtitle">乘车码</span>
      </div>
      <div class="right" @click="showCitySelector = true">
        <span>{{ currentCity }}</span>
        <Icon icon="icon-park-outline:down" />
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content">
      <!-- 乘车码卡片 -->
      <div class="code-card">
        <div class="code-header">
          <div class="ride-type">
            <Icon icon="mingcute:bus-line" />
            <span>公交地铁</span>
          </div>
          <div class="balance">
            <Icon icon="ion:wallet-outline" />
            <span>余额: ¥{{ balance }}</span>
          </div>
        </div>

        <!-- 二维码区域 -->
        <div class="code-container">
          <img :src="currentQrCode" alt="乘车码" class="qr-code" />
          <div class="refresh-tip">
            <span class="countdown">{{ countdown }}秒后刷新</span>
          </div>
        </div>

        <!-- 提示信息 -->
        <div class="tips">
          <div class="tip-item">
            <Icon icon="mingcute:info-line" />
            <span>请将二维码对准扫码器</span>
          </div>
        </div>
      </div>

      <!-- 优惠券专区 -->
      <div class="coupon-section">
        <div class="section-header">
          <Icon icon="mingcute:coupon-line" />
          <span>优惠券专区</span>
          <div class="more" @click="showToast('查看更多优惠券')">
            <span>查看更多</span>
            <Icon icon="icon-park-outline:right" />
          </div>
        </div>
        <div class="coupon-list">
          <div
            v-for="coupon in coupons"
            :key="coupon.id"
            class="coupon-item"
            @click="useCoupon(coupon)"
          >
            <div class="coupon-value">
              <span class="symbol">¥</span>
              <span class="amount">{{ coupon.amount }}</span>
            </div>
            <div class="coupon-info">
              <div class="coupon-title">{{ coupon.title }}</div>
              <div class="coupon-desc">{{ coupon.description }}</div>
              <div class="coupon-expire">有效期至: {{ coupon.expireDate }}</div>
            </div>
            <div class="coupon-status">
              <span class="status-text">{{ coupon.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作区 -->
    <div class="bottom-actions">
      <div class="action-item" @click="showToast('乘车优惠')">
        <Icon icon="mingcute:gift-line" />
        <span>乘车优惠</span>
      </div>
      <div class="action-item" @click="showToast('我的行程')">
        <Icon icon="mingcute:history-line" />
        <span>我的行程</span>
      </div>
      <div class="action-item" @click="showToast('更多')">
        <Icon icon="mingcute:more-line" />
        <span>更多</span>
      </div>
    </div>

    <!-- 城市选择弹窗 -->
    <SelectDialog
      :visible="showCitySelector"
      :list="cityOptions"
      @ok="onCitySelect"
      @cancel="showCitySelector = false"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _notice } from '@/utils'
import SelectDialog from '@/components/dialog/SelectDialog.vue'

const nav = useNav()

// 状态管理
const currentCity = ref('北京')
const showCitySelector = ref(false)
const balance = ref('10.00')
const countdown = ref(60)
const currentQrCode = ref('')
let refreshTimer: number | null = null

// 模拟数据
const cityOptions = [
  { name: '北京', value: '北京' },
  { name: '上海', value: '上海' },
  { name: '广州', value: '广州' },
  { name: '深圳', value: '深圳' },
  { name: '杭州', value: '杭州' },
  { name: '南京', value: '南京' },
  { name: '成都', value: '成都' },
  { name: '重庆', value: '重庆' }
]

const coupons = [
  {
    id: 1,
    amount: '2',
    title: '公交优惠券',
    description: '满3元可用',
    expireDate: '2024-12-31',
    status: '可使用'
  },
  {
    id: 2,
    amount: '5',
    title: '地铁优惠券',
    description: '满10元可用',
    expireDate: '2024-12-31',
    status: '可使用'
  }
]

// 生成随机二维码（模拟）
const generateQrCode = () => {
  // 使用随机数生成不同的二维码URL（模拟）
  const random = Math.random().toString(36).substring(7)
  // 使用一个在线二维码生成API来模拟
  currentQrCode.value = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${random}_ride_code_${currentCity.value}`
}

// 启动二维码刷新定时器
const startRefreshTimer = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }

  countdown.value = 60
  generateQrCode()

  refreshTimer = window.setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      countdown.value = 60
      generateQrCode()
      _notice('乘车码已刷新')
    }
  }, 1000)
}

// 返回首页
const goBack = () => {
  nav('/home')
}

// 选择城市
const onCitySelect = (city: any) => {
  currentCity.value = city.value || city.name
  generateQrCode() // 切换城市后重新生成二维码
  _notice(`已切换至${currentCity.value}`)
  showCitySelector.value = false // 选择后关闭弹窗
}

// 使用优惠券
const useCoupon = (coupon: any) => {
  _notice(`使用${coupon.amount}元优惠券`)
}

// 显示Toast提示
const showToast = (message: string) => {
  _notice(message)
}

// 组件挂载
onMounted(() => {
  startRefreshTimer()
})

// 组件卸载
onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped lang="less">
.ride-code-wrapper {
  font-size: 14rem;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  // 滚动条样式
  &::-webkit-scrollbar {
    display: none;
  }
}

// 头部样式
.header {
  height: 50rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15rem;
  box-shadow: 0 2rem 10rem rgba(0, 0, 0, 0.1);

  .left,
  .right {
    width: 50rem;
    height: 35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8rem;
    transition: background 0.3s;

    &:active {
      background: rgba(255, 255, 255, 0.1);
    }

    svg {
      font-size: 18rem;
      color: white;
    }

    span {
      font-size: 14rem;
      color: white;
      margin-left: 5rem;
    }
  }

  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span {
      font-size: 14rem;
      color: white;
    }

    .subtitle {
      font-size: 12rem;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 2rem;
    }
  }

  .right {
    justify-content: flex-end;

    svg {
      font-size: 14rem;
      margin-left: 5rem;
    }
  }
}

// 内容区域
.content {
  flex: 1;
  overflow-y: auto;
  padding: 15rem;

  &::-webkit-scrollbar {
    display: none;
  }
}

// 乘车码卡片
.code-card {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border-radius: 20rem;
  padding: 20rem;
  margin-bottom: 20rem;
  box-shadow: 0 10rem 30rem rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rem;

    .ride-type,
    .balance {
      display: flex;
      align-items: center;
      gap: 8rem;

      svg {
        font-size: 18rem;
        color: white;
      }

      span {
        font-size: 14rem;
        color: white;
        font-weight: 500;
      }
    }
  }

  // 二维码容器
  .code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rem;

    .qr-code {
      width: 200rem;
      height: 200rem;
      background: white;
      border-radius: 15rem;
      padding: 10rem;
      box-shadow: 0 5rem 20rem rgba(0, 0, 0, 0.2);
      margin-bottom: 10rem;
    }

    .refresh-tip {
      text-align: center;

      .countdown {
        font-size: 12rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  // 提示信息
  .tips {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 12rem;
    padding: 15rem;

    .tip-item {
      display: flex;
      align-items: center;
      gap: 10rem;

      svg {
        font-size: 16rem;
        color: white;
      }

      span {
        font-size: 13rem;
        color: white;
        line-height: 1.5;
      }
    }
  }
}

// 优惠券专区
.coupon-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15rem;
  padding: 15rem;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15rem;

    & > div:first-child {
      display: flex;
      align-items: center;
      gap: 10rem;

      svg {
        font-size: 18rem;
        color: #ffd700;
      }

      span {
        font-size: 16rem;
        color: white;
        font-weight: 500;
      }
    }

    .more {
      display: flex;
      align-items: center;
      gap: 5rem;
      cursor: pointer;

      span {
        font-size: 13rem;
        color: rgba(255, 255, 255, 0.6);
      }

      svg {
        font-size: 14rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  // 优惠券列表
  .coupon-list {
    display: flex;
    flex-direction: column;
    gap: 10rem;
  }

  .coupon-item {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12rem;
    padding: 15rem;
    display: flex;
    align-items: center;
    gap: 15rem;
    cursor: pointer;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rem 10rem rgba(102, 126, 234, 0.3);
    }

    .coupon-value {
      display: flex;
      align-items: baseline;

      .symbol {
        font-size: 16rem;
        color: white;
        font-weight: 600;
      }

      .amount {
        font-size: 32rem;
        color: white;
        font-weight: 700;
        line-height: 1;
      }
    }

    .coupon-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 5rem;

      .coupon-title {
        font-size: 14rem;
        color: white;
        font-weight: 500;
      }

      .coupon-desc {
        font-size: 12rem;
        color: rgba(255, 255, 255, 0.7);
      }

      .coupon-expire {
        font-size: 11rem;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    .coupon-status {
      .status-text {
        font-size: 12rem;
        color: #ffd700;
        background: rgba(255, 215, 0, 0.1);
        padding: 4rem 8rem;
        border-radius: 12rem;
        font-weight: 500;
      }
    }
  }
}

// 底部操作区
.bottom-actions {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rem;
    cursor: pointer;
    padding: 10rem;
    border-radius: 12rem;
    transition: background 0.3s;

    &:active {
      background: rgba(255, 255, 255, 0.1);
    }

    svg {
      font-size: 24rem;
      color: white;
    }

    span {
      font-size: 12rem;
      color: white;
      text-align: center;
    }
  }
}
</style>
