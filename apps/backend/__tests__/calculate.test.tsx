import { OperatorEnum } from '@workspace/core';
import request from 'supertest';
import { app } from '../src/server';

describe('POST /calculate', () => {
  it('returns validation errors for incorrect body', async () => {
    const res = await request(app).post('/calculate').send({
      operator: null,
      operand: 1,
      value: 2,
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

  it('can add numbers', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.ADD,
      operand: 1,
      value: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(3);
  });

  it('can subtract numbers', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.SUBTRACT,
      operand: 1,
      value: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(-1);
  });

  it('can multiply numbers', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.MULTIPLY,
      operand: 2,
      value: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(4);
  });

  it('can divide numbers', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.DIVIDE,
      operand: 4,
      value: 2,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toBe(2);
  });

  it('returns error if trying to divide by 0', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.DIVIDE,
      operand: 1,
      value: 0,
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

  it('accepts floats', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.ADD,
      operand: 0.5,
      value: 1.1,
    });

    expect(res.statusCode).toBe(201);
  });

  it('accepts strings that can be parsed to valid number', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.ADD,
      operand: '5',
      value: '10',
    });

    expect(res.statusCode).toBe(201);
  });

  it('does not accept invalid values', async () => {
    const res = await request(app).post('/calculate').send({
      operator: OperatorEnum.ADD,
      operand: 'foo',
      value: 'bar',
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
});
