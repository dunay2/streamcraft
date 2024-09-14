<template>
  <div class="data-object-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>ID: {{ id }}</p>
    <button @click="handleAction">Perform {{ type }} Action</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String as PropType<"Table" | "View" | "Transformation">, // Tipo de componente desde la barra
      default: "Table",
    },
    id: {
      type: String, // Añadimos el ID como una propiedad
      required: true,
    },
  },
  setup(props) {
    const title = ref<string>(`${props.type} Object`);
    const description = ref<string>(
      `This is a ${props.type.toLowerCase()} object.`
    );

    watch(
      () => props.type,
      (newType) => {
        title.value = `${newType} Object`;
        description.value = `This is a ${newType.toLowerCase()} object.`;
      }
    );

    function handleAction() {
      console.log(`Action performed on ${props.type}`);
      alert(`Action executed for ${props.type}`);
    }

    return {
      title,
      description,
      handleAction,
    };
  },
});
</script>

<style scoped lang="scss">
.data-object-card {
  border: 1px solid #dfe6e9;
  padding: 10px;
  width: 160px;
  border-radius: 8px;
  background-color: #ffffff;
  /* Eliminamos cualquier sombra */
  box-shadow: none;
  margin-bottom: 10px;
  /* Eliminamos cualquier transformación al hacer hover */
  transition: none;
}

.data-object-card:hover {
  /* Aseguramos que no hay transformaciones en hover */
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
