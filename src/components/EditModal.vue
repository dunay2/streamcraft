<template>
  <div v-if="isModalOpen" class="modal-backdrop">
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
      <button @click="closeModal">Cancel</button>
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
      } | null>,
      required: true, // Se espera que siempre haya un componente a editar
    },
    isModalOpen: {
      type: Boolean,
      required: true, // Para controlar si el modal está abierto o cerrado
    },
  },
  emits: ["save", "close"],
  setup(props, { emit }) {
    const componentData = ref({ ...props.component });

    watch(
      () => props.component,
      (newComponent) => {
        if (newComponent) {
          componentData.value = { ...newComponent };
        }
      },
      { immediate: true, deep: true }
    );

    function saveChanges() {
      // Emitimos el componente actualizado al padre para que lo maneje
      emit("save", componentData.value);
      closeModal();
    }

    function closeModal() {
      emit("close");
    }

    return {
      componentData,
      saveChanges,
      closeModal,
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
  padding: 20px;
  border-radius: 10px;
  width: 300px; /* Ancho reducido */
  max-width: 90%; /* Se ajusta para pantallas pequeñas */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

.modal h3 {
  font-size: 16px; /* Tamaño de letra más pequeño */
  font-weight: 600;
  margin-bottom: 10px; /* Espacio inferior más pequeño */
  color: #2c3e50;
}

.modal label {
  display: block;
  margin-bottom: 4px; /* Espacio reducido */
  font-weight: 500;
}

.modal input,
.modal select {
  width: 100%;
  padding: 6px; /* Padding reducido */
  margin-bottom: 15px; /* Menos espacio entre campos */
  border: 1px solid #dfe6e9;
  border-radius: 6px;
  font-size: 12px; /* Fuente más pequeña */
}

.modal button {
  padding: 8px 16px; /* Botones más compactos */
  background-color: #42b983;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 12px; /* Tamaño de letra reducido */
  cursor: pointer;
  margin-right: 8px; /* Espacio reducido entre botones */
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
