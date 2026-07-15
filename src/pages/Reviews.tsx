import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, MapPin, Navigation, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { doctors } from "@/data/doctors";
import { reviewSources } from "@/data/reviews";
import PageHeader from "@/components/PageHeader";
import QrModal from "@/components/QrModal";

export default function Reviews() {
  const navigate = useNavigate();
  const [modalTarget, setModalTarget] = useState<{
    name: string;
    src: string;
  } | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader title="Отзывы" onBack={() => navigate("/")} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <motion.div
          className="bg-white rounded-2xl border border-[#E8E4DE] p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Оставить отзыв на площадках
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {reviewSources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-[0.98] transition-all min-h-[52px]"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                  {source.name.includes("Яндекс") ? (
                    <MapPin size={20} className="text-[#CC4444]" />
                  ) : (
                    <Navigation size={20} className="text-[#4477CC]" />
                  )}
                </div>
                <span className="flex-1 text-sm font-medium text-[#1A1A1A]">
                  {source.name}
                </span>
                <ExternalLink size={16} className="text-[#8B7355]" />
              </a>
            ))}
          </div>
        </motion.div>

        <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">
          Наши врачи
        </h2>
        <div className="flex flex-col gap-3">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="bg-white rounded-2xl border border-[#E8E4DE] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#1A1A1A]">
                    {doctor.fullName}
                  </h3>
                  <p className="text-xs text-[#8B7355] mt-0.5">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-[#B8860B]">
                    <Star size={14} fill="#B8860B" />
                    <Star size={14} fill="#B8860B" />
                    <Star size={14} fill="#B8860B" />
                    <Star size={14} fill="#B8860B" />
                    <Star size={14} fill="#B8860B" />
                    <span className="text-xs text-[#6B6B6B] ml-1">5.0</span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setModalTarget({
                      name: doctor.fullName,
                      src: doctor.photoFull,
                    })
                  }
                  className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-[#F5F2ED] hover:bg-[#EDE8E0] active:bg-[#E3DCD0] active:scale-95 transition-all text-xs font-medium text-[#1A1A1A] min-h-[44px] whitespace-nowrap"
                >
                  <MessageSquare size={18} className="text-[#8B7355]" />
                  Оставить отзыв о враче
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {modalTarget && (
        <QrModal
          open={!!modalTarget}
          onClose={() => setModalTarget(null)}
          doctorName={modalTarget.name}
          imgSrc={modalTarget.src}
        />
      )}
    </div>
  );
}
