import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { documents } from "@/data/documents";
import PageHeader from "@/components/PageHeader";

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doc = documents.find((d) => d.id === id);

  if (!doc) {
    return (
      <div className="min-h-screen w-full bg-[#FAFAF8] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#6B6B6B] text-lg">Документ не найден</p>
          <button
            onClick={() => navigate("/patient-corner")}
            className="mt-6 text-[#B8860B] bg-[#FDF8F0] px-6 py-3.5 rounded-xl font-medium active:scale-95 transition-transform"
          >
            Вернуться
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAF8] flex flex-col">
      <PageHeader
        title={doc.title}
        onBack={() => navigate("/patient-corner")}
        backLabel="Назад"
      />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-8">
        <motion.div
          className="bg-white rounded-2xl border border-[#E8E4DE] p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#F5F2ED] flex items-center justify-center">
              <FileText size={20} className="text-[#8B7355]" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1A1A]">{doc.title}</h2>
          </div>

          <div className="text-[#4A4A4A] leading-relaxed whitespace-pre-line text-sm md:text-base">
            {doc.content.split("\n\n").map((paragraph, i) => {
              const isHeader =
                paragraph.match(/^[А-ЯA-Z]/) &&
                paragraph.length < 100 &&
                !paragraph.endsWith(".") &&
                !paragraph.includes(":");

              if (isHeader) {
                return (
                  <h3
                    key={i}
                    className="text-lg font-bold text-[#1A1A1A] mt-6 mb-3"
                  >
                    {paragraph}
                  </h3>
                );
              }

              if (paragraph.startsWith("•")) {
                return (
                  <ul
                    key={i}
                    className="list-disc list-inside text-[#4A4A4A] my-2 space-y-0.5"
                  >
                    {paragraph.split("\n").map((line, j) => (
                      <li key={j} className="text-sm md:text-base">
                        {line.replace(/^•\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="my-2 text-sm md:text-base">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
