<template>
  <div class="SelectDialog" @click="onCancel">
    <div class="content">
      <div class="item" :key="i" v-for="(item, i) in list" @click.stop="onOk(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
defineOptions({ name: 'SelectDialog' })

type Item = { name: string } & T

interface Props {
  visible?: boolean
  list?: Item[]
}

withDefaults(defineProps<Props>(), {
  visible: false,
  list: () => []
})

const emit = defineEmits<{
  (ev: 'ok', item: Item): void
  (ev: 'cancel'): void
}>()

const onOk = (item: Item) => {
  emit('ok', item)
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped lang="less">
.SelectDialog {
  z-index: 10;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000bb;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    background: white;
    width: 80%;
    padding: 5rem 0;
    border-radius: 2px;
    box-sizing: border-box;

    .item {
      font-size: 15rem;
      padding: 15rem 20rem;
      transition: all 0.2s;

      &:active {
        background: darkgray;
      }
    }
  }
}
</style>
