import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';

const DashboardLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <nav className="bg-white border-b border-gray-200 h-16 fixed w-[calc(100%-16rem)] z-10">
          <div className="h-full px-6 flex items-center justify-end">
            <Button
              variant="secondary"
              onClick={logout}
              className="w-auto px-4"
            >
              Logout
            </Button>
          </div>
        </nav>
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;