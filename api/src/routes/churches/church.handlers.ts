import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { getPrisma } from "prisma/db";
import { CreateChurchRoute, ListChurchesRoute } from "./church.routes";


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

export const deleteUser: AppRouteHandler<DeleteUserRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const { id } = c.req.valid("param");
  const { userAgent, ipAddress } = getClientInfo(c);
  const currentUser = c.get("currentUser");

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        role: true,
        _count: {
          select: {
            invites: true
          }
        }
      }
    });

    if (!existingUser) {
      return c.json(
        {
          success: false,
          message: "User not found",
          code: "NOT_FOUND"
        },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Check for dependencies that might prevent deletion
    if (existingUser._count.invites > 0) {
      return c.json(
        {
          success: false,
          message: "Cannot delete user with existing invitations",
          code: "CONFLICT"
        },
        HttpStatusCodes.CONFLICT
      );
    }

    // Prevent deletion of the last admin
    if (existingUser.role === UserRole.ADMIN) {
      const adminCount = await prisma.user.count({
        where: { role: UserRole.ADMIN }
      });

      if (adminCount <= 1) {
        return c.json(
          {
            success: false,
            message: "Cannot delete the last administrator",
            code: "CONFLICT"
          },
          HttpStatusCodes.CONFLICT
        );
      }
    }

    // Delete user and related data in transaction
    await prisma.$transaction(async (tx) => {
      // Delete related data first (cascade should handle most of this, but being explicit)
      await tx.userLog.deleteMany({ where: { userId: id } });
      await tx.refreshToken.deleteMany({ where: { userId: id } });

      // Delete user (profile will be deleted by cascade)
      await tx.user.delete({ where: { id } });
    });

    // Log the deletion (create a system log since user is deleted)
    console.log(
      `User deleted: ${existingUser.name || existingUser.surname} (${id}) by ${
        currentUser?.name || "System"
      }`
    );

    return c.json(
      {
        success: true,
        message: "User deleted successfully",
        data: { id }
      },
      HttpStatusCodes.OK
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return c.json(
      {
        success: false,
        message: "Failed to delete user",
        code: "DELETE_ERROR"
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};