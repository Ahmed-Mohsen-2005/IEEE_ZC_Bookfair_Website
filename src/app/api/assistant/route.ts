import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { BOOKS } from '@/lib/data'

const prisma = new PrismaClient()

// ── Arabic response builder ────────────────────────────────────────────────
function buildResponse(isAr: boolean, matchedBooks: { title: string; author: string; publisher: { name: string } }[], publisherName?: string, query?: string): string {
  const q = (query || '').toLowerCase()

  // Greeting
  if (q.includes('مرحبا') || q.includes('أهلا') || q.includes('hello') || q.includes('hi') || q.includes('مرحباً')) {
    return isAr
      ? 'أهلاً وسهلاً! أنا مساعد معرض مدينة زويل للكتاب. اسألني عن كتاب أو مؤلف أو حدث في المعرض.'
      : 'Hello! I am the Zewail City Book Fair assistant. Ask me about any book, author, or fair event!'
  }

  // About Zewail
  if (q.includes('زويل') || q.includes('zewail') || q.includes('مدينة') || q.includes('city')) {
    return isAr
      ? 'مدينة زويل للعلوم والتكنولوجيا هي صرح علمي مصري فريد تأسس على يد الدكتور أحمد زويل، الحائز على جائزة نوبل في الكيمياء. تضم أكثر من ٣٠ مركزاً بحثياً وتتعاون مع جامعات عالمية كـ MIT و Caltech. يُقام المعرض سنوياً لتعزيز ثقافة القراءة والبحث.'
      : 'Zewail City of Science and Technology is a unique Egyptian scientific landmark founded by Nobel laureate Dr. Ahmed Zewail. It hosts 30+ research centers and partners with MIT, Caltech, and top global universities. The book fair promotes reading and research culture.'
  }

  // Ahmed Zewail
  if (q.includes('أحمد زويل') || q.includes('ahmed zewail') || q.includes('نوبل') || q.includes('nobel')) {
    return isAr
      ? 'الدكتور أحمد زويل (١٩٤٦–٢٠١٦) هو عالم كيمياء مصري-أمريكي، حصل على جائزة نوبل في الكيمياء عام ١٩٩٩ لاكتشافه فيمتوكيمياء — دراسة التفاعلات الكيميائية بمقياس الفيمتوثانية. أسس مدينة زويل للعلوم والتكنولوجيا في مصر.'
      : 'Dr. Ahmed Zewail (1946–2016) was an Egyptian-American chemist who won the Nobel Prize in Chemistry in 1999 for his work on femtochemistry — studying chemical reactions at the femtosecond scale. He founded Zewail City to advance scientific education in Egypt.'
  }

  // Events
  if (q.includes('فعالية') || q.includes('حدث') || q.includes('ورشة') || q.includes('event') || q.includes('workshop') || q.includes('calendar')) {
    return isAr
      ? 'يضم المعرض فعاليات متنوعة هذا العام:\n• ورشة النشر الرقمي — ٢٣ أبريل\n• فن الترجمة: من العربية إلى العالم — ٢٢ أبريل\n• مناقشة: من الكيمياء النانوية إلى الأدب — ٢١ أبريل\nيمكنك مشاهدة جميع الفعاليات في قسم التقويم أسفل الصفحة.'
      : 'The fair features diverse events this year:\n• Digital Publishing Workshop — April 23\n• The Art of Translation — April 22\n• Nanochemistry to Literature Panel — April 21\nCheck the full calendar section on the homepage for all sessions.'
  }

  // Publisher pavilions
  if (q.includes('ناشر') || q.includes('دار') || q.includes('الأهرام') || q.includes('publisher') || q.includes('pavilion') || q.includes('ahram') || q.includes('maaref')) {
    return isAr
      ? 'يشارك في المعرض ٤ دور نشر رائدة:\n• الهيئة المصرية العامة للكتاب\n• دار المعارف\n• دار الكتب والوثائق القومية\n• دار الأهرام للنشر\nادخل على صفحة كل دار لاستعراض فهرسها الكامل ومعاينة الكتب.'
      : 'The fair features 4 leading publishers:\n• General Egyptian Book Organization\n• Dar Al-Maaref\n• National Library and Archives\n• Al-Ahram Publishing\nVisit each pavilion page to browse their full catalog and preview books.'
  }

  // Book results
  if (matchedBooks.length > 0) {
    const bookList = matchedBooks
      .map(b => isAr ? `• «${b.title}» — ${b.author}` : `• "${b.title}" by ${b.author}`)
      .join('\n')

    const intro = isAr ? `وجدتُ ${matchedBooks.length} كتاب مطابق:\n` : `I found ${matchedBooks.length} matching title(s):\n`
    const outro = isAr
      ? '\nاضغط على أي كتاب لمعاينته مجاناً.'
      : '\nClick any book to preview it for free.'
    const publisherNote = publisherName
      ? (isAr ? `\nقد يهمك أيضاً: معرض ${publisherName}.` : `\nYou may also like the ${publisherName} pavilion.`)
      : ''

    return intro + bookList + publisherNote + outro
  }

  // Publisher only match
  if (publisherName) {
    return isAr
      ? `يمكنني أن أوصيك بمعرض «${publisherName}». لديهم مجموعة رائعة من الإصدارات في هذا المجال.`
      : `I recommend checking out the "${publisherName}" pavilion — they have excellent titles in this area.`
  }

  // No match fallback
  return isAr
    ? 'لم أجد نتائج طابقت طلبك تماماً. جرّب البحث باسم مؤلف (مثل: نجيب محفوظ) أو موضوع (مثل: علوم، تاريخ، شعر).'
    : "I couldn't find exact matches for your query. Try searching by author name (e.g. Naguib Mahfouz) or topic (e.g. science, history, poetry)."
}

