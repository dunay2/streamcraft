<template>
  <div id="app">
    <ComponentToolbar />
    <!-- Barra de herramientas a la izquierda -->
    <div class="workspace" @dragover.prevent @drop="onDrop">
      <div
        v-for="(component, index) in droppedComponents"
        :key="index"
        class="dropped-component"
      >
        <DataObjectCard :type="component.type" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ComponentToolbar from "./components/ComponentToolbar.vue"; // Importa la barra de herramientas
import DataObjectCard from "./components/DataObjectCard.vue"; // Importa el componente

export default defineComponent({
  components: {
    ComponentToolbar,
    DataObjectCard,
  },
  setup() {
    const droppedComponents = ref<{ type: string }[]>([]);

    function onDrop(event: DragEvent) {
      const componentType = event.dataTransfer?.getData("component-type");
      if (componentType) {
        droppedComponents.value.push({ type: componentType });
      }
    }

    return {
      droppedComponents,
      onDrop,
    };
  },
});
</script>

<style scoped lang="scss">
#app {
  display: flex;
  height: 100vh; /* Asegurar que ocupe toda la altura de la ventana */
}

.component-toolbar {
  width: 150px; /* Ancho fijo para la barra de herramientas */
  background-color: #f4f4f4;
  padding: 10px;
  border-right: 1px solid #ddd;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}

.workspace {
  flex-grow: 1;
  margin-left: 150px; /* Reserva espacio para la barra de herramientas */
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.dropped-component {
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
