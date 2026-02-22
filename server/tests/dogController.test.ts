import { describe, it, expect, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

describe('getDogImage', () => {
  it('returns success true and data', async () => {
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage')
      .mockResolvedValue(mockDogData);

    const jsonMock = vi.fn();
    const res = {
      json: jsonMock
    } as any;

    await getDogImage({} as any, res);

    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    });
  });
});
