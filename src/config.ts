import {
  Users,
  Receipt,
  Scale,
  MapPin,
  Navigation,
  MessageSquare,
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
    id: "yandex",
    title: "Яндекс.Карты",
    description: "Как нас найти",
    href: "https://yandex.ru/profile/20786059493",
    icon: MapPin,
  },
  {
    id: "2gis",
    title: "2ГИС",
    description: "Мы на карте",
    href: "https://go.2gis.com/516st",
    icon: Navigation,
  },
  {
    id: "reviews",
    title: "Отзывы",
    description: "Мнения пациентов",
    href: "/reviews",
    icon: MessageSquare,
  },
];
