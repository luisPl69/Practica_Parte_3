import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchUsers } from '@/services/userService';
import type { User } from '@/types/user';

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');
  const favorites = ref<Set<string>>(new Set());

  const loadUsers = async () => {
    loading.value = true;
    error.value = null;
    try {
      users.value = await fetchUsers();
    } catch (e) {
      error.value = 'No se pudieron cargar los usuarios. Verifique su conexión.';
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = (id: string) => {
    if (favorites.value.has(id)) favorites.value.delete(id);
    else favorites.value.add(id);
    favorites.value = new Set(favorites.value);
  };

  const filteredUsers = computed(() => {
    const q = searchQuery.value.toLowerCase();
    return users.value.filter(u => u.name.toLowerCase().includes(q));
  });

  const favoritesCount = computed(() => favorites.value.size);

  return { users, loading, error, searchQuery, favorites,
           loadUsers, toggleFavorite, filteredUsers, favoritesCount };
});
