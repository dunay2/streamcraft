<template>
  <div>
    <!-- Barra de herramientas horizontal -->
    <div class="toolbar">
      <p>Barra de herramientas</p>
    </div>

    <!-- Contenedor principal para el área de trabajo -->
    <div class="main-content">
      <!-- Barra lateral para componentes -->
      <div class="sidebar">
        <p>Componentes</p>
        <ul>
          <li>Componente 1</li>
          <li>Componente 2</li>
        </ul>
      </div>

      <!-- Área de trabajo -->
      <div class="workspace">
        <h2>Área de trabajo</h2>
        <p>Aquí puedes desarrollar las funcionalidades clave</p>
      </div>
    </div>

    <!-- Log simple en la parte inferior -->
    <div class="log-area">
      <p>Log: Aquí se mostrarán las acciones del usuario</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    // Aquí podrías agregar la lógica de la funcionalidad de la barra de herramientas
  },
});
</script>

<style scoped lang="scss">
/* Estilo general para la barra de herramientas */
.toolbar {
  height: 50px; /* Altura de la barra de herramientas */
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

/* Contenedor principal para la barra lateral y el área de trabajo */
.main-content {
  display: flex; /* Flex para que la barra lateral y el workspace estén en fila */
  flex-grow: 1;
  height: calc(
    100vh - 100px
  ); /* Altura dinámica menos la barra de herramientas y el log */
}

/* Estilo para la barra lateral */
.sidebar {
  width: 220px; /* Ancho fijo de la barra lateral */
  background-color: #f5f5f5;
  padding: 10px;
  border-right: 1px solid #ddd;
}

/* Área de trabajo principal */
.workspace {
  flex-grow: 1; /* Ocupa todo el espacio disponible al lado de la barra lateral */
  background-color: #ffffff;
  padding: 20px;
  overflow-y: auto; /* Scroll vertical si es necesario */
}

/* Área del log en la parte inferior */
.log-area {
  height: 50px; /* Altura del log */
  background-color: #e0e0e0;
  padding: 10px;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