export async function POST(req: NextRequest) {
  try {
    const { query, language } = await req.json()
    const isAr = language === 'ar'

    if (!query?.trim()) {
      return NextResponse.json({
        content: isAr ? 'يُرجى كتابة استفسارك.' : 'Please provide a query.',
      }, { status: 400 })
    }

    const searchTerm = query.toLowerCase()

    // Search DB books
    let matchedBooks: { title: string; author: string; publisher: { name: string } }[] = []
    let publisherName: string | undefined

    try {
      const dbBooks = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm } },
            { author: { contains: searchTerm } },
            { description: { contains: searchTerm } },
            { genre: { contains: searchTerm } },
          ],
        },
        include: { publisher: true },
        take: 3,
      })
      matchedBooks = dbBooks

      const dbPublisher = await prisma.publisher.findFirst({
        where: {
          OR: [
            { name: { contains: searchTerm } },
            { tagline: { contains: searchTerm } },
            { description: { contains: searchTerm } },
          ],
        },
      })
      publisherName = dbPublisher?.name

    } catch {
      // DB unavailable — fall back to static BOOKS array
      const staticMatches = BOOKS.filter(b =>
        b.title.toLowerCase().includes(searchTerm) ||
        b.author.toLowerCase().includes(searchTerm) ||
        b.genre.toLowerCase().includes(searchTerm)
      ).slice(0, 3)

      matchedBooks = staticMatches.map(b => ({
        title: b.title,
        author: b.author,
        publisher: { name: b.publisherName || '' },
      }))
    }

    const content = buildResponse(isAr, matchedBooks, publisherName, query)

    return NextResponse.json({ role: 'assistant', content })

  } catch (error) {
    console.error('AI Assistant Error:', error)
    const isAr = false
    return NextResponse.json({
      role: 'assistant',
      content: isAr
        ? 'أواجه مشكلة في الاتصال. يُرجى إعادة المحاولة.'
        : "I'm experiencing a connection issue. Please try again in a moment.",
    }, { status: 500 })
  }
}
