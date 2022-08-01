import Boxedlayout from "../../../../lib/layouts/BoxedLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Boxedlayout>
      <div className="flex min-h-screen w-full flex-col items-start justify-center gap-10">
        <span className="top-20 font-caveat text-[50px]">Timeus</span>
        {children}
      </div>
    </Boxedlayout>
  );
}
