import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Input } from './Input';
import { Button } from './Button';
import { generateTimeSlots } from '../data/scheduleData';

const AppointmentForm = ({ onClose, onSubmit, clients, services }) => {
  const [appointment, setAppointment] = useState({
    clientId: '',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  const timeSlots = generateTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...appointment,
      id: Date.now(),
      status: 'pendente'
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-xl font-semibold text-primary-800 mb-6">
          Novo Agendamento
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Cliente
            </label>
            <select
              value={appointment.clientId}
              onChange={(e) => setAppointment({ ...appointment, clientId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Selecione o cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Serviço
            </label>
            <select
              value={appointment.serviceId}
              onChange={(e) => setAppointment({ ...appointment, serviceId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Selecione o serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nome} - {service.duracao}min - R${service.preco}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              type="date"
              value={appointment.date}
              onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Horário
              </label>
              <select
                value={appointment.time}
                onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Selecione o horário</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Observações
            </label>
            <textarea
              value={appointment.notes}
              onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Adicione observações importantes..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              Confirmar Agendamento
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AppointmentForm;