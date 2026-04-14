'use client'
import { BookOpen, GraduationCap, Star } from 'lucide-react'
import PavilionPageTemplate from './PavilionPageTemplate'

export default function DarAlMaarefPavilion() {
  return (
    <PavilionPageTemplate
      publisherId="dar-al-maaref"
      accentHex="#2E7D32"
      badgeEn="Legacy Publisher Since 1890"
      badgeAr="دار نشر عريقة منذ ١٨٩٠"
      statsEn={[
        { label: 'Digital Titles', value: '892' },
        { label: 'Years of Excellence', value: '130+' },
        { label: 'Academic Journals', value: '44' },
      ]}
      statsAr={[
        { label: 'العناوين الرقمية', value: '٨٩٢' },
        { label: 'سنوات من التميز', value: '+١٣٠' },
        { label: 'المجلات الأكاديمية', value: '٤٤' },
      ]}
      collections={[
        {
          icon: BookOpen,
          titleEn: 'Arabic Linguistics', titleAr: 'علم اللغة العربية',
          descEn: 'The definitive academic collection on Arabic linguistic theory and history',
          descAr: 'المجموعة الأكاديمية المرجعية في النظرية اللغوية العربية وتاريخها',
          count: 78,
        },
        {
          icon: GraduationCap,
          titleEn: 'Academic Textbooks', titleAr: 'الكتب الأكاديمية',
          descEn: 'University-level texts across sciences, humanities, and social studies',
          descAr: 'كتب دراسية جامعية تغطي العلوم والآداب والدراسات الاجتماعية',
          count: 245,
        },
        {
          icon: Star,
          titleEn: 'Nahda Literature', titleAr: 'أدب النهضة',
          descEn: 'Curated works from the Arab literary renaissance of 1890–1950',
          descAr: 'أعمال منتقاة من فترة النهضة الأدبية العربية (١٨٩٠–١٩٥٠)',
          count: 134,
        },
      ]}
    />
  )
}
