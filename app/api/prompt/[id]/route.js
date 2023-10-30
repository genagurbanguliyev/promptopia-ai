import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

//GET (read)
export const GET = async (request, { params }) => {
  try {
    const prompt = await prisma.prompt.findFirstOrThrow({
      where: {
        id: params.id,
      },
    });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new Response(error.message, { status: 404 });
      }
    }
    return new Response(error, { status: 500 });
  }
};

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  console.log(params.id);
  try {
    await prisma.prompt.findUniqueOrThrow({
      where: {
        id: params.id,
      },
    });

    const editedPrompt = await prisma.prompt.update({
      where: { id: params.id },
      data: { prompt, tag },
    });

    return new Response(JSON.stringify(editedPrompt), { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new Response(error.message, { status: 404 });
      }
    }
    return new Response(error, { status: 500 });
  }
};

//(DELETE)
export const DELETE = async (request, { params }) => {
  try {
    await prisma.prompt.findUniqueOrThrow({
      where: {
        id: params.id,
      },
    });
    const user = await prisma.prompt.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return new Response(error.message, { status: 404 });
      }
    }
    return new Response(error, { status: error.status });
  }
};
