import { ColorScheme } from "@vis.gl/react-google-maps";
import axios from "axios";
import debounce from "debounce";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// const [AlertObj, setAlertObj] = useState({});

export default function ProjectNameSection({
  ProjectNameObjectData,
  setProjectNameObjectData,
  inputClass,
  searchInput,

  placeholder,
  ProjectInputType,
  setrunSearchButton,
  locationAlert,
}) {
  const dispatch = useDispatch();
  const [ProjectName, setProjectName] = useState([]);
  const ProjectNameFormGroupref = useRef(null);
  const [FilterProjectName, setFilterProjectName] = useState([]);
  const [ExactMatchObj, setExactMatchObj] = useState([]);
  const [inputValue, setinputValue] = useState(null);
  const listRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [hight, sethight] = useState(0);
  const [keydown, setkeydown] = useState(false);
  
  const { data } = useSelector((state) => {
    return state.ProjectName;
  });
  const [query, setQuery] = useState('');



  const fetchSuggestions = async (searchTerm) => {
    try{

      const suggestion= await axios.get(`${process.env.REACT_APP_API_URL}/post/suggestion?term=${searchTerm}`)
      if(suggestion?.data?.suggestions.length >0){

        setFilterProjectName(suggestion?.data?.suggestions)
      }
      // console.log(suggestion)
    }
    catch{

    }
    // Call your API here
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

 


  useEffect(() => {
    if (data) {
      if (data.success === true) {
        const uniqueArray = data.AllProjectName.filter(
          (value, index, self) =>
            index ===
            self.findIndex((t) => t["Project Name"] === value["Project Name"])
        );

        setProjectName(uniqueArray);
      }
      if (data.success === false) {
        dispatch({ type: "GetProjectNameClear" });
      }
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ProjectNameFormGroupref?.current) {
        const hideElement = ProjectNameFormGroupref.current.querySelector(
          ".apartmentname-container"
        );

        if (hideElement) {
          let element = ProjectNameFormGroupref.current.contains(e.target);
          if (element == false) {
            setHighlightedIndex(0);
            setFilterProjectName([]);
          }
        }
      }
    };

    if (ProjectNameFormGroupref?.current && FilterProjectName.length > 0) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [FilterProjectName, ProjectNameFormGroupref]);

  // useEffect(() => {
  //   if (ExactMatchObj.length > 0) {
  //     console.log("exact obj ",ExactMatchObj)
  //     const exactMatch = ExactMatchObj.find((item) => {
  //       // Check if "Project Name" matches exactly with ProjectNameObjectData
  //       return (
  //         item["ProjectName"].trim().toUpperCase() ===
  //         ProjectNameObjectData.ProjectName.trim().toUpperCase()
  //       );
  //     });

  //     if (ProjectInputType == "Search") {
  //       if (exactMatch) {
  //         setrunSearchButton(true);
  //       } else {
  //         setrunSearchButton(true);
  //       }
  //     }
  //     if (ProjectInputType == "PostForm") {
  //       // if (exactMatch) {

  //       setinputValue({
  //         City: exactMatch?.["City"] || "",
  //         Locality: exactMatch?.["Locality"] || "",
  //         Landmark: exactMatch?.["Sector"] || "",
  //       });
  //       // } else {

  //       // setinputValue({
  //       //   city: "",
  //       //   Locality: "",
  //       // });
  //       // }
  //     }
  //   }
  // }, [ExactMatchObj, ProjectNameObjectData.ProjectName, ProjectInputType]);

  useEffect(() => {
    if (ProjectInputType == "PostForm") {
      if (inputValue) {
        setProjectNameObjectData((prevData) => {
          if (
            prevData.Locality !== inputValue.Locality ||
            prevData.City !== inputValue.City ||
            prevData.Landmark !== inputValue.Landmark
          ) {
            return {
              ...prevData,
              Locality: inputValue.Locality || "", // Ensure no undefined values
              City: inputValue.City || "",
              Landmark: inputValue.Landmark || "",
            };
          }
          return prevData; // No update needed if values are the same
        });
      }
    }
  }, [inputValue, ProjectInputType]);

  const handleKeyDown = (event) => {
    setkeydown(true);
    if (FilterProjectName.length > 0) {
      if (event.key === "ArrowDown") {
        if (highlightedIndex < FilterProjectName.length - 1) {
          const newIndex = highlightedIndex + 1;
          setHighlightedIndex(newIndex);
          scrollToItem(newIndex); // Scroll to the new index
        }
      } else if (event.key === "ArrowUp") {
        if (highlightedIndex > 0) {
          const newIndex = highlightedIndex - 1;
          setHighlightedIndex(newIndex);
          scrollToItem(newIndex); // Scroll to the new index
        }
      } else if (event.key === "Enter") {
        if (FilterProjectName.length > 0) {
       
          setProjectNameObjectData(FilterProjectName[highlightedIndex]);

          setQuery(FilterProjectName[highlightedIndex].combinedLocation?.replaceAll(","," "))
          setFilterProjectName([]);
          setHighlightedIndex(0);
        }
      } else if (event.key === "Escape") {
        setFilterProjectName([]); // Reset the filter on Escape
      }
    }
  };

  const scrollToItem = (index) => {
    if (listRef.current) {
      listRef.current.scrollTop = index * hight;
    }
  };

  useEffect(() => {
    if (FilterProjectName.length > 0) {
      if (listRef.current) {
        listRef.current.tabIndex = 0;
        let child = listRef.current.firstChild;

        const style = window.getComputedStyle(child);
        let marginTop = parseFloat(style.marginTop);
        let marginBottom = parseFloat(style.marginBottom);
        let hight = child.offsetHeight;
        let totalhight = marginTop + marginBottom + hight;
        sethight(totalhight);
      }
    }
  }, [FilterProjectName, listRef]);


  return (
    <>
      <div
        className={`form-group-home ${ProjectInputType == "Search"
            ? "search-dropdown-home"
            : ProjectInputType == "PostForm"
              ? "create-post-search-project"
              : ProjectInputType == "PostRequirement"
                ? "post-requermient-search"
                : ""
          }`}
      >
        {ProjectInputType == "PostForm" && (
          <label
            className="project-name-in-create-from"
            htmlFor="property-name"
          >
            Project Name*
          </label>
        )}
        {/* searchInput */}
        <div
          ref={ProjectNameFormGroupref}
          className={`dropdown ${ProjectInputType == "Search" ? "search-dropdown" : ""
            }`}
        >
          <input
            onKeyDown={handleKeyDown}
            className={`${inputClass}`}
            autoComplete="off"
            type="text"
            id="property-name"
            placeholder={placeholder}
            required
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.replaceAll(","," "));
              debouncedFetchSuggestions(e.target.value);
              setHighlightedIndex(0);
              // setProjectNameObjectData(()=>{return {
              //   ...ProjectNameObjectData,
              //   ProjectName: e.target.value,
              // }});
              
              if (e.target.value == "" || e.target.value == " ") {
                setHighlightedIndex(0);
               
              } else {
                let SearchWord = e.target.value.split(" ");
            

                // if (!searchInput) {
                //   if (result.length == 0) {

                //     // setinputValue({
                //     //   city: "",
                //     //   Locality: "",
                //     // });
                //   }
                // }
              }
            }}
          />
          {/* <p>{ProjectNameObjectData?.ProjectName}</p> */}

          {FilterProjectName.length > 0 && (
            <div
              onKeyDown={handleKeyDown}
              ref={listRef}
              className="apartmentname-container"
              style={{ maxHeight: hight * 10 }}
            //  tabIndex={0}
            >
      
              {FilterProjectName.map((ApartmentFilter, index) => {

                

                return (
                  <p
                  
                    // onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseEnter={() => {
                      setkeydown(false);
                      if (keydown == false) {
                        // console.log(highlightedIndex)
                        setHighlightedIndex(index);
                      }
                    }}
                    className={`suggestion-p-tag ${index === highlightedIndex ? "highlighted" : ""}`}
                    key={index}
                    onClick={(e) => {
                    
                      let innerText = ApartmentFilter?.combinedLocation.replaceAll(",", "");
                      setQuery(innerText)
                     
                        setHighlightedIndex(0);
                     
                  
                      setProjectNameObjectData(
                        ApartmentFilter
                      );
                    }}
                  >{
                    ApartmentFilter?.combinedLocation
                  }
                <span>
                  {(ApartmentFilter.mostMatchedField === "Project Name" || ApartmentFilter.s_type === "Project Name")
                    ? "Project Name"
                    : "Locality"}
                </span>
                  </p>
                );
              })}
            </div>
          )}
        </div>
        {/* <p>{ApartmentError}</p> */}
      </div>
    </>
  );
}



