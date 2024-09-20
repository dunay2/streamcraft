<template>
  <div ref="cardRef" class="canvas-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>ID: {{ id }}</p>
    <button @click="handleAction">Perform {{ type }} Action</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from "vue";
import { jsPlumb } from "jsplumb"; // Importamos jsPlumb para manejar las conexiones

export default defineComponent({
  name: "CanvasCard", // Nombre del componente
  props: {
    type: {
      type: String as PropType<"Table" | "View" | "Transformation">,
      default: "Table",
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const title = computed(() => `${props.type} Object`);
    const description = computed(
      () => `This is a ${props.type.toLowerCase()} object.`
    );
    const cardRef = ref<HTMLDivElement | null>(null);
    let jsPlumbInstance = jsPlumb.getInstance(); // Obtener la instancia de jsPlumb

    onMounted(() => {
      if (cardRef.value) {
        console.log("Card ref:", cardRef.value); // Verifica si cardRef tiene un valor
        jsPlumbInstance.draggable(cardRef.value); // Hacemos que la card sea arrastrable
      } else {
        console.error("Card ref is null");
      }
    });

    function handleAction() {
      console.log(`Action performed on ${props.type}`);
      alert(`Action executed for ${props.type}`);
    }

    return {
      title,
      description,
      cardRef,
      handleAction,
    };
  },
});
</script>

<style scoped>
.canvas-card {
  position: absolute; /* Necesario para poder arrastrar las cards dentro del canvas */
  border: 1px solid #dfe6e9;
  padding: 10px;
  width: 160px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: none;
  margin-bottom: 10px;
  transition: none;
}

.canvas-card:hover {
  transform: none;
  box-shadow: none;
}

.canvas-card h2 {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.canvas-card p {
  color: #636e72;
  margin-bottom: 8px;
  font-size: 12px;
}

.canvas-card button {
  background-color: #42b983;
  border: 1px solid #ddd;
  color: white;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.canvas-card button:hover {
  background-color: #36a273;
}
</style>
