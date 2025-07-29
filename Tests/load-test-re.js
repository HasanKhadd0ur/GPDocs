import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    stage1: {
      executor: 'constant-arrival-rate',
      rate: 1000, // 1000 requests in 1 minute = ~16.67 RPS
      duration: '1m',
      timeUnit: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
    stage2: {
      executor: 'constant-arrival-rate',
      rate: 20000, // 100,000 requests / 5 minutes = 20,000 per minute
      duration: '4m',
      timeUnit: '1m',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
    stage3: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      duration: '1m',
      timeUnit: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    }
  },
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'http_req_failed': ['rate<0.01'],
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
  const randomIndex = Math.floor(Math.random() * endpoints.length);
  const url = endpoints[randomIndex]();

  const res = http.get(url);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
