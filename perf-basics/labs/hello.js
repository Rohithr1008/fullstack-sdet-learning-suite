import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Perf Basics — hello-world lab
 * Run: k6 run labs/hello.js
 *
 * Uses the public k6 test site. Replace the URL with your *non-prod* target later.
 */
export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
