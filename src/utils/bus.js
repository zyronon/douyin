export default {
  eventMap: new Map(),
  on(eventType, cb) {
    let cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.push(cb)
    } else {
      cbs = [cb]
    }
    if (cbs.length > 10) {
      console.error('eventMap', this.eventMap)
    }
    this.eventMap.set(eventType, cbs)
  },
  off(eventType, fn) {
    let cbs = this.eventMap.has(eventType);
    if (cbs) {
      if (fn) {
        let cbs = this.eventMap.get(eventType)
        let rIndex = cbs.findIndex(v => v === fn)
        if (rIndex > -1) {
          cbs.splice(rIndex, 1)
        }
        this.eventMap.set(eventType, cbs)
      } else {
        this.eventMap.delete(eventType);
      }
    }
  },
  offAll() {
    this.eventMap = new Map()
  },
  emit(eventType, val) {
    let cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.map(cb => cb(val))
    }
  }
}

