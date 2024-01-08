import { Prisma } from "../app/prisma.js";

// FIND / CREATE SKILL CATEGORY ID
const find_or_create_skill_category = async (title) => {
  // FIND CATEGORY
  const category = await Prisma.skillCategory.findFirst({
    where: { title: title },
  });

  // IF EXIST, RETURN ITS ID
  if (category) return category.id;

  // IF NOT, CREATE NEW
  const newCategory = await Prisma.skillCategory.create({
    data: { title },
  });
  // RETURN THE ID
  return newCategory.id;
};
export default { find_or_create_skill_category };
