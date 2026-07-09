export const blockedKeywords = ["porn", "porno", "sex", "xxx"];

export const containsBlockedWord = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  return blockedKeywords.some((word) =>
    lowerQuery.includes(word)
  );
};