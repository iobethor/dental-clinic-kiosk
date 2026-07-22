import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Save, LogOut, ImageUp, ChevronLeft, Plus, Trash2 } from "lucide-react";

interface DoctorData { id: string; fullName: string; photo: string; photoFull: string; specialty: string; experience: string; about: string }
interface WorkData { id: string; title: string; description: string; fullDescription: string; color: string }
interface ClinicData { name: string; subtitle: string; address: string; phone: string; ogrn: string; inn: string; footer: string }
interface PriceItem { name: string; price: string }
interface PriceCategory { category: string; items: PriceItem[] }

const REPO = "iobethor/dental-clinic-kiosk";
const BRANCH = "main";

function base64(str: string) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

type Section = "clinic" | "doctors" | "works" | "price";

export default function Admin() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<Section>("clinic");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [clinic, setClinic] = useState<ClinicData | null>(null);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [works, setWorks] = useState<WorkData[]>([]);
  const [prices, setPrices] = useState<PriceCategory[]>([]);

  useEffect(() => {
    if (!authed) return;
    Promise.all([
      fetch("/data/clinic.json").then(r => r.json()),
      fetch("/data/doctors.json").then(r => r.json()),
      fetch("/data/works.json").then(r => r.json()),
      fetch("/data/prices.json").then(r => r.json()),
    ]).then(([c, d, w, p]) => {
      setClinic(c);
      setDoctors(d);
      setWorks(w);
      setPrices(p);
    });
  }, [authed]);

  const githubPut = useCallback(async (path: string, content: string) => {
    const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
    let sha: string | undefined;
    const getRes = await fetch(url + `?ref=${BRANCH}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" },
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `Admin update: ${path}`,
        content: base64(content),
        branch: BRANCH,
        sha,
      }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `HTTP ${res.status}`);
    }
  }, [token]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      if (clinic) await githubPut("public/data/clinic.json", JSON.stringify(clinic, null, 2));
      await githubPut("public/data/doctors.json", JSON.stringify(doctors, null, 2));
      await githubPut("public/data/works.json", JSON.stringify(works, null, 2));
      await githubPut("public/data/prices.json", JSON.stringify(prices, null, 2));
      setMessage("Сохранено! Изменения появятся через 1-2 минуты после деплоя.");
    } catch (e: any) {
      setMessage("Ошибка: " + (e?.message || "неизвестная ошибка"));
    }
    setSaving(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-[#E8E4DE] p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2">Админ-панель</h1>
          <p className="text-sm text-[#6B6B6B] mb-6">Введите токен доступа</p>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="GitHub Token"
            className="w-full px-4 py-3 rounded-xl border border-[#E8E4DE] text-sm mb-4 focus:outline-none focus:border-[#B8860B]"
            onKeyDown={e => e.key === "Enter" && setAuthed(true)}
          />
          <button
            onClick={() => setAuthed(true)}
            className="w-full py-3 rounded-xl bg-[#B8860B] text-white font-medium text-sm active:scale-95 transition-all"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  const sections: { key: Section; label: string }[] = [
    { key: "clinic", label: "О клинике" },
    { key: "doctors", label: "Врачи" },
    { key: "works", label: "Наши работы" },
    { key: "price", label: "Прайс" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      <div className="sticky top-0 z-30 bg-white border-b border-[#E8E4DE]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-xl bg-[#F5F2ED] flex items-center justify-center active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} className="text-[#6B6B6B]" />
            </button>
            <h1 className="text-lg font-semibold text-[#1A1A1A]">Админ-панель</h1>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 text-xs text-[#8B7355] active:scale-95 transition-all"
          >
            <LogOut size={14} />
            Выйти
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all active:scale-95 ${
                section === s.key
                  ? "bg-[#B8860B] text-white"
                  : "bg-white border border-[#E8E4DE] text-[#6B6B6B]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4DE] p-6">
          {section === "clinic" && clinic && (
            <ClinicForm data={clinic} onChange={setClinic} />
          )}
          {section === "doctors" && (
            <DoctorsForm data={doctors} onChange={setDoctors} token={token} />
          )}
          {section === "works" && (
            <WorksForm data={works} onChange={setWorks} />
          )}
          {section === "price" && (
            <PriceForm data={prices} onChange={setPrices} />
          )}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B8860B] text-white font-medium text-sm disabled:opacity-50 active:scale-95 transition-all"
          >
            <Save size={18} />
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
          {message && (
            <span className={`text-sm ${message.includes("Ошибка") ? "text-red-500" : "text-green-600"}`}>
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PriceForm({ data, onChange }: { data: PriceCategory[]; onChange: (d: PriceCategory[]) => void }) {
  const updateCat = (i: number, v: string) => {
    const next = [...data];
    next[i] = { ...next[i], category: v };
    onChange(next);
  };
  const updateItem = (catIdx: number, itemIdx: number, key: "name" | "price", val: string) => {
    const next = [...data];
    next[catIdx] = { ...next[catIdx], items: next[catIdx].items.map((it, j) => j === itemIdx ? { ...it, [key]: val } : it) };
    onChange(next);
  };
  const addItem = (catIdx: number) => {
    const next = [...data];
    next[catIdx] = { ...next[catIdx], items: [...next[catIdx].items, { name: "", price: "" }] };
    onChange(next);
  };
  const removeItem = (catIdx: number, itemIdx: number) => {
    const next = [...data];
    next[catIdx] = { ...next[catIdx], items: next[catIdx].items.filter((_, j) => j !== itemIdx) };
    onChange(next);
  };
  const addCategory = () => {
    onChange([...data, { category: "", items: [{ name: "", price: "" }] }]);
  };
  const removeCategory = (catIdx: number) => {
    onChange(data.filter((_, i) => i !== catIdx));
  };
  return (
    <div className="space-y-6">
      {data.map((cat, catIdx) => (
        <div key={catIdx} className="border border-[#E8E4DE] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={cat.category}
              onChange={e => updateCat(catIdx, e.target.value)}
              placeholder="Название категории"
              className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm font-medium focus:outline-none focus:border-[#B8860B]"
            />
            <button onClick={() => removeCategory(catIdx)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center ml-3 active:scale-90 transition-transform">
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
          <div className="space-y-2">
            {cat.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={e => updateItem(catIdx, itemIdx, "name", e.target.value)}
                  placeholder="Название услуги"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#B8860B]"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={e => updateItem(catIdx, itemIdx, "price", e.target.value)}
                  placeholder="Цена"
                  className="w-28 px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm text-right focus:outline-none focus:border-[#B8860B]"
                />
                <button onClick={() => removeItem(catIdx, itemIdx)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center active:scale-90 transition-transform">
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addItem(catIdx)} className="flex items-center gap-1.5 mt-3 text-xs text-[#8B7355] active:scale-95 transition-all">
            <Plus size={14} /> Добавить услугу
          </button>
        </div>
      ))}
      <button onClick={addCategory} className="flex items-center gap-1.5 text-sm font-medium text-[#B8860B] active:scale-95 transition-all">
        <Plus size={18} /> Добавить категорию
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#B8860B]"
      />
    </div>
  );
}

function FieldArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DE] text-sm focus:outline-none focus:border-[#B8860B] resize-y"
      />
    </div>
  );
}

function ClinicForm({ data, onChange }: { data: ClinicData; onChange: (d: ClinicData) => void }) {
  const set = (k: keyof ClinicData, v: string) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-4">
      <Field label="Название клиники" value={data.name} onChange={v => set("name", v)} />
      <Field label="Подзаголовок" value={data.subtitle} onChange={v => set("subtitle", v)} />
      <Field label="Адрес" value={data.address} onChange={v => set("address", v)} />
      <Field label="Телефон" value={data.phone} onChange={v => set("phone", v)} />
      <Field label="ОГРН" value={data.ogrn} onChange={v => set("ogrn", v)} />
      <Field label="ИНН" value={data.inn} onChange={v => set("inn", v)} />
      <Field label="Текст в футере" value={data.footer} onChange={v => set("footer", v)} />
    </div>
  );
}

function DoctorsForm({ data, onChange, token }: { data: DoctorData[]; onChange: (d: DoctorData[]) => void; token: string }) {
  const update = (i: number, k: keyof DoctorData, v: string) => {
    const next = [...data];
    next[i] = { ...next[i], [k]: v };
    onChange(next);
  };
  return (
    <div className="space-y-6">
      {data.map((doc, i) => (
        <div key={doc.id} className="border border-[#E8E4DE] rounded-xl p-5">
          <h3 className="font-medium text-[#1A1A1A] mb-4">{doc.fullName}</h3>
          <div className="space-y-3">
            <Field label="ФИО" value={doc.fullName} onChange={v => update(i, "fullName", v)} />
            <Field label="Специальность" value={doc.specialty} onChange={v => update(i, "specialty", v)} />
            <Field label="Стаж" value={doc.experience} onChange={v => update(i, "experience", v)} />
            <FieldArea label="О враче" value={doc.about} onChange={v => update(i, "about", v)} />
            <div>
              <label className="block text-xs font-medium text-[#6B6B6B] mb-1.5">Фото (основное)</label>
              <div className="flex items-center gap-4">
                <img src={doc.photo} alt="" className="w-20 h-14 object-cover rounded-lg bg-[#F5F2ED]" />
                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F5F2ED] text-xs text-[#6B6B6B] cursor-pointer active:scale-95 transition-all">
                  <ImageUp size={16} />
                  Заменить
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => uploadImage(e, doc.id, "main", token)} />
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function uploadImage(e: React.ChangeEvent<HTMLInputElement>, id: string, suffix: string, token: string) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    const dataUrl = reader.result as string;
    const base64 = dataUrl.split(",")[1];
    const ext = file.name.split(".").pop() || "jpg";
    const path = `public/images/${id}-${suffix}.${ext}`;
    const url = `https://api.github.com/repos/${REPO}/contents/${path}`;
    let sha: string | undefined;
    const getRes = await fetch(url + `?ref=${BRANCH}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" },
    });
    if (getRes.ok) {
      const existing = await getRes.json();
      sha = existing.sha;
    }
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: `Admin: update image ${path}`,
        content: base64,
        branch: BRANCH,
        sha,
      }),
    });
  };
  reader.readAsArrayBuffer(file);
}

function WorksForm({ data, onChange }: { data: WorkData[]; onChange: (d: WorkData[]) => void }) {
  const update = (i: number, k: keyof WorkData, v: string) => {
    const next = [...data];
    next[i] = { ...next[i], [k]: v };
    onChange(next);
  };
  return (
    <div className="space-y-6">
      {data.map((w, i) => (
        <div key={w.id} className="border border-[#E8E4DE] rounded-xl p-5">
          <h3 className="font-medium text-[#1A1A1A] mb-4">{w.title}</h3>
          <div className="space-y-3">
            <Field label="Название" value={w.title} onChange={v => update(i, "title", v)} />
            <Field label="Краткое описание" value={w.description} onChange={v => update(i, "description", v)} />
            <FieldArea label="Полное описание" value={w.fullDescription} onChange={v => update(i, "fullDescription", v)} />
            <Field label="Цвет (hex)" value={w.color} onChange={v => update(i, "color", v)} />
          </div>
        </div>
      ))}
    </div>
  );
}
