<script setup>
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'
import { ref } from 'vue'

const auth = useFirebaseAuth()
const googleAuthProvider = new GoogleAuthProvider()
const githubAuthProvider = new GithubAuthProvider()
const user = useCurrentUser()
const error = ref(null)
const email = ref('')
const password = ref('')
const isRegistering = ref(false)

function iniciarSesionConGoogle() {
  signInWithPopup(auth, googleAuthProvider)
    .then(() => {
      console.log('Usuario logueado con Google')
    })
    .catch((reason) => {
      console.error('Fallo al iniciar sesión con Google:', reason)
      error.value = reason.message
    })
}

function iniciarSesionConGithub() {
  signInWithPopup(auth, githubAuthProvider)
    .then(() => {
      console.log('Usuario logueado con GitHub')
    })
    .catch((reason) => {
      console.error('Fallo al iniciar sesión con GitHub:', reason)
      error.value = reason.message
    })
}

function iniciarSesionConCorreo() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Usuario logueado con correo')
    })
    .catch((reason) => {
      console.error('Fallo al iniciar sesión con correo:', reason)
      error.value = reason.message
    })
}

function registrarConCorreo() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Usuario registrado con correo')
    })
    .catch((reason) => {
      console.error('Fallo al registrar con correo:', reason)
      error.value = reason.message
    })
}

function cerrarSesion() {
  signOut(auth)
    .then(() => {
      console.log('Usuario deslogueado')
    })
    .catch((reason) => {
      console.error('Fallo al cerrar sesión:', reason)
      error.value = reason.message
    })
}

const login = async () => {
  try {
    await auth.signInWithEmailAndPassword(email.value, password.value);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<template>
  <div>
    <div v-if="user">
      <p>Bienvenido, {{ user.displayName }}</p>
      <button @click="cerrarSesion">Cerrar sesión</button>
    </div>
    <div v-else>
      <div v-if="!isRegistering">
        <
        <button @click="iniciarSesionConGoogle" class="auth-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" class="auth-icon" />
        </button>

        
        <button @click="iniciarSesionConGithub" class="auth-btn">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" class="auth-icon" />
        </button>

     
        <div>
          <input v-model="email" type="email" placeholder="Correo electrónico" />
          <input v-model="password" type="password" placeholder="Contraseña" />
          <button @click="iniciarSesionConCorreo" class="auth-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Correo" class="auth-icon" />
          </button>
        </div>

        
        <button @click="isRegistering = true">Registrarse</button>
      </div>
      <div v-else>
        <div>
          <input v-model="email" type="email" placeholder="Correo electrónico" />
          <input v-model="password" type="password" placeholder="Contraseña" />
          <button @click="registrarConCorreo">Registrarse con correo</button>
        </div>
        <button @click="isRegistering = false">Volver a iniciar sesión</button>
      </div>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.auth-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin: 10px;
  padding: 0;
  outline: none;
}

.auth-icon {
  width: 40px;
  height: 40px;
  transition: transform 0.2s;
}

.auth-btn:hover .auth-icon {
  transform: scale(1.1);
}
</style>


<style scoped>
.auth-btn {
  background: none;
  border: none;
  cursor: pointer;
  margin: 10px;
  padding: 0;
  outline: none;
}

.auth-icon {
  width:30px;}
.error {
  color: red;
  font-weight: bold;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  outline: none;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}
</style>
