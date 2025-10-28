import { SignOutButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="text-green-500">
      <SignOutButton></SignOutButton>
    </div>
  );
}
