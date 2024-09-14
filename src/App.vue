<template>
  <div id="app">
    <DataObjectCard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DataObjectCard from "./components/DataObjectCard/DataObjectCard.vue";

export default defineComponent({
  components: {
    DataObjectCard,
  },
});
</script>
