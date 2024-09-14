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
        <i :class="getIconClass(component)"></i> {{ component }}
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

    function getIconClass(component: string) {
      switch (component) {
        case "Table":
          return "fas fa-table";
        case "View":
          return "fas fa-eye";
        case "Transformation":
          return "fas fa-exchange-alt";
        default:
          return "fas fa-question-circle"; // Icono por defecto
      }
    }

    return {
      components,
      onDragStart,
      getIconClass,
    };
  },
});
</script>

<style scoped lang="scss">
.component-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  background-color: #f4f4f4;
  padding: 10px;
  border-right: 1px solid #ddd;
  height: 100vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  overflow-y: auto;
}

.component-toolbar h3 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #eaeaea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

li i {
  margin-right: 8px;
  font-size: 18px;
}

li.active {
  background-color: #e1e1e1;
  border-color: #bbb;
}

li + li {
  margin-top: 10px;
}

body {
  font-size: 14px;
  font-family: "Arial", sans-serif;
}

button {
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #36a273;
  }
}
</style>
