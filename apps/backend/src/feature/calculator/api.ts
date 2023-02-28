import { Router } from 'express';
import { z } from 'zod';
import { OperatorEnum } from '@workspace/core';

import { calculate } from './lib';

const router = Router();

const bodySchema = z.object({
  operator: z.nativeEnum(OperatorEnum),
  value: z.string(),
  operand: z.string(),
});

router.post('/', async (req, res) => {
  const validation = await bodySchema.safeParseAsync(req.body);

  if (validation.success !== true) {
    res.status(400).json({ status: 'error', errors: validation.error.format() });
    return;
  }

  const body = validation.data;

  const result = calculate({
    operator: body.operator,
    value: body.value,
    operand: body.operand,
  });

  if (result instanceof Error) {
    res.status(400).json({ status: 'error' });
    return;
  }

  res.status(201).json({ status: 'success', result });
});

export { router };