import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";
import { Gem, Crosshair, Heart, Crown, Wand, Sparkles } from "lucide-react";
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

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<WorkItem | null>(null);

  useEffect(() => {
    fetch("/data/works.json")
      .then(r => r.json())
      .then((data: WorkItem[]) => {
        const found = data.find(w => w.id === id);
        if (found) setItem(found);
      })
      .catch(() => {});
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen w-full bg-[#FAFAF8] flex items-center justify-center px-6">
        <p className="text-[#6B6B6B] text-lg">Категория не найдена</p>
      </div>
    );
  }

  const Icon = iconMap[item.id] || Gem;

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title={item.title} onBack={() => navigate("/works")} backLabel="Наши работы" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-[#E8E4DE] p-6 md:p-8"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
            style={{ backgroundColor: `${item.color}18` }}
          >
            <Icon size={32} style={{ color: item.color }} />
          </div>

          <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">{item.title}</h2>
          <p className="text-sm text-[#8B7355] mb-5">{item.description}</p>

          <p className="text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-line">
            {item.fullDescription}
          </p>
        </motion.div>
      </main>
    </div>
  );
}
