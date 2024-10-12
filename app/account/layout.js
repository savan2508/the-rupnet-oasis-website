import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex h-screen gap-12 mt-1">
        <SideNavigation />
        <div className="py-1 px-2 mr-3 mt-2 flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
