<template>
  <div id="app">
    <ComponentToolbar />
    <div id="canvas" class="workspace" @dragover.prevent @drop="onDrop">
      <div
        v-for="(component, index) in droppedComponents"
        :key="index"
        class="dropped-component"
        :style="{ top: component.top + 'px', left: component.left + 'px' }"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragend="onDragEnd(index, $event)"
      >
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
    const droppedComponents = ref<
      { type: string; top: number; left: number }[]
    >([]);

    function onDrop(event: DragEvent) {
      const componentType = event.dataTransfer?.getData("component-type");
      if (componentType) {
        const canvas = document.getElementById("canvas") as HTMLDivElement;
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;
        droppedComponents.value.push({ type: componentType, top: y, left: x });
      }
    }

    function onDragStart(index: number, event: DragEvent) {
      event.dataTransfer?.setData("component-index", index.toString());
    }

    function onDragEnd(index: number, event: DragEvent) {
      const canvas = document.getElementById("canvas") as HTMLDivElement;
      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      droppedComponents.value[index].top = y;
      droppedComponents.value[index].left = x;
    }

    return {
      droppedComponents,
      onDrop,
      onDragStart,
      onDragEnd,
    };
  },
});
</script>

<style scoped lang="scss">
#app {
  display: flex;
}

.workspace {
  position: relative;
  flex-grow: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-left: 200px; /* Espacio para la barra de herramientas */
  height: 100vh;
  overflow: hidden;
}

.dropped-component {
  position: absolute;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
}
</style>
