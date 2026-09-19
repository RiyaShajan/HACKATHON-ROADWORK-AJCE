/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";

export function useFonts() {
  useEffect(() => {
    const id = "roadwork-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

export const C = {
  asphalt: "#1B1D21",
  asphalt2: "#26292E",
  paper: "#F4F2EC",
  paperDim: "#E7E4DA",
  amber: "#F2B705",
  amberDeep: "#C98F02",
  route: "#2F6B4F",
  routeLight: "#E4EFE8",
  line: "#D8D4C6",
  ink: "#1B1D21",
  sub: "#5B5A54",
  danger: "#B23A2E",
};

export const disp = { fontFamily: "'Barlow Condensed', sans-serif" };
export const body = { fontFamily: "'Work Sans', sans-serif" };

export const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

export function ProgressBar({ value, color = C.amber, track = "rgba(0,0,0,0.08)", h = 8 }) {
  return (
    <div style={{ background: track, height: h, borderRadius: h }}>
      <div
        style={{
          width: `${clamp(value)}%`,
          background: color,
          height: h,
          borderRadius: h,
          transition: "width 500ms ease",
        }}
      />
    </div>
  );
}

export function StatRow({ label, value, color = C.route, note }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
          <span style={{ ...body, fontSize: 14, color: C.ink }}>{label}</span>
          {note && (
            <span style={{ ...body, fontSize: 11, color: C.sub, whiteSpace: "nowrap" }}>
              {note}
            </span>
          )}
        </div>
        <span style={{ ...disp, fontSize: 16, fontWeight: 700, color, flexShrink: 0 }}>
          {value}%
        </span>
      </div>
      <ProgressBar value={value} color={color} />
    </div>
  );
}

export function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...body,
        padding: "10px 16px",
        borderRadius: 8,
        border: `2px solid ${active ? C.amber : C.line}`,
        background: active ? C.amber : "#fff",
        color: active ? C.asphalt : C.ink,
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      {children}
    </button>
  );
}

export function DemoTag({ children = "DEMO / REGIONAL DATA" }) {
  return (
    <span
      style={{
        ...body,
        fontSize: 10.5,
        fontWeight: 600,
        letterSpacing: 0.3,
        color: C.sub,
        background: C.paperDim,
        border: `1px solid ${C.line}`,
        borderRadius: 5,
        padding: "3px 7px",
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children }) {
  return (
    <div
      style={{
        ...disp,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 2,
        color: C.sub,
        marginBottom: 14,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

export function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 16 }}>
      <span style={{ ...disp, fontSize: 14, color: C.sub, fontWeight: 600, flexShrink: 0, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
      <span style={{ ...body, fontSize: 15, color: C.ink, textAlign: "right", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
