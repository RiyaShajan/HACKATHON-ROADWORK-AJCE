import { useState, useMemo } from "react";
import { C, disp, body, ProgressBar, Pill, SectionLabel } from "./UI";
import {
  INTEREST_CATEGORIES,
  SUBJECT_CATEGORIES, SUBJECT_SUB_INTERESTS,
  STRENGTH_CATEGORIES, STRENGTH_EVIDENCE,
  WORKSTYLE_SCENARIOS, NEGATIVE_PREFERENCES
} from "../data/questions";
import { Country, State, City } from "country-state-city";
import LocationAutocomplete from "./LocationAutocomplete";
import { MapPin } from "lucide-react";

export default function Assessment({ onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const totalSteps = 8;
  const progress = (step / totalSteps) * 100;

  const selectedCountry = answers.countryObj;
  const selectedState = answers.stateObj;
  const selectedCity = answers.cityObj;

  const allCountries = useMemo(() => Country.getAllCountries(), []);
  
  const states = useMemo(() => {
    if (!selectedCountry || selectedCountry.isManual) return [];
    return State.getStatesOfCountry(selectedCountry.isoCode);
  }, [selectedCountry]);

  const cities = useMemo(() => {
    if (!selectedCountry || selectedCountry.isManual) return [];
    if (states.length > 0) {
      if (!selectedState || selectedState.isManual) return [];
      return City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
    }
    return City.getCitiesOfCountry(selectedCountry.isoCode) || [];
  }, [selectedCountry, selectedState, states.length]);

  const setAnswer = (key, val) => setAnswers((a) => ({ ...a, [key]: val }));

  const toggleArray = (key, val, max = null) => {
    const current = answers[key] || [];
    if (current.includes(val)) {
      setAnswer(key, current.filter((x) => x !== val));
    } else {
      if (max && current.length >= max) return;
      setAnswer(key, [...current, val]);
    }
  };

  const next = () => {
    if (step === totalSteps) onComplete(answers);
    else setStep(step + 1);
  };
  const back = () => step > 1 && setStep(step - 1);

  // --- MILE 1: EDUCATION ---
  const renderMile1 = () => {
    const opts = ["Class 9", "Class 10", "Class 11", "Class 12", "Recent Graduate", "Diploma / Vocational Student", "Other"];
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>Where are you starting from?</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
          {opts.map(opt => (
            <button key={opt} onClick={() => setAnswer("education", opt)}
              style={{ ...body, textAlign: "left", padding: "14px 16px", borderRadius: 8, border: `2px solid ${answers.education === opt ? C.amber : C.line}`, background: answers.education === opt ? "#FFF7E0" : "#fff", color: C.ink, fontSize: 15.5, fontWeight: answers.education === opt ? 600 : 400, cursor: "pointer" }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // --- MILE 2: LOCATION ---
  const renderMile2 = () => {
    const handleGps = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              // Very simple reverse geocode using bigdatacloud free api for browser
              const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
              const data = await res.json();
              if (data.countryCode) {
                const c = Country.getCountryByCode(data.countryCode);
                if (c) {
                  setAnswer("countryObj", c);
                  if (data.principalSubdivision) {
                    const sList = State.getStatesOfCountry(c.isoCode);
                    const s = sList.find(x => x.name === data.principalSubdivision || x.isoCode === data.principalSubdivision);
                    if (s) setAnswer("stateObj", s);
                  }
                  if (data.city || data.locality) {
                    setAnswer("cityObj", { name: data.city || data.locality, isManual: true }); // Fallback to manual if exact match not found immediately
                  }
                }
              }
            } catch (e) {
              console.error("Geocoding failed", e);
            }
          },
          (error) => {
            console.warn("Location access denied or failed", error);
            alert("Location access wasn't allowed or failed. Please enter manually.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    const stateLabel = selectedCountry?.isoCode === "US" ? "STATE" : 
                       selectedCountry?.isoCode === "CA" ? "PROVINCE" : 
                       selectedCountry?.isoCode === "GB" ? "REGION / COUNTRY" :
                       selectedCountry?.isoCode === "AU" ? "STATE / TERRITORY" : "STATE / REGION";

    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>Where are you planning your journey from?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Tell us where you're starting. We'll use your region to personalize the routes you explore.</p>
        
        <button 
          onClick={handleGps}
          style={{ ...disp, marginTop: 16, display: "flex", alignItems: "center", gap: 8, background: C.routeLight, color: C.route, border: `1px solid ${C.route}44`, padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700 }}
        >
          <MapPin size={16} /> USE MY LOCATION
        </button>
        <p style={{ ...body, fontSize: 11, color: C.sub, marginTop: 8, opacity: 0.8 }}>
          Your location is used to personalize career and education opportunities. You can enter it manually instead.
        </p>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
          <LocationAutocomplete
            label="COUNTRY"
            placeholder="Search country..."
            items={allCountries}
            value={selectedCountry}
            onChange={(val) => {
              setAnswer("countryObj", val);
              setAnswer("stateObj", null);
              setAnswer("cityObj", null);
            }}
            showManualOption={false}
          />

          {selectedCountry && states.length > 0 && (
            <LocationAutocomplete
              label={stateLabel}
              placeholder={`Search ${stateLabel.toLowerCase()}...`}
              items={states}
              value={selectedState}
              onChange={(val) => {
                setAnswer("stateObj", val);
                setAnswer("cityObj", null);
              }}
              showManualOption={true}
            />
          )}

          {selectedCountry && (!states.length || selectedState) && (
            <LocationAutocomplete
              label="CITY / TOWN / VILLAGE"
              placeholder="Type location..."
              items={cities}
              value={selectedCity}
              onChange={(val) => setAnswer("cityObj", val)}
              showManualOption={true}
            />
          )}

          {selectedCountry && (
            <div style={{ marginTop: 20 }}>
              <div style={{ ...body, fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 10 }}>How far are you willing to go for an opportunity?</div>
              <select value={answers.relocation || ""} onChange={e => setAnswer("relocation", e.target.value)} style={{ ...body, width: "100%", padding: "12px", borderRadius: 8, border: `2px solid ${C.line}`, background: "#fff", outline: "none" }}>
                <option value="">Select Option</option>
                <option value="Stay near home">Within my town/city</option>
                <option value="Nearby towns / cities">Within my district/county</option>
                <option value={`Anywhere in my ${stateLabel.toLowerCase()}`}>Anywhere in my {stateLabel.toLowerCase()}</option>
                <option value="Nearby states/regions">Nearby states/regions</option>
                <option value="Anywhere in my country">Anywhere in my country</option>
                <option value="International opportunities">International opportunities</option>
                <option value="Anywhere in the world">Anywhere in the world</option>
              </select>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- MILE 3: INTERESTS ---
  const renderMile3 = () => {
    const selected = answers.interests || [];
    const hasEnough = selected.length >= 3;
    const needsTop3 = hasEnough && !(answers.topInterests?.length === 3);

    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>What naturally pulls your attention?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Pick 3–6. Don't think about careers yet.</p>
        
        {needsTop3 && (
          <div style={{ background: "#FFF7E0", border: `1px solid ${C.amber}`, borderRadius: 8, padding: 16, marginTop: 20 }}>
            <div style={{ ...disp, fontSize: 20, fontWeight: 700, color: C.ink }}>Which 3 matter most to you?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
              {selected.map(i => (
                <Pill key={i} active={(answers.topInterests || []).includes(i)} onClick={() => toggleArray("topInterests", i, 3)}>{i}</Pill>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, maxHeight: 400, overflowY: "auto", paddingRight: 10 }}>
          {Object.entries(INTEREST_CATEGORIES).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: 24 }}>
              <SectionLabel>{cat}</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(item => (
                  <Pill key={item} active={selected.includes(item)} onClick={() => toggleArray("interests", item, 6)}>{item}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- MILE 4: SUBJECTS ---
  const renderMile4 = () => {
    const selected = answers.subjects || [];
    const mainSelected = selected.length > 0;
    
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>Which subjects do you enjoy most?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Pick up to 5.</p>
        
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(SUBJECT_CATEGORIES).map(([cat, items]) => (
            <div key={cat} style={{ width: "100%", marginBottom: 10 }}>
              <div style={{ ...body, fontSize: 11, fontWeight: 700, color: C.sub, marginBottom: 8 }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(item => (
                  <Pill key={item} active={selected.includes(item)} onClick={() => toggleArray("subjects", item, 5)}>{item}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selected.includes("Computer Science") && (
          <div style={{ marginTop: 20, padding: 16, background: C.paperDim, borderRadius: 8 }}>
            <div style={{ ...body, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>In Computer Science, what sounds most exciting?</div>
            <select value={answers.subCS || ""} onChange={e => setAnswer("subCS", e.target.value)} style={{ ...body, width: "100%", padding: "10px", borderRadius: 6 }}>
              <option value="">Select...</option>
              {SUBJECT_SUB_INTERESTS["Computer Science"].map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        )}

        {mainSelected && (
          <div style={{ marginTop: 20, padding: 16, border: `1px solid ${C.line}`, borderRadius: 8 }}>
            <div style={{ ...body, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>How do you feel about your favourite subjects?</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Still learning", "Comfortable", "Confident", "One of my strengths", "I could teach someone else"].map(opt => (
                <Pill key={opt} active={answers.subjectConfidence === opt} onClick={() => setAnswer("subjectConfidence", opt)}>{opt}</Pill>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // --- MILE 5: STRENGTHS ---
  const renderMile5 = () => {
    const selected = answers.strengths || [];
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>Which of these feel like a strength right now?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Be honest, not aspirational. Pick 4–6.</p>
        
        {selected.length > 0 && (
          <div style={{ marginTop: 20, padding: 16, background: C.paperDim, borderRadius: 8 }}>
            <div style={{ ...body, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Where have you used these strengths?</div>
            <select value={answers.strengthEvidence || ""} onChange={e => setAnswer("strengthEvidence", e.target.value)} style={{ ...body, width: "100%", padding: "10px", borderRadius: 6 }}>
              <option value="">Select evidence...</option>
              {STRENGTH_EVIDENCE.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        )}

        <div style={{ marginTop: 20, maxHeight: 400, overflowY: "auto", paddingRight: 10 }}>
          {Object.entries(STRENGTH_CATEGORIES).map(([cat, items]) => (
            <div key={cat} style={{ marginBottom: 24 }}>
              <SectionLabel>{cat}</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(item => (
                  <Pill key={item} active={selected.includes(item)} onClick={() => toggleArray("strengths", item, 6)}>{item}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- MILE 6: WORK STYLE ---
  const renderMile6 = () => {
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>Which task sounds most exciting?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>This helps map your real-world work style.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
          {Object.keys(WORKSTYLE_SCENARIOS).map(opt => (
            <button key={opt} onClick={() => setAnswer("workStyleScenario", opt)}
              style={{ ...body, textAlign: "left", padding: "14px 16px", borderRadius: 8, border: `2px solid ${answers.workStyleScenario === opt ? C.amber : C.line}`, background: answers.workStyleScenario === opt ? "#FFF7E0" : "#fff", color: C.ink, fontSize: 14, fontWeight: answers.workStyleScenario === opt ? 600 : 400, cursor: "pointer" }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // --- MILE 7: VALUES & CONSTRAINTS ---
  const renderMile7 = () => {
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>What matters most?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Choose your primary focus and constraints.</p>
        
        <div style={{ marginTop: 20 }}>
          <div style={{ ...body, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Primary Value:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Good income", "Job stability", "Creativity", "Helping people", "Freedom", "Work-life balance"].map(opt => (
              <Pill key={opt} active={answers.budget === opt} onClick={() => setAnswer("budget", opt)}>{opt}</Pill>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ ...body, fontSize: 14, fontWeight: 600, marginBottom: 10 }}>What kind of work would you rather AVOID? (Optional)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {NEGATIVE_PREFERENCES.map(opt => (
              <Pill key={opt} active={(answers.negativePrefs || []).includes(opt)} onClick={() => toggleArray("negativePrefs", opt, 3)}>{opt}</Pill>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- MILE 8: EDUCATION PATH ---
  const renderMile8 = () => {
    return (
      <div>
        <h2 style={{ ...disp, fontSize: 32, fontWeight: 700, color: C.ink, margin: 0 }}>What kind of path sounds most comfortable?</h2>
        <p style={{ ...body, fontSize: 15, color: C.sub, marginTop: 8 }}>Both are legitimate — we'll show you both either way.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28 }}>
          {["Traditional degree", "Diploma", "Certification / skill-first", "Vocational / apprenticeship", "Compare all routes"].map(opt => (
            <button key={opt} onClick={() => setAnswer("pathwayPref", opt)}
              style={{ ...body, textAlign: "left", padding: "14px 16px", borderRadius: 8, border: `2px solid ${answers.pathwayPref === opt ? C.amber : C.line}`, background: answers.pathwayPref === opt ? "#FFF7E0" : "#fff", color: C.ink, fontSize: 15.5, fontWeight: answers.pathwayPref === opt ? 600 : 400, cursor: "pointer" }}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getCanNext = () => {
    switch (step) {
      case 1: return !!answers.education;
      case 2: {
        if (!answers.countryObj) return false;
        const statesForCountry = State.getStatesOfCountry(answers.countryObj.isoCode);
        if (statesForCountry && statesForCountry.length > 0 && (!answers.stateObj || !answers.relocation)) return false;
        if (!answers.relocation) return false;
        return true;
      }
      case 3: return (answers.interests?.length >= 3) && (answers.topInterests?.length === 3);
      case 4: return (answers.subjects?.length > 0) && !!answers.subjectConfidence;
      case 5: return (answers.strengths?.length >= 4) && !!answers.strengthEvidence;
      case 6: return !!answers.workStyleScenario;
      case 7: return !!answers.budget;
      case 8: return !!answers.pathwayPref;
      default: return true;
    }
  };

  const canNext = getCanNext();

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 64px" }}>
        {/* Progress header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ ...disp, fontSize: 16, fontWeight: 700, color: C.sub, letterSpacing: 1 }}>MILE 0{step} / 0{totalSteps}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, background: C.amber, borderRadius: 2 }} />
            <span style={{ ...disp, fontSize: 14, fontWeight: 700, color: C.asphalt, letterSpacing: 0.4 }}>ROADWORK</span>
          </div>
        </div>
        <ProgressBar value={progress} color={C.route} track={C.paperDim} h={6} />

        <div style={{ marginTop: 40, minHeight: 400 }}>
          {step === 1 && renderMile1()}
          {step === 2 && renderMile2()}
          {step === 3 && renderMile3()}
          {step === 4 && renderMile4()}
          {step === 5 && renderMile5()}
          {step === 6 && renderMile6()}
          {step === 7 && renderMile7()}
          {step === 8 && renderMile8()}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, borderTop: `1px solid ${C.line}`, paddingTop: 20 }}>
          <button onClick={back} disabled={step === 1} style={{ ...body, background: "none", border: "none", color: step === 1 ? "#B8B6AC" : C.sub, fontSize: 14.5, fontWeight: 600, cursor: step === 1 ? "default" : "pointer" }}>
            ← Back
          </button>
          <button onClick={next} disabled={!canNext} style={{ ...disp, fontSize: 17, fontWeight: 700, background: canNext ? C.asphalt : "#CFCDC3", color: canNext ? C.amber : "#8B897F", border: "none", padding: "12px 28px", borderRadius: 8, cursor: canNext ? "pointer" : "default", transition: "all 200ms ease" }}>
            {step === totalSteps ? "Generate My Route" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