// import { ColorScheme } from "@vis.gl/react-google-maps";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // const [AlertObj, setAlertObj] = useState({});

// export default function ProjectNameSection({
//   ProjectNameObjectData,
//   setProjectNameObjectData,
//   inputClass,
//   searchInput,

//   placeholder,
//   ProjectInputType,
//   setrunSearchButton,
//   locationAlert,
// }) {

//   const [highlightedIndex, setHighlightedIndex] = useState(0);

//   const [keydown, setkeydown] = useState(false);
  



//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [propertyData, setPropertyData] = useState([]);
//   const [suggestionData, setSuggestionData] = useState({
//     cities: new Set(),
//     localities: new Set(),
//     sectors: new Set(),
//     projectNames: new Set(),
//     propertyTypes: new Set(),
//     apartmentTypes: new Set(),
//     bhkTypes: new Set(), // New: BHK types
//     // Combined suggestions
//     combinedLocations: new Set(),
//     advancedCombinations: new Set(),
//     bhkCombinations: new Set() // New: BHK-specific combinations
//   });
  
//   const suggestionsRef = useRef(null);
//   const { data } = useSelector((state) => {
//     return state.postByAddress;
//   });
//   // Fetch property data from API
//   useEffect(() => {
 
//       if(data && data?.properties?.length>0){
      
