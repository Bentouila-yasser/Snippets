'use server'
import { db } from "@/db";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function editeSnippet (id: number, code: string) {
  console.log("eidte snipeet function caled")
  await db.snippet.update({
    where: {id },
    data:{code }
  })
  revalidatePath(`/snippets/${id}`)
  redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  })
  revalidatePath(`/`)
  redirect(`/`)
}

export async function createSnippet(formState: {message: string}, formData: FormData) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer'
      }
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'code must be longer'
      }
    }
    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      }
    } else {
      return {
        message: "Something went wrong, please try again later."
      }
    }
  }

  // Redirect the user back to the root route
  revalidatePath(`/`)
  redirect('/');
}
