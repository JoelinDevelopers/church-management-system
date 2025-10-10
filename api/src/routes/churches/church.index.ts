import { createRouter } from "@/lib/create-app";
import * as handlers from "./church.handlers";
import * as routes from "./church.routes";



const router = createRouter()
.openapi(routes.createChurch, handlers.createChurch)
.openapi(routes.getChurchBySubDomain, handlers.getChurchBySubDomain)
.openapi(routes.listChurches, handlers.listChurches)
.openapi(routes.deleteChurch, handlers.deleteChurch);





export default router;