import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";

export default function Doctors() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader
        title="Наши врачи"
        onBack={() => navigate("/")}
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl border border-[#E8E4DE] p-5 md:p-6 flex flex-col"
            >
              <div
                className="cursor-pointer active:scale-[0.99] transition-transform"
                onClick={() => navigate(`/doctors/${doctor.id}`)}
              >
                <h3 className="text-lg font-semibold text-[#1A1A1A]">
                  {doctor.fullName}
                </h3>
                <p className="text-sm text-[#8B7355] mt-0.5">
                  {doctor.specialty}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  {doctor.isDirector && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#B8860B] bg-[#FDF8F0] px-2.5 py-1 rounded-full">
                      <Star size={12} /> Основатель
                    </span>
                  )}
                  {doctor.experience && (
                    <span className="text-xs text-[#6B6B6B]">
                      Стаж: {doctor.experience}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-[#6B6B6B] leading-relaxed line-clamp-3 flex-1">
                {doctor.description}
              </p>

              <div className="mt-5 pt-4 border-t border-[#E8E4DE] flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate(`/doctors/${doctor.id}`)}
                  className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all text-sm font-medium text-[#1A1A1A] min-h-[48px]"
                >
                  Подробнее
                </button>
                <button
                  onClick={() => navigate("/reviews")}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#E8E4DE] hover:bg-[#F5F2ED] active:bg-[#EDE8E0] active:scale-95 transition-all text-sm font-medium text-[#8B7355] min-h-[48px]"
                >
                  <MessageSquare size={18} />
                  Отзывы
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
