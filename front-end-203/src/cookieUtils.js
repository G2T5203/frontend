export function getCookie(cookieName) {
  // document.cookie property to access all cookies set for the current website
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null; // Return null if the cookie is not found
}