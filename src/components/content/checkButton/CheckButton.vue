<template>
  <div class="check-button">
    <img
      src="~/assets/img/cart/tick.svg"
      alt=""
      :class="{ checked: isChecked }"
    />
  </div>
</template>

<script>

export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}

</script>
<style scoped>
.check-button img {
  border: 2px solid #ccc;
  border-radius: 50%;
}
.checked {
  border-color: var(--color-tint) !important;
  background-color: var(--color-tint);
}
</style>