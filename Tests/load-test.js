import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '3s', target: 10 },
    { duration: '10s', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '10s', target: 100 },
    { duration: '3s', target: 0 },

  ],
  thresholds: {
    'http_req_duration': ['p(95)<2000'],
    'http_req_failed': ['rate<0.01'],
  }
};

const baseUrl = 'http://localhost:5200/api/events';

// Generate random date within last 14 days
function randomDateInPastDays(days = 28) {
  const now = new Date();
  const randomPastTime = now.getTime() - Math.floor(Math.random() * days * 24 * 60 * 60 * 1000);
  return new Date(randomPastTime);
}

function randomPageParams(maxPages = 2, pageSize = 600) {
  const pageNumber = Math.floor(Math.random() * maxPages) + 1;
  return `&pageNumber=${pageNumber}&pageSize=${pageSize}`;
}

// Define endpoint generators
const endpoints = [
  () => {
    const from = randomDateInPastDays();
    const to = new Date(from.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 days
    const pagination = randomPageParams();
    return `${baseUrl}/created-between?from=${from.toISOString()}&to=${to.toISOString()}${pagination}`;
  },
  () => {
    const date = randomDateInPastDays().toISOString().split('T')[0];
    const pagination = randomPageParams();
    return `${baseUrl}/by-date?date=${date}${pagination}`;
  },
  // () => {
  //   const lastUpdated = randomDateInPastDays().toISOString();
  //   return `${baseUrl}/updated-after?lastUpdated=${lastUpdated}`;
  // },
 () => {
    const page = Math.floor(Math.random() * 4) + 1; // simulate up to 20 pages
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

  sleep(0.3);
}
