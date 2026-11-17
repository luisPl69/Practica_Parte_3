import type { User } from '@/types/user';

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Error en la red');
  const data = await res.json();
  return data.map((u: any) => ({
    id: String(u.id),
    name: u.name,
    email: u.email,
    city: u.address.city
  }));
}