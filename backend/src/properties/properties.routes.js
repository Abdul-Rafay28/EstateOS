import express from 'express';
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { addProperty, authCheck, deleteProperty, getProperties, getPropertyById, getSingleProperty, updatePropertyStatus, updateSingleProperty } from './properties.controller.js';
import { requireSubscription } from '../middlewares/subscription.js';


const property = express.Router();


property.get('/properties', requireAuth, requireTenant, requireSubscription, getProperties)

property.patch('/propertyStatus/:id', requireAuth, requireTenant, requireSubscription, updatePropertyStatus)

property.delete('/property/delete/:id', requireAuth, requireTenant, requireSubscription, deleteProperty);

property.get('/get/singleProperty/:id', requireAuth, requireTenant, requireSubscription, getSingleProperty)

property.put('/property/update/:id', requireAuth, requireTenant, requireSubscription, updateSingleProperty);

property.post('/addProperty', requireAuth, requireTenant, requireSubscription, addProperty)

property.get('/property/:id', requireAuth, requireTenant, requireSubscription, getPropertyById)

property.get('/authCheck', requireAuth, authCheck);



export default property;