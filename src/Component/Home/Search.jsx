import React, { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getSerachProperty } from '../../Action/postAction';
import './Search.css'
import { useNavigate } from 'react-router-dom';

export default function Search({
  typeOfProperty
}) {
  console.log("thi ",typeOfProperty)
  const dispatch = useDispatch()
  const [localQuery, setLocalQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  // New state for highlighting and keyboard navigation
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [keydown, setkeydown] = useState(false);
  const listRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [hight, sethight] = useState(0);

  // serach property 
  const { data: serachResponse, loading: searchLoading } = useSelector((state) => {
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

      // console.log(propertyAdType);

        // Log the cleaned value

      // Dispatch your action
      const b = {PropertyAdType:typeOfProperty, Furnishing:"",BHK:"",ApartmentType:""};
      dispatch(getSerachProperty(query,{},b));
      // Don't set isLoading to false here - will be handled by useEffect
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setIsLoading(false);
    }
  };

  // Update loading state based on Redux state
  useEffect(() => {
    if (searchLoading === false) {
      setIsLoading(false);
    }
  }, [searchLoading]);

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce((query) => {
      // console.log("bouunncedddd")
      fetchSuggestions(query);
    }, 300),
    [] // Empty array means this debounced function will not change unless dependencies do
  );

  // Handle input change
  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
   // Update query in Component A
    debouncedFetchSuggestions(e.target.value);  // Call the debounced function to fetch suggestions
    setHighlightedIndex(0); // Reset highlight index when input changes
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setLocalQuery(suggestion);  // Update localQuery to the clicked suggestion

    // Trigger search based on the suggestion
    // fetchSuggestions(suggestion);
    dispatch({type:"GetSerachPropertyClear"})
    setSuggestions(()=>{
      return [];
    }); // Clear suggestions after selection
  };

  // Handle search button click
  const handleSearchClick = () => {
    if(!localQuery.trim()){
      alert("please enter the value !");
      return;
    }
  
    // navigate(
    //   `/home/card?ProjectName=${localQuery}&&PropertyAddType=${typeOfProperty}`
    // );
    navigate(
      `/home/card?ProjectName=${localQuery?.toLowerCase()
        .replaceAll(" ", "-")
          .replaceAll(",", "")
         .replaceAll("/", "-")}&&PropertyAddType=${typeOfProperty}`
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    setkeydown(true);
    if (suggestions.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent the cursor from moving in input
        if (highlightedIndex < suggestions.length - 1) {
          const newIndex = highlightedIndex + 1;
          setHighlightedIndex(newIndex);
          scrollToItem(newIndex);
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent the cursor from moving in input
        if (highlightedIndex > 0) {
          const newIndex = highlightedIndex - 1;
          setHighlightedIndex(newIndex);
          scrollToItem(newIndex);
        }
      } else if (event.key === "Enter") {
       
        if (suggestions.length > 0) {
          handleSuggestionClick(suggestions[highlightedIndex]);
          setHighlightedIndex(0);
          setSuggestions(()=>{
            return []
          }); 
        }
      } else if (event.key === "Escape") {
        setSuggestions([]); // Reset suggestions on Escape
        setHighlightedIndex(0);
      }
    }
  };

  // Scroll to the highlighted item
  const scrollToItem = (index) => {
    if (listRef.current) {
      listRef.current.scrollTop = index * hight;
    }
  };

  // Click outside handler to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef?.current) {
        const hideElement = searchBoxRef.current.querySelector(
          ".apartmentname-container"
        );

        if (hideElement) {
          let element = searchBoxRef.current.contains(e.target);
          if (element === false) {
            setHighlightedIndex(0);
            setSuggestions([]);
          }
        }
      }
    };

    if (searchBoxRef?.current && suggestions.length > 0) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [suggestions, searchBoxRef]);

  // Calculate item height for scroll functionality
  useEffect(() => {
    if (suggestions.length > 0) {
      if (listRef.current) {
        listRef.current.tabIndex = 0;
        let child = listRef.current.firstChild;
        if (child) {
          const style = window.getComputedStyle(child);
          let marginTop = parseFloat(style.marginTop);
          let marginBottom = parseFloat(style.marginBottom);
          let hight = child.offsetHeight;
          let totalhight = marginTop + marginBottom + hight;
          sethight(totalhight);
        }
      }
    }
  }, [suggestions, listRef]);

  // Clear suggestions if query is empty
  useEffect(() => {
    if (!localQuery.trim()) {
      setSuggestions([]);
    }
  }, [localQuery]);

  useEffect(() => {
    if (serachResponse?.results) {
      const formattedResults = serachResponse.results.map(post => {
        const { LocationDetails } = post;
        return `${LocationDetails.ProjectName}, ${LocationDetails.Locality}, ${LocationDetails.City}`;
      });
  
      // Create a Set to remove duplicates, then convert it back to an array
      const uniqueResults = [...new Set(formattedResults)];
      
      // Set suggestions with localQuery as the first item
      if(localQuery.trim()){

        setSuggestions([localQuery, ...uniqueResults]);
      }
    } else {
      setSuggestions([]);
    }
  }, [serachResponse, localQuery]);
  

  return (
    <div className="search-box-container">
      <div className='elastic-search-input' ref={searchBoxRef}>
        
        
        <input
          className='elastic-section-input-tag '
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for properties..."
        />  
        
        {isLoading && (
         <div 
         className='apartmentname-container' 
      
       >
         {[1,2,3,4,5,6,7,8].map((index) => (
           <p key={index} className='search-list-skeleton' >
           </p>
         ))}
       </div>
        )}

        {/* Display suggestions with highlighting */}
        {!isLoading && suggestions.length > 0 && (
          <div 
            className='apartmentname-container' 
            ref={listRef}
            style={{ maxHeight: hight * 10 }}
          >
            {suggestions.map((suggestion, index) => (
              <p 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => {
                  setkeydown(false);
                  console.log("clll")
                  if (keydown === false) {
                    setHighlightedIndex(index);
                  }
                }}
                className={index === highlightedIndex ? "highlighted" : ""}
              >
                {suggestion}
              </p>
            ))}
          </div>
        )}
  
        
        <div className=' '>
          <button 
            className='search-button-mob' 
            onClick={handleSearchClick} 
          >   
            <img
              src="/img/Search-icon.svg"
              alt=""
              className="img-searchbar"
            />
            Search
          </button>
        </div>
      </div>

    </div>
  );
}