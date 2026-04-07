import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { addProperty, authCheck, getProperties, getPropertyById, getSingleProperty,  updatePropertyStatus, updateSingleProperty } from './properties.controller.js';

const property = express.Router();

property.post('/addProperty', requireAuth, requireTenant, addProperty)

property.get('/properties', requireAuth, requireTenant, getProperties)

property.get('/property/:id', requireAuth, requireTenant, getPropertyById)

property.patch('/propertyStatus/:id', requireAuth, requireTenant, updatePropertyStatus)

property.get('/authCheck', requireAuth, authCheck);

property.get('/get/singleProperty/:id', requireAuth, requireTenant, getSingleProperty)

property.put('/property/update/:id', requireAuth, requireTenant, updateSingleProperty);

export default property;