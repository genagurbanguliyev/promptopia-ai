import prisma from "@lib/prisma";

export const GET = async (requset) => {
  try {
    const prompts = await prisma.prompt.findMany({
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
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
