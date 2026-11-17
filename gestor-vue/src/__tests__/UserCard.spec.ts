import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import UserCard from '@/components/UserCard.vue';
import type { User } from '@/types/user';

describe('UserCard.vue', () => {
  beforeEach(() => setActivePinia(createPinia()));

  const mockUser: User = {
    id: '1', name: 'Leanne Graham',
    email: 'leanne@example.com', city: 'Gwenborough'
  };

  it('emite toggleFavorite con el id correcto al hacer clic', async () => {
    const wrapper = mount(UserCard, { props: { user: mockUser, isFavorite: false } });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('toggleFavorite')).toBeTruthy();
    expect(wrapper.emitted('toggleFavorite')![0]).toEqual(['1']);
  });
});