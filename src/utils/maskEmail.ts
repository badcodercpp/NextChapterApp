export const maskEmailFixed = (email: string) => {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  // Always shows 2 characters followed by exactly 5 asterisks
  const visiblePart = username.substring(0, 2);
  return `${visiblePart}*****@${domain}`;
};
