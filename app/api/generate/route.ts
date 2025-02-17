import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
const generateBlogPost = async (title: string) => {
  const prompt = `
You are an expert content writer specializing in engaging and informative blog posts. Generate a well-structured blog post with:
1. A compelling title (using the provided title as basis)
2. An engaging introduction
3. Well-researched main content with key points, insights, and examples
4. A strong conclusion with key takeaways

Title: ${title}

Response format:
# ${title}
## Introduction
[Introduction content]

## Main Content
- [Key point 1]
- [Key point 2]
- [Key point 3]

## Conclusion
[Conclusion content]
    `;

  try {
    const chat = new ChatOpenAI({
      modelName: "gpt-4-0125-preview",
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const response = await chat.invoke(prompt);

    return {
      status: "success",
      data: response.content,
    };
  } catch (error) {
    console.error("Error generating blogPost:", error);
    return {
      status: "error",
      message: "Failed to generate blogPost. Please try again.",
    };
  }
};

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const response = await generateBlogPost(title);

    return NextResponse.json(response?.data as string);
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post. Please try again." },
      { status: 500 }
    );
  }
}
