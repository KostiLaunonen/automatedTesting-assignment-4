import request from 'supertest';
import express from 'express';
import { describe, it, expect, vi } from 'vitest';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn((req, res) => {
    res.json({
      success: true,
      data: {
        imageUrl: 'https://not-a-dog.com/dog.jpg',
        status: 'success'
      }
    });
  })
}));

describe('dogRoutes (positive test)', () => {
  it('returns 200, success true and mocked image url', async () => {
    const app = express();
    app.use('/api/dogs', dogRoutes);

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toContain('not-a-dog.com');
  });
});
