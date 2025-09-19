export function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  
  const value = email.trim();
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(value);
}
