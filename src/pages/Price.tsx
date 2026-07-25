import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";

interface PriceItem {
  name: string;
  price: string;
}

interface PriceCategory {
  category: string;
  items: PriceItem[];
}

export default function Price() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [open, setOpen] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/prices.json")
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const toggle = (cat: string) => {
    setOpen(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title="Прайс-лист" onBack={() => navigate("/")} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <p className="text-sm text-[#6B6B6B] mb-6">
          Стоимость услуг в центре эстетической стоматологии «Дентал Имплант»
        </p>

        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const isOpen = open.includes(cat.category);
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden"
              >
                <button
                  onClick={() => toggle(cat.category)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left active:bg-[#F5F2ED] transition-colors min-h-[56px]"
                >
                  <span className="font-medium text-[#1A1A1A] text-sm">
                    {cat.category}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={20} className="text-[#8B7355] shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-[#8B7355] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 space-y-2">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 py-2.5 border-b border-[#F5F2ED] last:border-0"
                      >
                        <span className="text-sm text-[#1A1A1A] leading-snug">
                          {item.name}
                        </span>
                        <span className="text-sm font-medium text-[#B8860B] whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
