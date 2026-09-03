/**
 * BEFORE — JavaScript helper (no types)
 * Migrate this to TypeScript: see migrate-after.ts
 */
function assertStatus(res, expected) {
  if (res.status !== expected) {
    throw new Error('Expected ' + expected + ' got ' + res.status);
  }
}

function formatResult(status) {
  // status is meant to be 'pass' | 'fail' | 'skip' — but JS won't stop you
  return '[' + status.toUpperCase() + ']';
}

function buildLoginPayload(email, password, rememberMe) {
  const payload = { email: email, password: password };
  if (rememberMe !== undefined) {
    payload.rememberMe = rememberMe;
  }
  return payload;
}

module.exports = { assertStatus, formatResult, buildLoginPayload };