//         setPropertyData(data?.properties);
//         populateSuggestionData(data?.properties);
//       }
    
    
//   }, [data]);
  
//   // Close suggestions on outside click
//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     console.log("sdsd")
//   //     if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
//   //       setSuggestions([]);
//   //     }
//   //   };
    
//   //   document.addEventListener('mousedown', handleClickOutside);
//   //   return () => {
//   //     document.removeEventListener('mousedown', handleClickOutside);
//   //   };
//   // }, []);
  
//   // Update suggestions when query changes
//   useEffect(() => {
//     if (query.trim() === '') {
//       setTimeout(() => {
//         setSuggestions([]);
//       }, 0);
      
//       return;
//     }
    
//     const results = getSuggestions(query, selectedFilters);
//     setSuggestions(results);
//   }, [query, selectedFilters]);
  
//   // Populate suggestion data from property list
//   const populateSuggestionData = (properties) => {
//     const newSuggestionData = {
//       cities: new Set(),
//       localities: new Set(),
//       sectors: new Set(),
//       projectNames: new Set(),
//       propertyTypes: new Set(),
//       apartmentTypes: new Set(),
//       bhkTypes: new Set(), // New: store BHK types
//       combinedLocations: new Set(),
//       advancedCombinations: new Set(),
//       bhkCombinations: new Set() // New: BHK-specific combinations
//     };
    
//     properties?.forEach(property => {
//       // Extract location values
//       const city = property.LocationDetails?.City;
//       const locality = property.LocationDetails?.Locality;
//       const sector = property.LocationDetails?.Landmark;
//       const projectName = property.LocationDetails?.ProjectName;
      
//       // Extract property type values
//       const propertyType = property.BasicDetails?.PropertyType;
//       const apartmentType = property.BasicDetails?.ApartmentType;
//       const bedrooms = property.BasicDetails?.Bedrooms;
      
//       // Add individual values to sets
//       if (city) newSuggestionData.cities.add(city);
//       if (locality) newSuggestionData.localities.add(locality);
//       if (sector) newSuggestionData.sectors.add(sector);
//       if (projectName) newSuggestionData.projectNames.add(projectName);
//       if (propertyType) newSuggestionData.propertyTypes.add(propertyType);
//       if (apartmentType) newSuggestionData.apartmentTypes.add(apartmentType);
      
//       // Add BHK types if bedrooms exist
//       if (bedrooms) {
//         const bhkLabel = `${bedrooms} BHK`;
//         newSuggestionData.bhkTypes.add(bhkLabel);
        
//         // Create BHK specific combinations
//         if (apartmentType) {
//           // BHK + Apartment Type (e.g., "3 BHK Apartment")
//           newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType}`);
          
//           // BHK + Apartment Type + City (e.g., "3 BHK Apartment in Gurgaon")
//           if (city) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${city}`);
//           }
          
//           // BHK + Apartment Type + Locality (e.g., "3 BHK Apartment in New Gurgaon")
//           if (locality) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${locality}`);
//           }
          
//           // BHK + Apartment Type + Sector (e.g., "3 BHK Apartment in Sector 82 A")
//           if (sector) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${sector}`);
//           }
          
