<template>
  <div class="data-object-card">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="handleAction">Perform Action</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const title = ref<string>("Sample Data Object");
    const description = ref<string>(
      "This object represents a sample data entity."
    );

    function handleAction() {
      console.log("Action performed on Data Object");
      alert("Action executed successfully!");
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
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2c3e50;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 16px;
  }

  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2d8f66;
  }
}
</style>
