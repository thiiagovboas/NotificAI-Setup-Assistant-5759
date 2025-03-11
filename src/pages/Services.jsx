import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiPlus } from 'react-icons/fi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Toast from '../components/Toast';
import FilterBar from '../components/FilterBar';
import GradientButton from '../components/GradientButton';
import ServiceDetailModal from '../components/ServiceDetailModal';
import { fakeServices } from '../data/fakeData';

const Services = () => {
  const [services, setServices] = useState(fakeServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredServices = services
    .filter(service =>
      service.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compare = a.nome.localeCompare(b.nome);
      return sortOrder === 'asc' ? compare : -compare;
    });

  const handleDelete = (serviceId) => {
    setServices(services.filter(service => service.id !== serviceId));
    setToast({
      type: 'warning',
      message: 'Serviço removido com sucesso!'
    });
  };

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
          <h1 className="text-2xl font-bold text-primary-800">Serviços</h1>
          <p className="text-gray-600">Gerencie seus serviços</p>
        </div>
        <GradientButton onClick={() => setShowForm(true)}>
          <FiPlus className="w-4 h-4" />
          Novo Serviço
        </GradientButton>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        sortOrder={sortOrder}
        onSortChange={(e) => setSortOrder(e.target.value)}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedService(service)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-primary-800">{service.nome}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.descricao}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <span className="flex items-center text-sm text-gray-600">
                <FiClock className="mr-1" />
                {service.duracao} min
              </span>
              <span className="flex items-center text-sm text-gray-600">
                <FiDollarSign className="mr-1" />
                R$ {parseFloat(service.preco).toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onEdit={() => {
            // Handle edit functionality
            setSelectedService(null);
          }}
          onDelete={() => {
            handleDelete(selectedService.id);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};

export default Services;