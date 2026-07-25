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
              className="bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden text-left w-full active:scale-[0.98] transition-all"
            >
              <div className="flex flex-col items-center pt-6 pb-4 px-4">
                <div className="w-20 h-20 rounded-full bg-[#F5F2ED] overflow-hidden mb-3 shrink-0">
                  <img
                    src={doctor.photo}
                    alt={doctor.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-[#1A1A1A] leading-snug text-center">
                  {doctor.fullName}
                </h3>
                <p className="text-xs text-[#8B7355] mt-1 leading-relaxed text-center">
                  {doctor.specialty}
                </p>
                <div className="flex items-center gap-2 mt-3 justify-center">
                  {doctor.isDirector && (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-[#B8860B] bg-[#FDF8F0] px-2 py-0.5 rounded-full">
                      <Star size={10} /> Основатель
                    </span>
                  )}
                  {doctor.experience && (
                    <span className="text-[10px] text-[#6B6B6B]">
                      Стаж {doctor.experience}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
}
