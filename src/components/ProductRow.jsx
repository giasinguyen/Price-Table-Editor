import React from 'react';
import { Trash2 } from 'lucide-react';
import EditableCell from './EditableCell';
import ImageCell from './ImageCell';
import DiscountCell from './DiscountCell';

const ProductRow = ({ 
  product, 
  index, 
  editingCell, 
  editValue, 
  setEditValue, 
  startEdit, 
  saveEdit, 
  cancelEdit, 
  fileInputRefs, 
  handleImageUpload, 
  triggerImageUpload, 
  removeImage, 
  deleteProduct 
}) => {
  return (
    <div 
      className={`grid grid-cols-[2fr_4fr_1.5fr_2fr_1.2fr_1fr_0.8fr_0.8fr] border-b border-gray-200 transition-all hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
    >
      <div className="p-4 border-r border-gray-200">
        <EditableCell
          productId={product.id}
          field="name"
          value={product.name}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
      
      <ImageCell
        product={product}
        fileInputRefs={fileInputRefs}
        handleImageUpload={handleImageUpload}
        triggerImageUpload={triggerImageUpload}
        removeImage={removeImage}
      />
      
      <div className="p-4 border-r border-gray-200">
        <EditableCell
          productId={product.id}
          field="specification"
          value={product.specification}
          multiline={true}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
      
      <div className="p-4 border-r border-gray-200">
        <EditableCell
          productId={product.id}
          field="shopPrice"
          value={product.shopPrice}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>
      
      <div className="p-4 border-r border-gray-200">
        <div className="text-center">
          <EditableCell
            productId={product.id}
            field="retailPrice"
            value={product.retailPrice}
            editingCell={editingCell}
            editValue={editValue}
            setEditValue={setEditValue}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        </div>
      </div>

      <div className="p-4 border-r border-gray-200">
        <DiscountCell
          productId={product.id}
          value={product.discount}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />
      </div>

      <div className="p-4 flex justify-center">
        <button
          onClick={() => deleteProduct(product.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110"
          title="Xóa sản phẩm"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
