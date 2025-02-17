import BlogDetails from "@/components/BlogDetails";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <BlogDetails id={id} />
    </div>
  );
};

export default BlogDetail;
