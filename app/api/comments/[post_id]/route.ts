import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    const comments = await query("SELECT * FROM comments WHERE post_id = $1", [
      params.post_id,
    ]);
    return NextResponse.json(comments);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch comments",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { content, post_id, user_id } = await req.json();
    if (!content || !post_id || !user_id) {
      return NextResponse.json(
        { error: "Content, post_id, and user_id are required" },
        { status: 400 }
      );
    }

    const newComment = await query(
      "INSERT INTO comments (content, post_id, user_id) VALUES ($1, $2, $3) RETURNING *",
      [content, post_id, user_id]
    );

    return NextResponse.json(newComment[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
