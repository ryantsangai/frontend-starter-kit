<template lang="pug">
transition(name="fade")
  .modal.is-active(v-if="show", v-keydown.Escape="cancel")
    .modal-background
    .modal-content
      .box
        slot
    button.modal-close.is-large(type="button", @click.prevent="cancel()")
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    return {
      show: false,
    }
  },
  methods: {
    open(data) {
      this.show = true
      this.$emit('open', _.cloneDeep(data))
    },
    cancel() {
      this.show = false
      this.$emit('close')
      this.$emit('cancel')
    },
    confirm(payload) {
      this.show = false
      this.$emit('close')
      this.$emit('confirm', payload)
    },

  },
  created() {
  },
  components: { },
}
</script>

<story>
{
  template: `<div class="section">
    <ul>
      <li>Can press <code>ESC</code> to close</li>
      <li>Transition effect when open and close</li>
      <li>Parent component can use <span class="tag">open</span> to open the modal</li>
      <li>Parent component can use <span class="tag">confirm</span>, <span class="tag">cancel</span> to close</li>
      <li>Event <span class="tag">close</span> will always trigger when close</li>
      <li>Event <span class="tag">confirm</span> and <span class="tag">cancel</span> will be triggered when calling relative methods</li>
    </ul>

    <hr>

    <textarea rows="8" cols="80" v-model="content1"></textarea>
    <button class="button" type="button" @click="$refs.modal1.open()">Open</button>

    <modal ref="modal1" @cancel="action('Cancel')" @close="action('Closed')">
      <textarea rows="8" cols="80" v-model="content1"></textarea>
      <button class="button" type="confirm" @click="$refs.modal1.close()">Confirm</button>
    </modal>

    <hr>

    <textarea rows="8" cols="80" v-model="content"></textarea>
    <button class="button" type="button" @click="$refs.modal2.open(content)">Open</button>

    <modal ref="modal2" @open="onOpen" @cancel="action('Cancel')" @close="action('Closed')" @confirm="onConfirm">
      <textarea rows="8" cols="80" v-model="modalContent"></textarea>
      <button class="button" type="confirm" @click="$refs.modal2.confirm(modalContent)">Confirm</button>
    </modal>
  </div>`,
  data() {
    return {
      content1: 'If Parent and modal content share the same data, the parent will be updated instantly. But in most of the cases, we want the change applied only after pressed confirm button',
      content: 'Decouple the data from parent, you can use clone/cloneDeep to set the modalContent yourself, or you can pass the data to open method, and get cloned data from open event',
      modalContent: null,
    }
  },
  methods: {
    onOpen(data) {
      this.modalContent = data
    },
    onConfirm(data) {
      this.content = data
    },
  },
}
</story>
