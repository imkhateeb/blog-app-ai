import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const post = await query("SELECT * FROM posts WHERE id = $1", [params.id]);
    return NextResponse.json(post[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to fetch post",
      },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content, published } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const updatedPost = await query(
      "UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *",
      [title, content, published, params.id]
    );

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await query("DELETE FROM posts WHERE id = $1", [params.id]);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
