<template>
  <!-- <TemplateCom :design="useDesign"/> -->
  <TemplateCom :design="useTemplate" />
</template>

<script>
// import { design } from "../DB/designDB.js";
import { template } from "../DB/templateDB";
import TemplateCom from "./TemplateCom.vue";
export default {
  components: { TemplateCom },
  setup() {
    // const useDesign = design[0]
    const useTemplate = template[0];
    return {
      // useDesign,
      useTemplate,
    };
  },
  methods: {},
};
</script>

<style></style>
