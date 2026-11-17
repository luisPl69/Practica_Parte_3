import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchUsers } from '../services/userService';

const UsersContext = createContext();

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        fetchUsers()
            .then(data => { setUsers(data); setLoading(false); })
            .catch(() => { setError('No se pudieron cargar los usuarios.'); setLoading(false); });
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const filteredUsers = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return users.filter(u => u.name.toLowerCase().includes(query));
    }, [users, searchQuery]);

    return (
        <UsersContext.Provider value={{
            loading, error, searchQuery, setSearchQuery,
            filteredUsers, favorites, toggleFavorite,
            favoritesCount: favorites.size
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsers = () => useContext(UsersContext);