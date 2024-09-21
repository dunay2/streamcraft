<template>
  <div class="data-object-card" ref="cardRef">
    <h2>{{ title }}</h2>
    <p>ID: {{ cardId }}</p>
    <p>Type: {{ type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, PropType } from "vue";
import { useStore } from "vuex";
import { Card } from "@/models/Card"; // Importamos la clase Card
import { Node } from "@/models/Node"; // Importamos la clase Node

export default defineComponent({
  name: "DataObjectCard",
  props: {
    type: {
      type: String as PropType<"Table" | "View" | "Transformation">,
      default: "Table",
    },
  },
  setup(props) {
    const store = useStore();
    const title = computed(() => `${props.type} Object`);
    const cardRef = ref<HTMLDivElement | null>(null);
    const cardId = ref<string>("");

    const jsPlumbInstance = store.getters.jsPlumbInstance;
    const graphInstance = store.getters.graphInstance;

    onMounted(() => {
      if (cardRef.value) {
        const cardInstance = new Card(
          new Node("", props.type), // Dejamos el ID vacío por ahora
          100,
          100,
          jsPlumbInstance,
          graphInstance
        );

        cardId.value = cardInstance.id; // Asignamos el ID generado a cardId
        console.log("Card ID generado:", cardInstance.id);

        // Ahora asignamos el ID generado al nodo
        cardInstance.node.id = cardInstance.id;
        console.log("Nodo con ID:", cardInstance.node.id);

        // Inicializamos la lógica del Card
        cardInstance.init(cardRef.value);
      }
    });

    return {
      title,
      cardId,
      cardRef,
    };
  },
});
</script>

<style scoped>
.data-object-card {
  position: absolute;
  border: 1px solid #dfe6e9;
  padding: 10px;
  width: 160px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  cursor: move;
  transition: box-shadow 0.3s ease;
}

.data-object-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.data-object-card h2 {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.data-object-card p {
  color: #636e72;
  font-size: 12px;
}
</style>
