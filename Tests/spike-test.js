import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    spike_test: {
      executor: 'constant-arrival-rate',
      rate: 45000, // 45,000 requests per minute = 750 requests per second
      duration: '40s',
      timeUnit: '1m',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<3000'], // 95% of requests should be < 2s
    'http_req_failed': ['rate<0.01'],    // Error rate should be < 1%
  },
};

const baseUrl = 'http://localhost:5200/api/events';

function randomDateInPastDays(days = 28) {
  const now = new Date();
  const randomPastTime = now.getTime() - Math.floor(Math.random() * days * 24 * 60 * 60 * 1000);
  return new Date(randomPastTime);
}

function randomPageParams(maxPages = 2, pageSize = 40) {
  const pageNumber = Math.floor(Math.random() * maxPages) + 1;
  return `&pageNumber=${pageNumber}&pageSize=${pageSize}`;
}

const endpoints = [
  () => {
    const from = randomDateInPastDays();
    const to = new Date(from.getTime() + 2 * 24 * 60 * 60 * 1000);
    const pagination = randomPageParams();
    return `${baseUrl}/created-between?from=${from.toISOString()}&to=${to.toISOString()}${pagination}`;
  },
  () => {
    const date = randomDateInPastDays().toISOString().split('T')[0];
    const pagination = randomPageParams();
    return `${baseUrl}/by-date?date=${date}${pagination}`;
  },
  () => {
    const page = Math.floor(Math.random() * 4) + 1;
    return `${baseUrl}/?pageNumber=${page}&pageSize=10`;
  },
];

export default function () {
  const url = endpoints[Math.floor(Math.random() * endpoints.length)]();
  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
