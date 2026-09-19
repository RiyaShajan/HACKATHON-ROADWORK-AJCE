import { C, disp, body, StatRow, DemoTag, SectionLabel } from "./UI";

function CareerDNA({ profile, answers }) {
  const bars = 10;
  const makeBar = (pct) => {
    const n = Math.round((pct / 100) * bars);
    return "█".repeat(n) + "░".repeat(bars - n);
  };

  const workStyleLabel = answers.workStyleScenario ? answers.workStyleScenario.split(":")[0] : "Mixed";
  const learningPath = answers.pathwayPref || "Open";
  const constraintLabel = answers.budget || "Balanced";
  const locParts = [];
  if (answers.cityObj) locParts.push(answers.cityObj.name);
  if (answers.stateObj) locParts.push(answers.stateObj.name);
  if (answers.countryObj) locParts.push(answers.countryObj.name);
  const locationLabel = locParts.length > 0 ? locParts.join(", ") : "Global";

  return (
    <div style={{ background: C.asphalt, borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
      <SectionLabel>YOUR CAREER DNA</SectionLabel>
      <div style={{ fontFamily: "'Courier New', Courier, monospace", marginBottom: 16 }}>
        {Object.entries(profile.traits).map(([trait, val]) => (
          <div key={trait} style={{ display: "grid", gridTemplateColumns: "148px 1fr 40px", gap: 10, alignItems: "center", marginBottom: 6 }}>
            <span style={{ color: "#9CA3AF", fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trait}</span>
            <span style={{ color: C.amber, fontSize: 13, letterSpacing: 1 }}>{makeBar(val)}</span>
            <span style={{ color: C.paper, fontWeight: 700, fontSize: 13, textAlign: "right" }}>{val}%</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14, display: "flex", gap: 24, flexWrap: "wrap" }}>
        {[
          ["STARTING FROM", locationLabel],
          ["WORK STYLE", workStyleLabel],
          ["LEARNING PATH", learningPath],
          ["PRIMARY FOCUS", constraintLabel],
        ].map(([k, v]) => (
          <div key={k}>
            <div style={{ ...body, fontSize: 10, color: "#6B6A62", marginBottom: 2, letterSpacing: 0.5 }}>{k}</div>
            <div style={{ ...disp, fontSize: 15, fontWeight: 700, color: C.paper }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Profile({ answers, profile, onContinue }) {
  const topInterests = answers.topInterests || [];
  
  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 64px" }}>
        <DemoTag children="MY ROADWORK JOURNEY" />
        <h2 style={{ ...disp, fontSize: 34, fontWeight: 700, marginTop: 14, marginBottom: 4, color: C.ink }}>
          Your Student Profile
        </h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 24 }}>
          Built from your assessment signals. This drives your career matches.
        </p>

        {/* Top Interests highlight */}
        {topInterests.length > 0 && (
          <div style={{ background: "#FFF7E0", border: `1px solid ${C.amber}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ ...disp, fontSize: 14, fontWeight: 700, color: C.amberDeep, letterSpacing: 1, marginBottom: 10 }}>YOUR CORE INTERESTS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {topInterests.map((t, i) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", padding: "8px 14px", borderRadius: 8, border: `1px solid ${C.amber}66` }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.amber, color: C.asphalt, ...disp, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
                  <span style={{ ...body, fontSize: 15, fontWeight: 600, color: C.ink }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <CareerDNA profile={profile} answers={answers} />

        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>Trait Strengths</div>
          {Object.entries(profile.traits).map(([k, v]) => (
            <StatRow key={k} label={k} value={v} color={C.route} />
          ))}
        </div>

        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ ...disp, fontSize: 18, fontWeight: 700, marginBottom: 16, color: C.ink }}>Skill Map (Self-Reported)</div>
          {Object.entries(profile.skills)
            .filter(([, v]) => v >= 30)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([k, v]) => (
              <StatRow key={k} label={k} value={v} color={C.amberDeep} />
            ))}
          <div style={{ ...body, fontSize: 13, color: C.sub, marginTop: 16, padding: 12, background: C.paperDim, borderRadius: 8, borderLeft: `3px solid ${C.amberDeep}` }}>
            <strong>Interest vs Skill:</strong> Your interest in some areas might be ahead of your current skill level. That's totally normal. Your roadmap will help you focus on building those missing skills.
          </div>
        </div>

        <button
          onClick={onContinue}
          style={{
            ...disp, fontSize: 19, fontWeight: 700, background: C.amber, color: C.asphalt,
            border: "none", padding: "15px 30px", borderRadius: 8, cursor: "pointer", width: "100%"
          }}
        >
          See My Top Career Paths →
        </button>
      </div>
    </div>
  );
}
