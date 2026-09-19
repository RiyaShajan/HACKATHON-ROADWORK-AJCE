import { useState, useRef, useEffect } from "react";
import { C, disp, body, StatRow, SectionLabel } from "./UI";

const DETAIL_TABS = [
  "Why This Career",
  "Road Test",
  "Career Route",
  "Roadmap",
  "Ask AI",
];

function Tabs({ tabs, active, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        borderBottom: `2px solid ${C.line}`,
        marginBottom: 28,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            ...disp,
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 13px",
            background: "none",
            border: "none",
            borderBottom: active === t ? `3px solid ${C.amber}` : "3px solid transparent",
            color: active === t ? C.ink : C.sub,
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            letterSpacing: 0.3,
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function RoadTest({ career }) {
  const { scenario, question, options, correctPrefix } = career.roadTest;
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected && selected.startsWith(correctPrefix);

  return (
    <div>
      <SectionLabel>TRY THE WORK: MINI SCENARIO</SectionLabel>
      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <p style={{ ...body, fontSize: 15, color: C.ink, fontWeight: 600, marginBottom: 12 }}>{scenario}</p>
        <p style={{ ...body, fontSize: 14, color: C.sub, marginBottom: 20 }}>{question}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => !submitted && setSelected(opt)}
              disabled={submitted}
              style={{
                ...body,
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: 8,
                border: `2px solid ${selected === opt ? C.amber : C.line}`,
                background: selected === opt ? "#FFF7E0" : "#fff",
                color: C.ink,
                fontSize: 14,
                cursor: submitted ? "default" : "pointer",
                opacity: submitted && selected !== opt ? 0.6 : 1,
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        {!submitted && selected && (
          <button
            onClick={() => setSubmitted(true)}
            style={{ ...disp, fontSize: 16, fontWeight: 700, background: C.asphalt, color: C.amber, border: "none", padding: "10px 20px", borderRadius: 8, marginTop: 20, cursor: "pointer" }}
          >
            Submit Answer
          </button>
        )}

        {submitted && (
          <div style={{ marginTop: 20, padding: 16, background: isCorrect ? C.routeLight : "#FFF0EE", borderRadius: 8, border: `1px solid ${isCorrect ? C.route : C.danger}44` }}>
            <span style={{ ...body, fontSize: 15, fontWeight: 600, color: isCorrect ? C.route : C.danger }}>
              {isCorrect ? "Great instinct! That's exactly how this role approaches problems." : "Not quite, but that's okay! This field is all about learning these exact patterns."}
            </span>
          </div>
        )}
      </div>

      {submitted && (
        <div style={{ marginTop: 32 }}>
          <SectionLabel>EXPLORATION SCORE</SectionLabel>
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 }}>
            <p style={{ ...body, fontSize: 14, color: C.ink, marginBottom: 16 }}>
              How much did you enjoy thinking through that scenario?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setScore(n)}
                  style={{
                    flex: 1,
                    padding: "12px 0",
                    borderRadius: 8,
                    border: `2px solid ${score === n ? C.amber : C.line}`,
                    background: score === n ? C.amber : "#fff",
                    color: score === n ? C.asphalt : C.ink,
                    ...disp,
                    fontSize: 20,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            {score > 0 && (
              <p style={{ ...body, fontSize: 13, color: C.sub, marginTop: 12, textAlign: "center" }}>
                Score saved to your profile. This helps ROADWORK refine your recommendations!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RoadmapView({ career }) {
  const { roadmap } = career;
  return (
    <div>
      <SectionLabel>YOUR NEXT 30 DAYS</SectionLabel>
      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 20, marginBottom: 30 }}>
        {Object.entries(roadmap).map(([week, task], i) => (
          <div key={week} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: i === 3 ? 0 : 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.amber, color: C.asphalt, ...disp, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              W{i + 1}
            </div>
            <div style={{ ...body, fontSize: 14.5, color: C.ink, paddingTop: 4, lineHeight: 1.4 }}>
              {task}
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>1-2 YEAR PATHWAY</SectionLabel>
      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 }}>
        {career.skillPathway.map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.route, flexShrink: 0, marginTop: 4 }} />
              {i < career.skillPathway.length - 1 && <div style={{ width: 2, height: 30, background: C.line }} />}
            </div>
            <div style={{ ...body, fontSize: 14, paddingBottom: 14, color: C.ink }}>{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AiAssistant({ career, profile, answers, college, contextType = "career" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const suggested = contextType === "career" ? [
    "Why did you recommend this career?",
    "Can I do this without a degree?",
    "What should I learn first?",
  ] : [
    "Which courses are best here?",
    "What is the admission process?",
    "Are there good facilities?",
  ];

  async function send(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const locParts = [];
    if (answers?.cityObj) locParts.push(answers.cityObj.name);
    if (answers?.stateObj) locParts.push(answers.stateObj.name);
    if (answers?.countryObj) locParts.push(answers.countryObj.name);
    const locationString = locParts.length > 0 ? locParts.join(", ") : "Unknown Location";

    let systemPrompt = `You are the Roadwork career assistant. Answer ONLY using the provided data. Keep answers short (3-5 sentences), encouraging, and specific. Do not invent statistics or fake information. If you don't know, say so.`;
    
    if (contextType === "career") {
      systemPrompt += `\n\nCAREER DATA:\n${JSON.stringify(career)}\n\nSTUDENT PROFILE:\n${JSON.stringify(profile)}`;
      systemPrompt += `\n\nThe student is located in: ${locationString}\nThey are open to relocating: ${answers?.relocation || "Not specified"}`;
    } else if (contextType === "college") {
      systemPrompt += `\n\nCOLLEGE DATA:\n${JSON.stringify(college)}`;
    }

    try {
      const apiKey = (typeof import.meta !== "undefined" && import.meta.env)
        ? import.meta.env.VITE_ANTHROPIC_KEY || ""
        : "";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 600,
          system: systemPrompt,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error("API Error");
      
      const txt = (data.content || []).map((b) => b.text).join("\n").trim() || "Sorry, I couldn't generate a response.";
      setMessages((m) => [...m, { role: "assistant", content: txt }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "The AI assistant is unavailable in demo mode without a configured API key." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 18, minHeight: 200, maxHeight: 360, overflowY: "auto", marginBottom: 14 }}>
        {messages.length === 0 && (
          <div style={{ ...body, fontSize: 14, color: C.sub, marginBottom: 14 }}>
            Ask about {contextType === "career" ? career?.name : college?.name} — answers are grounded in verified data.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ ...body, fontSize: 14, marginBottom: 10, padding: "10px 14px", borderRadius: 10, maxWidth: "85%", lineHeight: 1.5, background: m.role === "user" ? C.routeLight : C.paperDim, marginLeft: m.role === "user" ? "auto" : 0, color: C.ink }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ ...body, fontSize: 13, color: C.sub }}>Thinking…</div>}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {suggested.map((s) => (
          <button key={s} onClick={() => send(s)} style={{ ...body, fontSize: 12.5, padding: "7px 12px", borderRadius: 20, border: `1px solid ${C.line}`, background: "#fff", color: C.ink, cursor: "pointer" }}>{s}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)} placeholder={`Ask something about this ${contextType === "career" ? "career" : "institution"}…`} style={{ ...body, flex: 1, padding: "12px 14px", borderRadius: 8, border: `2px solid ${C.line}`, fontSize: 14, color: C.ink, background: "#fff", outline: "none" }} />
        <button onClick={() => send(input)} disabled={loading} style={{ ...disp, fontWeight: 700, fontSize: 15, background: C.asphalt, color: C.amber, border: "none", padding: "0 22px", borderRadius: 8, cursor: loading ? "default" : "pointer" }}>Send</button>
      </div>
    </div>
  );
}

export default function CareerDetail({ result, profile, answers, onBack, onFindCourses }) {
  const [tab, setTab] = useState("Why This Career");
  const { career, breakdown } = result;

  const weightedRows = [
    { label: "Interest Match", value: breakdown.interestMatch, weight: "× 35%", color: C.route },
    { label: "Skill Match", value: breakdown.skillMatch, weight: "× 25%", color: C.route },
    { label: "Regional Demand", value: breakdown.localDemand, weight: "× 20%", color: C.amberDeep },
    { label: "Salary Potential", value: breakdown.salaryPotential, weight: "× 10%", color: C.amberDeep },
    { label: "Accessibility", value: breakdown.accessibility, weight: "× 10%", color: C.amberDeep },
  ];

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
        <button onClick={onBack} style={{ ...body, background: "none", border: "none", color: C.sub, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 }}>
          ← Back to results
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: career.color }} />
          <span style={{ ...body, fontSize: 13, fontWeight: 600, color: C.sub }}>{career.category}</span>
        </div>
        <h1 style={{ ...disp, fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, margin: "0 0 6px", color: C.ink }}>
          {career.name}
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, color: C.route }}>
            {result.final}% match
          </div>
          <button 
            onClick={() => onFindCourses(career)}
            style={{ ...disp, fontSize: 14, fontWeight: 700, background: C.asphalt, color: C.paper, border: "none", padding: "8px 16px", borderRadius: 6, cursor: "pointer" }}
          >
            Find Where To Study
          </button>
        </div>
        <p style={{ ...body, fontSize: 15.5, color: "#3E3D38", lineHeight: 1.55, marginBottom: 28 }}>
          {career.description}
        </p>

        <Tabs tabs={DETAIL_TABS} active={tab} onChange={setTab} />

        {tab === "Why This Career" && (
          <div>
            <SectionLabel>MATCH BREAKDOWN</SectionLabel>
            <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "20px 20px 14px", marginBottom: 16 }}>
              {weightedRows.map(({ label, value, weight, color }) => (
                <StatRow key={label} label={label} value={value} color={color} note={weight} />
              ))}
              <div style={{ borderTop: `2px solid ${C.line}`, marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ ...disp, fontSize: 16, fontWeight: 700, color: C.ink }}>Overall Match</span>
                <span style={{ ...disp, fontSize: 30, fontWeight: 800, color: C.route }}>{result.final}%</span>
              </div>
            </div>
          </div>
        )}

        {tab === "Road Test" && <RoadTest career={career} />}
        
        {tab === "Career Route" && (
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ ...disp, fontSize: 17, fontWeight: 700, color: "#3E6C99", marginBottom: 14 }}>Degree Path</div>
              {career.degreePathway.map((s, i) => <div key={i} style={{ ...body, fontSize: 14, marginBottom: 8, color: C.ink }}>• {s}</div>)}
              <div style={{ marginTop: 14, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, padding: 14, ...body, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: C.sub }}>Duration</span><span style={{ fontWeight: 600 }}>{career.trainingDuration.degree}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.sub }}>Cost</span><span style={{ fontWeight: 600 }}>{career.cost.degree}</span></div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ ...disp, fontSize: 17, fontWeight: 700, color: C.amberDeep, marginBottom: 14 }}>Skill Path</div>
              {career.skillPathway.map((s, i) => <div key={i} style={{ ...body, fontSize: 14, marginBottom: 8, color: C.ink }}>• {s}</div>)}
              <div style={{ marginTop: 14, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 8, padding: 14, ...body, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ color: C.sub }}>Duration</span><span style={{ fontWeight: 600 }}>{career.trainingDuration.skill}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.sub }}>Cost</span><span style={{ fontWeight: 600 }}>{career.cost.skill}</span></div>
              </div>
            </div>
          </div>
        )}

        {tab === "Roadmap" && <RoadmapView career={career} />}
        
        {tab === "Ask AI" && <AiAssistant career={career} profile={profile} answers={answers} />}
      </div>
    </div>
  );
}
