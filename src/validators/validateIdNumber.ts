export function validateIdNumber(idNumber: string): boolean {
  if (!idNumber) return false;
  const value = idNumber.trim();
  return /^\d{13}$/.test(value);
}
