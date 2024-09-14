<template>
  <div id="app">
    <ComponentToolbar />
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
    <EditModal
      v-if="isEditModalOpen"
      :component="selectedComponent"
      @close="closeEditModal"
      @save="saveComponent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import ComponentToolbar from "./components/ComponentToolbar.vue";
import DataObjectCard from "./components/DataObjectCard.vue";
import EditModal from "./components/EditModal.vue";

export default defineComponent({
  components: {
    ComponentToolbar,
    DataObjectCard,
    EditModal,
  },
  setup() {
    const droppedComponents = ref<
      {
        id: string;
        type: "Table" | "View" | "Transformation";
        top: number;
        left: number;
      }[] // <--- Usamos los valores correctos aquí.
    >([]);

    const clickOffset = ref({ x: 0, y: 0 });

    const isEditModalOpen = ref(false);
    const selectedComponent = ref<{
      id: string;
      type: "Table" | "View" | "Transformation";
      top: number;
      left: number;
    } | null>(null);

    function openEditModal(component: {
      id: string;
      type: "Table" | "View" | "Transformation";
      top: number;
      left: number;
    }) {
      selectedComponent.value = { ...component };
      isEditModalOpen.value = true;
    }

    function closeEditModal() {
      isEditModalOpen.value = false;
      selectedComponent.value = null;
    }

    function saveComponent(updatedComponent: {
      id: string;
      type: "Table" | "View" | "Transformation";
      top: number;
      left: number;
    }) {
      const index = droppedComponents.value.findIndex(
        (comp) => comp.id === updatedComponent.id
      );
      if (index !== -1) {
        droppedComponents.value[index] = updatedComponent;
      }
      closeEditModal();
    }

    function onDrop(event: DragEvent) {
      const componentType = event.dataTransfer?.getData("component-type") as
        | "Table"
        | "View"
        | "Transformation";

      if (componentType) {
        const canvas = document.getElementById("canvas") as HTMLDivElement;
        const x =
          event.clientX -
          canvas.getBoundingClientRect().left -
          clickOffset.value.x;
        const y =
          event.clientY -
          canvas.getBoundingClientRect().top -
          clickOffset.value.y;

        droppedComponents.value.push({
          id: uuidv4(), // <--- Generamos un ID único para cada componente
          type: componentType,
          top: y,
          left: x,
        });
      }
    }

    function onDragStart(index: number, event: DragEvent) {
      event.dataTransfer?.setData("component-index", index.toString());

      const draggedElement = event.currentTarget as HTMLDivElement;
      const boundingRect = draggedElement.getBoundingClientRect();

      clickOffset.value = {
        x: event.clientX - boundingRect.left,
        y: event.clientY - boundingRect.top,
      };
    }

    function onDragEnd(index: number, event: DragEvent) {
      const canvas = document.getElementById("canvas") as HTMLDivElement;
      const x =
        event.clientX -
        canvas.getBoundingClientRect().left -
        clickOffset.value.x;
      const y =
        event.clientY -
        canvas.getBoundingClientRect().top -
        clickOffset.value.y;

      droppedComponents.value[index].top = y;
      droppedComponents.value[index].left = x;
    }

    return {
      droppedComponents,
      onDrop,
      onDragStart,
      onDragEnd,
      openEditModal,
      closeEditModal,
      saveComponent,
      isEditModalOpen,
      selectedComponent,
    };
  },
});
</script>

<style scoped lang="scss">
#app {
  display: flex;
  height: 100vh;
}

.workspace {
  position: relative;
  flex-grow: 1;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-left: 200px;
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
  transition: transform 0.1s ease-in-out;
}
</style>
