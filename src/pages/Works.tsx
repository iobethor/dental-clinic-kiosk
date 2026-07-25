import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Gem, Crosshair, Heart, Crown, Wand, Sparkles, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface WorkItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  color: string;
}

const iconMap: Record<string, typeof Gem> = {
  viniry: Gem,
  implanty: Crosshair,
  recessiya: Heart,
  koronki: Crown,
  restavratsiya: Wand,
  "stat-molozhe": Sparkles,
};

export default function Works() {
  const navigate = useNavigate();
  const [items, setItems] = useState<WorkItem[]>([]);

  useEffect(() => {
    fetch("/data/works.json").then(r => r.json()).then(setItems).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title="Наши работы" onBack={() => navigate("/")} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.id] || Gem;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06 }}
                onClick={() => navigate(`/works/${item.id}`)}
                className="w-full flex items-center gap-4 bg-white rounded-2xl border border-[#E8E4DE] p-5 text-left active:scale-[0.98] transition-all"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <Icon size={28} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1A1A1A]">{item.title}</h3>
                  <p className="text-sm text-[#6B6B6B] mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <ChevronRight size={22} className="text-[#D4C8B0] shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
