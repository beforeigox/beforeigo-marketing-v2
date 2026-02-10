import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/checkout');
  }, [navigate]);

  return null;
};

export default Pricing;
