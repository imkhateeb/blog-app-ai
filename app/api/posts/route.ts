import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content, author_id, published } = await req.json();
    if (!title || !content || !author_id) {
      return NextResponse.json(
        { error: "Title, content, and author_id are required" },
        { status: 400 }
      );
    }

    const newPost = await query(
      "INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, author_id, published]
    );

    return NextResponse.json(newPost[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await query("SELECT * FROM posts");
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