//           // BHK + Apartment Type + Project Name (e.g., "3 BHK Apartment in DLF The Primus")
//           if (projectName) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${projectName}`);
//           }
          
//           // BHK + Apartment Type + Locality + City (e.g., "3 BHK Apartment in New Gurgaon, Gurgaon")
//           if (locality && city) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${locality}, ${city}`);
//           }
          
//           // BHK + Apartment Type + Sector + City (e.g., "3 BHK Apartment in Sector 82 A, Gurgaon")
//           if (sector && city) {
//             newSuggestionData.bhkCombinations.add(`${bhkLabel} ${apartmentType} in ${sector}, ${city}`);
//           }
          
//           // BHK + Property Status combinations (e.g., "Ready to move 3 BHK Apartment")
//           if (property.BasicDetails?.PropertyStatus) {
//             const status = property.BasicDetails.PropertyStatus;
//             newSuggestionData.bhkCombinations.add(`${status} ${bhkLabel} ${apartmentType}`);
            
//             // With location
//             if (city) {
//               newSuggestionData.bhkCombinations.add(`${status} ${bhkLabel} ${apartmentType} in ${city}`);
//             }
            
//             if (sector) {
//               newSuggestionData.bhkCombinations.add(`${status} ${bhkLabel} ${apartmentType} in ${sector}`);
//             }
            
//             if (locality) {
//               newSuggestionData.bhkCombinations.add(`${status} ${bhkLabel} ${apartmentType} in ${locality}`);
//             }
//           }
//         }
        
//         // Create additional plain BHK combinations without apartment type
//         if (city) {
//           newSuggestionData.bhkCombinations.add(`${bhkLabel} in ${city}`);
//         }
        
//         if (locality) {
//           newSuggestionData.bhkCombinations.add(`${bhkLabel} in ${locality}`);
//         }
        
//         if (sector) {
//           newSuggestionData.bhkCombinations.add(`${bhkLabel} in ${sector}`);
//         }
//       }
      
//       // Create basic location combinations
//       if (sector && city) {
//         newSuggestionData.combinedLocations.add(`${sector} ${city}`);
//       }
      
//       if (locality && city) {
//         newSuggestionData.combinedLocations.add(`${locality} ${city}`);
//       }
      
//       if (sector && locality) {
//         newSuggestionData.combinedLocations.add(`${sector} ${locality}`);
//       }
      
//       if (projectName && city) {
//         newSuggestionData.combinedLocations.add(`${projectName} ${city}`);
//       }
      
//       if (projectName && sector) {
//         newSuggestionData.combinedLocations.add(`${projectName} ${sector}`);
//       }
      
//       // Property type combinations
//       if (apartmentType) {
//         // Add natural language combinations
//         if (city) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} in ${city}`);
//         }
        
//         if (locality) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} in ${locality}`);
//         }
        
//         if (sector) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} in ${sector}`);
//         }
        
//         if (locality && city) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} in ${locality}, ${city}`);
//         }
        
//         // Apartment Type + Sector + City (e.g., "Apartment Sector 82 A Gurgaon")
//         if (sector && city) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} ${sector} ${city}`);
//         }
        
//         // Apartment Type + Project Name (e.g., "Apartment DLF The Primus")
//         if (projectName) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} ${projectName}`);
//         }
        
//         // Apartment Type + Locality + City (e.g., "Apartment New Gurgaon Gurgaon")
//         if (locality && city) {
//           newSuggestionData.advancedCombinations.add(`${apartmentType} ${locality} ${city}`);
//         }
//       }
      
//       if (propertyType) {
//         // Add natural language combinations
//         if (city) {
//           newSuggestionData.advancedCombinations.add(`${propertyType} property in ${city}`);
//         }

//         if (locality) {
//           newSuggestionData.advancedCombinations.add(`${propertyType} property in ${locality}`);
//         }
        
//         if (sector) {
//           newSuggestionData.advancedCombinations.add(`${propertyType} property in ${sector}`);
//         }
        
//         // Property Type + Sector + City (e.g., "Residential Sector 82 A Gurgaon")
//         if (sector && city) {
//           newSuggestionData.advancedCombinations.add(`${propertyType} ${sector} ${city}`);
//         }
        
//         // Property Type + Project Name (e.g., "Residential DLF The Primus")
//         if (projectName) {
//           newSuggestionData.advancedCombinations.add(`${propertyType} ${projectName}`);
//         }
//       }
      
