'use client'
import { Newspaper, FlaskConical, Globe } from 'lucide-react'
import PavilionPageTemplate from './PavilionPageTemplate'

export default function AlAhramPavilion() {
  return (
    <PavilionPageTemplate
      publisherId="al-ahram"
      accentHex="#C41E3A"
      badgeEn="Egypt's Premier Publishing House"
      badgeAr="دار النشر الرائدة في مصر"
      statsEn={[
        { label: 'Digital Titles', value: '1,056' },
        { label: 'Years of Publishing', value: '150+' },
        { label: 'Global Distribution', value: '50+ Countries' },
      ]}
      statsAr={[
        { label: 'العناوين الرقمية', value: '١٬٠٥٦' },
        { label: 'سنوات النشر', value: '+١٥٠' },
        { label: 'التوزيع العالمي', value: '+٥٠ دولة' },
      ]}
      collections={[
        {
          icon: Newspaper,
          titleEn: 'Political Analysis', titleAr: 'التحليل السياسي',
          descEn: "Egypt's leading political commentary and analysis publications",
          descAr: 'إصدارات التعليق والتحليل السياسي الرائدة في مصر',
          count: 312,
        },
        {
          icon: FlaskConical,
          titleEn: 'Science & Society', titleAr: 'العلوم والمجتمع',
          descEn: 'Bridging scientific advancement and social progress in the Arab world',
          descAr: 'سد الهوة بين التقدم العلمي والتقدم الاجتماعي في العالم العربي',
          count: 189,
        },
        {
          icon: Globe,
          titleEn: 'Global Affairs', titleAr: 'الشؤون الدولية',
          descEn: 'Comprehensive annual reviews of regional and global current affairs',
          descAr: 'مراجعات سنوية شاملة للشؤون الإقليمية والدولية الراهنة',
          count: 267,
        },
      ]}
    />
  )
}
