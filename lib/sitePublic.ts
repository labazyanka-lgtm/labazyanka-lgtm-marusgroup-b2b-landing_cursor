/**
 * Публичные данные сайта (реквизиты, адрес). Задаются через NEXT_PUBLIC_* в .env;
 * без переменных показываются безопасные заглушки до боевого запуска.
 */
function envOrPlaceholder(key: string, fallback: string): string {
  const v = process.env[key]?.trim();
  return v || fallback;
}

export const sitePublic = {
  legalEntity: envOrPlaceholder(
    "NEXT_PUBLIC_LEGAL_ENTITY_NAME",
    "уточняется",
  ),
  inn: envOrPlaceholder("NEXT_PUBLIC_COMPANY_INN", "уточняется"),
  ogrn: envOrPlaceholder("NEXT_PUBLIC_COMPANY_OGRN", "уточняется"),
  kpp: envOrPlaceholder("NEXT_PUBLIC_COMPANY_KPP", "уточняется"),
  officeAddress: envOrPlaceholder(
    "NEXT_PUBLIC_OFFICE_ADDRESS",
    "Москва и Московский регион · уточняется",
  ),
  officeHours: envOrPlaceholder(
    "NEXT_PUBLIC_OFFICE_HOURS",
    "уточняется",
  ),
} as const;
