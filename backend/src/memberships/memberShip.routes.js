import express from 'express';
import { addMember, editMembers, getMembers, singleMemberData, updateMemberstatus } from './memberShip.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { requireSubscription } from '../middlewares/subscription.js';

const memberShipRoute = express.Router();

memberShipRoute.post("/add-member", requireAuth, requireTenant, requireSubscription, addMember);

memberShipRoute.get('/members', requireAuth, requireTenant, requireSubscription, getMembers);

memberShipRoute.patch('/member/status/:id', requireAuth, requireTenant, requireSubscription, updateMemberstatus);

memberShipRoute.put('/member/update/:id', requireAuth, requireTenant, requireSubscription, editMembers);

memberShipRoute.get('/member/data/:id', requireAuth, requireTenant, requireSubscription, singleMemberData);

export default memberShipRoute;