//       // Three-part combinations including sector, project, and city
//       if (projectName && sector && city) {
//         newSuggestionData.advancedCombinations.add(`${projectName} ${sector} ${city}`);
//       }
      
//       // Very advanced combinations with apartment type, project, sector, and city
//       if (apartmentType && projectName && sector && city) {
//         newSuggestionData.advancedCombinations.add(`${apartmentType} ${projectName} ${sector} ${city}`);
//       }
      
//       // Property type, apartment type, sector, city combinations
//       if (propertyType && apartmentType && sector && city) {
//         newSuggestionData.advancedCombinations.add(`${propertyType} ${apartmentType} ${sector} ${city}`);
//       }
      
//       // Natural language search phrases for properties
//       if (propertyType && city) {
//         newSuggestionData.advancedCombinations.add(`${propertyType} properties for sale in ${city}`);
//         newSuggestionData.advancedCombinations.add(`${propertyType} properties to buy in ${city}`);
//       }
      
//       if (apartmentType && city) {
//         newSuggestionData.advancedCombinations.add(`${apartmentType} for sale in ${city}`);
//         newSuggestionData.advancedCombinations.add(`${apartmentType} to buy in ${city}`);
//       }
      
//       if (property.BasicDetails?.PropertyStatus) {
//         const status = property.BasicDetails.PropertyStatus;
//         if (city) {
//           newSuggestionData.advancedCombinations.add(`${status} properties in ${city}`);
//         }
        
//         if (apartmentType && city) {
//           newSuggestionData.advancedCombinations.add(`${status} ${apartmentType} in ${city}`);
//         }
//       }
//     });
    
//     setSuggestionData(prevData => {
//       const mergedData = { ...prevData };
//       Object.keys(newSuggestionData).forEach(key => {
//         mergedData[key] = new Set([...prevData[key], ...newSuggestionData[key]]);
//       });
//       return mergedData;
//     });
//   };
  
  
//   // Get suggestions based on user input and already selected values
//  // Get suggestions based on user input and already selected values
// const getSuggestions = (query, selectedFilters) => {
//   if (!query || query.trim() === '') return [];
  
//   query = query.toLowerCase().trim();
  
//   // Create separate arrays for different priority levels
//   const highPriorityMatches = []; // Project names, cities, localities exact matches
//   const mediumPriorityMatches = []; // Other exact matches (sectors, property types, etc.)
//   const lowPriorityMatches = []; // Contains matches but doesn't start with
  
//   // Function to check if a suggestion starts with the query
//   const startsWithQuery = (text) => {
//     return text.toLowerCase().startsWith(query);
//   };
  
//   // Function to check if a suggestion contains the query but doesn't start with it
//   const containsQuery = (text) => {
//     return text.toLowerCase().includes(query) && !text.toLowerCase().startsWith(query);
//   };
  
//   // First check high priority fields - Project names
//   if (!selectedFilters.projectName) {
//     Array.from(suggestionData.projectNames).forEach(projectName => {
//       if (startsWithQuery(projectName)) {
//         highPriorityMatches.push({
//           value: projectName,
//           type: 'projectName',
//           display: `Project: ${projectName}`
//         });
//       } else if (containsQuery(projectName)) {
//         lowPriorityMatches.push({
//           value: projectName,
//           type: 'projectName',
//           display: `Project: ${projectName}`
//         });
//       }
//     });
//   }
  
//   // Cities - high priority
//   if (!selectedFilters.city) {
//     Array.from(suggestionData.cities).forEach(city => {
//       if (startsWithQuery(city)) {
//         highPriorityMatches.push({
//           value: city,
//           type: 'city',
//           display: `City: ${city}`
//         });
//       } else if (containsQuery(city)) {
//         lowPriorityMatches.push({
//           value: city,
//           type: 'city',
//           display: `City: ${city}`
//         });
//       }
//     });
//   }
  
//   // Localities - high priority
//   if (!selectedFilters.locality) {
//     Array.from(suggestionData.localities).forEach(locality => {
//       if (startsWithQuery(locality)) {
//         highPriorityMatches.push({
//           value: locality,
//           type: 'locality',
//           display: `Locality: ${locality}`
//         });
//       } else if (containsQuery(locality)) {
//         lowPriorityMatches.push({
//           value: locality,
//           type: 'locality',
//           display: `Locality: ${locality}`
//         });
//       }
//     });
//   }
  
