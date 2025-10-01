import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { NotAuthorizedSchema } from "@/lib/constants";
import { ItemsResponseSchema, StatsResponseSchema } from "./stats.schema";

const tags = ["Stats"];

export const list = createRoute({
  path: "/stats",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(StatsResponseSchema, "Stats Object"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      NotAuthorizedSchema,
      "You need to be Authenticated to View Stats"
    ),
  },
});

export const briefItems = createRoute({
  path: "/stats/brief-items",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(ItemsResponseSchema, "Brief item Options"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      NotAuthorizedSchema,
      "You need to be Authenticated to View Items"
    ),
  },
});

// Route types
export type ListRoute = typeof list;
export type BriefItemsRoute = typeof briefItems;

