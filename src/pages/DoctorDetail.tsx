import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen w-full bg-[#FAFAF8] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#6B6B6B] text-lg">Врач не найден</p>
          <button
            onClick={() => navigate("/doctors")}
            className="mt-6 text-[#B8860B] bg-[#FDF8F0] px-6 py-3.5 rounded-xl font-medium active:scale-95 transition-transform"
          >
            К списку врачей
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader
        title={doctor.fullName}
        onBack={() => navigate("/doctors")}
        backLabel="К списку"
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <motion.div
          className="bg-white rounded-2xl border border-[#E8E4DE] p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            {doctor.fullName}
          </h1>
          <p className="text-[#8B7355] mt-1">{doctor.specialty}</p>

          <div className="flex flex-wrap gap-3 mt-4">
            {doctor.isDirector && (
              <span className="flex items-center gap-1 text-sm font-medium text-[#B8860B] bg-[#FDF8F0] px-3 py-1.5 rounded-full">
                <Star size={14} /> Основатель и директор
              </span>
            )}
            {doctor.experience && (
              <span className="text-sm text-[#6B6B6B] bg-[#F5F2ED] px-3 py-1.5 rounded-full">
                Стаж: {doctor.experience}
              </span>
            )}
          </div>

          <p className="mt-6 text-[#4A4A4A] leading-relaxed whitespace-pre-line">
            {doctor.description}
          </p>

          <div className="mt-8 pt-6 border-t border-[#E8E4DE]">
            <button
              onClick={() => navigate("/reviews")}
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all text-sm font-medium text-[#1A1A1A] min-h-[52px] w-full sm:w-auto"
            >
              <MessageSquare size={22} className="text-[#8B7355]" />
              Смотреть отзывы
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
