import { motion } from 'framer-motion';
import { FiClock, FiUser } from 'react-icons/fi';
import StatusDropdown from './StatusDropdown';

const AppointmentList = ({
  appointments,
  selectedDate,
  onStatusChange,
  clients,
  services
}) => {
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.nome : 'Cliente não encontrado';
  };

  const getServiceName = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.nome : 'Serviço não encontrado';
  };

  const getAppointmentsForDate = () => {
    return appointments
      .filter(apt => apt.date === selectedDate.toISOString().split('T')[0])
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Agendamentos do Dia
      </h2>
      <div className="space-y-4">
        {getAppointmentsForDate().length > 0 ? (
          getAppointmentsForDate().map(appointment => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <FiClock className="text-primary-600" />
                  <span className="font-medium">{appointment.time}</span>
                </div>
                <StatusDropdown
                  status={appointment.status}
                  onChange={(newStatus) => onStatusChange(appointment.id, newStatus)}
                />
              </div>
              <div className="space-y-2">
                <p className="text-gray-800">
                  <FiUser className="inline mr-2" />
                  {getClientName(appointment.clientId)}
                </p>
                <p className="text-gray-600 text-sm">
                  {getServiceName(appointment.serviceId)}
                </p>
                {appointment.notes && (
                  <p className="text-sm text-gray-500 italic">
                    "{appointment.notes}"
                  </p>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            Nenhum agendamento para esta data
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;