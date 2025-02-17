import ProfilePage from "@/components/ProfilePage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <ProfilePage id={id} />
    </div>
  );
};

export default Page;
