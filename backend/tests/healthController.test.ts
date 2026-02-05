import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getHealth } from '../src/api/controllers/healthController.js';

const createMockResponse = () => {
  const res: { statusCode?: number; payload?: unknown; status: (code: number) => typeof res; json: (body: unknown) => typeof res } = {
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(body: unknown) {
      res.payload = body;
      return res;
    }
  };
  return res;
};

test('getHealth returns status ok', () => {
  const res = createMockResponse();
  getHealth({} as never, res as never);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(
    Object.keys(res.payload as Record<string, unknown>).sort(),
    ['status', 'timestamp']
  );
});
