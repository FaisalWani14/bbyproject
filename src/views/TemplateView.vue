<template>
  <div class="about">
    <Template />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Template from "../components/RenderTemplate.vue";
export default defineComponent({
  components: { Template },
  setup() {
    return {};
  },
});
</script>

<style></style>
