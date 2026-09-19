import { COLLEGES as fallbackColleges } from "../data/colleges";

/**
 * Normalizes the API response to fit the Roadwork schema.
 */
function normalizeCollege(apiCollege) {
  return {
    id: apiCollege.id || apiCollege._id || Math.random().toString(36).substr(2, 9),
    name: apiCollege.name || "Unknown Institution",
    location: {
      country: apiCollege.country || "India",
      state: apiCollege.state || "Information unavailable",
      district: apiCollege.district || "Information unavailable",
      city: apiCollege.city || "Information unavailable",
    },
    type: apiCollege.institutionType || apiCollege.type || "Information unavailable",
    university: apiCollege.university || apiCollege.affiliation || "Information unavailable",
    courses: apiCollege.courses || apiCollege.programs || [],
    degrees: apiCollege.degrees || [],
    entranceExams: apiCollege.entranceExams || [],
    admissionRoutes: apiCollege.admissionRoutes || [],
    facilities: apiCollege.facilities || {},
    hostel: apiCollege.hostel || "Information unavailable",
    scholarships: apiCollege.scholarships || [],
    feeInfo: apiCollege.fees || "Information unavailable",
    officialWebsite: apiCollege.website || apiCollege.officialWebsite || "Information unavailable",
    source: apiCollege.source || "BodhDisha",
    lastVerified: apiCollege.lastUpdated || apiCollege.lastVerified || "Information unavailable",
  };
}

/**
 * Fetches colleges from the BodhDisha API.
 */
export async function searchColleges(params = {}) {
  const apiUrl = import.meta.env.VITE_COLLEGE_API_URL;
  const apiKey = import.meta.env.VITE_COLLEGE_API_KEY;

  if (!apiUrl) {
    throw new Error("API_NOT_CONFIGURED");
  }

  try {
    const queryParams = new URLSearchParams();
    if (params.courseId) queryParams.append("course", params.courseId);
    if (params.state) queryParams.append("state", params.state);
    if (params.city) queryParams.append("city", params.city);
    if (params.query) queryParams.append("q", params.query);
    if (params.page) queryParams.append("page", params.page);
    if (params.type && params.type !== "All Types") queryParams.append("type", params.type);

    const response = await fetch(`${apiUrl}/search?${queryParams.toString()}`, {
      headers: {
        "Authorization": apiKey ? `Bearer ${apiKey}` : "",
        "Content-Type": "application/json"
      }
    });

    if (response.status === 401 || response.status === 403) throw new Error("UNAUTHORIZED");
    if (response.status === 429) throw new Error("RATE_LIMITED");
    if (!response.ok) throw new Error("NETWORK_ERROR");

    const data = await response.json();
    
    // Assume API returns { data: [...], total: 100, page: 1 }
    const results = Array.isArray(data) ? data : (data.data || []);
    
    return {
      colleges: results.map(normalizeCollege),
      total: data.total || results.length,
      page: data.page || 1
    };
  } catch (error) {
    console.error("College Service Error:", error);
    throw error;
  }
}

/**
 * Simulates fallback logic using local demo data when API fails.
 */
export async function searchCollegesFallback(params = {}) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 600));

  let results = [...fallbackColleges];

  if (params.courseId) {
    results = results.filter(c => c.courses && c.courses.includes(params.courseId));
  }
  
  if (params.state) {
    results = results.filter(c => c.location?.state?.toLowerCase() === params.state.toLowerCase());
  }

  if (params.city) {
    results = results.filter(c => c.location?.city?.toLowerCase() === params.city.toLowerCase());
  }

  if (params.query) {
    const q = params.query.toLowerCase();
    results = results.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.location?.city || "").toLowerCase().includes(q)
    );
  }

  if (params.type && params.type !== "All Types") {
    results = results.filter(c => (c.type || "").includes(params.type));
  }

  // Add source tags to fallback data
  const normalizedFallback = results.map(c => ({
    ...c,
    source: "ROADWORK DEMO DATA"
  }));

  const page = params.page || 1;
  const limit = 20;
  const start = (page - 1) * limit;
  const paginated = normalizedFallback.slice(start, start + limit);

  return {
    colleges: paginated,
    total: normalizedFallback.length,
    page: page
  };
}
