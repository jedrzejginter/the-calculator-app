import { OperatorEnum } from '@workspace/core';
import request from 'supertest';
import { app } from '../src/server';

describe('POST /calculate', () => {
  it('returns validation errors for incorrect body', async () => {
    const res = await request(app).post('/calculate').send({
      operator: null,
      operand: '1',
      value: '2',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchInlineSnapshot(`
      {
        "errors": [
          "INVALID_BODY",
        ],
        "status": "error",
      }
    `);
  });

  it('adds two numbers', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.ADD,
      operand: '1',
      value: '2',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(3);
  });

  it('returns error if trying to divide by 0', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.DIVIDE,
      operand: '1',
      value: '0',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchInlineSnapshot(`
      {
        "errors": [
          "DIVISION_BY_0",
        ],
        "status": "error",
      }
    `);
  });
});
