export function setAuthCookie(token: string) {
  document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearAuthCookie() {
  document.cookie = "accessToken=; path=/; max-age=0";
}
