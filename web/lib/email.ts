const UNIVERSITY_DOMAINS = [
  ".ac.uk",
  ".edu",
  ".edu.au",
  ".ac.in",
  ".edu.cn",
  ".ac.nz",
  ".edu.sg",
  ".ac.za",
  ".edu.my",
  ".ac.jp",
  ".edu.hk",
];

export function isUniversityEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1];
  if (!domain) return false;
  return UNIVERSITY_DOMAINS.some((suffix) => domain.endsWith(suffix));
}
