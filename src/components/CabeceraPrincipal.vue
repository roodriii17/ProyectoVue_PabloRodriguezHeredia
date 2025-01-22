<script setup>
import { ref } from 'vue';


const emit = defineEmits(['altaRecordatorio']);


const textoNuevaNota = ref('');


const notas = ref([]);


const altaNuevaNota = () => {
  if (textoNuevaNota.value.trim()) { 
    const nuevaNota = textoNuevaNota.value.trim();
    notas.value.push(nuevaNota); 
    emit('altaRecordatorio', nuevaNota); 
    textoNuevaNota.value = ''; 
  }
};
</script>
<template>
  <header>
    <h1 class="fixed-header">Proyecto Vue.js - Pablo Rodriguez</h1>
    <input
      v-model="textoNuevaNota"
      placeholder="¿Que quieres recordar?"
      @keyup.enter="altaNuevaNota"
      class="full-width-input"
    />
  </header>
</template>



<style scoped>
.fixed-header {
  width: 100%;
  position: fixed;
  top: 92px; /* Ajusta esta posición según sea necesario */
  left: 0;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 24px;
  outline: none;
  transition: border-color 0.3s ease;
  z-index: 800;
  text-align: center;
  background-color: #333;
}

.full-width-input {
  width: 100%;
  position: fixed;
  top: 160px; /* Ajusta esta posición según sea necesario */
  left: 0;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  z-index: 900;
  background-color: #ffffff;
  
}

.full-width-input:focus {
  border-color: #4CAF50;
}
</style>