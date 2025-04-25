

import { useState, useEffect } from 'react';

// Filters component to handle both the consultation mode and specialties filters
export default function Filters({ filters, setFilters }) {
  
  const [consultationMode, setConsultationMode] = useState(filters.mode || '');
  const [specialties, setSpecialties] = useState(filters.specialties || []);

  useEffect(() => {
    // Update the parent component when filters change
    setFilters({ mode: consultationMode, specialties });
  }, [consultationMode, specialties, setFilters]);

  const handleConsultationModeChange = (mode) => {
    setConsultationMode(mode);
  };

  const handleSpecialtyChange = (specialty) => {
    setSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(item => item !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const clearFilters = () => {
    setConsultationMode('');
    setSpecialties([]);
  };

  return (
    <div className="h-110 w-80 bg-white border-2 rounded-2xl flex flex-col">
      <div className="h-12 rounded-t-2xl flex items-center justify-between px-5">
        <h1 className=" text-lg font-bold">Filters</h1>
        <button
          className="text-blue-600 font-semibold"
          onClick={clearFilters}
        >
          Clear all
        </button>
      </div>
      <hr />
      
      {/* Specialties Filter */}
      <div className="h-10 flex items-center">
        <h1 className="font-semibold px-4 text-blue-500">Specialities</h1>
      </div>
      <hr />
      <div className="px-2">
        <Scroll handleSpecialtyChange={handleSpecialtyChange} />
      </div>

      {/* Mode of Consultation Filter */}
      <div className="px-5">
        <h1 className="font-extrabold">Mode of consultation</h1>
        <div className="flex flex-col">
          <div className="flex items-center">
            <input
              type="radio"
              id="videoConsult"
              name="consultationMode"
              checked={consultationMode === 'Video Consult'}
              onChange={() => handleConsultationModeChange('Video Consult')}
              data-testid="filter-video-consult"
            />
            <label htmlFor="videoConsult" className="ml-2">Video Consultation</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="inClinic"
              name="consultationMode"
              checked={consultationMode === 'In Clinic'}
              onChange={() => handleConsultationModeChange('In Clinic')}
              data-testid="filter-in-clinic"
            />
            <label htmlFor="inClinic" className="ml-2">In Clinic Consultation</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="all"
              name="consultationMode"
              checked={consultationMode === ''}
              onChange={() => handleConsultationModeChange('')}
              data-testid="filter-all"
            />
            <label htmlFor="all" className="ml-2">All</label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scroll Component to display the specialties checkboxes
function Scroll({ handleSpecialtyChange }) {
  const specialties = [
    'General Physician', 'Dentist', 'Dermatologist', 'Paediatrician',
    'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 'Physiotherapist',
    'Endocrinologist', 'Orthopaedic', 'Ophthalmologist', 'Gastroenterologist', 
    'Pulmonologist', 'Psychiatrist', 'Urologist', 'Dietitian/Nutritionist',
    'Psychologist', 'Sexologist', 'Nephrologist', 'Neurologist', 'Oncologist',
    'Ayurveda', 'Homeopath'
  ];

  return (
    <div className="w-[300px] h-[200px] overflow-y-scroll border border-gray-300 p-2">
      {specialties.map((specialty, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            id={specialty}
            onChange={() => handleSpecialtyChange(specialty)}
            data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <label htmlFor={specialty} className="ml-2">{specialty}</label>
        </div>
      ))}
    </div>
  );
}

