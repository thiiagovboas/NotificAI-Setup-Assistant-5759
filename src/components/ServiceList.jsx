import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiEdit2, FiTrash2 } from 'react-icons/fi';

const ServiceList = ({ services, onDelete, onEdit }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-bold text-primary-800 mb-6">Services</h3>
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-primary-700">{service.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center text-sm text-gray-600">
                    <FiClock className="mr-1" />
                    {service.duration} min
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <FiDollarSign className="mr-1" />
                    R$ {service.price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(service)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(service)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {services.length === 0 && (
          <p className="text-center text-gray-500">No services added yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceList;