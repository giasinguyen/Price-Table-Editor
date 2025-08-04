// LocalStorage utilities for saving and loading data
const STORAGE_KEY = 'priceListEditor_products';

export const saveToLocalStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
    return false;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
    return null;
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu:', error);
    return false;
  }
};
