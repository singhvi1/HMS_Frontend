import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const PageLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="text-3xl font-semibold">
        Loading...
        <span className="text-gray-500 text-lg block mt-2">
          (Redirecting to Home in 3 seconds...)
        </span>
      </div>
      <Button variant='success' className='p-4' onClick={() => navigate('/')}>
        Go Home Now
      </Button>
    </div>
  );
};

export default PageLoader;