//   // Then check combined location suggestions that include high priority fields
//   Array.from(suggestionData.combinedLocations).forEach(location => {
//     // Check if any part of this combined location is already selected
//     const locationParts = location.split(' ');
//     let alreadySelected = false;
    
//     for (const part of locationParts) {
//       if (Object.values(selectedFilters).some(filter => 
//         filter.toLowerCase() === part.toLowerCase()
//       )) {
//         alreadySelected = true;
//         break;
//       }
//     }
    
//     if (!alreadySelected) {
//       // Check if this combination contains project name, city or locality
//       const hasHighPriorityField = 
//         Array.from(suggestionData.projectNames).some(name => location.includes(name)) ||
//         Array.from(suggestionData.cities).some(city => location.includes(city)) ||
//         Array.from(suggestionData.localities).some(locality => location.includes(locality));
      
//       if (startsWithQuery(location)) {
//         if (hasHighPriorityField) {
//           highPriorityMatches.push({
//             value: location,
//             type: 'combinedLocation',
//             display: `${location}`
//           });
//         } else {
//           mediumPriorityMatches.push({
//             value: location,
//             type: 'combinedLocation',
//             display: `${location}`
//           });
//         }
//       } else if (containsQuery(location)) {
//         if (hasHighPriorityField) {
//           mediumPriorityMatches.push({
//             value: location,
//             type: 'combinedLocation',
//             display: `${location}`
//           });
//         } else {
//           lowPriorityMatches.push({
//             value: location,
//             type: 'combinedLocation',
//             display: `${location}`
//           });
//         }
//       }
//     }
//   });
  
//   // BHK types - check priority based on if they contain high priority fields
//   if (!selectedFilters.bhkType) {
//     Array.from(suggestionData.bhkTypes).forEach(bhkType => {
//       if (startsWithQuery(bhkType)) {
//         mediumPriorityMatches.push({
//           value: bhkType,
//           type: 'bhkType',
//           display: `${bhkType}`
//         });
//       } else if (containsQuery(bhkType)) {
//         lowPriorityMatches.push({
//           value: bhkType,
//           type: 'bhkType',
//           display: `${bhkType}`
//         });
//       }
//     });
//   }
  
//   // Then check BHK combinations
//   Array.from(suggestionData.bhkCombinations).forEach(combination => {
//     // Check if any part of this combination is already selected
//     const combinationParts = combination.split(' ');
//     let alreadySelected = false;
    
//     for (const part of combinationParts) {
//       if (Object.values(selectedFilters).some(filter => 
//         filter.toLowerCase() === part.toLowerCase()
//       )) {
//         alreadySelected = true;
//         break;
//       }
//     }
    
//     if (!alreadySelected) {
//       // Check if this combination contains project name, city or locality
//       const hasHighPriorityField = 
//         Array.from(suggestionData.projectNames).some(name => combination.includes(name)) ||
//         Array.from(suggestionData.cities).some(city => combination.includes(city)) ||
//         Array.from(suggestionData.localities).some(locality => combination.includes(locality));
      
//       if (startsWithQuery(combination)) {
//         if (hasHighPriorityField) {
//           highPriorityMatches.push({
//             value: combination,
//             type: 'bhkCombination',
//             display: `${combination}`
//           });
//         } else {
//           mediumPriorityMatches.push({
//             value: combination,
//             type: 'bhkCombination',
//             display: `${combination}`
//           });
//         }
//       } else if (containsQuery(combination)) {
//         if (hasHighPriorityField) {
//           mediumPriorityMatches.push({
//             value: combination,
//             type: 'bhkCombination',
//             display: `${combination}`
//           });
//         } else {
//           lowPriorityMatches.push({
//             value: combination,
//             type: 'bhkCombination',
//             display: `${combination}`
//           });
//         }
//       }
//     }
//   });
  
//   // Then check advanced combinations
//   Array.from(suggestionData.advancedCombinations).forEach(combination => {
//     // Check if any part of this combination is already selected
//     const combinationParts = combination.split(' ');
//     let alreadySelected = false;
    
//     for (const part of combinationParts) {
//       if (Object.values(selectedFilters).some(filter => 
//         filter.toLowerCase() === part.toLowerCase()
//       )) {
//         alreadySelected = true;
//         break;
//       }
//     }
    
