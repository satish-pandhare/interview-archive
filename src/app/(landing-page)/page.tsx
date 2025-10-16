import BentoGrid from "./_components/bento";
import { Hero } from "./_components/hero";

export default function Home() {
  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <BentoGrid />
          <footer className="mt-16 text-center text-sm text-muted-foreground py-8">
            <p>Made with ❤️ by Harsh</p>
          </footer>
        </div>
      </div>
    </>
  );
}
