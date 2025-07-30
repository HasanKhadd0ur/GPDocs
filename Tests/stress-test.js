import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    stage1: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      duration: '1m',
      timeUnit: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
      startTime: '0s',
    },
    stage2: {
      executor: 'constant-arrival-rate',
      rate: 15000, // 30,000 requests / 2 min
      duration: '2m',
      timeUnit: '1m',
      preAllocatedVUs: 200,
      maxVUs: 500,
      startTime: '1m',
    },
    stage3: {
      executor: 'constant-arrival-rate',
      rate: 30000, // 60,000 requests / 2 min
      duration: '2m',
      timeUnit: '1m',
      preAllocatedVUs: 300,
      maxVUs: 600,
      startTime: '3m',
    },
    stage4: {
      executor: 'constant-arrival-rate',
      rate: 45000, // 90,000 requests / 2 min
      duration: '2m',
      timeUnit: '1m',
      preAllocatedVUs: 400,
      maxVUs: 800,
      startTime: '5m',
    },
    stage5: {
      executor: 'constant-arrival-rate',
      rate: 50000, // 100,000 requests / 2 min
      duration: '2m',
      timeUnit: '1m',
      preAllocatedVUs: 500,
      maxVUs: 900,
      startTime: '7m',
    },
    stage6: {
      executor: 'constant-arrival-rate',
      rate: 60000, // 120,000 requests / 2 min
      duration: '2m',
      timeUnit: '1m',
      preAllocatedVUs: 600,
      maxVUs: 1000,
      startTime: '9m',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<3000'],
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
