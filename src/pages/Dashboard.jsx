import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-800">NotificAI</h1>
            </div>
            <Button variant="secondary" onClick={logout} className="w-auto px-4">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary-800 mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-gray-600">
            Your workspace is now configured. You can start managing your notifications and schedules.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {['Notifications', 'Schedules', 'Settings'].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold text-primary-700 mb-2">{item}</h3>
              <p className="text-gray-600">Manage your {item.toLowerCase()} here</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;