/**
 * Nara
 */

class Nara {

  direction(path, query, param) {

    /* extend and override this method */

  }

  push(value) {
    this.deferred.resolve(value)
    this.deferred = new Deferred()
  }

  error(reason) {
    this.deferred.reject(reason)
    this.deferred = new Deferred()
  }

  start() {
    let self = this
    return function*(route = {}) {
      self.deferred = new Deferred()
      setTimeout(() => {
        self.direction(route.path || '', route.query || {}, route.param ||{})
      }, 10)
      while (true) yield self.deferred.promise
    }
  }

  stop(opts = {}){
    this.push(opts)
  }

  on(key, callback) {
    // TODO: remoeve setTImeout
    setTimeout(() => {
      this.push({
        listeners: [
          { key, callback }
        ]
      })
    }, 1000)
  }

}
