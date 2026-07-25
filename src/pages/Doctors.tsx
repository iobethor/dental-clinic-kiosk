import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router";
import { doctors } from "@/data/doctors";
import PageHeader from "@/components/PageHeader";

export default function Doctors() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title="Наши врачи" onBack={() => navigate("/")} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {doctors.map((doctor, index) => (
            <motion.button
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => navigate(`/doctors/${doctor.id}`)}
              className="bg-white rounded-2xl border border-[#E8E4DE] text-left w-full active:scale-[0.98] transition-all flex flex-col items-center px-4 pt-7 pb-5"
            >
              <div className="w-28 h-28 rounded-full bg-[#F5F2ED] overflow-hidden mb-4 shrink-0 ring-2 ring-[#E8E4DE]">
                <img
                  src={doctor.photo}
                  alt={doctor.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-[#1A1A1A] leading-snug text-center text-base">
                {doctor.fullName}
              </h3>
              <p className="text-xs text-[#8B7355] mt-1.5 leading-relaxed text-center">
                {doctor.specialty}
              </p>
              <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
                {doctor.isDirector && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-[#B8860B] bg-[#FDF8F0] px-2.5 py-1 rounded-full">
                    <Star size={12} /> Основатель
                  </span>
                )}
                {doctor.experience && (
                  <span className="text-[11px] text-[#6B6B6B] bg-[#F5F2ED] px-2.5 py-1 rounded-full">
                    Стаж {doctor.experience}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
