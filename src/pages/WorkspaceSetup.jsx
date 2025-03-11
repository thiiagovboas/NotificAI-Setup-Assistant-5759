import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const BUSINESS_SECTORS = [
  'Salão de Beleza',
  'Barbearia',
  'Clínica Médica',
  'Clínica Odontológica',
  'Estética',
  'Academia',
  'Consultório',
  'Outro'
];

const WorkspaceSetup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    businessSector: '',
    address: '',
    whatsapp: '',
    openingHours: '',
    closingHours: ''
  });

  const navigate = useNavigate();
  const { completeConfiguration } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    completeConfiguration();
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex">
      {/* Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-700 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">NotificAI</h1>
          <p className="text-primary-100 text-lg">
            Configure seu ambiente de trabalho
          </p>
        </div>
        <div className="text-white/80">
          <h2 className="text-2xl font-semibold mb-4">
            Quase lá!
          </h2>
          <p className="text-lg">
            Configure suas informações para começar a usar o sistema.
          </p>
        </div>
      </div>

      {/* Setup Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-800">Configuração Inicial</h2>
            <p className="text-gray-600 mt-2">Configure os detalhes do seu negócio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome da Empresa"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Digite o nome da sua empresa"
              required
            />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Setor de Atuação
              </label>
              <select
                name="businessSector"
                value={formData.businessSector}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o setor</option>
                {BUSINESS_SECTORS.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Digite o endereço completo"
                required
              />
            </div>

            <Input
              label="WhatsApp"
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Horário de Abertura"
                name="openingHours"
                type="time"
                value={formData.openingHours}
                onChange={handleChange}
                required
              />
              <Input
                label="Horário de Fechamento"
                name="closingHours"
                type="time"
                value={formData.closingHours}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit">
              Concluir Configuração
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkspaceSetup;