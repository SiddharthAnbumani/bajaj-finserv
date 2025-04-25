import { useEffect, useState } from 'react';
import axios from 'axios';
import Filters from './components/Filters';
import Profile from './components/Profile';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({ specialties: [], mode: '' });
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => {
      setData(res.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const matches = data.filter(doc => doc.name.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(matches.slice(0, 3));
  };

  const applyFilters = () => {
    let filtered = [...data];


    if (search) {
      filtered = filtered.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()));
    }


    if (filters.mode) {
      filtered = filtered.filter(doc => doc.mode === filters.mode);
    }


    if (filters.specialties && filters.specialties.length > 0) {
      filtered = filtered.filter(doc =>
        filters.specialties.some(specialty =>
          doc.specialties?.map(s => s.name).includes(specialty)
        )
      );
    }


    if (sort === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sort === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    return filtered;
  };

  const handleSuggestionClick = (name) => {
    setSearch(name);
    setSuggestions([]);
  };

  const filteredData = applyFilters();

  return (
    <div className="h-screen w-screen bg-gray-100">
      {/* Search Bar */}
      <div className="bg-blue-900 p-4 w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          data-testid="autocomplete-input"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics..."
          className="w-full p-2 rounded bg-white placeholder:px-10 placeholder:font-semibold"
        />
        {suggestions.length > 0 && (
          <ul className="bg-white rounded shadow">
            {suggestions.map((s, index) => (
              <li
                key={index}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(s.name)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="flex flex-col md:flex-row lg:flex-row  justify-center">
        <div className="m-10">
        <div className="">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-1/4 ">
          <div className="mt-4 bg-white  w-80 py-2 px-4 border-2 rounded-3xl" data-testid="filter-header-sort">
            <h1 className="font-bold mb-2">Sort By</h1>
            <label>
              <input
                type="radio"
                name="sort"
                value="fees"
                onChange={() => setSort('fees')}
                data-testid="sort-fees"
              />
              <span className="ml-2">Fees (Low to High)</span>
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="sort"
                value="experience"
                onChange={() => setSort('experience')}
                data-testid="sort-experience"
              />
              <span className="ml-2">Experience (High to Low)</span>
            </label>
          </div>
        </div>
        </div>

        {/* Doctor Profiles List */}
        <div className="w-3/4 p-4 space-y-4 ml-6 md:ml-40">
          {filteredData.map((doc, i) => (
            <Profile key={i} doctor={doc} />
          ))}
        </div>

      </div>
    </div>
  );
}
