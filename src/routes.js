import { Router } from "express";

import IntegrationController from "./controllers/IntegrationControler";
import OpportunityController from "./controllers/OpportunityController";

const routes = new Router();

routes.get("/integration", IntegrationController.index);
routes.get("/opportunity", OpportunityController.index);

export default routes;
