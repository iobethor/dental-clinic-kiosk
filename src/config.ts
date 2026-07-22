import {
  Users,
  Receipt,
  Scale,
  MessageSquare,
  Globe,
  Layout,
  type LucideIcon,
} from "lucide-react";

export interface ButtonConfig {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const CLINIC_NAME = "Дентал Имплант";
export const CLINIC_SUBTITLE = "Центр эстетической стоматологии";

export const CLINIC_INFO = {
  address: "109341, г. Москва, ул. Перерва, д.45, к.1",
  phone: "8-495-347-77-07",
  ogrn: "5077746752386",
  inn: "7723612248",
};

export const FOOTER_TEXT = "ООО «Дентал Имплант»";

export const buttons: ButtonConfig[] = [
  {
    id: "doctors",
    title: "Врачи",
    description: "Наши специалисты",
    href: "/doctors",
    icon: Users,
  },
  {
    id: "price",
    title: "Прайс",
    description: "Стоимость услуг",
    href: "#price",
    icon: Receipt,
  },
  {
    id: "consumer",
    title: "Уголок потребителя",
    description: "Информация для пациентов",
    href: "/patient-corner",
    icon: Scale,
  },
  {
    id: "site",
    title: "Сайт",
    description: "smile-town.ru",
    href: "/browser?url=https://smile-town.ru",
    icon: Globe,
  },
  {
    id: "works",
    title: "Наши работы",
    description: "Портфолио и услуги",
    href: "/works",
    icon: Layout,
  },
  {
    id: "reviews",
    title: "Отзывы",
    description: "Мнения пациентов",
    href: "/reviews",
    icon: MessageSquare,
  },
];
