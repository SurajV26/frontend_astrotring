// src/components/GlobalRechargeModal.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeRechargeModal } from '@/redux/slice/uiSlice';
import RechargePackList from './RechargePackList';
import { X } from 'lucide-react';

const GlobalRechargeModal = () => {
  const dispatch = useDispatch();
  const { rechargeModalOpen } = useSelector((state) => state.ui);

  if (!rechargeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <button
          onClick={() => dispatch(closeRechargeModal())}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
        <RechargePackList />
      </div>
    </div>
  );
};

export default GlobalRechargeModal;