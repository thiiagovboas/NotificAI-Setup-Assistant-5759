import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import GradientButton from '../components/GradientButton';
import Toast from '../components/Toast';
import CalendarView from '../components/CalendarView';
import AppointmentForm from '../components/AppointmentForm';
import ScheduleFilters from '../components/ScheduleFilters';
import AppointmentList from '../components/AppointmentList';
import { fakeClients, fakeServices } from '../data/fakeData';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientId: 1,
      serviceId: 1,
      time: '09:00',
      date: new Date().toISOString().split('T')[0],
      status: 'confirmado',
      notes: ''
    },
    {
      id: 2,
      clientId: 2,
      serviceId: 2,
      time: '10:00',
      date: new Date().toISOString().split('T')[0],
      status: 'pendente',
      notes: ''
    }
  ]);

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    }));
  };

  const handleAddAppointment = (appointmentData) => {
    setAppointments([...appointments, appointmentData]);
    setToast({
      type: 'success',
      message: 'Agendamento realizado com sucesso!'
    });
    setShowForm(false);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    const matchesDate = !dateFilter || appointment.date === dateFilter;
    const matchesClient = !clientFilter || appointment.clientId.toString() === clientFilter;
    const matchesService = !serviceFilter || appointment.serviceId.toString() === serviceFilter;
    return matchesStatus && matchesDate && matchesClient && matchesService;
  });

  return (
    <div className="p-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

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

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <div className="lg:col-span-5">
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            appointments={appointments}
          />
        </div>
        <div className="lg:col-span-2">
          <AppointmentList
            appointments={filteredAppointments}
            selectedDate={selectedDate}
            onStatusChange={handleStatusChange}
            clients={fakeClients}
            services={fakeServices}
          />
        </div>
      </div>

      {showForm && (
        <AppointmentForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddAppointment}
          clients={fakeClients}
          services={fakeServices}
        />
      )}
    </div>
  );
};

export default Schedule;