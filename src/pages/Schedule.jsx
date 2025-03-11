// Update the Schedule page to include filters and status dropdown
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import GradientButton from '../components/GradientButton';
import Toast from '../components/Toast';
import CalendarView from '../components/CalendarView';
import AppointmentForm from '../components/AppointmentForm';
import ScheduleFilters from '../components/ScheduleFilters';
import { fakeClients, fakeServices } from '../data/fakeData';

const Schedule = () => {
  // ... (previous state)
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  // Filter appointments based on all criteria
  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    const matchesClient = !clientFilter || appointment.clientId.toString() === clientFilter;
    const matchesService = !serviceFilter || appointment.serviceId.toString() === serviceFilter;

    return matchesStatus && matchesDate && matchesClient && matchesService;
  });

  return (
    <div className="p-6">
      {/* ... (previous toast) */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary-800">Agenda</h1>
          <p className="text-gray-600">Gerencie seus agendamentos</p>
        </div>
        <GradientButton onClick={() => setShowForm(true)}>
          <FiPlus className="w-4 h-4" />
          Novo Agendamento
        </GradientButton>
      </div>

      <ScheduleFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
        clientFilter={clientFilter}
        onClientFilterChange={setClientFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        clients={fakeClients}
        services={fakeServices}
      />

      {/* ... (rest of the calendar and appointments view) */}
    </div>
  );
};

export default Schedule;