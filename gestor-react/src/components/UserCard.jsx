export default function UserCard({ user, isFavorite, onToggleFavorite }) {
    return (
        <div className="card">
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>📍 {user.city}</p>
            <button onClick={() => onToggleFavorite(user.id)}>
                {isFavorite ? 'Quitar de Favoritos' : 'Marcar como Favorito'}
            </button>
        </div>
    );
}