import express from 'express';
import { createShortUrl, getAllUrls, redirectToLongUrl } from '../controllers/url.controllers.js';

const urlRouter = express.Router();

urlRouter.post('/shorten',createShortUrl);
urlRouter.get('/getAllUrls',getAllUrls);

urlRouter.get('/:shortCode', redirectToLongUrl);


export default urlRouter;