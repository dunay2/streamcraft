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
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 100%;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.modal h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
}

.modal label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.modal input,
.modal select {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 14px;
}

.modal button {
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s ease-in-out;
}

.modal button:hover {
  background-color: #36a273;
}

.modal button.cancel {
  background-color: #dfe6e9;
  color: #2c3e50;
}

.modal button.cancel:hover {
  background-color: #c8d6e5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
