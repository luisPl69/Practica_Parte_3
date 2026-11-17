<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import UserCard from '@/components/UserCard.vue';

const store = useUsersStore();
onMounted(() => store.loadUsers());
</script>

<template>
  <div class="container">
    <h1>Gestor de Usuarios</h1>
    <div class="controls">
      <input v-model="store.searchQuery" placeholder="Buscar por nombre..." class="search-input" />
      <p class="favorites-count">❤️ Favoritos: {{ store.favoritesCount }}</p>
    </div>
    <div v-if="store.loading" class="status">Cargando...</div>
    <div v-else-if="store.error" class="status error">{{ store.error }}</div>
    <div v-else class="grid">
      <UserCard
        v-for="user in store.filteredUsers"
        :key="user.id"
        :user="user"
        :isFavorite="store.favorites.has(user.id)"
        @toggleFavorite="store.toggleFavorite"
      />
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 20px; }
.controls { display: flex; gap: 16px; align-items: center; margin-bottom: 24px; }
.search-input { padding: 10px; font-size: 16px; width: 300px; border: 1px solid #ccc; border-radius: 4px; }
.favorites-count { font-weight: bold; color: #35495e; }
.status { font-size: 1.2rem; text-align: center; padding: 40px; }
.error { color: #e74c3c; font-weight: bold; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
</style>