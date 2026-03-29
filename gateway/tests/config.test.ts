import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBackendTarget } from '../src/config.js';

test('getBackendTarget uses default when env is missing', () => {
  const target = getBackendTarget({});
  assert.equal(target, 'http://backend:4000');
});

test('getBackendTarget uses env override', () => {
  const target = getBackendTarget({ BACKEND_URL: 'http://localhost:4000' });
  assert.equal(target, 'http://localhost:4000');
});
