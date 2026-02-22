import { describe, it, expect, vi } from 'vitest'; // Heittää errorin mutta vitest toimii kuitenkin?
import { getRandomDogImage } from '../services/dogService';

describe('getRandomDogImage', () => {
  it('returns dog image', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
        status: "success"
      })
    }));

    const result = await getRandomDogImage();

    expect(result).toEqual({
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    });
  });
});

describe('getRandomDogImage (negative)', () => {
  it('rejects when API returns status !== success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        message: "not-a-dog-jpg",
        status: "error"
      })
    }));
    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image from API'
    );
  });
});

