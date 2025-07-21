import React from 'react';
import { useNavigate } from 'react-router-dom';
import TrailTestA from '../../src/components/core/Tests/TrailMakingTest';
import TrailTestB from '../../src/components/core/Tests/TrailMakingTestB'; 

const TrailTestSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-white">
          Select a Trail Test
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => navigate('/test-a')}
            className="cursor-pointer rounded-2xl shadow-md bg-white p-2 hover:shadow-xl transition duration-300"
          >
            <TrailTestA />
          </div>

          <div
            onClick={() => navigate('/test-b')}
            className="cursor-pointer rounded-2xl shadow-md bg-white p-2 hover:shadow-xl transition duration-300"
          >
            <TrailTestB />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailTestSelectionPage;
