import express from 'express'
import { userContact } from '../controllers/contact.controller.js';
const contactRouter = express.Router();

contactRouter.post('/contact', userContact)

export default contactRouter