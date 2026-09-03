/**
 * AFTER — same helpers with light TypeScript annotations
 * Compare with migrate-before.js
 */

interface ApiResponse {
  status: number;
  body?: unknown;
}

type TestResult = 'pass' | 'fail' | 'skip';

interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

function assertStatus(res: ApiResponse, expected: number): void {
  if (res.status !== expected) {
    throw new Error(`Expected ${expected} got ${res.status}`);
  }
}

function formatResult(status: TestResult): string {
  return `[${status.toUpperCase()}]`;
}

function buildLoginPayload(
  email: string,
  password: string,
  rememberMe?: boolean
): LoginPayload {
  const payload: LoginPayload = { email, password };
  if (rememberMe !== undefined) {
    payload.rememberMe = rememberMe;
  }
  return payload;
}

export { assertStatus, formatResult, buildLoginPayload };
export type { ApiResponse, TestResult, LoginPayload };
