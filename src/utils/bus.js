export default {
  eventMap: new Map(),
  on(eventType, cb) {
    let cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.push(cb)
    } else {
      cbs = [cb]
    }
    this.eventMap.set(eventType, cbs)
  },
  emit(eventType, val) {
    let cbs = this.eventMap.get(eventType)
    if (cbs) {
      cbs.map(cb => cb(val))
    }
  }
}