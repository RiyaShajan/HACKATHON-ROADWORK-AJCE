import { C, disp, body, DemoTag, SectionLabel } from "./UI";

function whyFoundThis(answers, career) {
  const iMatch = career.interestCategories.filter((c) =>
    (answers.interests || []).includes(c)
  );
  if (iMatch.length > 0) {
    return `Because you selected ${iMatch[0]} and this role heavily relies on that.`;
  }
  const sMatch = career.requiredSkills.filter((s) => (answers.skills || []).includes(s));
  if (sMatch.length > 0) {
    return `Because you already have ${sMatch[0]} skills, which are core to this role.`;
  }
  return `This is a high-demand role in your region that matches your budget focus.`;
}

function CareerCard({ result, onOpen, answers, isSurprise }) {
  const { career, final, breakdown } = result;
  const why = whyFoundThis(answers, career);

  return (
    <div
      style={{
        background: "#fff",
        border: `2px solid ${isSurprise ? C.amber : C.line}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 20,
        position: "relative",
      }}
    >
      {/* Category colour bar */}
      <div style={{ height: 6, background: career.color }} />

      {isSurprise && (
        <div style={{ position: "absolute", top: 18, right: 22 }}>
          <span style={{ ...disp, fontSize: 12, fontWeight: 700, color: C.amberDeep, background: "#FFF7E0", padding: "4px 8px", borderRadius: 4 }}>
            ★ SURPRISE ROUTE
          </span>
        </div>
      )}

      <div style={{ padding: 22 }}>
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ ...body, fontSize: 12, color: C.sub, fontWeight: 600 }}>
              {career.category}
            </div>
            <div style={{ ...disp, fontSize: 24, fontWeight: 700, color: C.ink }}>
              {career.name}
            </div>
          </div>
          {!isSurprise && (
            <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
              <div style={{ ...disp, fontSize: 30, fontWeight: 800, color: C.route }}>
                {final}%
              </div>
              <div style={{ ...body, fontSize: 11, color: C.sub }}>match</div>
            </div>
          )}
        </div>

        <p
          style={{
            ...body,
            fontSize: 14.5,
            color: "#3E3D38",
            lineHeight: 1.5,
            margin: "12px 0",
            paddingRight: isSurprise ? 100 : 0,
          }}
        >
          {career.description}
        </p>

        {/* WHY ROADWORK FOUND THIS */}
        <div
          style={{
            background: isSurprise ? "#FFF7E0" : C.routeLight,
            borderRadius: 6,
            padding: "8px 12px",
            marginBottom: 14,
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <span
            style={{ color: isSurprise ? C.amberDeep : C.route, fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}
          >
            ▶
          </span>
          <div>
            <span
              style={{
                ...body,
                fontSize: 10.5,
                fontWeight: 700,
                color: isSurprise ? C.amberDeep : C.route,
                marginRight: 5,
                letterSpacing: 0.3,
              }}
            >
              {isSurprise ? "WHY A SURPRISE?" : "WHY ROADWORK FOUND THIS"}
            </span>
            <span style={{ ...body, fontSize: 13, color: C.ink }}>
              {isSurprise ? "You might not have considered this, but your core strengths actually align with it perfectly." : why}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 14 }}>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Salary range (demo)</div>
            <div style={{ ...disp, fontSize: 16, fontWeight: 700, color: C.ink }}>
              ${career.salaryRange[0].toLocaleString()}–${career.salaryRange[1].toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Regional demand (demo)</div>
            <div style={{ ...disp, fontSize: 16, fontWeight: 700, color: C.ink }}>
              {breakdown.localDemand}/100
            </div>
          </div>
          <div>
            <div style={{ ...body, fontSize: 11.5, color: C.sub }}>Key skills</div>
            <div style={{ ...body, fontSize: 13, fontWeight: 600, color: C.ink }}>
              {career.requiredSkills.slice(0, 2).join(", ")}
            </div>
          </div>
        </div>

        <button
          onClick={onOpen}
          style={{
            ...disp,
            fontSize: 16,
            fontWeight: 700,
            background: C.asphalt,
            color: C.amber,
            border: "none",
            padding: "10px 20px",
            borderRadius: 7,
            cursor: "pointer",
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}

export default function Results({ results, surprise, answers, onOpen, onCompare }) {
  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 80px" }}>
        <DemoTag children="RESULTS" />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 4 }}>
          <h2
            style={{
              ...disp,
              fontSize: 34,
              fontWeight: 700,
              marginTop: 14,
              margin: 0,
              color: C.ink,
            }}
          >
            Your Top Career Paths
          </h2>
          <button 
            onClick={onCompare}
            style={{ ...disp, fontSize: 15, fontWeight: 700, background: "none", border: `2px solid ${C.line}`, padding: "6px 12px", borderRadius: 6, cursor: "pointer", color: C.ink }}
          >
            Compare Routes
          </button>
        </div>

        <p style={{ ...body, fontSize: 15, color: C.sub, marginBottom: 28 }}>
          Ranked by an explainable match score: interest fit, skill fit, regional demand,
          salary potential and accessibility.
        </p>

        {results.map((r) => (
          <CareerCard
            key={r.career.id}
            result={r}
            onOpen={() => onOpen(r)}
            answers={answers}
          />
        ))}

        {surprise && (
          <div style={{ marginTop: 40 }}>
            <SectionLabel>SOMETHING DIFFERENT</SectionLabel>
            <CareerCard
              result={surprise}
              onOpen={() => onOpen(surprise)}
              answers={answers}
              isSurprise={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
