'use client'
import { ScrollText, FileText, Archive } from 'lucide-react'
import PavilionPageTemplate from './PavilionPageTemplate'

export default function NationalLibraryPavilion() {
  return (
    <PavilionPageTemplate
      publisherId="national-library"
      accentHex="#B8860B"
      badgeEn="National Archives & Heritage"
      badgeAr="الأرشيف والتراث الوطني"
      statsEn={[
        { label: 'Digital Titles', value: '634' },
        { label: 'Rare Manuscripts', value: '50+' },
        { label: 'Digital Archives', value: '3,200+' },
      ]}
      statsAr={[
        { label: 'العناوين الرقمية', value: '٦٣٤' },
        { label: 'مخطوطات نادرة', value: '+٥٠' },
        { label: 'الأرشيفات الرقمية', value: '+٣٬٢٠٠' },
      ]}
      collections={[
        {
          icon: ScrollText,
          titleEn: 'Rare Manuscripts', titleAr: 'المخطوطات النادرة',
          descEn: 'High-resolution digital facsimiles of previously unpublished manuscripts',
          descAr: 'نسخ رقمية عالية الدقة من مخطوطات لم تُنشر من قبل',
          count: 50,
        },
        {
          icon: FileText,
          titleEn: 'Papyrus Documents', titleAr: 'وثائق البردي',
          descEn: 'The first comprehensive digital archive of Egyptian papyrus documents',
          descAr: 'أول أرشيف رقمي شامل لوثائق البردي المصرية مع ترجمة وتعليق',
          count: 120,
        },
        {
          icon: Archive,
          titleEn: 'Ottoman Records', titleAr: 'السجلات العثمانية',
          descEn: 'Digitized and transcribed Ottoman Cairo court records',
          descAr: 'سجلات المحاكم العثمانية في القاهرة مُرقمنة ومُفهرسة',
          count: 380,
        },
      ]}
    />
  )
}
