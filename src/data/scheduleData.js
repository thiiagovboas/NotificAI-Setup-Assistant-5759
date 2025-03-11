export const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 8 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});

export const appointmentStatuses = {
  pendente: {
    label: 'Pendente',
    color: 'yellow'
  },
  confirmado: {
    label: 'Confirmado',
    color: 'green'
  },
  concluido: {
    label: 'Concluído',
    color: 'blue'
  },
  cancelado: {
    label: 'Cancelado',
    color: 'red'
  }
};

export const generateTimeSlots = (openTime = '08:00', closeTime = '20:00', interval = 30) => {
  const slots = [];
  const start = new Date(`2024-01-01 ${openTime}`);
  const end = new Date(`2024-01-01 ${closeTime}`);
  
  while (start < end) {
    slots.push(start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    start.setMinutes(start.getMinutes() + interval);
  }
  
  return slots;
};