export default function SortBy({ setSort }) {
    const handleSortChange = (value) => {
      setSort(value);
    };
  
    return (
      <div className="h-50 w-90 bg-white rounded-2xl px-10 py-5">
        <div className="h-10 flex items-center">
          <h1 className="text-lg font-bold text-blue-600">Sort By</h1>
        </div>
        <div className="">
          <div className="flex items-center">
            <input
              type="radio"
              name="sort"
              id="sort-fees"
              onChange={() => handleSortChange('fees')}
            />
            <label htmlFor="sort-fees" className="ml-2">Price: low - high</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="sort"
              id="sort-experience"
              onChange={() => handleSortChange('experience')}
            />
            <label htmlFor="sort-experience" className="ml-2">Experience: Most experience First</label>
          </div>
        </div>
      </div>
    );
  }
  

// export default function SortBy(){
//     return (
//         <div className="h-50 w-90 bg-white rounded-2xl px-10 py-5">
//             <div className="h-10 flex  items-center">
//                 <h1 className="text-lg font-bold text-blue-600">Sort By</h1>
//             </div>
//             <div className="">
//                 <div className="">

//                 <input type="radio" name="" id="" />
//                 <label htmlFor=""> Price: low -high</label>
//                 </div>
//                 <div className="">
//                 <input type="radio" name="" id="" />
//                 <label htmlFor=""> Experiece: Most experience First</label>
//                 </div>
//             </div>
//         </div>
//     )
// }