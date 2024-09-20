<template>
  <div id="app">
    <!-- Renderiza múltiples DataObjectCards con diferentes props -->
    <DataObjectCard id="card1" type="Table" />
    <DataObjectCard id="card2" type="View" />
    <DataObjectCard id="card3" type="Transformation" />
  </div>
</template>

<script lang="ts">
import DataObjectCard from "./components/DataObjectCard.vue";

export default {
  name: "App",
  components: {
    DataObjectCard,
  },
};
</script>
