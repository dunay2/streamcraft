<template>
  <div id="canvas" class="workspace" @dragover.prevent @drop="onDrop">
    <div
      v-for="(component, index) in droppedComponents"
      :key="component.id"
      class="dropped-component"
      :style="{ top: component.top + 'px', left: component.left + 'px' }"
      draggable="true"
      @dragstart="onDragStart(index, $event)"
      @dragend="onDragEnd(index, $event)"
      @dblclick="openEditModal(component)"
    >
      <DataObjectCard :type="component.type" :id="component.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DataObjectCard from "./DataObjectCard.vue";

export default defineComponent({
  components: {
    DataObjectCard,
  },
  props: {
    droppedComponents: {
      type: Array as PropType<
        {
          id: string;
          type: "Table" | "View" | "Transformation";
          top: number;
          left: number;
        }[]
      >,
      required: true,
    },
  },
  emits: ["drop", "dragstart", "dragend", "openEditModal"],
  methods: {
    onDrop(event: DragEvent) {
      this.$emit("drop", event);
    },
    onDragStart(index: number, event: DragEvent) {
      // Guardamos el offset relativo al punto donde se hizo clic en el componente
      const draggedElement = event.target as HTMLDivElement;
      const rect = draggedElement.getBoundingClientRect();
      this.$emit("dragstart", index, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    onDragEnd(index: number, event: DragEvent) {
      this.$emit("dragend", index, event);
    },
    openEditModal(component: {
      id: string;
      type: "Table" | "View" | "Transformation";
    }) {
      this.$emit("openEditModal", component);
    },
  },
});
</script>

<style scoped lang="scss">
.workspace {
  position: relative;
  flex-grow: 1;
  background-color: #f0f3f4;
  border: 1px solid #dfe6e9;
  margin-left: 200px;
  height: 100vh;
  overflow: hidden;
}

.dropped-component {
  position: absolute;
  padding: 0px;
  border: none;
  margin: 0;
  background-color: transparent;
  box-shadow: none;
  cursor: move;
  transition: transform 0.1s ease-in-out;
}

.dropped-component:hover {
  box-shadow: none;
}
</style>
