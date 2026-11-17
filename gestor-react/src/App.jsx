import { UsersProvider } from './context/UsersContext';
import HomeView from './pages/HomeView';

export default function App() {
  return (
    <UsersProvider>
      <HomeView />
    </UsersProvider>
  );
}