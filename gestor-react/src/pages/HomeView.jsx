import { useUsers } from '../context/UsersContext';
import UserCard from '../components/UserCard';

export default function HomeView() {
    const { loading, error, searchQuery, setSearchQuery, filteredUsers, favorites, toggleFavorite, favoritesCount } = useUsers();

    if (loading) return <div className="status">Cargando...</div>;
    if (error) return <div className="status error">{error}</div>;

    return (
        <div className="container">
            <h1>Gestor de Usuarios</h1>
            <div className="controls">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre..."
                    className="search-input"
                />
                <p className="favorites-count">❤️ Favoritos: {favoritesCount}</p>
            </div>
            <div className="grid">
                {filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isFavorite={favorites.has(user.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
}