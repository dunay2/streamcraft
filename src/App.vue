<template>
  <div id="app">
    <ComponentToolbar />
    <WorkspaceCanvas
      :droppedComponents="droppedComponents"
      @drop="onDrop"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @openEditModal="openEditModal"
    />
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
import WorkspaceCanvas from "./components/WorkspaceCanvas.vue";
import EditModal from "./components/EditModal.vue";

export default defineComponent({
  components: {
    ComponentToolbar,
    WorkspaceCanvas,
    EditModal,
  },
  setup() {
    const droppedComponents = ref<
      {
        id: string;
        type: "Table" | "View" | "Transformation";
        top: number;
        left: number;
      }[]
    >([]);

    const isEditModalOpen = ref(false);
    const selectedComponent = ref<{
      id: string;
      type: "Table" | "View" | "Transformation";
      top: number;
      left: number;
    } | null>(null);

    const clickOffset = ref({ x: 0, y: 0 });

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
        const x = event.clientX - canvas.getBoundingClientRect().left;
        const y = event.clientY - canvas.getBoundingClientRect().top;

        droppedComponents.value.push({
          id: uuidv4(),
          type: componentType,
          top: y,
          left: x,
        });
      }
    }

    function onDragStart(index: number, offset: { x: number; y: number }) {
      clickOffset.value = offset;
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
</style>
