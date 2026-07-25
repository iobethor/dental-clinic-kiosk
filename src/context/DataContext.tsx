import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { doctors as fallbackDoctors } from "@/data/doctors";
import { workCategories as fallbackWorks } from "@/data/works";

export interface DoctorData {
  id: string;
  fullName: string;
  photo: string;
  photoFull: string;
  specialty: string;
  experience: string;
  about: string;
}

export interface WorkData {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  color: string;
}

export interface ClinicData {
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  ogrn: string;
  inn: string;
  footer: string;
}

interface DataContextValue {
  doctors: DoctorData[];
  works: WorkData[];
  clinic: ClinicData;
  loading: boolean;
  refresh: () => void;
}

const defaultClinic: ClinicData = {
  name: "Дентал Имплант",
  subtitle: "Центр эстетической стоматологии",
  address: "109341, г. Москва, ул. Перерва, д.45, к.1",
  phone: "8-495-347-77-07",
  ogrn: "5077746752386",
  inn: "7723612248",
  footer: "ООО «Дентал Имплант»",
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [works, setWorks] = useState<WorkData[]>([]);
  const [clinic, setClinic] = useState<ClinicData>(defaultClinic);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const [docRes, workRes, clinicRes] = await Promise.all([
        fetch("/data/doctors.json"),
        fetch("/data/works.json"),
        fetch("/data/clinic.json"),
      ]);
      if (docRes.ok) setDoctors(await docRes.json());
      else setDoctors(fallbackDoctors as unknown as DoctorData[]);
      if (workRes.ok) setWorks(await workRes.json());
      else setWorks(fallbackWorks as unknown as WorkData[]);
      if (clinicRes.ok) setClinic(await clinicRes.json());
    } catch {
      setDoctors(fallbackDoctors as unknown as DoctorData[]);
      setWorks(fallbackWorks as unknown as WorkData[]);
    }
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <DataContext.Provider value={{ doctors, works, clinic, loading, refresh: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
