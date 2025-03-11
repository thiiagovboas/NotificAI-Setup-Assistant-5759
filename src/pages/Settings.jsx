import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiGlobe, FiClock, FiBell, FiSliders } from 'react-icons/fi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Toast from '../components/Toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    businessHours: {
      openTime: '08:00',
      closeTime: '18:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      workDays: ['1', '2', '3', '4', '5']
    },
    notifications: {
      enableSMS: true,
      enableEmail: true,
      enableWhatsApp: true,
      reminderTime: '24', // hours before appointment
      cancelationDeadline: '2' // hours before appointment
    },
    general: {
      timeSlotDuration: '30',
      currency: 'BRL',
      dateFormat: 'DD/MM/YYYY',
      language: 'pt-BR'
    }
  });

  const [toast, setToast] = useState(null);

  const handleSave = (section, data) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    setToast({
      type: 'success',
      message: 'Configurações salvas com sucesso!'
    });
  };

  const weekDays = [
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Segunda' },
    { value: '2', label: 'Terça' },
    { value: '3', label: 'Quarta' },
    { value: '4', label: 'Quinta' },
    { value: '5', label: 'Sexta' },
    { value: '6', label: 'Sábado' }
  ];

  return (
    <div className="p-6">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-800">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid gap-6">
        {/* Horário de Funcionamento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiClock className="text-primary-600 w-5 h-5" />
            <h2 className="text-lg font-semibold">Horário de Funcionamento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Horário de Abertura"
              type="time"
              value={settings.businessHours.openTime}
              onChange={(e) => handleSave('businessHours', { openTime: e.target.value })}
            />
            <Input
              label="Horário de Fechamento"
              type="time"
              value={settings.businessHours.closeTime}
              onChange={(e) => handleSave('businessHours', { closeTime: e.target.value })}
            />
            <Input
              label="Início do Intervalo"
              type="time"
              value={settings.businessHours.breakStart}
              onChange={(e) => handleSave('businessHours', { breakStart: e.target.value })}
            />
            <Input
              label="Fim do Intervalo"
              type="time"
              value={settings.businessHours.breakEnd}
              onChange={(e) => handleSave('businessHours', { breakEnd: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dias de Funcionamento
            </label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map(day => (
                <label
                  key={day.value}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors
                    ${settings.businessHours.workDays.includes(day.value)
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600'}
                  `}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={settings.businessHours.workDays.includes(day.value)}
                    onChange={(e) => {
                      const newWorkDays = e.target.checked
                        ? [...settings.businessHours.workDays, day.value]
                        : settings.businessHours.workDays.filter(d => d !== day.value);
                      handleSave('businessHours', { workDays: newWorkDays });
                    }}
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notificações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiBell className="text-primary-600 w-5 h-5" />
            <h2 className="text-lg font-semibold">Notificações</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.enableSMS}
                  onChange={(e) => handleSave('notifications', { enableSMS: e.target.checked })}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <span>SMS</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.enableEmail}
                  onChange={(e) => handleSave('notifications', { enableEmail: e.target.checked })}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <span>E-mail</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.enableWhatsApp}
                  onChange={(e) => handleSave('notifications', { enableWhatsApp: e.target.checked })}
                  className="form-checkbox h-4 w-4 text-primary-600"
                />
                <span>WhatsApp</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Lembrete (horas antes)"
                type="number"
                min="1"
                value={settings.notifications.reminderTime}
                onChange={(e) => handleSave('notifications', { reminderTime: e.target.value })}
              />
              <Input
                label="Prazo de Cancelamento (horas)"
                type="number"
                min="1"
                value={settings.notifications.cancelationDeadline}
                onChange={(e) => handleSave('notifications', { cancelationDeadline: e.target.value })}
              />
            </div>
          </div>
        </motion.div>

        {/* Configurações Gerais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <FiSliders className="text-primary-600 w-5 h-5" />
            <h2 className="text-lg font-semibold">Configurações Gerais</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duração dos Horários
              </label>
              <select
                value={settings.general.timeSlotDuration}
                onChange={(e) => handleSave('general', { timeSlotDuration: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="45">45 minutos</option>
                <option value="60">1 hora</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Formato de Data
              </label>
              <select
                value={settings.general.dateFormat}
                onChange={(e) => handleSave('general', { dateFormat: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;