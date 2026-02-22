import request from 'supertest';
import express from 'express';
import { describe, it, expect, vi } from 'vitest';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn((req, res) => {
    res.status(500).json({
      success: false,
      error: "Failed to fetch dog image: Network error"
    });
  })
}));

describe('dogRoutes (negative test)', () => {
  it('returns 500 and error JSON', async () => {
    const app = express();
    app.use('/api/dog', dogRoutes);

    const res = await request(app).get('/api/dog/random');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe("Failed to fetch dog image: Network error");
  });
});
