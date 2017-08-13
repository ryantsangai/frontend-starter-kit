<template lang="pug">
a(:href="href", target="_blank", rel="noopener")
  slot
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  methods: { },
  computed: { },
}
</script>

