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

// REMOVE CATEGORY IS HAVING NO RELATIONSHIP
const remove_category = async (previousSkillId) => {
  // FIND FROM PREVIOUS ID
  const category = await Prisma.skillCategory.findUnique({
    where: { id: previousSkillId },
    include: { _count: { select: { skill: true } } },
  });

  // IF EMPTY, DELETE THE SKILL
  if (category._count.skill == 0)
    await Prisma.skillCategory.delete({
      where: { id: previousSkillId },
    });
};
export default { find_or_create_skill_category, remove_category };
