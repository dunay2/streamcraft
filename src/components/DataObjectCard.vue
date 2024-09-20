<template>
  <div class="data-object-card" ref="cardRef">
    <h2>{{ title }}</h2>
    <p>ID: {{ id }}</p>
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
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const title = computed(() => `${props.type} Object`);
    const cardRef = ref<HTMLDivElement | null>(null);

    const jsPlumbInstance = store.getters.jsPlumbInstance;
    const graphInstance = store.getters.graphInstance;

    onMounted(() => {
      if (cardRef.value) {
        const nodeInstance = new Node(props.id, props.type);

        const cardInstance = new Card(
          nodeInstance,
          100,
          100,
          jsPlumbInstance,
          graphInstance
        );

        cardInstance.init(cardRef.value); // Llamamos a la lógica desde la clase Card
      }
    });

    return {
      title,
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
