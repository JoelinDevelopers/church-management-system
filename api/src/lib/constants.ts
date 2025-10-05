import { error } from "console";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { z } from "zod";

export const ZOD_ERROR_MESSAGES = {
  REQUIRED: "Required",
  EXPECTED_NUMBER: "Expected number, received nan",
  NO_UPDATES: "No updates provided",
};

export const NotAuthorizedSchema = createMessageObjectSchema(
  HttpStatusPhrases.UNAUTHORIZED
);

export const ZOD_ERROR_CODES = {
  INVALID_UPDATES: "invalid_updates",
};

export const NotFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);
export const DeleteResponseSchema = createMessageObjectSchema(HttpStatusPhrases.OK);


export const SuccessResponseSchema = z.object({
  id: z.string()
});

export const ErrorResponseSchema = z.object({
  error: z.string()
});


export const cuidField = z.string().cuid();
export const IdParamSchema = z.object({
  id: cuidField.openapi({
    param: { name: "id", in: "path" },
    example: "clx123abc"
  })
});
