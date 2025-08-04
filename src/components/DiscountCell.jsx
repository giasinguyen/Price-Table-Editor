import React from 'react';
import { Edit2, Save, X } from 'lucide-react';

const DiscountCell = ({ 
  productId, 
  value, 
  editingCell, 
  editValue, 
  setEditValue, 
  startEdit, 
  saveEdit, 
  cancelEdit 
}) => {
  const cellKey = `${productId}-discount`;
  const isEditing = editingCell === cellKey;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 p-2 border rounded text-sm resize-none"
          rows={4}
          autoFocus
        />
        <div className="flex flex-col gap-1">
          <button
            onClick={() => saveEdit(productId, 'discount')}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Save size={16} />
          </button>
          <button
            onClick={cancelEdit}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Format hiển thị chiết khấu đẹp hơn
  const formatDiscountText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Phát hiện và highlight phần trăm
      const percentMatch = line.match(/(\d+%)/);
      if (percentMatch && index === 0) {
        return (
          <div key={index} className="font-bold text-purple-700 text-lg mb-1">
            {line}
          </div>
        );
      }
      return (
        <div key={index} className="text-purple-600 text-xs leading-relaxed">
          {line}
        </div>
      );
    });
  };

  return (
    <div
      className="group cursor-pointer p-3 rounded hover:bg-gray-50 relative min-h-[100px] flex flex-col justify-center"
      onClick={() => startEdit(productId, 'discount', value)}
    >
      <div className="text-center space-y-1">
        {formatDiscountText(value)}
      </div>
      <Edit2 
        size={14} 
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-50 text-gray-500"
      />
    </div>
  );
};

export default DiscountCell;
