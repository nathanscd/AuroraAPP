import { useState } from "react";
import { storyData } from "@/data/storyData";
import { PageTitle } from "@/components/common";
import { StoryPage } from "@/components/storybook/StoryPage";

export default function StoryBookPage() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const currentChapter = storyData[currentChapterIndex];

  const handleNext = () => {
    if (currentChapterIndex < storyData.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-12">
        <PageTitle
          title="Livro Interativo"
          subtitle="Nossa história, capítulo por capítulo"
        />
      </div>

      <StoryPage
        chapter={currentChapter}
        currentChapter={currentChapterIndex + 1}
        totalChapters={storyData.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
