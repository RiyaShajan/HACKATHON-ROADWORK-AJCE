import { useState } from "react";
import { C, disp, body, ProgressBar } from "./UI";

export default function CareerComparison({ allResults, onBack }) {
  const [selected, setSelected] = useState([]);

  const toggle = (career) => {
    if (selected.find((s) => s.id === career.id)) {
      setSelected(selected.filter((s) => s.id !== career.id));
    } else {
      if (selected.length < 3) setSelected([...selected, career]);
    }
  };

  return (
    <div style={{ background: C.paper, minHeight: "100vh", padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} style={{ ...body, background: "none", border: "none", color: C.sub, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 }}>
          ← Back to results
        </button>

        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Compare Routes</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 24 }}>Select up to 3 careers to compare side-by-side.</p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {allResults.map(({ career }) => {
            const isSel = !!selected.find((s) => s.id === career.id);
            return (
              <button
                key={career.id}
                onClick={() => toggle(career)}
                style={{
                  ...body,
                  fontSize: 14,
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: `2px solid ${isSel ? C.amber : C.line}`,
                  background: isSel ? C.amber : "#fff",
                  color: isSel ? C.asphalt : C.ink,
                  fontWeight: isSel ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {isSel ? "✓ " : "+ "} {career.name}
              </button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 20 }}>
            {selected.map((career) => (
              <div key={career.id} style={{ flex: 1, minWidth: 260, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ height: 6, background: career.color }} />
                <div style={{ padding: 20 }}>
                  <div style={{ ...disp, fontSize: 24, fontWeight: 700, color: C.ink, marginBottom: 16 }}>{career.name}</div>
                  
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...body, fontSize: 11, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Salary Range</div>
                    <div style={{ ...disp, fontSize: 18, fontWeight: 700, color: C.ink }}>
                      ${career.salaryRange[0].toLocaleString()} – ${career.salaryRange[1].toLocaleString()}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...body, fontSize: 11, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Skill Pathway Time</div>
                    <div style={{ ...body, fontSize: 14, fontWeight: 600, color: C.ink }}>{career.trainingDuration.skill}</div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...body, fontSize: 11, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Regional Demand</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ ...disp, fontSize: 18, fontWeight: 700, color: C.ink }}>{career.localDemand}/100</span>
                    </div>
                    <div style={{ marginTop: 4 }}>
                      <ProgressBar value={career.localDemand} color={career.color} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ ...body, fontSize: 11, color: C.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Key Skills</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {career.requiredSkills.map(s => (
                        <span key={s} style={{ ...body, fontSize: 12, padding: "4px 8px", background: C.paperDim, borderRadius: 4, color: C.ink }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {selected.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", background: C.paperDim, borderRadius: 12 }}>
            <span style={{ ...body, color: C.sub, fontSize: 15 }}>Select a career above to begin comparing.</span>
          </div>
        )}
      </div>
    </div>
  );
}
