import { createRouter } from "@/lib/create-app";
import * as handlers from "./church.handlers";
import * as routes from "./church.routes";



const router = createRouter()
.openapi(routes.createChurch, handlers.createChurch)
.openapi(routes.listChurches, handlers.listChurches);





export default router;