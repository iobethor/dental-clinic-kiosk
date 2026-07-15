import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  doctorName: string;
  imgSrc: string;
}

export default function QrModal({
  open,
  onClose,
  doctorName,
  imgSrc,
}: QrModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl p-5 md:p-6 w-full shadow-2xl"
            style={{ maxWidth: "640px" }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="min-w-0">
                <p className="text-xs text-[#8B7355]">Оставить отзыв</p>
                <h3 className="font-semibold text-[#1A1A1A] text-sm truncate">
                  {doctorName}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5F2ED] flex items-center justify-center active:scale-90 transition-transform shrink-0"
              >
                <X size={16} className="text-[#6B6B6B]" />
              </button>
            </div>

            <div className="bg-[#F5F2ED] rounded-2xl p-3 md:p-4">
              <img
                src={imgSrc}
                alt="Карточка врача с QR-кодом"
                className="w-full h-auto max-h-[55vh] object-contain rounded-xl"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="https://yandex.ru/profile/20786059493"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#F5F2ED] text-xs font-medium text-[#1A1A1A] hover:bg-[#EDE8E0] transition-colors active:scale-95"
              >
                <ExternalLink size={14} />
                Яндекс.Карты
              </a>
              <a
                href="https://go.2gis.com/516st"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#F5F2ED] text-xs font-medium text-[#1A1A1A] hover:bg-[#EDE8E0] transition-colors active:scale-95"
              >
                <ExternalLink size={14} />
                2ГИС
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
