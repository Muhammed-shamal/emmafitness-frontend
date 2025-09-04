import React from "react";

export default function Sale() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden">
          {/* Image Section */}
          <div className="md:w-1/2 h-72 md:h-auto bg-cover bg-center" 
               style={{ backgroundImage: "url('/gallery/banner2.jpg')" }}>
          </div>
          
          {/* Content Section */}
          <div className="md:w-1/2 flex items-center p-8">
            <div className="w-full">
              <span className="text-red-600 text-sm font-medium uppercase tracking-wider">
                Limited Time Offer
              </span>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-5">
                Weekly Sale - <span className="text-red-600">60% OFF</span> Everything
              </h2>
              
              {/* Countdown Timer */}
              <div className="flex space-x-3 mb-6">
                {['Days', 'Hours', 'Minutes'].map((unit) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="bg-gray-100 text-gray-800 text-lg font-semibold py-2 px-3 rounded-md">02</div>
                    <span className="text-xs text-gray-500 mt-1">{unit}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition duration-300">
                Shop the Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}