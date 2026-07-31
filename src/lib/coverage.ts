/**
 * Delivery coverage.
 *
 * Deliberately **one** coverage section rather than a page per city: thin,
 * near-duplicate city pages are treated as doorway pages, while a single
 * purposeful page plus `areaServed` structured data is what current local-SEO
 * guidance recommends. The same list feeds the visible section and the JSON-LD.
 *
 * Lead times vary by region — the copy says so rather than implying same-day
 * delivery everywhere.
 */

/** Metro kitchens we quote for most often, shown as prominent chips. */
export const primaryHubs = [
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Pune",
  "Delhi NCR",
  "Gurugram",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Goa",
] as const;

export type StateCoverage = { state: string; cities: string[] };

/** Every state and union territory, with the cities we're asked for most. */
export const stateCoverage: StateCoverage[] = [
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad"] },
  { state: "Delhi", cities: ["New Delhi", "Delhi NCR"] },
  { state: "Karnataka", cities: ["Bengaluru", "Mysuru", "Mangaluru"] },
  { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Ooty"] },
  { state: "Telangana", cities: ["Hyderabad", "Warangal"] },
  { state: "Goa", cities: ["Panaji", "Calangute", "Morjim"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { state: "West Bengal", cities: ["Kolkata", "Siliguri", "Darjeeling"] },
  { state: "Rajasthan", cities: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer"] },
  { state: "Uttar Pradesh", cities: ["Lucknow", "Noida", "Agra", "Varanasi"] },
  { state: "Haryana", cities: ["Gurugram", "Faridabad", "Panipat"] },
  { state: "Punjab", cities: ["Amritsar", "Ludhiana", "Jalandhar"] },
  { state: "Kerala", cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Munnar"] },
  { state: "Madhya Pradesh", cities: ["Indore", "Bhopal", "Gwalior"] },
  { state: "Andhra Pradesh", cities: ["Visakhapatnam", "Vijayawada", "Tirupati"] },
  { state: "Odisha", cities: ["Bhubaneswar", "Cuttack", "Puri"] },
  { state: "Bihar", cities: ["Patna", "Gaya"] },
  { state: "Jharkhand", cities: ["Ranchi", "Jamshedpur"] },
  { state: "Chhattisgarh", cities: ["Raipur", "Bhilai"] },
  { state: "Assam", cities: ["Guwahati", "Dibrugarh"] },
  { state: "Uttarakhand", cities: ["Dehradun", "Rishikesh", "Nainital"] },
  { state: "Himachal Pradesh", cities: ["Shimla", "Manali", "Dharamshala"] },
  { state: "Jammu & Kashmir", cities: ["Srinagar", "Jammu", "Gulmarg"] },
  { state: "Ladakh", cities: ["Leh"] },
  { state: "Chandigarh", cities: ["Chandigarh"] },
  { state: "Puducherry", cities: ["Puducherry"] },
  { state: "Sikkim", cities: ["Gangtok"] },
  { state: "Meghalaya", cities: ["Shillong"] },
  { state: "Manipur", cities: ["Imphal"] },
  { state: "Mizoram", cities: ["Aizawl"] },
  { state: "Nagaland", cities: ["Kohima", "Dimapur"] },
  { state: "Tripura", cities: ["Agartala"] },
  { state: "Arunachal Pradesh", cities: ["Itanagar"] },
  { state: "Dadra & Nagar Haveli and Daman & Diu", cities: ["Silvassa", "Daman"] },
  { state: "Andaman & Nicobar Islands", cities: ["Port Blair"] },
  { state: "Lakshadweep", cities: ["Kavaratti"] },
];

/** Flat region list for `areaServed` in structured data. */
export const servedRegions = stateCoverage.map(({ state }) => state);
