import prisma from "@lib/prisma";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    const newPromt = await prisma.prompt.create({
      data: {
        creatorId: userId,
        tag,
        prompt,
      },
    });

    return new Response(JSON.stringify(newPromt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
