import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getSerachProperty } from '../../Action/postAction';
import './Search.css'
import { useNavigate } from 'react-router-dom';
export default function Search({
  query, typeOfProperty, onQueryChange
}) {
  const dispatch = useDispatch()
  const [localQuery, setLocalQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
   const navigate  =useNavigate()
  // serach property 
  const { data: serachResponse } = useSelector((state) => {
    return state.serachResponse;
  });

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Clean the 'typeOfProperty' to ensure it's a valid string
      let propertyAdType = typeOfProperty;
      console.log(propertyAdType,)
      // If 'typeOfProperty' contains extra quotes (like ""Sale""), fix it
      // if (typeOfProperty.startsWith('"') && typeOfProperty.endsWith('"')) {
      //   propertyAdType = typeOfProperty.slice(1, -1); // Remove the extra double quotes
      // }

      console.log('Property Ad Type:', propertyAdType);  // Log the cleaned value

      // Dispatch your action
      dispatch(getSerachProperty(query, propertyAdType));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query) => {
      fetchSuggestions(query);
    }, 500),
    [] // Empty array means this debounced function will not change unless dependencies do
  );

  // Handle input change
  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    onQueryChange(e.target.value);  // Update query in Component A
    debouncedFetchSuggestions(e.target.value);  // Call the debounced function to fetch suggestions
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);  // Update localQuery to the clicked suggestion
    onQueryChange(suggestion);  // Update the query in Component A
    // Trigger search based on the suggestion
    fetchSuggestions(suggestion);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if(!localQuery.trim()){

      alert("please enter the value !");
      return;
    }
    if (localQuery.trim()) {
      // If there's a query, fetch results based on the query
      fetchSuggestions(localQuery);

    }
    navigate(
      `/home/card?ProjectName=${query}&&PropertyAddType=${typeOfProperty}`
       );


       
  };

  // Clear suggestions if query is empty
  useEffect(() => {
    if (!localQuery.trim()) {
      setSuggestions([]);
    }
  }, [localQuery]);

  useEffect(() => {
    if (serachResponse?.results) {
      setSuggestions(serachResponse.results.map(post => {
        const { LocationDetails } = post;
        return `${LocationDetails.ProjectName}, ${LocationDetails.Locality}, ${LocationDetails.City}`;
      }));
    }
  }, [serachResponse])


  //  naigate second page 

  // navigate(
  //   `/home/card?ProjectName=${ProjectNameObjectData.ProjectName.trim()}&&PropertyAddType=${SearchPropertyAddType}`
  // );
  return (
    <div className="search-box-container">

<div className='search-section-box dropdown'>
      {/* <div className="input-group mb-3">
        <button
          className="btn  dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ padding: '4px 8px', fontSize: '12px' }}
        >
          Dropdown
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="" >
              Action
            </a>
          </li>
          <li>
            <a className="">
              Another action
            </a>
          </li>
        
        
        
        </ul>
        <input
        style={{width:"500px"}}
        className='py-2 border-0 rounded-end'
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search for properties..."
        />
      </div> */}


    <input
        
        className='hero-search-button'
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search for properties..."
        />  {isLoading &&
        <div className='apartmentname-container'>

<p  >Loading...</p>
        </div> }

        {/* Display suggestions */}
        
        {suggestions.length > 0 && (
          <div className='apartmentname-container'>
            {suggestions.map((suggestion, index) => (
              <p key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        )}
  
        {suggestions.length === 0 && !isLoading && localQuery && (
           <div className='apartmentname-container'>

           <p  >No response found</p>
                   </div>
        )}
<div className=' '>
<button 
  className='search-button-mob' 
  onClick={handleSearchClick} 
  
>   <img
          src="/img/Search-icon.svg"
          alt=""
          className="img-searchbar"
        />
  Search
</button>
</div>


      </div >
    
    </div>
  );
}

//         <div ref={sectionRef} className="search-container">
//   <div className="search-main-box-section">

//       <div className="search-options">
//     {SearchTab.map((e, i) => {
//       return (
//         <div
//           key={i}
//           className={`search-tab ${e == typeOfProperty ? "active" : ""
//             }
//         `}
//           onClick={() => {
//             // if (e == PropertyAddType) {
//             // setPropertyAddType("");
//             // } else {
//               handlePropertyAddTypeChange(e);
//             console.log(e)
//             // }
//           }}
//         >
//           {e == "Sale" ? "Buy" : e}
//         </div>
//       );
//     })}
//   </div>


//  {/* Pass query and propertyAddType to Search (Component B) */}
//  <div className="search-box">
//  <img
//       src={`data:image/svg+xml;utf8,${encodeURIComponent(`
//       <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
//       <g clip-path="url(#clip0_2281_10206)">
//         <path d="M12.9051 9.30371L12.8965 9.32639L12.904 9.30569L12.9051 9.30371Z" fill="#0078D4"/>
//         <path d="M9.49997 0.5C6.53393 0.5 4.09961 2.9264 4.09961 5.88596C4.09961 7.03292 4.46681 8.10176 5.08601 8.97728L5.06387 8.94272L8.52095 14.9184L8.53841 14.9412C8.67773 15.123 8.81561 15.2695 8.98247 15.3799C9.14933 15.4902 9.36299 15.5599 9.57287 15.5388C9.99227 15.4967 10.236 15.2069 10.4612 14.9016L10.4752 14.8827L14.2865 8.3966L14.2896 8.3912C14.3808 8.2265 14.4469 8.06036 14.5034 7.89944C14.7647 7.26029 14.8993 6.57645 14.8996 5.88596C14.8996 2.9264 12.466 0.5 9.49997 0.5ZM9.49997 1.4C11.9757 1.4 13.9996 3.41924 13.9996 5.88596C13.9995 6.46209 13.887 7.03268 13.6684 7.56572L13.6639 7.57688L13.6599 7.58858C13.6126 7.72484 13.5611 7.8485 13.5017 7.95578L9.72911 14.3757C9.56225 14.5954 9.44561 14.6475 9.48305 14.6435C9.50231 14.6417 9.52013 14.6568 9.47891 14.6295C9.43949 14.6034 9.35903 14.5269 9.26363 14.4052L5.83301 8.474L5.82095 8.45726C5.30381 7.72646 4.99961 6.8414 4.99961 5.88596C4.99961 3.41942 7.02425 1.4 9.49997 1.4ZM9.49997 2.813C7.79681 2.813 6.41927 4.18568 6.41927 5.88596C6.41927 7.58624 7.79699 8.95892 9.49997 8.95892C11.2029 8.95892 12.5799 7.58606 12.5799 5.88596C12.5799 4.18586 11.2029 2.813 9.49997 2.813ZM9.49997 3.713C10.727 3.713 11.6799 4.6643 11.6799 5.88596C11.6799 7.10762 10.7272 8.05892 9.49997 8.05892C8.27273 8.05892 7.31927 7.10744 7.31927 5.88596C7.31927 4.6643 8.27291 3.713 9.49997 3.713Z" fill="#0078D4"/>
//         <path d="M6.62186 12.9307C4.07918 13.2899 2.30078 14.1494 2.30078 15.4147C2.30078 17.1189 5.27222 18.5004 9.50078 18.5004C13.7293 18.5004 16.7008 17.1189 16.7008 15.4147C16.7008 14.1494 14.9226 13.2899 12.3801 12.9307L12.0278 13.5304C13.9441 13.7963 15.2608 14.355 15.2608 15.0034C15.2608 15.9124 12.6819 16.6491 9.50078 16.6491C6.31964 16.6491 3.74078 15.9124 3.74078 15.0034C3.7406 14.3572 5.04866 13.799 6.97088 13.532L6.62186 12.9307Z" fill="#0078D4"/>
//       </g>
//       <defs>
//         <clipPath id="clip0_2281_10206">
//           <rect width="18" height="18" fill="white" transform="translate(0.5 0.5)"/>
//         </clipPath>
//       </defs>
//     </svg>
//       `)}`}
//       alt="test"
//     />
//        <select>
//       <option value="Gurgaon">Gurgaon</option>
//       {/* <option value="Noida">Noida</option>
//     <option value="Delhi">Delhi</option> */}
//     </select>
//       <div className="search-section-box">
//       <Search
//         query={query}
//         typeOfProperty={typeOfProperty} // This is the selected property type
//         onQueryChange={handleQueryChange}  // If you want to update the query in A
//       />
//       </div>
//       </div>
      
//           </div>

//           </div>
     