import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    round_1: {
      executor: 'constant-arrival-rate',
      startTime: '0s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
    spike_1: {
      executor: 'constant-arrival-rate',
      startTime: '30s',
      timeUnit: '1s',
      rate: 500,
      duration: '10s',
      preAllocatedVUs: 200,
      maxVUs: 500,
    },
    cooldown_1: {
      executor: 'constant-arrival-rate',
      startTime: '40s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },

    round_2: {
      executor: 'constant-arrival-rate',
      startTime: '70s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
    spike_2: {
      executor: 'constant-arrival-rate',
      startTime: '100s',
      timeUnit: '1s',
      rate: 500,
      duration: '10s',
      preAllocatedVUs: 200,
      maxVUs: 500,
    },
    cooldown_2: {
      executor: 'constant-arrival-rate',
      startTime: '110s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },

    round_3: {
      executor: 'constant-arrival-rate',
      startTime: '140s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
    spike_3: {
      executor: 'constant-arrival-rate',
      startTime: '170s',
      timeUnit: '1s',
      rate: 500,
      duration: '10s',
      preAllocatedVUs: 200,
      maxVUs: 500,
    },
    cooldown_3: {
      executor: 'constant-arrival-rate',
      startTime: '180s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },

    round_4: {
      executor: 'constant-arrival-rate',
      startTime: '210s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
    spike_4: {
      executor: 'constant-arrival-rate',
      startTime: '240s',
      timeUnit: '1s',
      rate: 500,
      duration: '10s',
      preAllocatedVUs: 200,
      maxVUs: 500,
    },
    cooldown_4: {
      executor: 'constant-arrival-rate',
      startTime: '250s',
      timeUnit: '1s',
      rate: 10,
      duration: '30s',
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
  },
};

const baseUrl = 'http://localhost:5200/api/events';

export default function () {
  const res = http.get(`${baseUrl}/`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
