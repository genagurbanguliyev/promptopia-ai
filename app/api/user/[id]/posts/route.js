import prisma from "@lib/prisma";

export const GET = async (requset, { params }) => {
  try {
    const prompts = await prisma.prompt.findMany({
      where: {
        creatorId: params.id,
      },
      select: {
        id: true,
        prompt: true,
        tag: true,
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to user prompts", { status: 500 });
  }
};
