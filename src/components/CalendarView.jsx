import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CalendarView = ({ 
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  appointments
}) => {
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    // Add padding for start of month
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(selectedDate);
  
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              aspect-square rounded-lg flex flex-col items-center justify-center
              cursor-pointer transition-colors relative
              ${!day ? 'text-gray-300' : ''}
              ${day && day.toDateString() === selectedDate.toDateString()
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'hover:bg-gray-50'}
            `}
            onClick={() => day && onDateSelect(day)}
          >
            {day && (
              <>
                <span>{day.getDate()}</span>
                {getAppointmentsForDate(day).length > 0 && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;