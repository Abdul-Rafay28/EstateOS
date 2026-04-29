import express from 'express'
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { contactsData, createContact } from './contact.controller.js';
import { requireSubscription } from '../middlewares/subscription.js';


const contactRoutes = express.Router();

contactRoutes.post("/addContact", requireAuth, requireTenant, requireSubscription, createContact);

contactRoutes.get('/', requireAuth, requireTenant, requireSubscription, contactsData);

export default contactRoutes;