import express from 'express';
import { getGitHubUserDetails } from '../controller/github.controller.js';
const githubRouter = express.Router();

githubRouter.get('/:username',getGitHubUserDetails );

export default githubRouter;