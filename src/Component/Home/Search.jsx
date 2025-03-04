import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch,useSelector } from 'react-redux';
import { getSerachProperty } from '../../Action/postAction';
export default function Search({
  query, typeOfProperty, onQueryChange
}) {
  const dispatch=useDispatch()
  const [localQuery, setLocalQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // serach property 
  const { data:serachResponse } = useSelector((state) => {
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
    if (localQuery.trim()) {
      // If there's a query, fetch results based on the query
      fetchSuggestions(localQuery);
    }
  };

  // Clear suggestions if query is empty
  useEffect(() => {
    if (!localQuery.trim()) {
      setSuggestions([]);
    }
  }, [localQuery]);

  useEffect(()=>{
          if (serachResponse?.results) {
        setSuggestions(serachResponse.results.map(post => {
          const { LocationDetails } = post;
          return `${LocationDetails.ProjectName}, ${LocationDetails.Locality}, ${LocationDetails.City}`;
        }));
      }
  },[serachResponse])

  return (
    <div className="search-container p-5">
      <h1>Property Search</h1>

      {/* Search Box */}
      <input
        type="text"
        value={localQuery}
        onChange={handleInputChange}
        placeholder="Search for properties..."
      />

      {/* Search Button */}
      <button onClick={handleSearchClick}>Search</button>

      {isLoading && <p>Loading...</p>}

      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {suggestions.length === 0 && !isLoading && localQuery && (
        <p>No suggestions found</p>
      )}
    </div>
  );
}
