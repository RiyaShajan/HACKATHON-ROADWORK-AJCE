import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, X } from "lucide-react";
import { C, body } from "./UI";

export default function LocationAutocomplete({ 
  items, 
  value, 
  onChange, 
  placeholder, 
  label, 
  disabled, 
  showManualOption 
}) {
  const [query, setQuery] = useState(value ? value.name : "");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  
  const wrapperRef = useRef(null);

  // Debounce input to prevent UI freezing if items array is large
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Sync external value changes
  useEffect(() => {
    if (value && value.name !== query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(value.name);
    } else if (!value) {
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!debouncedQuery || (value && value.name === debouncedQuery)) return items.slice(0, 100);
    const q = debouncedQuery.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(q)).slice(0, 100);
  }, [items, debouncedQuery, value]);

  const handleSelect = (item) => {
    onChange(item);
    setQuery(item.name);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleManual = () => {
    onChange({ name: query, isManual: true });
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      setHighlightedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredItems.length) {
        handleSelect(filteredItems[highlightedIndex]);
      } else if (showManualOption && query) {
        handleManual();
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (value) setQuery(value.name);
      else setQuery("");
      e.preventDefault();
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", marginBottom: 16 }}>
      {label && <div style={{ ...body, fontSize: 12, color: C.sub, marginBottom: 6, fontWeight: 600 }}>{label}</div>}
      
      <div style={{ position: "relative" }}>
        <Search size={18} color={C.sub} style={{ position: "absolute", left: 14, top: 14 }} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (value) onChange(null); // Clear selection if typing
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            ...body,
            width: "100%",
            padding: "12px 40px",
            borderRadius: 8,
            border: `2px solid ${isOpen ? C.amber : C.line}`,
            boxSizing: "border-box",
            fontSize: 15,
            color: C.ink,
            outline: "none",
            opacity: disabled ? 0.6 : 1,
            background: "#fff",
            transition: "all 0.2s"
          }}
        />

        {query && !disabled && (
          <button 
            onClick={() => {
              setQuery("");
              onChange(null);
              setIsOpen(true);
            }}
            style={{ position: "absolute", right: 14, top: 12, background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <X size={16} color={C.sub} />
          </button>
        )}
      </div>

      {isOpen && !disabled && (
        <div style={{ 
          position: "absolute", 
          top: "100%", 
          left: 0, 
          right: 0, 
          background: "#fff", 
          border: `1px solid ${C.line}`, 
          borderRadius: 8, 
          marginTop: 4, 
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          maxHeight: 250, 
          overflowY: "auto",
          zIndex: 50
        }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.isoCode || item.name}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                style={{
                  ...body,
                  padding: "12px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: highlightedIndex === index ? "#FFF7E0" : "#fff",
                  color: C.ink,
                  fontSize: 14,
                  borderBottom: `1px solid ${C.line}44`
                }}
              >
                <MapPin size={16} color={highlightedIndex === index ? C.amberDeep : C.sub} />
                <span style={{ fontWeight: highlightedIndex === index ? 600 : 400 }}>{item.name}</span>
                {item.flag && <span style={{ marginLeft: "auto", fontSize: 18 }}>{item.flag}</span>}
              </div>
            ))
          ) : (
            <div style={{ padding: 16, textAlign: "center", ...body, color: C.sub, fontSize: 14 }}>
              {debouncedQuery ? "NO LOCATION FOUND" : "Type to search..."}
            </div>
          )}

          {showManualOption && debouncedQuery && (
            <div
              onClick={handleManual}
              style={{
                ...body,
                padding: "12px 16px",
                cursor: "pointer",
                background: C.asphalt,
                color: C.amber,
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8
              }}
            >
              Can't find it? Use "{debouncedQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
