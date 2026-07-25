import { motion } from "framer-motion";
import { Link } from "react-router";
import { buttons, CLINIC_NAME, CLINIC_SUBTITLE } from "@/config";

const iconColors: Record<string, string> = {
  doctors: "#B8860B",
  price: "#8B7355",
  consumer: "#6B8E6B",
  site: "#4477CC",
  works: "#B8860B",
  reviews: "#B8860B",
};

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <header className="bg-white border-b border-[#E8E4DE] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5">
          <svg
            className="w-28 h-28 overflow-visible"
            viewBox="0 0 200 200"
            style={{ filter: "drop-shadow(0 10px 18px rgb(20 20 18 / 0))" }}
          >
            <style>{`
              @keyframes petal-breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.035); }
              }
              @keyframes petal-shift1 {
                0%, 100% { transform: translate(0,0); }
                50% { transform: translate(-2px,-2px); }
              }
              @keyframes petal-shift2 {
                0%, 100% { transform: translate(0,0); }
                50% { transform: translate(2px,-2px); }
              }
              @keyframes petal-shift3 {
                0%, 100% { transform: translate(0,0); }
                50% { transform: translate(-2px,2px); }
              }
              @keyframes petal-shift4 {
                0%, 100% { transform: translate(0,0); }
                50% { transform: translate(2px,2px); }
              }
              @keyframes sparkle {
                0%, 30%, 70%, 100% { opacity: 0; transform: scale(.55) rotate(0deg); }
                46%, 55% { opacity: .95; transform: scale(1) rotate(14deg); }
              }
              .petal { fill: none; stroke: currentColor; stroke-width: 17; stroke-linecap: butt; stroke-linejoin: round; transform-box: fill-box; transform-origin: center; }
              .p1 { animation: petal-shift1 6s cubic-bezier(.45,0,.25,1) infinite; }
              .p2 { animation: petal-shift2 6s cubic-bezier(.45,0,.25,1) infinite; }
              .p3 { animation: petal-shift3 6s cubic-bezier(.45,0,.25,1) infinite; }
              .p4 { animation: petal-shift4 6s cubic-bezier(.45,0,.25,1) infinite; }
              .shine { fill: #1A1A1A; opacity: 0; transform-origin: 100px 100px; animation: sparkle 6s ease-in-out infinite; }
              .mark-group { animation: petal-breathe 6s ease-in-out infinite; }
            `}</style>
            <g className="mark-group">
              <path className="petal p1" d="M100 96 C76 96 56 96 40 96 C27 96 20 86 20 73 L20 43 C20 30 30 20 43 20 L93 20 C94 51 89 77 66 89 C56 95 47 96 40 96" />
              <path className="petal p2" d="M104 100 C104 76 104 56 104 40 C104 27 114 20 127 20 L157 20 C170 20 180 30 180 43 L180 73 C180 86 170 96 157 96 L127 96 C114 96 105 91 104 100" />
              <path className="petal p3" d="M100 104 C76 104 56 104 40 104 C27 104 20 114 20 127 L20 157 C20 170 30 180 43 180 L93 180 C94 149 89 123 66 111 C56 105 47 104 40 104" />
              <path className="petal p4" d="M104 100 C104 124 104 144 104 160 C104 173 114 180 127 180 L157 180 C170 180 180 170 180 157 L180 127 C180 114 170 104 157 104 L127 104 C114 104 105 109 104 100" />
              <path className="shine" d="M100 76 L104 96 L124 100 L104 104 L100 124 L96 104 L76 100 L96 96 Z" />
            </g>
          </svg>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-medium tracking-[0.105em] text-[#1A1A1A]">
              {CLINIC_NAME}
            </h1>
            <p className="text-[11px] md:text-xs text-[#8B7355] mt-1.5 tracking-[0.1em] uppercase">
              {CLINIC_SUBTITLE}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {buttons.map((button, index) => {
              const Icon = button.icon;
              const isExternal = button.href.startsWith("http");
              const color = iconColors[button.id] || "#B8860B";

              const cardContent = (
                <div className="flex flex-col items-center justify-center h-full py-8 px-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon size={30} style={{ color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1A1A] text-center">
                    {button.title}
                  </h3>
                  <p className="text-xs text-[#8B7355] text-center mt-1">
                    {button.description}
                  </p>
                </div>
              );

              return (
                <motion.div
                  key={button.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {isExternal ? (
                    <a
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#B8860B] hover:shadow-lg hover:shadow-[rgba(184,134,11,0.08)] transition-all duration-300 h-full active:scale-[0.97]"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <Link
                      to={button.href}
                      className="block bg-white rounded-2xl border border-[#E8E4DE] hover:border-[#B8860B] hover:shadow-lg hover:shadow-[rgba(184,134,11,0.08)] transition-all duration-300 h-full active:scale-[0.97]"
                    >
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-[#E8E4DE] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-x-6 gap-y-1 flex-wrap text-xs text-[#8B7355]">
          <span className="text-[#B8860B] font-medium">ООО «Дентал Имплант»</span>
          <span className="hidden sm:inline text-[#D4C8B0]">•</span>
          <span>ул. Перерва, д.45, к.1</span>
          <span className="hidden sm:inline text-[#D4C8B0]">•</span>
          <span className="font-medium text-[#1A1A1A]">8-495-347-77-07</span>
        </div>
      </footer>
    </div>
  );
}
