import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { ChurchBaseSchema, ChurchCreateSchema } from "./church.schema";
import { ErrorResponseSchema, IdParamSchema, SuccessResponseSchema,  } from "@/lib/constants";


const tags = ["Church"]
export const createChurch = createRoute({
  path: "/churches",
  method: "post",
  tags,
  summary: "Create New Church",
  description: "Create a new church with a subdomain",
  request: {
    body: jsonContentRequired(ChurchCreateSchema, "Church Create Payload")
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      SuccessResponseSchema,
      "Church created successfully"
    ),
    
    [HttpStatusCodes.CONFLICT]: jsonContent(
      ErrorResponseSchema,
      "Church already exists"
    ),
    // [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
    //   UnauthorizedErrorSchema,
    //   "Authentication required"
    // ),
     
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      ErrorResponseSchema,
      "Internal server error"
    )
  }
});

export const listChurches = createRoute({
  path: "/churches",
  method: "get",
  tags,
  summary: "List all churches",
  description: "List churches",
  
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(ChurchBaseSchema),
      "List Of Churches"
    ),
    
     
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      ErrorResponseSchema,
      "Internal server error"
    )
  }
});

export const deleteChurch = createRoute({
  path: "/churches/{id}",
  method: "delete",
  tags,
  summary: "Delete Church",
  description: "Permanently delete a church and the associated data",
  request: {
    params: IdParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SuccessResponseSchema,
      "Church deleted successfully"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorResponseSchema,
      "Church not found"
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      ErrorResponseSchema,
      "Cannot delete church with existing dependencies"
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      ErrorResponseSchema,
      "Internal server error"
    )
  }
});



export type CreateChurchRoute = typeof createChurch;
export type ListChurchesRoute = typeof listChurches;
export type DeleteChurchRoute = typeof deleteChurch;