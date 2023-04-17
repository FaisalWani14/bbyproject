<template>
  <TemplateCom :design="useTemplate" />
</template>

<script>
import { template } from "../DB/templateDB";
import TemplateCom from "./TemplateCom.vue";
export default {
  components: { TemplateCom },
  setup() {
    const useTemplate = template[0];
    return {
      useTemplate,
    };
  },
  methods: {},
};
</script>

<style></style>
