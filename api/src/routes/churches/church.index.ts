import { createRouter } from "@/lib/create-app";
import * as handlers from "./church.handlers";
import * as routes from "./church.routes";



const router = createRouter()
.openapi(routes.createChurch, handlers.createChurch)
.openapi(routes.getChurchBySubDomain, handlers.getChurchBySubDomain)
.openapi(routes.listChurches, handlers.listChurches)
.openapi(routes.deleteChurch, handlers.deleteChurch)
.openapi(routes.getChurchAdmins, handlers.getChurchAdmins)
.openapi(routes.getChurchById, handlers.getChurchById);





export default router;