import {describe, expect, it, test} from '@jest/globals';
import { calculateDiscount } from './utils.js';
import request from 'supertest';
import app from './app.js';

describe('App', () => {
  it('should return the correct discount amount', () => {
    const price = 100;
    const percentage = 20;
    const expectedDiscount = 20;

    const actualDiscount = calculateDiscount(price, percentage);
    expect(actualDiscount).toBe(expectedDiscount);

  });

  it("should return 200", async()=>{
    const res = await request(app).get('/').send();
    expect(res.statusCode).toEqual(200);
  });
});