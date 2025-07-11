
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AutocompleteFoodForm from '@/components/AutocompleteFoodForm';

const CreateFoodItem = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <AutocompleteFoodForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreateFoodItem;
