<template>
  <div class="data-object-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
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
.dropped-component {
  position: absolute;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
  transition: transform 0.2s ease-in-out;
}

.data-object-card {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  h2 {
    color: #2c3e50;
    font-size: 16px;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 10px;
    font-size: 14px;
  }

  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
  }

  button:hover {
    background-color: #2d8f66;
  }
}
</style>
