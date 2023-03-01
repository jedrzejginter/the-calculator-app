import { OperatorEnum } from '@workspace/core';
import { Router } from 'express';
import { z } from 'zod';

import { calculate } from './lib';

const router = Router();

const numberRegex = /^-?(0|[1-9]\d*)(\.\d+)?$/;

const bodySchema = z.object({
  operator: z.nativeEnum(OperatorEnum),
  value: z
    .string()
    .regex(numberRegex)
    .transform((arg) => Number(arg))
    .or(z.number()),
  operand: z
    .string()
    .regex(numberRegex)
    .transform((arg) => Number(arg))
    .or(z.number()),
});

router.post('/', async (req, res) => {
  const validation = await bodySchema.safeParseAsync(req.body);

  if (validation.success !== true) {
    res.status(400).json({ status: 'error', errors: ['INVALID_BODY'] });
    return;
  }

  const body = validation.data;

  const result = calculate({
    operator: body.operator,
    value: body.value,
    operand: body.operand,
  });

  if (result instanceof Error) {
    res.status(400).json({
      status: 'error',
      errors: [result.message],
    });
    return;
  }

  res.status(201).json({
    status: 'success',
    result,
  });
});

export { router };
