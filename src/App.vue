<template>
  <div id="app">
    <ComponentToolbar />
    <div id="canvas" @drop="onDrop" @dragover="onDragOver" class="canvas">
      <!-- Renderizamos aquí las tarjetas dinámicamente -->
      <DataObjectCard
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :type="card.type"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DataObjectCard from "./components/DataObjectCard.vue";
import ComponentToolbar from "./components/ComponentToolbar.vue";

export default defineComponent({
  name: "App",
  components: {
    DataObjectCard,
    ComponentToolbar,
  },
  setup() {
    const cards = ref<Array<{ id: string; type: string }>>([]);

    function onDrop(event: DragEvent) {
      event.preventDefault();
      const componentType = event.dataTransfer?.getData("component-type");

      if (componentType) {
        const newCard = {
          id: `card${cards.value.length + 1}`,
          type: componentType,
        };
        cards.value.push(newCard);
      }
    }

    function onDragOver(event: DragEvent) {
      event.preventDefault();
    }

    return {
      cards,
      onDrop,
      onDragOver,
    };
  },
});
</script>

<style scoped>
#app {
  display: flex;
}

#canvas {
  flex-grow: 1;
  background-color: #f0f0f0;
  height: 100vh;
  position: relative;
  border: 1px solid #ddd;
  margin-left: 180px; /* Espacio para la barra de herramientas */
}

.canvas {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
