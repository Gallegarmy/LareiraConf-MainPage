import { type Locale, useTranslations } from "@/i18n/utils";

export type FAQTextSegment = {
  text: string;
  em?: boolean;
  href?: string;
  external?: boolean;
};

export type FAQItem = {
  id: number;
  question: string;
  answer: FAQTextSegment[];
};

export function getFAQData(locale: Locale): FAQItem[] {
  const t = useTranslations(locale);
  const questions = t("faq.questions");

  const faqItems: FAQItem[] = [];

  for (let i = 1; i <= 10; i++) {
    const questionData = questions[i.toString()];
    if (questionData) {
      faqItems.push({
        id: i,
        question: questionData.question,
        answer: questionData.answer,
      });
    }
  }

  return faqItems;
}

export function getFAQMetadata(locale: Locale) {
  const t = useTranslations(locale);

  return {
    title: t("faq.title"),
    adventurerName: t("faq.adventurerName"),
    lumiName: t("faq.lumiName"),
    lumiInitial: t("faq.lumiInitial"),
    thinking: t("faq.thinking"),
  };
}
