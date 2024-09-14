<template>
  <div id="app">
    <ComponentToolbar />
    <div class="workspace" @dragover.prevent @drop="onDrop">
      <div
        v-for="(component, index) in droppedComponents"
        :key="index"
        class="dropped-component"
      >
        <!-- Renderiza el DataObjectCard con el tipo seleccionado -->
        <DataObjectCard :type="component.type" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ComponentToolbar from "./components/ComponentToolbar.vue";
import DataObjectCard from "./components/DataObjectCard.vue";

export default defineComponent({
  components: {
    ComponentToolbar,
    DataObjectCard,
  },
  setup() {
    const droppedComponents = ref<{ type: string }[]>([]);

    function onDrop(event: DragEvent) {
      const componentType = event.dataTransfer?.getData("component-type"); // Obtener tipo desde dataTransfer
      if (componentType) {
        droppedComponents.value.push({ type: componentType }); // Agregar el componente con su tipo
        console.log("Dropped component:", componentType);
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

.workspace {
  flex-grow: 1;
  margin-left: 150px;
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
