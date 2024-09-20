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
  width: 200px;
  background-color: #2c3e50;
  padding: 20px;
  border-right: 1px solid #34495e;
  height: 100vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  overflow-y: auto;
  z-index: 10;
}

.component-toolbar h3 {
  font-size: 18px;
  color: #ecf0f1;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #34495e;
  padding-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #34495e;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #34495e;
  cursor: grab;
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    transform 0.2s ease;
  color: #ecf0f1;
}

li:hover {
  background-color: #1abc9c;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

li i {
  margin-right: 10px;
  font-size: 20px;
  color: #ecf0f1;
}

li.active {
  background-color: #16a085;
  border-color: #1abc9c;
}

li + li {
  margin-top: 15px;
}

body {
  font-family: "Roboto", sans-serif;
}

button {
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}
</style>
