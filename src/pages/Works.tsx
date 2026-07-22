import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { workCategories } from "@/data/works";
import PageHeader from "@/components/PageHeader";

export default function Works() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title="Наши работы" onBack={() => navigate("/")} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <p className="text-sm text-[#6B6B6B] mb-6 max-w-2xl">
          Посмотрите, каких результатов мы достигаем для наших пациентов
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="bg-white rounded-2xl border border-[#E8E4DE] p-5 flex flex-col"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  <Icon size={24} style={{ color: cat.color }} />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {cat.fullDescription}
                </p>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
