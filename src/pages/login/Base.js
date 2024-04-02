export default {
  name: 'Base',
  props: {},
  data() {
    return {
      isAgree: false,
      isOtherLogin: false,
      showAnim: false,
      showTooltip: false,
      loading: false
    }
  },
  computed: {},
  created() {},
  methods: {
    async check() {
      return new Promise((resolve) => {
        if (this.isAgree) {
          resolve(true)
        } else {
          if (!this.showAnim && !this.showTooltip) {
            this.showAnim = true
            setTimeout(() => {
              this.showAnim = false
              this.showTooltip = true
            }, 500)
            setTimeout(() => {
              this.showTooltip = false
            }, 3000)
          }
        }
      })
    }
  }
}
