import express from 'express';
import { createTenant, currentTenant, getTenants } from './tenant.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';

const tenantRoutes = express.Router();

tenantRoutes.post('/', requireAuth ,createTenant);

tenantRoutes.get('/getTenants',requireAuth, getTenants);

tenantRoutes.get('/current', requireAuth, requireTenant, currentTenant);

export default tenantRoutes;