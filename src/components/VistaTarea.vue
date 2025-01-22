<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  titulo: String,
  prioridad: String,
  acabada: Boolean
});

const emits = defineEmits(['cambiarPrioridad', 'cambiarEstado', 'borrado']);

function cambiarPrioridad(nuevaPrioridad) {
  emits('cambiarPrioridad', nuevaPrioridad);
}

function cambiarEstado() {
  emits('cambiarEstado');
}

function borrarTarea() {
  emits('borrado');
}
</script>

<template>
  <div :class="['tarea', prioridad.toLowerCase()]">
    <div class="tarea-contenido">
      <h3 :class="{ completada: acabada }">{{ titulo }}</h3>
      <div class="acciones">
        <button class="btn-completada" @click="$emit('cambiarEstado')">
          <span class="icon" v-if="acabada">✔️</span>
          <span class="icon" v-else></span>
        </button>
        <div class="prioridades">
          <button
            v-for="p in ['High', 'Normal', 'Low']"
            :key="p"
            :class="{ selected: prioridad === p }"
            @click="$emit('cambiarPrioridad', p)"
          >
            {{ p }}
          </button>
        </div>
      </div>
      <button class="btn-delete" @click="$emit('borrado')">
        <span class="icon">🗑️</span>
      </button>
    </div>
  </div>
</template>



<style scoped>
.tarea {
  display: flex;
  
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background-color: #333;
  border: 1px solid #444;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 10px;
  position: relative;
  width: 570%;
  margin-left: -180%;
  margin-right: 100%;
  
}

.tarea:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
}

.tarea-contenido {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  
}

h3 {
  margin: 0;
  font-size: 1.2em;
  color: #fff;
}

h3.completada {
  text-decoration: line-through;
  color: #4caf50; /* Verde para tareas completadas */
}

.acciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #666;
}

button.completada {
  background-color: #2ecc71;
}

.prioridades {
  display: flex;
  gap: 5px;
}

.prioridades button {
  flex: 1;
}

.prioridades button.selected {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.btn-completada {
  background-color: transparent;
  color: #4caf50;
  border: 2px solid #4caf50;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-completada .icon {
  font-size: 18px;
}

.btn-completada:hover {
  background-color: #4caf50;
  color: white;
}

.btn-delete {
  background-color: transparent;
  color: #f44336;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 0;
  right: 0;
}

.btn-delete:hover {
  background-color: #d32f2f;
  color: white;
}

.icon {
  font-size: 24px;
}

/* Colores de fondo según la prioridad */
.tarea.high {
  background-color: #e74c3c; /* Rojo para alta prioridad */
}

.tarea.normal {
  background-color: #f39c12; /* Naranja para prioridad normal */
}

.tarea.low {
  background-color: #2ecc71; /* Verde para prioridad baja */
}
</style>