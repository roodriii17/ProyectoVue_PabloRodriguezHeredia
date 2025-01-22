<script setup>
import { ref, computed, onMounted, watch } from "vue";
import Cabecera from "./CabeceraPrincipal.vue";
import Tarea from "./VistaTarea.vue";
import ResumenTareas from "./ResumenTareas.vue";
import { useFirestore, useCurrentUser } from 'vuefire';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const db = useFirestore();
const user = useCurrentUser();
const listaRecordatorios = ref([]);

onMounted(() => {
  if (user.value) {
    const q = query(collection(db, "recordatorios"), where("uid", "==", user.value.uid));
    onSnapshot(q, (querySnapshot) => {
      listaRecordatorios.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      ordenarNotas();
    });
  }
});

watch(user, (newUser) => {
  if (newUser) {
    const q = query(collection(db, "recordatorios"), where("uid", "==", newUser.uid));
    onSnapshot(q, (querySnapshot) => {
      listaRecordatorios.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      ordenarNotas();
    });
  }
});

async function altaNuevaNota(texto) {
  let nuevoRecordatorio = {
    titulo: texto,
    prioridad: "Normal",
    fechaCreacion: Date.now(),
    acabada: false,
    uid: user.value.uid
  };

  try {
    const docRef = await addDoc(collection(db, "recordatorios"), nuevoRecordatorio);
    console.log("Documento agregado con ID:", docRef.id);
  } catch (error) {
    console.error("Error al agregar documento:", error);
  }
}

async function borrarTarea(id) {
  try {
    await deleteDoc(doc(db, "recordatorios", id));
    console.log("Documento borrado con ID:", id);
  } catch (error) {
    console.error("Error al borrar documento:", error);
  }
}

async function cambiarPrioridad(tarea, nuevaPrioridad) {
  try {
    await updateDoc(doc(db, "recordatorios", tarea.id), { prioridad: nuevaPrioridad });
    tarea.prioridad = nuevaPrioridad;
    ordenarNotas();
  } catch (error) {
    console.error("Error al actualizar documento:", error);
  }
}

async function cambiarEstado(tarea) {
  try {
    await updateDoc(doc(db, "recordatorios", tarea.id), { acabada: !tarea.acabada });
    tarea.acabada = !tarea.acabada;
  } catch (error) {
    console.error("Error al actualizar documento:", error);
  }
}

async function borrarCompletadas() {
  const tareasCompletadas = listaRecordatorios.value.filter(tarea => tarea.acabada);
  for (const tarea of tareasCompletadas) {
    await borrarTarea(tarea.id);
  }
}

function ordenarNotas() {
  listaRecordatorios.value.sort((a, b) => {
    const prioridades = { "High": 3, "Normal": 2, "Low": 1 };
    return prioridades[b.prioridad] - prioridades[a.prioridad];
  });
}

const numeroTareasPendientes = computed(() => {
  return listaRecordatorios.value.filter((el) => !el.acabada).length;
});

const totalTareas = computed(() => listaRecordatorios.value.length);

</script>

<template>
  <div v-if="user">
    <Cabecera @altaRecordatorio="altaNuevaNota" />

    <header class="resumen-header">
      <p>{{ numeroTareasPendientes }} tareas pendientes de un total de {{ totalTareas }}</p>
    </header>

    <ResumenTareas :pendientes="numeroTareasPendientes" :total="totalTareas" @borrarCompletadas="borrarCompletadas" />

    <div class="lista-tareas">
      <transition-group name="fade" tag="div">
        <div v-for="tarea in listaRecordatorios" :key="tarea.id">
          <Tarea
            :titulo="tarea.titulo"
            :prioridad="tarea.prioridad"
            :acabada="tarea.acabada"
            @cambiarPrioridad="cambiarPrioridad(tarea, $event)"
            @cambiarEstado="cambiarEstado(tarea)"
            @borrado="() => borrarTarea(tarea.id)"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
html, body {
  font-family: 'Arial', sans-serif;
  background-color: #1e1e1e;
  color: #fff;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-y: hidden; 
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 220px; 
  overflow-y: auto; /* Permitir el desplazamiento vertical solo dentro del contenedor */
}

.resumen-header {
  width: 100%;
  position: fixed;
  top: 210px; /* Ajusta esta posición según sea necesario */
  left: 0;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  z-index: 850;
  text-align: center;
  background-color: #333;
}

.lista-recordatorios-container {
  background-color: #1e1e1e; 
  color: white; 
  min-height: 100vh;
  padding: 20px; 
  box-sizing: border-box; 
  margin: 0; 
}

.lista-tareas {
  margin: 0 auto;
  max-width: 900px; /* Ajusta el ancho máximo */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 320px; 
}

.tarea {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 8px;
  background-color: #333;
  border: 1px solid #444;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease; /* Transición para el cambio de lugar */
}

.tarea:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.tarea:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
}

.prioridad {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.prioridad.high {
  background-color: #e74c3c;
}

.prioridad.normal {
  background-color: #f39c12;
}

.prioridad.low {
  background-color: #2ecc71;
}

.prioridad.selected {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.prioridad:hover {
  opacity: 0.85;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-delete:hover {
  background-color: #c0392b;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}
</style>