import React, { useCallback, useState } from "react";
import "./style.css";
import { debounce } from "./utils";
import { getApiData } from "./api";

export interface HighlightTextProps {
  text: string;
  highlightText: string;
  onSelect: (text: string) => void;
}

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filterData = useCallback(async (value: string) => {
    setIsLoading(true);
    try {
      const { success, data } = await getApiData(value);
      if (success && data) {
        setSuggestions(data);
      }
    } catch (err) {
      console.error("get_api_error::", err.message);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Wrap debounce in useCallback to prevent recreation
  const updateFilterData = useCallback(debounce(filterData, 500), [filterData]);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
    if (value.length > 0) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
    updateFilterData(value);
  }, []);

  const handleSelect = (selected: string) => {
    setInput(selected);
    setShowDropDown(false);
  };
  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <h3>Search Users : </h3>
        <input
          value={input}
          onChange={handleChange}
          placeholder="Search here..."
        />
        {showDropDown && (
          <div className="drop-down">
            {isLoading ? (
              <div className="loader-wrapper">
                <div className="loader"></div>
              </div>
            ) : suggestions.length > 0 && input.length > 0 ? (
              <ul className="list">
                {suggestions.map((user) => (
                  <HighlightText
                    key={user}
                    text={user}
                    highlightText={input}
                    onSelect={handleSelect}
                  />
                ))}
              </ul>
            ) : (
              <li>No Records found</li>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const HighlightText = ({
  text,
  highlightText,
  onSelect,
}: HighlightTextProps) => {
  const parts = text.split(new RegExp(`(${highlightText})`, "gi"));
  return (
    <li onClick={() => onSelect(text)}>
      {parts.map((str, i) => (
        <span
          key={i}
          style={{
            color:
              str.toLowerCase() === highlightText.toLowerCase()
                ? "#0f0"
                : "#000",
          }}
        >
          {str}
        </span>
      ))}
    </li>
  );
};

export default SearchBar;
