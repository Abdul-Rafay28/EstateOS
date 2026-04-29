import express from 'express';
import { createTenant, currentTenant, getTenants, logout } from './tenant.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { requireSubscription } from '../middlewares/subscription.js';

const tenantRoutes = express.Router();

tenantRoutes.post('/', requireAuth, createTenant);

tenantRoutes.get('/getTenants', requireAuth, getTenants);

tenantRoutes.get('/current', requireAuth, currentTenant);

tenantRoutes.post('/logout', requireAuth, logout);

export default tenantRoutes;