import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { getPrisma } from "prisma/db";
import { CreateChurchRoute, DeleteChurchRoute, getChurchAdminsRoute, getChurchByIdRoute, GetChurchBySubDomainRoute, ListChurchesRoute } from "./church.routes";


export const createChurch: AppRouteHandler<CreateChurchRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const data = c.req.valid("json");

  try {
    // Check for conflicts
    const titleConflict = await prisma.church.findFirst({
        where: {
            name: data.name
        }
    });

    const domainConflict = await prisma.church.findUnique({
        where: {
            subdomain: data.subdomain
        }
    });
    if (titleConflict) {
       return c.json(
        {
           error: "Church title already taken"
        },
        HttpStatusCodes.CONFLICT
      );
    }

    if (domainConflict) {
       return c.json(
        {
           error: "Sub Domain already taken"
        },
        HttpStatusCodes.CONFLICT
      );
    }

    // Create church
    const church = await prisma.church.create({ 
      data,
      select: {
        id: true
      }
    });

    return c.json(
      church,
      HttpStatusCodes.CREATED
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json(
      {
        error: "Failed to create church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const listChurches: AppRouteHandler<ListChurchesRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  

  try {


    // Create church
    const churches = await prisma.church.findMany({ 
      orderBy: {
        createdAt: "desc"
      }
    });

    return c.json(
      churches,
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json(
      {
        error: "Failed to create church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const deleteChurch: AppRouteHandler<DeleteChurchRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const { id } = c.req.valid("param");

  try {
    // Check if user exists
    const existingChurch = await prisma.church.findUnique({
      where: { id },
      select: {
        id: true,
        _count: {
          select: {
            users: true
          }
        }
      }
    });

    if (!existingChurch) {
      return c.json(
        {
          error: "Church not found",
        },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Check for dependencies that might prevent deletion
    if (existingChurch._count.users > 0) {
      return c.json(
        {
          error: "Cannot delete church with existing users",
        },
        HttpStatusCodes.CONFLICT
      );
    }

    // Delete user (profile will be deleted by cascade)
      const deleted = await prisma.church.delete({ 
        where: { id },
        select: {
          id: true
        }
      });

    return c.json(
      deleted,
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json(
      {
        error: "Failed to delete church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getChurchBySubDomain: AppRouteHandler<GetChurchBySubDomainRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const { subdomain } = c.req.valid("param");

  try {
    // Check if user exists
    const existingChurch = await prisma.church.findUnique({
      where: { subdomain },
      select: {
        name: true,
        subdomain: true
      }
    });

    if (!existingChurch) {
      return c.json(
        {
          error: "Church not found",
        },
        HttpStatusCodes.NOT_FOUND
      );
    }

       

    return c.json(
      existingChurch,
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json(
      {
        error: "Failed to delete church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getChurchById: AppRouteHandler<getChurchByIdRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const {id} = c.req.valid("param");

  try {
    // Check if user exists
    const existingChurch = await prisma.church.findUnique({
      where: { id },
      select: {
        name: true,
        subdomain: true
      }
    });

    if (!existingChurch) {
      return c.json(
        {
          error: "Church not found",
        },
        HttpStatusCodes.NOT_FOUND
      );
    }

       

    return c.json(
      existingChurch,
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json(
      {
        error: "Failed to delete church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

export const getChurchAdmins: AppRouteHandler<getChurchAdminsRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const {id} = c.req.valid("param");

  try {
    // Check if user exists
    const users = await prisma.user.findMany({
      where: {
        churchId: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

       

    return c.json(
      users,
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json(
      {
        error: "Failed to delete church",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};