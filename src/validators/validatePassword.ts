export function validatePassword(password: string): boolean {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+\[\]{};:'"\\|,.<>/?`~]).{8,}$/;
  return re.test(password);
}

export function passwordsMatch(a: string, b: string): boolean {
    return a === b;
  }