import { galleryProjects } from "./data";
import VibePreviewCard from "./VibePreviewCard";

function GalleryPage() {
  return (
    <section className="py-16 w-[90%] max-w-7xl  mx-auto">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
          Gallery
        </h1>
        <h3 className="mt-4 lg:text-2xl font-semibold max-w-2xl mx-auto text-center text-primary">
          Explore a collection of AI-generated projects built with Promptly.
        </h3>
        <p className="mt-3 max-md:text-sm max-w-xl text-center mx-auto">
          Each example was created from a simple text prompt, showing how
          Promptly turns ideas into working Next.js sites with basic structure
          and styling. Click to preview the results
          <span className="md:hidden">.</span>
          <span className="max-md:hidden">
            {" "}
            and see what’s possible with just a few words.
          </span>
        </p>
      </div>
      <ul className="mt-12 grid gap-y-8 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
        {galleryProjects.map((project) => (
          <VibePreviewCard key={project.url} data={project}></VibePreviewCard>
        ))}
      </ul>
    </section>
  );
}
export default GalleryPage;
