<script setup>
import { useRouter } from 'vue-router';
import { getCurrentUser } from 'vuefire';
import Login from './components/Login.vue';



const router = useRouter();
router.beforeEach(async (to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  console.log("Salta")
  if (to.meta.requiresAuth) 
    {
      const user = await getCurrentUser();
      if (!user) 
        return false;
      else
        return true;
      
    }
    else return true;
});
  


</script>

<template>
  <nav>
<RouterLink to="/">Inicio</RouterLink>
<RouterLink to="/recordatorios">Lista Recordatorios</RouterLink>
<Login></Login>
  
</nav>
<RouterView></RouterView>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center; /* Centra los elementos horizontalmente */
  align-items: center; /* Centra los elementos verticalmente */
  padding: 15px 20px;
  background-color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; /* Asegura que el nav ocupe todo el ancho */
  position: fixed; /* Fija la barra de navegación */
  top: 0;
  left: 0;
  z-index: 1000; /* Asegura que esté siempre visible */
}

nav a {
  color: #fff;
  text-decoration: none;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #00bcd4; /* Color de hover */
}

/* Espaciado para evitar que el contenido quede oculto debajo de la barra */
body {
  margin-top: 80px; /* Añade espacio para la barra fija */
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alinea el contenido al inicio (izquierda) */
  align-items: flex-start; /* Alinea los elementos al inicio (izquierda) */
  text-align: left; /* Alinea el texto a la izquierda */
  width: 90%; /* Ocupa todo el ancho */
  padding: 20px;
  box-sizing: border-box;
  margin-top: 80px; /* Añade espacio para la barra de navegación fija */
}

.container h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

.container p {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.container button {
  background-color: #00bcd4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.container button:hover {
  background-color: #0097a7;
}

footer {
  text-align: left; 
  padding: 15px 20px; 
  background-color: #333;
  color: #aaa;
  font-size: 14px;
  width: 90%; 
  box-sizing: border-box;
  margin-top: auto;
}

footer a {
  color: #00bcd4;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer a:hover {
  color: #0097a7;
}

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
  width: 100%; 
  margin-left: auto;
  margin-right: auto;
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