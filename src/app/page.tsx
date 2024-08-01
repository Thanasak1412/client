import Image from "./ui/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24 md:justify-between">
      <h2 className="text-2xl font-bold text-center md:text-4xl">TODO LIST</h2>

      <div className="w-full mt-4">
        <Image
          src="/illustration_dashboard.png"
          alt="Illustration of the todo"
          fill
          style={{ objectPosition: "top" }}
          sizes="(min-width: 1024px) 1000px, 100%"
        />
      </div>
    </main>
  );
}
