export const scrollToY = function (options) {
  // Doc: https://code.area17.com/a17/a17-helpers/wikis/scrollToY

  /*

  CSS `scroll-behavior: smooth;` is under consideration for edge

  And JavaScript scroll with options isn't well supported

  */

  var settings = {
    el: document,
    offset: 0,
    duration: 250,
    easing: 'linear'
  }
  var start = Date.now()
  var from = 0
  var isDocument = false
  var easingEquations = {

    // Easing functions taken from: https://gist.github.com/gre/1650294
    // -
    // no easing, no acceleration
    linear: function (t) { return t },

    // accelerating from zero velocity
    easeIn: function (t) { return t * t * t },

    // decelerating to zero velocity
    easeOut: function (t) { return (--t) * t * t + 1 },

    // acceleration until halfway, then deceleration
    easeInOut: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }
  }
  var useRequestAnimationFrame = window.requestAnimationFrame
  var scrollInterval

  for (var def in options) {
    if (typeof options[def] !== 'undefined') {
      settings[def] = options[def]
    }
  }

  if (settings.el === document) {
    isDocument = true
    settings.el = document.documentElement.scrollTop ? document.documentElement : document.body
  }

  from = settings.el.scrollTop

  if (from === settings.offset) {
    if ((typeof settings.onComplete).toLowerCase() === 'function') {
      settings.onComplete.call(this)
    }

    // Prevent scrolling to the offset point if already there
    return
  }

  function min (a, b) {
    return a < b ? a : b
  }

  function cancelInterval () {
    if (useRequestAnimationFrame) {
      try {
        cancelAnimationFrame(scrollInterval)
      } catch (err) {
        // continue execution in case cancelAnimationFrame fails
      }
    } else {
      clearTimeout(scrollInterval)
    }
  }

  function scroll () {
    if (isDocument && from === 0) {
      // eugh Firefox! (https://miketaylr.com/posts/2014/11/document-body-scrollTop.html)
      document.documentElement.scrollTop = 1
      document.body.scrollTop = 1
      from = 1
      settings.el = document.documentElement.scrollTop ? document.documentElement : document.body
      requestAnimationFrame(scroll)
    } else {
      var currentTime = Date.now()
      var time = min(1, ((currentTime - start) / settings.duration))
      var easedT = easingEquations[settings.easing](time)

      settings.el.scrollTop = (easedT * (settings.offset - from)) + from

      if (time < 1) {
        doScroll()
      } else {
        cancelInterval()
        if ((typeof settings.onComplete).toLowerCase() === 'function') {
          settings.onComplete.call(this)
        }
      }
    }
  }

  function doScroll () {
    if (useRequestAnimationFrame) {
      scrollInterval = requestAnimationFrame(scroll)
    } else {
      scrollInterval = setTimeout(function () {
        scroll()
      }, (1000 / 60))
    }
  }

  doScroll()
}
