'use client'
import { Award, Archive, Landmark } from 'lucide-react'
import PavilionPageTemplate from './PavilionPageTemplate'

export default function GeneralEgyptianPavilion() {
  return (
    <PavilionPageTemplate
      publisherId="general-egyptian"
      accentHex="#C41E3A"
      badgeEn="Partner Institution"
      badgeAr="مؤسسة شريكة"
      statsEn={[
        { label: 'Digital Titles', value: '1,247' },
        { label: 'State Prize Winners', value: '23' },
        { label: 'Historical Volumes', value: '156' },
      ]}
      statsAr={[
        { label: 'العناوين الرقمية', value: '١٬٢٤٧' },
        { label: 'جوائز الدولة', value: '٢٣' },
        { label: 'المجلدات التاريخية', value: '١٥٦' },
      ]}
      collections={[
        {
          icon: Award,
          titleEn: 'State Prize Winners', titleAr: 'الفائزون بجائزة الدولة',
          descEn: "Celebrating recipients of Egypt's highest literary honor",
          descAr: 'تكريم الفائزين بأرفع جائزة أدبية في مصر',
          count: 23,
        },
        {
          icon: Archive,
          titleEn: 'Historical Archive', titleAr: 'الأرشيف التاريخي',
          descEn: "Definitive works documenting Egypt's rich historical tapestry",
          descAr: 'أعمال مرجعية توثّق النسيج التاريخي الغني لمصر',
          count: 156,
        },
        {
          icon: Landmark,
          titleEn: 'National Heritage Collection', titleAr: 'مجموعة التراث الوطني',
          descEn: 'Preserving the cultural and intellectual heritage of the nation',
          descAr: 'الحفاظ على التراث الثقافي والفكري للأمة',
          count: 89,
        },
      ]}
    />
  )
}
