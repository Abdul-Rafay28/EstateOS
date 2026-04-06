import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { addProperty, authCheck, getProperties, getPropertyById, updateProperty } from './properties.controller.js';

const property = express.Router();

property.post('/addProperty', requireAuth, requireTenant, addProperty)

property.get('/properties', requireAuth, requireTenant, getProperties)

property.get('/property/:id', requireAuth, requireTenant, getPropertyById)

property.patch('/property/:id', requireAuth, requireTenant, updateProperty)

property.get('/authCheck', requireAuth, authCheck);

export default property;