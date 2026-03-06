import express from 'express'
import { requireAuth } from '../middlewares/requireAuth.js';
import { requireTenant } from '../middlewares/requireTenant.js';
import { contactsData, createContact } from './contact.controller.js';


const contactRoutes = express.Router();

contactRoutes.post("/addContact", requireAuth, requireTenant, createContact);

contactRoutes.get('/', requireAuth, requireTenant, contactsData);

export default contactRoutes;