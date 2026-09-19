import { useState, useEffect } from "react";
import { C, disp, body, SectionLabel, InfoRow } from "./UI";
import { searchColleges, searchCollegesFallback } from "../services/collegeService";
import { MapPin } from "lucide-react";

export default function CollegeFinder({ course, answers, onBack, onCollegeSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterType, setFilterType] = useState("All Types"); // All, Government, Private
  const [filterState, setFilterState] = useState(""); // Location filter
  const [filterCity, setFilterCity] = useState(""); // Location filter

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchData = async (pageNum = 1, forceRetry = false) => {
    setLoading(true);
    if (pageNum === 1) setColleges([]);
    
    const params = {
      courseId: course?.id,
      query: debouncedSearch,
      type: filterType,
      state: filterState,
      city: filterCity,
      page: pageNum
    };

    try {
      if (forceRetry) setApiError(false);
      
      const res = await searchColleges(params);
      
      setColleges(prev => pageNum === 1 ? res.colleges : [...prev, ...res.colleges]);
      setTotal(res.total);
      setPage(res.page);
      setApiError(false);
    } catch (err) {
      console.warn("API failed, using fallback.", err);
      setApiError(true);
      const fallback = await searchCollegesFallback(params);
      setColleges(prev => pageNum === 1 ? fallback.colleges : [...prev, ...fallback.colleges]);
      setTotal(fallback.total);
      setPage(fallback.page);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, filterType, filterState, filterCity]);

  const handleNearMe = () => {
    if (answers?.stateObj?.name) {
      setFilterState(answers.stateObj.name);
    }
    if (answers?.cityObj?.name) {
      setFilterCity(answers.cityObj.name);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterType("All Types");
    setFilterState("");
    setFilterCity("");
  };

  const hasMore = colleges.length < total;

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.asphalt }}>
      {/* HEADER */}
      <div style={{ background: C.asphalt, color: C.paper, padding: "40px 24px 80px", position: "relative" }}>
        <button
          onClick={onBack}
          style={{ ...disp, background: "transparent", color: C.amber, border: "none", cursor: "pointer", fontSize: 16, padding: 0, marginBottom: 24, fontWeight: 700 }}
        >
          ← BACK TO COURSES
        </button>
        <SectionLabel>COLLEGE NAVIGATOR</SectionLabel>
        <h1 style={{ ...disp, fontSize: 48, margin: "16px 0", lineHeight: 1.1 }}>
          FIND YOUR NEXT DESTINATION
        </h1>
        <p style={{ ...body, fontSize: 18, color: "#9CA3AF", maxWidth: 600, marginBottom: 16 }}>
          {course ? `Explore institutions offering ${course.name} across India.` : "Explore verified colleges and institutions."}
        </p>

        {apiError && (
          <div style={{ background: "#FEF2F2", border: "1px solid #EF4444", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, maxWidth: 800 }}>
            <span style={{ ...body, color: "#991B1B", fontSize: 14 }}>
              <strong>API DATA UNAVAILABLE.</strong> Showing limited demo data.
            </span>
            <button onClick={() => fetchData(1, true)} style={{ ...disp, background: "#EF4444", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              RETRY
            </button>
          </div>
        )}

        {/* Quick Filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          <button 
            onClick={() => { setFilterState(""); setFilterCity(""); }} 
            style={{ ...body, fontSize: 14, padding: "8px 16px", borderRadius: 20, background: (!filterState && !filterCity) ? C.amber : "#4B5563", color: (!filterState && !filterCity) ? C.asphalt : "#fff", border: "none", cursor: "pointer", fontWeight: (!filterState && !filterCity) ? 700 : 400 }}
          >
            All India
          </button>
          {answers?.stateObj && (
            <button 
              onClick={handleNearMe} 
              style={{ ...body, fontSize: 14, padding: "8px 16px", borderRadius: 20, background: (filterState === answers.stateObj.name) ? C.amber : "#4B5563", color: (filterState === answers.stateObj.name) ? C.asphalt : "#fff", border: "none", cursor: "pointer", fontWeight: (filterState === answers.stateObj.name) ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}
            >
              <MapPin size={14} /> Near Me
            </button>
          )}
          {filterState && filterState !== answers?.stateObj?.name && (
            <button 
              style={{ ...body, fontSize: 14, padding: "8px 16px", borderRadius: 20, background: C.amber, color: C.asphalt, border: "none", cursor: "pointer", fontWeight: 700 }}
            >
              {filterState}
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search college, course or city..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              ...body,
              padding: "16px 24px",
              fontSize: 16,
              borderRadius: 8,
              border: "none",
              flex: 1,
              minWidth: 250,
              maxWidth: 500,
              background: "#374151",
              color: "#fff",
              outline: "none"
            }}
          />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{
              ...body,
              padding: "16px 24px",
              fontSize: 16,
              borderRadius: 8,
              border: "none",
              background: "#374151",
              color: "#fff",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="All Types">All Types</option>
            <option value="Government">Government</option>
            <option value="Government Aided">Government Aided</option>
            <option value="Private">Private</option>
            <option value="Deemed University">Deemed University</option>
            <option value="State University">State University</option>
            <option value="Central University">Central University</option>
            <option value="IIT">IIT</option>
            <option value="NIT">NIT</option>
          </select>
          {(searchTerm || filterType !== "All Types" || filterState) && (
            <button
              onClick={clearFilters}
              style={{ ...disp, padding: "16px 24px", borderRadius: 8, border: "1px solid #4B5563", background: "transparent", color: "#9CA3AF", cursor: "pointer", fontWeight: 700 }}
            >
              CLEAR FILTERS
            </button>
          )}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div style={{ padding: 24, marginTop: -40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: 1200, margin: "0 auto 20px" }}>
          <div style={{ ...disp, fontSize: 14, color: "#666", fontWeight: 700 }}>
            {total > 0 ? `SHOWING ${total} INSTITUTIONS` : "NO RESULTS"}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
          {colleges.length > 0 ? (
            colleges.map((college, idx) => (
              <CollegeCard 
                key={`${college.id}-${idx}`} 
                college={college} 
                delay={(idx % 20) * 0.05} 
                onClick={() => onCollegeSelect(college)} 
                courseMatch={course}
              />
            ))
          ) : (
            !loading && (
              <div style={{ background: "#fff", padding: 60, borderRadius: 16, border: `1px solid ${C.line}`, textAlign: "center", gridColumn: "1 / -1" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 16px" }}>NO INSTITUTIONS FOUND</h3>
                <p style={{ ...body, color: "#666", marginBottom: 24 }}>We couldn't find any verified matches for this specific combination.</p>
                <button
                  onClick={clearFilters}
                  style={{
                    ...disp,
                    background: C.asphalt,
                    color: C.paper,
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: 16,
                    fontWeight: 700
                  }}
                >
                  CLEAR FILTERS
                </button>
              </div>
            )
          )}
        </div>

        {/* Load More & Loading State */}
        <div style={{ textAlign: "center", marginTop: 40, marginBottom: 40 }}>
          {loading && (
            <div style={{ ...disp, color: C.amberDeep, fontWeight: 700, fontSize: 16, animation: "pulse 1.5s infinite" }}>
              SEARCHING COLLEGES...
            </div>
          )}
          {!loading && hasMore && (
            <button
              onClick={() => fetchData(page + 1)}
              style={{
                ...disp,
                background: "transparent",
                color: C.asphalt,
                border: `2px solid ${C.asphalt}`,
                padding: "12px 32px",
                borderRadius: 30,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 700,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.target.style.background = C.asphalt; e.target.style.color = C.paper; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.asphalt; }}
            >
              LOAD MORE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CollegeCard({ college, delay, onClick, courseMatch }) {
  const [hover, setHover] = useState(false);
  const isExactMatch = courseMatch && college.courses && college.courses.includes(courseMatch.id);
  const isRelatedMatch = courseMatch && !isExactMatch && college.courses && college.courses.some(c => c.includes(courseMatch.id.split('-')[0]));

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${hover ? C.amber : "#E5E7EB"}`,
        boxShadow: hover ? "0 12px 24px rgba(0,0,0,0.05)" : "0 4px 6px rgba(0,0,0,0.02)",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        animation: `slideUp 0.4s ease backwards ${delay}s`
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ 
            ...disp, 
            fontSize: 12, 
            background: C.paper, 
            padding: "4px 10px", 
            borderRadius: 20,
            fontWeight: 700,
            color: C.asphalt,
            border: `1px solid ${C.line}`
          }}>
            {college.type.toUpperCase()}
          </span>
          {college.source === "ROADWORK DEMO DATA" && (
            <span style={{ 
              ...disp, 
              fontSize: 12, 
              background: "#FEE2E2", 
              padding: "4px 10px", 
              borderRadius: 20,
              fontWeight: 700,
              color: "#991B1B",
              border: `1px solid #FCA5A5`
            }}>
              DEMO DATA
            </span>
          )}
        </div>
        <span style={{ ...disp, fontSize: 13, color: C.route, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={12} /> {college.location.city.toUpperCase()}
        </span>
      </div>

      <h3 style={{ ...disp, fontSize: 24, margin: "0 0 10px", lineHeight: 1.2 }}>
        {college.name}
      </h3>
      
      <p style={{ ...body, fontSize: 14, color: "#666", marginBottom: 20, flex: 1 }}>
        {college.university !== "Information unavailable" ? `${college.university} • ` : ""}
        {college.location.state}
      </p>

      {courseMatch && (isExactMatch || isRelatedMatch) && (
        <div style={{ background: isExactMatch ? "#ECFCCB" : "#F3F4F6", color: isExactMatch ? "#4D7C0F" : "#4B5563", padding: "6px 12px", borderRadius: 6, marginBottom: 16, fontSize: 12, ...disp, fontWeight: 700, display: "inline-block", width: "fit-content" }}>
          {isExactMatch ? "EXACT COURSE MATCH" : "RELATED PROGRAM"}
        </div>
      )}

      <div style={{ background: C.paperDim || "#F9FAFB", padding: 16, borderRadius: 12, marginBottom: 24 }}>
        <InfoRow label="Admission" value={college.admissionRoutes[0] || "Check website"} />
        <InfoRow label="Data Source" value={college.source} />
      </div>

      <button
        style={{
          ...disp,
          width: "100%",
          padding: "14px 16px",
          background: hover ? C.amber : "transparent",
          color: hover ? C.asphalt : C.asphalt,
          border: `2px solid ${hover ? C.amber : C.asphalt}`,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>VIEW DETAILS</span>
        <span>→</span>
      </button>
    </div>
  );
}
