import express from 'express';
import authroutes from './modules/auth/auth.routes.js';
import tenantRoutes from './tenants/tenant.routes.js';
import contactRoutes from './contacts/contact.routes.js';
import memberShipRoute from './memberships/memberShip.routes.js';
import property from './properties/properties.routes.js';
import dashboard from './dashboard/dashboard.routes.js';

const router = express.Router();

router.use('/auth', authroutes);

router.use('/tenants', tenantRoutes);

router.use('/contacts', contactRoutes);

router.use('/membership', memberShipRoute)

router.use('/', property);

router.use('/dashboard', dashboard);

export default router;