//     if (!alreadySelected) {
//       // Check if this combination contains project name, city or locality
//       const hasHighPriorityField = 
//         Array.from(suggestionData.projectNames).some(name => combination.includes(name)) ||
//         Array.from(suggestionData.cities).some(city => combination.includes(city)) ||
//         Array.from(suggestionData.localities).some(locality => combination.includes(locality));
      
//       if (startsWithQuery(combination)) {
//         if (hasHighPriorityField) {
//           highPriorityMatches.push({
//             value: combination,
//             type: 'advancedCombination',
//             display: `${combination}`
//           });
//         } else {
//           mediumPriorityMatches.push({
//             value: combination,
//             type: 'advancedCombination',
//             display: `${combination}`
//           });
//         }
//       } else if (containsQuery(combination)) {
//         if (hasHighPriorityField) {
//           mediumPriorityMatches.push({
//             value: combination,
//             type: 'advancedCombination',
//             display: `${combination}`
//           });
//         } else {
//           lowPriorityMatches.push({
//             value: combination,
//             type: 'advancedCombination',
//             display: `${combination}`
//           });
//         }
//       }
//     }
//   });
  
//   // Add medium priority single field suggestions
  
//   // Sectors
//   if (!selectedFilters.sector) {
//     Array.from(suggestionData.sectors).forEach(sector => {
//       if (startsWithQuery(sector)) {
//         mediumPriorityMatches.push({
//           value: sector, 
//           type: 'sector',
//           display: `Sector: ${sector}`
//         });
//       } else if (containsQuery(sector)) {
//         lowPriorityMatches.push({
//           value: sector, 
//           type: 'sector',
//           display: `Sector: ${sector}`
//         });
//       }
//     });
//   }
  
//   // Property types
//   if (!selectedFilters.propertyType) {
//     Array.from(suggestionData.propertyTypes).forEach(propertyType => {
//       if (startsWithQuery(propertyType)) {
//         mediumPriorityMatches.push({
//           value: propertyType,
//           type: 'propertyType',
//           display: `Property Type: ${propertyType}`
//         });
//       } else if (containsQuery(propertyType)) {
//         lowPriorityMatches.push({
//           value: propertyType,
//           type: 'propertyType',
//           display: `Property Type: ${propertyType}`
//         });
//       }
//     });
//   }
  
//   // Apartment types
//   if (!selectedFilters.apartmentType) {
//     Array.from(suggestionData.apartmentTypes).forEach(apartmentType => {
//       if (startsWithQuery(apartmentType)) {
//         mediumPriorityMatches.push({
//           value: apartmentType,
//           type: 'apartmentType',
//           display: `Apartment Type: ${apartmentType}`
//         });
//       } else if (containsQuery(apartmentType)) {
//         lowPriorityMatches.push({
//           value: apartmentType,
//           type: 'apartmentType',
//           display: `Apartment Type: ${apartmentType}`
//         });
//       }
//     });
//   }
  
//   // Combine results with priority order
//   const prioritizedResults = [
//     ...highPriorityMatches, 
//     ...mediumPriorityMatches, 
//     ...lowPriorityMatches
//   ];
  
//   // Limit results for performance
//   return prioritizedResults.slice(0, 15);
// };
  
//   // Parse combination into filter components
//   const parseCombination = (combination) => {
//     const combinationParts = combination.split(' ');
//     const newFilters = { ...selectedFilters };
    
//     // Check for BHK type
//     suggestionData.bhkTypes.forEach(bhkType => {
//       if (combination.includes(bhkType)) {
//         newFilters.bhkType = bhkType;
//       }
//     });
    
//     // Check for property type
//     suggestionData.propertyTypes.forEach(propertyType => {
//       if (combination.includes(propertyType)) {
//         newFilters.propertyType = propertyType;
//       }
//     });
    
//     // Check for apartment type
//     suggestionData.apartmentTypes.forEach(apartmentType => {
//       if (combination.includes(apartmentType)) {
//         newFilters.apartmentType = apartmentType;
//       }
//     });
    
//     // Check for city
//     suggestionData.cities.forEach(city => {
//       if (combinationParts.includes(city) || combination.includes(` in ${city}`)) {
//         newFilters.city = city;
//       }
//     });
    
//     // Check for sector/landmark - more complex because it might contain spaces
//     suggestionData.sectors.forEach(sector => {
//       if (combination.includes(sector)) {
//         newFilters.sector = sector;
//       }
//     });
    
//     // Check for locality
//     suggestionData.localities.forEach(locality => {
//       if (combination.includes(locality)) {
//         newFilters.locality = locality;
//       }
//     });
    
