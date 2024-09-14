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
  width: 180px; /* Ajustamos el tamaño a 180px para una barra más compacta */
  background-color: #f4f4f4;
  padding: 15px; /* Un poco más de espacio */
  border-right: 1px solid #ddd;
  height: 100vh; /* Asegurar que ocupe toda la altura */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera para resaltar */
  font-size: 14px; /* Tamaño de fuente reducido */
}

.component-toolbar h3 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #2c3e50; /* Color más oscuro para el título */
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px; /* Un poco más redondeado */
  margin-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transiciones suaves */

  &:hover {
    background-color: #eaeaea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra más notoria al hacer hover */
  }
}

li.active {
  background-color: #e1e1e1; /* Color distinto para el activo */
  border-color: #bbb;
}

li + li {
  margin-top: 10px; /* Separación entre elementos */
}

body {
  font-size: 14px; /* Reducimos el tamaño de fuente general para toda la app */
  font-family: "Arial", sans-serif; /* Fuente general */
}

button {
  font-size: 13px; /* Botones más pequeños */
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
