const blacklistTokens = new Set();

export const addToBlacklist = (token) => {
  blacklistTokens.add(token);
};

export const isBlacklisted = (token) => {
  return blacklistTokens.has(token);
};
