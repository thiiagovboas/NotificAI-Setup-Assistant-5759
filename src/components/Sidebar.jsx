import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiClipboard, FiCalendar, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  const menuItems = [
    { icon: FiHome, label: 'Início', path: '/dashboard' },
    { icon: FiUsers, label: 'Clientes', path: '/clientes' },
    { icon: FiClipboard, label: 'Serviços', path: '/servicos' },
    { icon: FiCalendar, label: 'Agenda', path: '/agenda' },
    { icon: FiSettings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <div className="bg-white border-r border-gray-200 w-64 fixed h-full shadow-lg">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-primary-800">NotificAI</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão de Agendamentos</p>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors ${
                isActive ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600 font-medium' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;