import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-[#09090b]/80 backdrop-blur-xl overflow-hidden p-4">
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-900/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-900/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/30 blur-3xl" />
      <SignUp
        fallbackRedirectUrl="/dashboard"
        appearance={{
          layout: {
            socialButtonsPlacement: "top",
            socialButtonsVariant: "blockButton",
          },
          elements: {
            rootBox: "mx-auto w-full",
            cardBox: "w-full max-w-[450px]",
            card: "bg-white shadow-2xl rounded-3xl p-8 border border-slate-200",
            headerTitle: "text-slate-900 text-3xl font-extrabold text-center",
            headerSubtitle: "text-slate-500 text-center mt-2 font-medium",
            socialButtonsBlockButton:
              "w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-all shadow-sm flex justify-center items-center",
            dividerRow: "my-6",
            dividerLine: "bg-slate-200",
            dividerText: "text-slate-400 font-medium px-3",
            formFieldLabel: "text-slate-700 font-semibold mb-2 block",
            formFieldInput:
              "w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none box-border",
            formButtonPrimary:
              "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all mt-4 shadow-md flex justify-center items-center box-border",
            footerActionText: "text-slate-500 font-medium",
            footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold",
          },
        }}
      />
    </main>
  );
}
