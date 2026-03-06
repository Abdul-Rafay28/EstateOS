import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { addProperty, getProperties, getPropertyById, updateProperty } from './properties.controller.js';

const property = express.Router();

property.post('/addProperty', requireAuth, requireTenant, addProperty)

property.get('/properties', requireAuth, requireTenant, getProperties)

property.get('/property/:id', requireAuth, requireTenant, getPropertyById)

property.put('/property/:id', requireAuth, requireTenant, updateProperty)

export default property;