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

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 150), []);

 


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

  useEffect(() => {
    if (ExactMatchObj.length > 0) {
      const exactMatch = ExactMatchObj.find((item) => {
        // Check if "Project Name" matches exactly with ProjectNameObjectData
        return (
          item["Project Name"].trim().toUpperCase() ===
          ProjectNameObjectData.ProjectName.trim().toUpperCase()
        );
      });

      if (ProjectInputType == "Search") {
        if (exactMatch) {
          setrunSearchButton(true);
        } else {
          setrunSearchButton(false);
        }
      }
      if (ProjectInputType == "PostForm") {
        // if (exactMatch) {

        setinputValue({
          City: exactMatch?.["City"] || "",
          Locality: exactMatch?.["Locality"] || "",
          Landmark: exactMatch?.["Sector"] || "",
        });
        // } else {

        // setinputValue({
        //   city: "",
        //   Locality: "",
        // });
        // }
      }
    }
  }, [ExactMatchObj, ProjectNameObjectData.ProjectName, ProjectInputType]);

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
        className={`form-group-home ${
          ProjectInputType == "Search"
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
          className={`dropdown ${
            ProjectInputType == "Search" ? "search-dropdown" : ""
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




