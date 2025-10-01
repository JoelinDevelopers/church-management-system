/* eslint-disable style/operator-linebreak */
/* eslint-disable style/arrow-parens */
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { getPrisma } from "prisma/db";

import type { BriefItemsRoute, ListRoute } from "./stats.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  const categories = await prisma.category.findMany({ include: { products: true } });
  const products = await prisma.product.findMany();

  const totalCategories = categories.length;
  const totalProducts = products.length;

  const productsPerCategory = categories.map((category) => ({
    categoryId: String(category.id),
    categoryName: category.name,
    productCount: products.filter((product) => String(product.categoryId) === String(category.id)).length,
  }));

  const prices = products.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const avgPrice = prices.length ? prices.reduce((s, p) => s + p, 0) / prices.length : 0;

  return c.jsonT({
    totalCategories,
    totalProducts,
    productsPerCategory,
    priceStats: {
      min: minPrice,
      max: maxPrice,
      average: Math.round(avgPrice * 100) / 100,
    },
    lastUpdated: new Date().toISOString(),
  }, HttpStatusCodes.OK);
};

export const briefItems: AppRouteHandler<BriefItemsRoute> = async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  const categories = await prisma.category.findMany({ select: { id: true, name: true } });
  const brands = await prisma.brand.findMany({ select: { id: true, title: true } });
  const products = await prisma.product.findMany({ select: { id: true, name: true } });

  const categoryOptions = categories.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  const brandOptions = brands.map((item) => ({
    label: item.title,
    value: String(item.id),
  }));

  const productOptions = products.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  return c.jsonT(
    { productOptions, brandOptions, categoryOptions },
    HttpStatusCodes.OK
  );
};
