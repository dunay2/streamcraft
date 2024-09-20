<template>
  <div id="app">
    <h1>Canvas Flow</h1>
    <div ref="canvasRef" class="canvas">
      <!-- V-for para generar múltiples CanvasCards dinámicamente -->
      <CanvasCard
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :type="card.type"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { jsPlumb } from "jsplumb";
import CanvasCard from "@/components/CanvasCard.vue";

export default defineComponent({
  name: "App",
  components: {
    CanvasCard,
  },
  setup() {
    const canvasRef = ref<HTMLElement | null>(null);
    const jsPlumbInstance = ref(jsPlumb.getInstance());

    const cards = ref<
      { id: string; type: "Table" | "View" | "Transformation" }[]
    >([
      { id: "card1", type: "Table" },
      { id: "card2", type: "View" },
      { id: "card3", type: "Transformation" },
    ]);

    onMounted(() => {
      if (canvasRef.value) {
        // Establecer el contenedor de jsPlumb como el canvas
        jsPlumbInstance.value.setContainer(canvasRef.value);
      }
    });

    return {
      canvasRef,
      cards,
      jsPlumbInstance,
    };
  },
});
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
}

.canvas {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  overflow: hidden;
}
</style>
