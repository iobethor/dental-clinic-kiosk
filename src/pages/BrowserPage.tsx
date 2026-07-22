import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, ExternalLink } from "lucide-react";

export default function BrowserPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const url = params.get("url") || "https://smile-town.ru";

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b border-[#E8E4DE]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex items-center justify-between min-h-[64px]">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all rounded-xl px-5 py-3 text-sm font-medium text-[#1A1A1A]"
          >
            <ChevronLeft size={22} />
            <span className="hidden sm:inline">На главную</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#8B7355] hover:text-[#B8860B] transition-colors"
          >
            <ExternalLink size={14} />
            Открыть в браузере
          </a>
        </div>
      </div>
      <iframe
        src={url}
        className="flex-1 w-full border-0"
        title="Внешний сайт"
        sandbox="allow-same-origin allow-forms allow-scripts"
      />
    </div>
  );
}
