// const express = require('express');
import { Router } from 'express'
import createContact from '../controllers/createContact'
import getContacts from '../controllers/getContacts'
import updateContact from '../controllers/updateContact'
import deleteContact from '../controllers/deleteContact'

const router = Router();

router
    .route('/contacts')
    .post(createContact)
    .get(getContacts)
    .put(updateContact)
    .delete(deleteContact)

export const routes = router;