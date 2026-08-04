import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
}

export default function PageHeader({
  title,
  onBack,
  backLabel = "На главную",
}: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-[#E8E4DE]">
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 flex items-center min-h-[64px]">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all rounded-xl px-5 py-3 text-sm font-medium text-[#1A1A1A] shrink-0"
        >
          <ChevronLeft size={22} />
          <span className="hidden sm:inline">{backLabel}</span>
        </button>
        <h1 className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-semibold text-[#1A1A1A] px-24 pointer-events-none truncate">
          {title}
        </h1>
      </div>
    </div>
  );
}
