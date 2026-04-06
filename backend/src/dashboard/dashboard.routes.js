import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { getDashboard } from './dashboard.controller.js';

const dashboard = express.Router();


dashboard.get('/state', requireAuth, requireTenant, getDashboard )




export default dashboard;