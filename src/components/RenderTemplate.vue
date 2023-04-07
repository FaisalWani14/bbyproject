<template>
  <TemplateCom />
</template>

<script>
import { design } from "../DB/designDB.js";
import TemplateCom from "../components/TemplateCom.vue";
export default {
  components: { TemplateCom },
  data() {
    return {
      design,
    };
  },
  methods: {
    click() {
      console.log(this.design[0]);
    },
  },
};
</script>

<style></style>
