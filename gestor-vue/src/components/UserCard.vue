<script setup lang="ts">
import type { User } from '@/types/user';

defineProps<{ user: User; isFavorite: boolean }>();
const emit = defineEmits<{ toggleFavorite: [id: string] }>();
</script>

<template>
  <div class="card">
    <h3>{{ user.name }}</h3>
    <p>📧 {{ user.email }}</p>
    <p>📍 {{ user.city }}</p>
    <button @click="emit('toggleFavorite', user.id)">
      {{ isFavorite ? 'Quitar de Favoritos' : 'Marcar como Favorito' }}
    </button>
  </div>
</template>

<style scoped>
.card { border: 1px solid #424141; border-radius: 8px; padding: 16px; background: #0a0909; }
button { margin-top: 12px; padding: 8px 12px; background: #42b883; color: rgb(6, 5, 5);
         border: none; border-radius: 4px; cursor: pointer; }
</style>