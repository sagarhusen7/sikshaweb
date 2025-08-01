export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✖</button>
        {children}
      </div>
    </div>
  );
}
