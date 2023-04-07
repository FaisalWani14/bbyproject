<template>
  <h1>LOGIN PAGE</h1>
  <div class="form"><FormCom /></div>
</template>

<script>
import FormCom from "@/components/FormCom.vue";
export default {
  components: { FormCom },
};
</script>

<style lang="scss">
$body-bg: #f61a52;

.form {
  background-color: $body-bg;
}
</style>
>
