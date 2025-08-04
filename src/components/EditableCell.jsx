import React from 'react';
import { Edit2, Save, X } from 'lucide-react';

const EditableCell = ({ 
  productId, 
  field, 
  value, 
  multiline = false, 
  editingCell, 
  editValue, 
  setEditValue, 
  startEdit, 
  saveEdit, 
  cancelEdit 
}) => {
  const cellKey = `${productId}-${field}`;
  const isEditing = editingCell === cellKey;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 p-2 border rounded text-sm resize-none"
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 p-2 border rounded text-sm"
            autoFocus
          />
        )}
        <button
          onClick={() => saveEdit(productId, field)}
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
    );
  }

  return (
    <div
      className="group cursor-pointer p-2 rounded hover:bg-gray-50 relative"
      onClick={() => startEdit(productId, field, value)}
    >
      {multiline ? (
        <div className="whitespace-pre-line text-sm text-center">
          {value}
        </div>
      ) : (
        <div className={`text-center font-medium ${
          field === 'discount' ? 'text-purple-700' : 'text-green-700'
        }`}>
          {value}
        </div>
      )}
      <Edit2 
        size={14} 
        className="absolute top-1 right-1 opacity-0 group-hover:opacity-50 text-gray-500"
      />
    </div>
  );
};

export default EditableCell;
