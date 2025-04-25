export default function Profile({ doctor }) {
    // Destructuring data from the doctor object with default values
    const {
      name,
      specialties,
      qualification,
      age,
      hospital_name,
      location,
      fees,
      experience,
      photo,
      languages,
      in_clinic,
      video_consult
    } = doctor;
  
    // Helper function to handle empty or undefined values and return empty string instead of 'N/A'
    const displayValue = (value) => (value ? value : '');
  
    return (
      <div className="my-10" data-testid="doctor-card">
        <div className="h-80 w-200 bg-white flex px-10 py-10 rounded-2xl shadow">
          {/* Left section: Doctor's Info */}
          <div className="w-6/12 h-full">
            <div className="flex items-center space-x-4">
              <img
                src={photo || '/profile.avif'} // Use the doctor's photo or fallback to a default
                alt="Doctor"
                className="h-40 rounded-full"
                data-testid="doctor-image"
              />
              <div className="flex flex-col">
                <h1 className="font-extrabold text-xl" data-testid="doctor-name">
                  {displayValue(name)}
                </h1>
                <h2
                  className="font-semibold text-lg"
                  data-testid="doctor-specialty"
                >
                  {specialties && specialties.length > 0
                    ? specialties.map(specialty => specialty.name).join(', ') // Extract names of specialties
                    : ''}
                </h2>
                <h3 className="font-semibold text-lg">
                  {displayValue(qualification)}
                </h3>
                {/* <p className="font-semibold text-sm">
                  Age: {displayValue(age)}
                </p> */}
              </div>
            </div>
            <div className="mx-10 mt-3">
              <p>{displayValue(hospital_name)}</p>
              <p>{displayValue(location)}</p>
              <div className="mt-2">
                <p className="font-bold">
                  Languages: {languages && languages.length > 0 ? languages.join(', ') : ''}
                </p>
              </div>
              <div className="mt-2 text-green-600">
                <p>
                  {in_clinic ? 'In Clinic Consultation Available' : ''}
                </p>
                <p>
                  {video_consult ? 'Video Consultation Available' : ''}
                </p>
              </div>
            </div>
          </div>
  
          {/* Right section: Fees, Appointment, and Experience */}
          <div className="w-6/12 h-full flex flex-col">
            <div
              className="w-full h-full flex justify-end items-end text-2xl font-extrabold px-5"
              data-testid="doctor-fee"
            >
              {displayValue(fees)}
            </div>
            <div className="w-full h-full flex justify-end items-center px-5">
              <button className="bg-white border-2 border-blue-600 px-6 py-2 text-blue-600 font-bold rounded-lg hover:scale-110 duration-150 transition-all">
                Book Appointment
              </button>
            </div>
            <div
              className="w-full h-full flex justify-end items-end text-sm px-5 pt-2 text-gray-500"
              data-testid="doctor-experience"
            >
              {displayValue(experience)} years experience
            </div>
          </div>
        </div>
      </div>
    );
  }
  