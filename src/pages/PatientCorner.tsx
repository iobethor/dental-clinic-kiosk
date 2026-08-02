import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  FileSpreadsheet,
  ChevronRight,
  Phone,
  MapPin,
  Award,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { documents } from "@/data/documents";
import PageHeader from "@/components/PageHeader";

const docIcons: Record<string, typeof FileText> = {
  rules: FileSpreadsheet,
  contract: FileText,
  "consumer-rights": Scale,
};

const DOC_ROUTES: Record<string, string> = {
  rules: "/patient-corner/rules",
  contract: "/patient-corner/contract",
  "consumer-rights": "/patient-corner/consumer-rights",
};

const licenses = [
  "/docs/doc-1.jpg",
  "/docs/doc-2.jpg",
  "/docs/doc-3.jpg",
];

export default function PatientCorner() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader
        title="Уголок потребителя"
        onBack={() => navigate("/")}
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <div className="space-y-3">
          {documents.map((doc, index) => {
            const Icon = docIcons[doc.id] || FileText;
            const route = DOC_ROUTES[doc.id];
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => route && navigate(route)}
                className="bg-white rounded-2xl border border-[#E8E4DE] p-5 cursor-pointer transition-all duration-300 hover:border-[#B8860B] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F2ED] flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-[#8B7355]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#1A1A1A]">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#8B7355] mt-0.5">
                      {doc.description}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-[#8B7355] shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-6 bg-white rounded-2xl border border-[#E8E4DE] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-semibold text-[#1A1A1A] mb-4">
            Лицензии и документы
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {licenses.map((src, index) => (
              <button
                key={src}
                onClick={() => setPreview(src)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F5F2ED] active:scale-[0.97] transition-transform cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Документ ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 py-2 bg-gradient-to-t from-black/50 to-transparent text-white text-[10px] font-medium">
                  <Award size={12} />
                  Увеличить
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 bg-white rounded-2xl border border-[#E8E4DE] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-semibold text-[#1A1A1A] mb-4">
            Информация о клинике
          </h2>
          <div className="space-y-3 text-sm text-[#6B6B6B]">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#8B7355] shrink-0" />
              <span>109341, г. Москва, ул. Перерва, д.45, к.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#8B7355] shrink-0" />
              <span>8-495-347-77-07</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-[#F5F2ED] rounded-xl p-3">
                <p className="text-[10px] text-[#8B7355]">ОГРН</p>
                <p className="font-medium text-[#1A1A1A] text-sm">
                  5077746752386
                </p>
              </div>
              <div className="bg-[#F5F2ED] rounded-xl p-3">
                <p className="text-[10px] text-[#8B7355]">ИНН</p>
                <p className="font-medium text-[#1A1A1A] text-sm">
                  7723612248
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {preview && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPreview(null)}
        >
          <motion.div
            className="relative w-full h-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-2 -right-2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center active:scale-90 transition-transform"
            >
              <X size={20} className="text-[#1A1A1A]" />
            </button>
            <img
              src={preview}
              alt="Документ"
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
