<template>
  <div ref="cardRef" class="data-object-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>ID: {{ id }}</p>
    <button @click="handleAction">Perform {{ type }} Action</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, PropType } from "vue";
import { jsPlumb, EndpointOptions } from "jsplumb"; // Importamos jsPlumb

export default defineComponent({
  name: "DataObjectCard", // Nombre multi-palabra
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

    let jsPlumbInstance = jsPlumb.getInstance();

    const endpointOptions: EndpointOptions = {
      anchor: "Continuous",
      isSource: true,
      isTarget: true,
      connector: ["Straight", {}],
      endpoint: "Dot",
      maxConnections: -1,
    };

    onMounted(() => {
      if (cardRef.value) {
        // Hacemos que la tarjeta sea arrastrable
        jsPlumbInstance.draggable(cardRef.value);

        // Añadir el punto de conexión con las opciones
        jsPlumbInstance.addEndpoint(cardRef.value, endpointOptions);

        // Escuchar cuando se establece una conexión
        jsPlumbInstance.bind("connection", (info) => {
          console.log(`Conectado: ${info.sourceId} -> ${info.targetId}`);
        });
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
.data-object-card {
  position: absolute;
  border: 1px solid #dfe6e9;
  padding: 10px;
  width: 160px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: none;
  margin-bottom: 10px;
  transition: none;
}

.data-object-card:hover {
  transform: none;
  box-shadow: none;
}

.data-object-card h2 {
  color: #2c3e50;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}

.data-object-card p {
  color: #636e72;
  margin-bottom: 8px;
  font-size: 12px;
}

.data-object-card button {
  background-color: #42b983;
  border: 1px solid #ddd;
  color: white;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.data-object-card button:hover {
  background-color: #36a273;
}
</style>
