import forOwn from 'lodash/forOwn'

export default {

  // window keydown event listen
  keydown: {
    bind(el, binding) {
      binding.listener = function(e) {
        forOwn(binding.modifiers, (value, key) => {
          if (e.key === key) return binding.value()
        })
      }
      if (process.env.VUE_ENV !== 'server') {
        window.addEventListener('keydown', binding.listener)
      }
    },
    unbind(el, binding) {
      if (process.env.VUE_ENV !== 'server') {
        window.removeEventListener('keydown', binding.listener)
      }
    },
  }
}
