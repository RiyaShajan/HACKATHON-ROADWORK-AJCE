import { useState } from "react";
import { C, disp, body, SectionLabel } from "./UI";
import { AiAssistant } from "./Detail";

export default function CollegeDetail({ college, onBack, onExams }) {
  const [activeTab, setActiveTab] = useState("COURSES");
  
  // Only show tabs if there is actually data
  const availableTabs = ["COURSES"];
  if (college.admissionRoutes && college.admissionRoutes.length > 0) availableTabs.push("ADMISSION");
  if (college.facilities && Object.keys(college.facilities).length > 0) availableTabs.push("FACILITIES");
  if (college.hostel && college.hostel !== "Information unavailable") availableTabs.push("HOSTEL");
  if (college.scholarships && college.scholarships.length > 0) availableTabs.push("SCHOLARSHIPS");
  availableTabs.push("ASK AI");
  
  // Ensure the active tab exists
  if (!availableTabs.includes(activeTab)) {
    setActiveTab(availableTabs[0]);
  }

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.asphalt }}>
      {/* HEADER */}
      <div style={{ background: C.asphalt, color: C.paper, padding: "40px 24px 80px", position: "relative" }}>
        <button
          onClick={onBack}
          style={{ ...disp, background: "transparent", color: C.amber, border: "none", cursor: "pointer", fontSize: 16, padding: 0, marginBottom: 24, fontWeight: 700 }}
        >
          ← BACK TO DESTINATIONS
        </button>
        <SectionLabel>COLLEGE DESTINATION</SectionLabel>
        
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, marginBottom: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.route }} />
          <span style={{ ...disp, fontSize: 16, letterSpacing: 1, color: C.route, fontWeight: 700 }}>
            {college.location.city.toUpperCase()}, {college.location.state.toUpperCase()}
          </span>
        </div>
        
        <h1 style={{ ...disp, fontSize: 48, margin: "0 0 16px", lineHeight: 1.1 }}>
          {college.name}
        </h1>
        
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: 0.9 }}>
          <span style={{ ...body, padding: "6px 14px", border: `1px solid ${C.paper}`, borderRadius: 20 }}>
            {college.type}
          </span>
          {college.university !== "Information unavailable" && (
            <span style={{ ...body, padding: "6px 14px", border: `1px solid ${C.paper}`, borderRadius: 20 }}>
              {college.university}
            </span>
          )}
          <span style={{ ...body, padding: "6px 14px", border: `1px solid ${C.paper}`, borderRadius: 20 }}>
            Verified: {college.lastVerified}
          </span>
          <span style={{ ...body, padding: "6px 14px", border: `1px solid ${C.paper}`, borderRadius: 20 }}>
            Source: {college.source}
          </span>
        </div>

        {college.officialWebsite !== "Information unavailable" && (
          <a
            href={college.officialWebsite.includes("http") ? college.officialWebsite : `https://${college.officialWebsite}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...disp, display: "inline-block", marginTop: 24, background: C.amber, color: C.asphalt, padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}
          >
            OFFICIAL WEBSITE ↗
          </a>
        )}
      </div>

      <div style={{ padding: 24, marginTop: -40 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", background: "#fff", borderRadius: 16, border: `1px solid #E5E7EB`, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          
          {/* TABS */}
          <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB", overflowX: "auto" }}>
            {availableTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...disp,
                  flex: 1,
                  padding: "20px 24px",
                  background: activeTab === tab ? C.paper : "transparent",
                  color: activeTab === tab ? C.asphalt : "#6B7280",
                  border: "none",
                  borderBottom: activeTab === tab ? `3px solid ${C.amber}` : "3px solid transparent",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div style={{ padding: 40 }}>
            {activeTab === "COURSES" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Programs & Courses</h3>
                {college.courses.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {college.courses.map(c => (
                      <div key={c} style={{ background: C.paper, padding: "12px 24px", borderRadius: 8, ...body, fontWeight: 500 }}>
                        {c.replace("btech-", "B.Tech ").toUpperCase()}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ ...body, color: "#666" }}>Detailed course list unavailable.</p>
                )}
                
                {college.feeInfo !== "Information unavailable" && (
                  <div style={{ marginTop: 32, background: C.paperDim || "#F9FAFB", padding: 24, borderRadius: 12 }}>
                    <h4 style={{ ...disp, fontSize: 18, margin: "0 0 8px" }}>Fee Structure</h4>
                    <p style={{ ...body, fontSize: 16, color: "#666" }}>{college.feeInfo}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "ADMISSION" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Admission Routes</h3>
                <ul style={{ ...body, fontSize: 18, lineHeight: 1.6, paddingLeft: 24 }}>
                  {college.admissionRoutes.map((route, i) => <li key={i} style={{ marginBottom: 12 }}>{route}</li>)}
                </ul>
                {college.entranceExams && college.entranceExams.length > 0 && (
                  <button
                    onClick={onExams}
                    style={{
                      ...disp,
                      marginTop: 24,
                      padding: "16px 32px",
                      background: C.amber,
                      color: C.asphalt,
                      border: "none",
                      borderRadius: 8,
                      fontSize: 18,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    VIEW ENTRANCE EXAM DETAILS →
                  </button>
                )}
              </div>
            )}

            {activeTab === "FACILITIES" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Campus Facilities</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                  {Object.entries(college.facilities).map(([facility, status]) => (
                    <div key={facility} style={{ background: C.paper, padding: 16, borderRadius: 8, border: `1px solid ${status === "Available" ? C.route : "#E5E7EB"}` }}>
                      <div style={{ ...disp, fontSize: 18, marginBottom: 8, color: C.asphalt }}>{facility}</div>
                      <div style={{ ...body, fontSize: 14, color: status === "Available" ? C.route : "#6B7280", display: "flex", alignItems: "center", gap: 8 }}>
                        {status === "Available" ? "✓" : "?"} {status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "HOSTEL" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Hostel & Accommodation</h3>
                <p style={{ ...body, fontSize: 18, lineHeight: 1.6 }}>{college.hostel}</p>
              </div>
            )}

            {activeTab === "SCHOLARSHIPS" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Scholarships & Financial Aid</h3>
                <ul style={{ ...body, fontSize: 18, lineHeight: 1.6, paddingLeft: 24 }}>
                  {college.scholarships.map((sch, i) => <li key={i} style={{ marginBottom: 12 }}>{sch}</li>)}
                </ul>
              </div>
            )}

            {activeTab === "ASK AI" && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h3 style={{ ...disp, fontSize: 24, margin: "0 0 24px" }}>Ask AI About This College</h3>
                <AiAssistant college={college} contextType="college" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
