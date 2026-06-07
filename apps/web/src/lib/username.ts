const usernamePattern = /^[\p{L}\p{N}_-]+(?: [\p{L}\p{N}_-]+)*$/u;

export function isValidUsername(username: string) {
  return username.length >= 3 && username.length <= 24 && usernamePattern.test(username);
}
