<template>
  <div class="component-toolbar">
    <h3>Componentes</h3>
    <ul>
      <li
        v-for="component in components"
        :key="component"
        @dragstart="onDragStart(component, $event)"
        draggable="true"
      >
        {{ component }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const components = ["Table", "View", "Transformation"];

    function onDragStart(component: string, event: DragEvent) {
      event.dataTransfer?.setData("component-type", component);
    }

    return {
      components,
      onDragStart,
    };
  },
});
</script>

<style scoped lang="scss">
.component-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px; /* Ajustamos el tamaño */
  background-color: #f4f4f4;
  padding: 10px;
  border-right: 1px solid #ddd;
  height: 100vh; /* Asegurar que ocupe toda la altura */
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6e6e6;
  }
}
</style>
