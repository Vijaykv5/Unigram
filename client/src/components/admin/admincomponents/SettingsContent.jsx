import React from 'react'


const SettingsContent = () => {
  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <p>User settings will be displayed here</p>
      </div>
      <div>
        <button className="bg-red-500 mt-20 hover:bg-red-450 text-white font-bold py-2 px-4 rounded">
          DELETE UNIGRAM
        </button>
      </div>
    </div>
  );
};

export default SettingsContent