import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { upGradePlan } from './subscription.controller.js';

const subscription = express.Router();

subscription.post('/upgrade/plan', requireAuth, requireTenant, upGradePlan);

export default subscription;