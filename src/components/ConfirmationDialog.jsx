import { FiAlertTriangle } from 'react-icons/fi'; 

const ConfirmationDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all scale-100 opacity-100">
        <div className="flex flex-col items-center mb-6">
          <FiAlertTriangle className="text-red-500 text-5xl mb-3 animate-pulse-once" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
            {message}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md 
                       hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md 
                       hover:bg-red-700 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;