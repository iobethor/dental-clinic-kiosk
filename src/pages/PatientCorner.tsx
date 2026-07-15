import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  FileSpreadsheet,
  ChevronRight,
  Phone,
  MapPin,
} from "lucide-react";
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

export default function PatientCorner() {
  const navigate = useNavigate();

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
    </div>
  );
}
