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
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex items-center gap-3 min-h-[64px]">
        <button
          onClick={onBack}
          className="flex items-center gap-2.5 bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all rounded-xl px-5 py-3 text-sm font-medium text-[#1A1A1A]"
        >
          <ChevronLeft size={22} />
          <span className="hidden sm:inline">{backLabel}</span>
        </button>
        <div className="h-7 w-px bg-[#E8E4DE]" />
        <h1 className="text-lg md:text-xl font-semibold text-[#1A1A1A] truncate">
          {title}
        </h1>
      </div>
    </div>
  );
}
