import { useState } from "react";
import { C, disp, body, SectionLabel, InfoRow } from "./UI";
import { EXAMS } from "../data/exams";

export default function AdmissionRoadmap({ college, onBack }) {
  // Find exams applicable to this college
  const relevantExams = EXAMS.filter(e => college.entranceExams.includes(e.id));
  const [selectedExam, setSelectedExam] = useState(relevantExams.length > 0 ? relevantExams[0] : null);

  const roadmapSteps = [
    { title: "RESEARCH", status: "Completed" },
    { title: "CHECK ELIGIBILITY", status: "Current" },
    { title: "PREPARE", status: "Locked" },
    { title: "APPLY", status: "Locked" },
    { title: "EXAM", status: "Locked" },
    { title: "RESULT", status: "Locked" },
    { title: "COUNSELLING", status: "Locked" },
    { title: "ADMISSION", status: "Locked" },
  ];

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.asphalt }}>
      {/* HEADER */}
      <div style={{ background: C.asphalt, color: C.paper, padding: "40px 24px 80px", position: "relative" }}>
        <button
          onClick={onBack}
          style={{ ...disp, background: "transparent", color: C.amber, border: "none", cursor: "pointer", fontSize: 16, padding: 0, marginBottom: 24, fontWeight: 700 }}
        >
          ← BACK TO {college.name.toUpperCase()}
        </button>
        <SectionLabel>YOUR ADMISSION CHECKPOINT</SectionLabel>
        <h1 style={{ ...disp, fontSize: 48, margin: "16px 0", lineHeight: 1.1 }}>
          ENTRANCE EXAM NAVIGATOR
        </h1>
        <p style={{ ...body, fontSize: 18, color: "#9CA3AF", maxWidth: 600 }}>
          Understand the admission pathway and entrance exam requirements for this destination.
        </p>
      </div>

      <div style={{ padding: 24, marginTop: -40, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start", maxWidth: 1200, margin: "0 auto" }}>
        
        {/* EXAM SELECTOR & DETAILS */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 24 }}>
          {relevantExams.length > 0 ? (
            <>
              {/* Tabs for multiple exams if needed, usually just 1 or 2 */}
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                {relevantExams.map(exam => (
                  <button
                    key={exam.id}
                    onClick={() => setSelectedExam(exam)}
                    style={{
                      ...disp,
                      padding: "12px 24px",
                      background: selectedExam?.id === exam.id ? C.asphalt : "#fff",
                      color: selectedExam?.id === exam.id ? C.amber : C.asphalt,
                      border: `2px solid ${C.asphalt}`,
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {exam.name}
                  </button>
                ))}
              </div>

              {selectedExam && (
                <div style={{ background: "#fff", borderRadius: 16, border: `1px solid #E5E7EB`, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", animation: "fadeIn 0.3s ease" }}>
                  <h2 style={{ ...disp, fontSize: 32, margin: "0 0 16px" }}>{selectedExam.name}</h2>
                  <p style={{ ...body, color: "#666", marginBottom: 24 }}>{selectedExam.purpose}</p>
                  
                  <div style={{ background: C.paper, padding: 16, borderRadius: 12, marginBottom: 24 }}>
                    <InfoRow label="Level" value={selectedExam.level} />
                    <InfoRow label="Eligibility" value={selectedExam.eligibility} />
                    <InfoRow label="Pattern" value={selectedExam.examPattern} />
                    <InfoRow label="Important" value={selectedExam.importantDates} />
                  </div>
                  
                  <h3 style={{ ...disp, fontSize: 20, margin: "0 0 12px" }}>Subjects Tested</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
                    {selectedExam.subjects.map(s => (
                      <span key={s} style={{ ...body, background: C.asphalt, color: C.paper, padding: "6px 12px", borderRadius: 20, fontSize: 14 }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={selectedExam.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...disp,
                      display: "block",
                      textAlign: "center",
                      padding: 16,
                      background: C.amber,
                      color: C.asphalt,
                      textDecoration: "none",
                      borderRadius: 8,
                      fontSize: 18,
                      fontWeight: 700
                    }}
                  >
                    VERIFY OFFICIAL REQUIREMENTS →
                  </a>
                </div>
              )}
            </>
          ) : (
             <div style={{ background: "#fff", borderRadius: 16, border: `1px solid #E5E7EB`, padding: 32 }}>
                <h2 style={{ ...disp, fontSize: 24, margin: "0 0 16px" }}>No Entrance Exam Required</h2>
                <p style={{ ...body, color: "#666" }}>This destination primarily admits students based on merit or direct admission routes.</p>
             </div>
          )}
        </div>

        {/* ROADMAP */}
        <div style={{ flex: "1 1 300px", background: "#fff", borderRadius: 16, border: `1px solid #E5E7EB`, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
          <h3 style={{ ...disp, fontSize: 24, margin: "0 0 32px" }}>YOUR ADMISSION ROADMAP</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", left: 19, top: 20, bottom: 20, width: 2, background: "#E5E7EB", zIndex: 0 }} />
            
            {roadmapSteps.map((step, idx) => {
              const isCompleted = step.status === "Completed";
              const isCurrent = step.status === "Current";
              
              return (
                <div key={step.title} style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 32, position: "relative", zIndex: 1, opacity: isCurrent || isCompleted ? 1 : 0.4 }}>
                  <div style={{ 
                    width: 40, height: 40, borderRadius: 20, 
                    background: isCompleted ? C.route : isCurrent ? C.amber : "#fff",
                    border: `2px solid ${isCompleted ? C.route : isCurrent ? C.amber : "#E5E7EB"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    ...disp, color: isCompleted || isCurrent ? (isCompleted ? "#fff" : C.asphalt) : "#9CA3AF", fontWeight: 700
                  }}>
                    {isCompleted ? "✓" : (idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <h4 style={{ ...disp, fontSize: 20, margin: 0, color: isCurrent ? C.amber : C.asphalt }}>
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <p style={{ ...body, margin: "8px 0 0", color: "#666", fontSize: 14 }}>
                        You are currently reviewing eligibility.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
