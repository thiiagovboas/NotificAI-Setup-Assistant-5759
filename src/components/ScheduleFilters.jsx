import { FiFilter, FiCalendar, FiClock, FiUser } from 'react-icons/fi';

const ScheduleFilters = ({
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  clientFilter,
  onClientFilterChange,
  serviceFilter,
  onServiceFilterChange,
  clients,
  services
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FiFilter className="inline mr-2" />
          Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todos</option>
          <option value="pendente">Pendente</option>
          <option value="confirmado">Confirmado</option>
          <option value="concluido">Concluído</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FiCalendar className="inline mr-2" />
          Data
        </label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FiUser className="inline mr-2" />
          Cliente
        </label>
        <select
          value={clientFilter}
          onChange={(e) => onClientFilterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todos os clientes</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <FiClock className="inline mr-2" />
          Serviço
        </label>
        <select
          value={serviceFilter}
          onChange={(e) => onServiceFilterChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Todos os serviços</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ScheduleFilters;