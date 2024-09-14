<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h3>Edit Component</h3>
      <label for="id">ID:</label>
      <input v-model="componentData.id" disabled />

      <label for="type">Type:</label>
      <select v-model="componentData.type">
        <option value="Table">Table</option>
        <option value="View">View</option>
        <option value="Transformation">Transformation</option>
      </select>

      <button @click="saveChanges">Save</button>
      <button @click="$emit('close')">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  props: {
    component: {
      type: Object as PropType<{
        id: string;
        type: "Table" | "View" | "Transformation";
        top: number;
        left: number;
      }>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const componentData = ref({ ...props.component });

    watch(
      () => props.component,
      (newComponent) => {
        componentData.value = { ...newComponent };
      },
      { immediate: true, deep: true }
    );

    function saveChanges() {
      emit("save", componentData.value);
    }

    return {
      componentData,
      saveChanges,
    };
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

button {
  margin: 10px;
}
</style>
