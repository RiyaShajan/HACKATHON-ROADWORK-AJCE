import React from "react";
import { C, disp, body, SectionLabel, InfoRow } from "./UI";
import { COURSES } from "../data/courses";

export default function CourseExplorer({ career, onBack, onCourseSelect }) {
  // Find courses related to this career
  const possibleCourses = COURSES.filter(c => c.careerRoutes.includes(career.id));

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.asphalt }}>
      {/* HEADER */}
      <div style={{ background: C.asphalt, color: C.paper, padding: "40px 24px 80px", position: "relative" }}>
        <button
          onClick={onBack}
          style={{ ...disp, background: "transparent", color: C.amber, border: "none", cursor: "pointer", fontSize: 16, padding: 0, marginBottom: 24, fontWeight: 700 }}
        >
          ← BACK TO DESTINATION
        </button>
        <SectionLabel>EDUCATION ROUTES</SectionLabel>
        <h1 style={{ ...disp, fontSize: 48, margin: "16px 0", lineHeight: 1.1 }}>
          CHOOSE YOUR EDUCATION ROUTE
        </h1>
        <p style={{ ...body, fontSize: 18, color: "#9CA3AF", maxWidth: 600 }}>
          Here are the main educational pathways that lead to a career as a {career.title}.
        </p>

        {/* Route visualization */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 40, opacity: 0.8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: C.amber }} />
          <div style={{ height: 2, background: C.amber, flex: 1, maxWidth: 100 }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${C.amber}` }} />
          <div style={{ height: 2, background: C.amber, flex: 1, maxWidth: 100 }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, border: `2px solid ${C.amber}` }} />
        </div>
      </div>

      {/* COURSE CARDS */}
      <div style={{ padding: 24, marginTop: -40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1200, margin: "0 auto" }}>
          {possibleCourses.length > 0 ? (
            possibleCourses.map((course, idx) => (
              <CourseCard key={course.id} course={course} delay={idx * 0.1} onClick={() => onCourseSelect(course)} />
            ))
          ) : (
            <div style={{ background: "#fff", padding: 40, borderRadius: 16, border: `1px solid ${C.paper}`, textAlign: "center" }}>
              <h3 style={{ ...disp, fontSize: 24, margin: "0 0 16px" }}>NO VERIFIED ROUTES FOUND</h3>
              <p style={{ ...body, color: "#666" }}>We are still gathering verified education pathways for this career.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, delay, onClick }) {
  const [hover, setHover] = React.useState(false);

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
        animation: `slideUp 0.5s ease backwards ${delay}s`
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ 
          ...disp, 
          fontSize: 14, 
          background: C.paper, 
          padding: "4px 12px", 
          borderRadius: 20,
          fontWeight: 700,
          color: C.asphalt
        }}>
          {course.level.toUpperCase()}
        </span>
        <span style={{ ...disp, fontSize: 14, color: C.amber, fontWeight: 700 }}>
          {course.duration.toUpperCase()}
        </span>
      </div>

      <h3 style={{ ...disp, fontSize: 28, margin: "0 0 12px", lineHeight: 1.2 }}>
        {course.name}
      </h3>
      
      <p style={{ ...body, fontSize: 15, color: "#666", marginBottom: 24, flex: 1 }}>
        {course.description}
      </p>

      <div style={{ background: C.paper, padding: 16, borderRadius: 12, marginBottom: 24 }}>
        <InfoRow label="Eligibility" value={course.eligibility} />
        <InfoRow label="Admission" value={course.admissionRoute} />
        <InfoRow label="Style" value={course.learningStyle} />
      </div>

      <button
        style={{
          ...disp,
          width: "100%",
          padding: 16,
          background: hover ? C.amber : C.asphalt,
          color: hover ? C.asphalt : C.paper,
          border: "none",
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>EXPLORE COLLEGES</span>
        <span>→</span>
      </button>
    </div>
  );
}
