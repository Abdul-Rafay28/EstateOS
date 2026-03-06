import express from 'express';
import { addMember, getMembers } from './memberShip.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';

const memberShipRoute = express.Router();

memberShipRoute.post("/add-member", requireAuth, requireTenant, addMember );

memberShipRoute.get('/members', requireAuth, requireTenant, getMembers);

export default memberShipRoute;