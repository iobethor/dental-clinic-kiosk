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
      <header className="bg-white border-b border-[#E8E4DE] px-6 py-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A]">
            {CLINIC_NAME}
          </h1>
          <p className="text-sm md:text-base text-[#8B7355] mt-1">
            {CLINIC_SUBTITLE}
          </p>
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
