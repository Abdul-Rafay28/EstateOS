import express from 'express';
import { addMember, editMembers, getMembers, singleMemberData, updateMemberstatus } from './memberShip.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';

const memberShipRoute = express.Router();

memberShipRoute.post("/add-member", requireAuth, requireTenant, addMember);

memberShipRoute.get('/members', requireAuth, requireTenant, getMembers);

memberShipRoute.patch('/member/status/:id', requireAuth, requireTenant, updateMemberstatus);

memberShipRoute.put('/member/update/:id', requireAuth, requireTenant, editMembers);

memberShipRoute.get('/member/data/:id', requireAuth, requireTenant, singleMemberData);

export default memberShipRoute;