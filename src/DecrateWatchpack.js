class DecrateWatchpack {
  constructor(watchpack) {
    this.watchpack = watchpack
    this.callQuene = []
    this.timer
    const prototp = Object.getPrototypeOf(watchpack)
    prototp.onChange = this._onChange.bind(this)
    prototp.onRemove = this._onRemove.bind(this)
  }

  initTimer() {
    if (this.timer) {
      return this.timer
    }
    this.timer = setTimeout(() => {
      if (!process.env.DELAY_CALL_COMPILE) {
        clearTimeout(this.timer)
        this.callCompile()
      } else {
        this.initTimer()
      }
    }, Number(process.env.DELAY_CALL_TIMEOUT) || 2000)
  }

  _onChange(item, mtime, file) {
    if (process.env.DELAY_CALL_COMPILE) {
      this.add({ item, mtime, file })
    } else {
      this.watchpack._onChange(item, mtime, file)
    }
  }
  _onRemove(item, file) {
    if (process.env.DELAY_CALL_COMPILE) {
      this.add({ item, file })
    } else {
      this.watchpack._onRemove(item, file)
    }
  }

  add(change) {
    this.initTimer()
    this.callQuene.push(change)
  }

  callCompile() {
    this.timer = null
    while (this.callQuene.length) {
      const change = this.callQuene.shift()
      if (change) {
        const { item, mtime, file } = change
        if (mtime) {
          this.watchpack._onChange(item, mtime, file)
        } else {
          this.watchpack._onRemove(item, file)
        }
      }
    }
  }
}

module.exports = DecrateWatchpack