//     // Check for project name - more complex because it might contain spaces
//     suggestionData.projectNames.forEach(project => {
//       if (combination.includes(project)) {
//         newFilters.projectName = project;
//       }
//     });
    
//     // Check for property status if present in the text
//     const statusRegex = /(ready to move|under construction)/i;
//     const statusMatch = combination.match(statusRegex);
//     if (statusMatch) {
//       newFilters.propertyStatus = statusMatch[0].charAt(0).toUpperCase() + statusMatch[0].slice(1);
//     }
    
//     return newFilters;
//   };
  
//   // Handle input change
//   const handleInputChange = (e) => {
    
//     setQuery(e.target.value);
//   };
  
//   // Handle suggestion selection
//   const handleSelectSuggestion = (suggestion) => {
//     if (suggestion.type === 'combinedLocation' || suggestion.type === 'advancedCombination' || suggestion.type === 'bhkCombination') {
//       // Parse the combined string into its component parts
//       const newFilters = parseCombination(suggestion.value);
//       setSelectedFilters(newFilters);
//     } else {
//       // For single value suggestions, just add to filters
//       setSelectedFilters(prev => ({
//         ...prev,
//         [suggestion.type]: suggestion.value
//       }));
//     }
//     setQuery(suggestion.display);

//    setTimeout(() => {
//     setSuggestions([]);
//    }, 0);
  

//   };

//   useEffect(() => {
//     console.log("Updated selectedFilters:", selectedFilters);
//     setProjectNameObjectData(selectedFilters);  

// }, [selectedFilters]);

//   const handleKeyDown = (event) => {
//     // setkeydown(true);
//     // if (FilterProjectName.length > 0) {
//     //   if (event.key === "ArrowDown") {
//     //     if (highlightedIndex < FilterProjectName.length - 1) {
//     //       const newIndex = highlightedIndex + 1;
//     //       setHighlightedIndex(newIndex);
//     //       scrollToItem(newIndex); // Scroll to the new index
//     //     }
//     //   } else if (event.key === "ArrowUp") {
//     //     if (highlightedIndex > 0) {
//     //       const newIndex = highlightedIndex - 1;
//     //       setHighlightedIndex(newIndex);
//     //       scrollToItem(newIndex); // Scroll to the new index
//     //     }
//     //   } else if (event.key === "Enter") {
//     //     if (FilterProjectName.length > 0) {
//     //       setProjectNameObjectData({
//     //         ...ProjectNameObjectData,
//     //         ProjectName: FilterProjectName[highlightedIndex]["Project Name"],
//     //       });
//     //       setFilterProjectName([]);
//     //       setHighlightedIndex(0);
//     //     }
//     //   } else if (event.key === "Escape") {
//     //     setFilterProjectName([]); // Reset the filter on Escape
//     //   }
//     // }
//   };

// return (
//   <div className="property-search-container">

    
//     {/* Search Input */}
//     <div
//         className={`form-group-home ${ProjectInputType == "Search"
//             ? "search-dropdown-home"
//             : ProjectInputType == "PostForm"
//               ? "create-post-search-project"
//               : ProjectInputType == "PostRequirement"
//                 ? "post-requermient-search"
//                 : ""
//           }`}>
//       <input
    
//         value={query}
//         onChange={handleInputChange}
//                     onKeyDown={handleKeyDown}
//                     className={`${inputClass}`}
//                     autoComplete="off"
//                     type="text"
//                     id="property-name"
//                     placeholder={placeholder}
//                     required
//       />
   
//     </div>
    
//     {/* Suggestions Dropdown */}
//     {suggestions.length > 0 && (
//       <div 
//       onKeyDown={handleKeyDown}

//       className="apartmentname-container"
    
 
      
//        ref={suggestionsRef}>
        
//         {suggestions.map((suggestion, index) => (
//           <p
     
//         onMouseEnter={() => {
//           setkeydown(false);
//           if (keydown == false) {
//             // console.log(highlightedIndex)
//             setHighlightedIndex(index);
//           }
//         }}

//         className={index === highlightedIndex ? "highlighted" : ""}

//           key={`${suggestion.type}-${suggestion.value}-${index}`}
          
//           onClick={() => handleSelectSuggestion(suggestion)}
//         >
//           {suggestion.display}
//         </p>
         
//         ))}
//       </div>
//     )}
    
 

//   </div>
// );
// };




  