import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/**
 * Interface chrome is translated; curriculum content (lessons, concepts, questions,
 * the generated explanation) stays in English because it is teaching material read
 * out in class, not UI text.
 */

export type Language = 'en' | 'sw'

const STORAGE_KEY = 'funza-language'

const en = {
  'app.name': 'Funza',
  'app.tagline': 'Grade 10 teacher',

  'nav.home': 'Home',
  'nav.about': 'About Funza',

  'sidebar.collapse': 'Collapse menu',
  'sidebar.expand': 'Expand menu',
  'sidebar.toLight': 'Switch to light mode',
  'sidebar.toDark': 'Switch to dark mode',
  'sidebar.language': 'Language',
  'sidebar.switchLanguage': 'Soma kwa Kiswahili',
  'sidebar.teacherRole': 'Grade 10 Biology',

  'common.back': 'Back',
  'common.next': 'Next',
  'common.step': '{n} / {total}',
  'common.offline': 'Offline',
  'common.offlineNote': 'You are offline. Everything here is saved on this device.',

  'setup.greeting': 'Good morning, Mwalimu',
  'setup.prompt': 'What are you preparing to teach today?',
  'setup.subject': 'Subject',
  'setup.subjectPlaceholder': 'Choose a subject',
  'setup.strand': 'Strand',
  'setup.strandPlaceholder': 'Choose a strand',
  'setup.strandPlaceholderLocked': 'Choose a subject first',
  'setup.start': 'Start preparing',
  'setup.preparedFrom': 'Prepared from the {grade} {subject} curriculum',
  'setup.strandSuffix': '{strand} strand',
  'setup.noStrand': 'No strand selected yet',

  'guide.eyebrow': 'Your preparation guide',
  'guide.title': 'Choose where to begin',
  'guide.understand': 'Understand',
  'guide.understandSub': 'The strand in simple terms',
  'guide.concepts': 'Key concepts',
  'guide.conceptsSub': 'What you need to know',
  'guide.lesson': 'Lesson guide',
  'guide.lessonSub': 'Plan what to teach',
  'guide.checks': 'Quick checks',
  'guide.checksSub': 'Questions to use in class',

  'hero.newStrand': 'New strand',
  'hero.gradeStrand': '{grade} strand',

  'understand.title': 'Understand the strand',
  'understand.eyebrow': 'In simple terms',
  'understand.heading': '{strand}, explained for your class',
  'understand.aiName': 'Funza AI',
  'understand.subStrand': 'Sub-strand {subStrand}',
  'understand.fromCurriculum': 'Written from the {grade} curriculum',
  'understand.savedOffline': 'Saved offline',
  'understand.footer': 'AI-generated from {source} only. Anything it marks as unclear is not covered by your source.',
  'understand.builtIn': 'Built-in summary, saved on this device. Connect once to load the fuller explanation generated from {source}.',
  'understand.outcomes': 'What you should be ready to explain',
  'understand.teacherNote': 'Teacher note',

  'concepts.title': 'Key concepts',
  'concepts.eyebrow': 'What you need to know',
  'concepts.heading': 'Vocabulary to explain clearly',
  'concepts.safeguard': 'Teaching safeguard',
  'concepts.safeguardBody':
    'Keep explanations close to these key ideas. If a question goes beyond the lesson, mark it for follow-up instead of guessing.',

  'lesson.title': 'Lesson guide',
  'lesson.lessons': 'Lessons',
  'lesson.number': 'Lesson {n}',
  'lesson.heading': 'Lesson {n}: {title}',
  'lesson.misconception': 'Common misconception',
  'lesson.tip': 'Teacher tip',

  'checks.title': 'Quick checks',
  'checks.intro': 'Use these questions to check understanding in class.',
  'checks.all': 'All',
  'checks.recall': 'Recall',
  'checks.understand': 'Understand',
  'checks.apply': 'Apply',
  'checks.shuffle': 'Shuffle questions',
  'checks.answer': 'Answer',
  'checks.showAnswer': 'Show answer',
  'checks.hideAnswer': 'Hide answer',
  'checks.empty': 'No questions of this type in this strand.',
  'checks.useInClass': 'Use these in class discussions, pair work, or exit tickets.',
  'checks.backToOverview': 'Back to overview',

  'about.title': 'About Funza',
  'about.body':
    'Funza is teacher-only preparation support. It does not collect learner names, learner work, or learner accounts. Every strand is prepared from the KICD Grade 10 curriculum design and stays available on this device once opened.',
  'about.back': 'Prepare a strand',

  'notFound.title': 'Strand not ready',
  'notFound.body': 'That strand has no prepared pack yet. Pick one from the home page.',
} as const

export type TranslationKey = keyof typeof en

const sw: Record<TranslationKey, string> = {
  'app.name': 'Funza',
  'app.tagline': 'Mwalimu wa Gredi ya 10',

  'nav.home': 'Nyumbani',
  'nav.about': 'Kuhusu Funza',

  'sidebar.collapse': 'Kunja menyu',
  'sidebar.expand': 'Panua menyu',
  'sidebar.toLight': 'Badili kwenda mwangaza',
  'sidebar.toDark': 'Badili kwenda giza',
  'sidebar.language': 'Lugha',
  'sidebar.switchLanguage': 'Read in English',
  'sidebar.teacherRole': 'Baiolojia, Gredi ya 10',

  'common.back': 'Rudi',
  'common.next': 'Endelea',
  'common.step': '{n} / {total}',
  'common.offline': 'Nje ya mtandao',
  'common.offlineNote': 'Uko nje ya mtandao. Kila kitu hapa kimehifadhiwa kwenye kifaa hiki.',

  'setup.greeting': 'Habari za asubuhi, Mwalimu',
  'setup.prompt': 'Unajiandaa kufundisha nini leo?',
  'setup.subject': 'Somo',
  'setup.subjectPlaceholder': 'Chagua somo',
  'setup.strand': 'Mada kuu',
  'setup.strandPlaceholder': 'Chagua mada kuu',
  'setup.strandPlaceholderLocked': 'Chagua somo kwanza',
  'setup.start': 'Anza maandalizi',
  'setup.preparedFrom': 'Imeandaliwa kutoka mtaala wa {subject}, {grade}',
  'setup.strandSuffix': 'Mada kuu ya {strand}',
  'setup.noStrand': 'Bado hujachagua mada kuu',

  'guide.eyebrow': 'Mwongozo wako wa maandalizi',
  'guide.title': 'Chagua pa kuanzia',
  'guide.understand': 'Elewa',
  'guide.understandSub': 'Mada kwa maneno rahisi',
  'guide.concepts': 'Dhana muhimu',
  'guide.conceptsSub': 'Unachopaswa kujua',
  'guide.lesson': 'Mwongozo wa somo',
  'guide.lessonSub': 'Panga utakachofundisha',
  'guide.checks': 'Maswali ya haraka',
  'guide.checksSub': 'Maswali ya kutumia darasani',

  'hero.newStrand': 'Mada mpya',
  'hero.gradeStrand': 'Mada ya {grade}',

  'understand.title': 'Elewa mada',
  'understand.eyebrow': 'Kwa maneno rahisi',
  'understand.heading': '{strand}, imefafanuliwa kwa darasa lako',
  'understand.aiName': 'Funza AI',
  'understand.subStrand': 'Mada ndogo {subStrand}',
  'understand.fromCurriculum': 'Imeandikwa kutoka mtaala wa {grade}',
  'understand.savedOffline': 'Imehifadhiwa',
  'understand.footer': 'Imetungwa na AI kutoka {source} pekee. Chochote kilichowekwa alama ya utata hakipo kwenye chanzo chako.',
  'understand.builtIn': 'Muhtasari wa ndani, umehifadhiwa kwenye kifaa hiki. Unganisha mara moja upakie maelezo kamili kutoka {source}.',
  'understand.outcomes': 'Unachopaswa kuwa tayari kueleza',
  'understand.teacherNote': 'Dokezo kwa mwalimu',

  'concepts.title': 'Dhana muhimu',
  'concepts.eyebrow': 'Unachopaswa kujua',
  'concepts.heading': 'Msamiati wa kueleza kwa uwazi',
  'concepts.safeguard': 'Kinga ya ufundishaji',
  'concepts.safeguardBody':
    'Weka maelezo karibu na dhana hizi muhimu. Swali likipita mipaka ya somo, liandike kwa ufuatiliaji badala ya kubahatisha.',

  'lesson.title': 'Mwongozo wa somo',
  'lesson.lessons': 'Masomo',
  'lesson.number': 'Somo la {n}',
  'lesson.heading': 'Somo la {n}: {title}',
  'lesson.misconception': 'Dhana potofu ya kawaida',
  'lesson.tip': 'Ushauri kwa mwalimu',

  'checks.title': 'Maswali ya haraka',
  'checks.intro': 'Tumia maswali haya kupima uelewa darasani.',
  'checks.all': 'Yote',
  'checks.recall': 'Kumbuka',
  'checks.understand': 'Elewa',
  'checks.apply': 'Tumia',
  'checks.shuffle': 'Changanya maswali',
  'checks.answer': 'Jibu',
  'checks.showAnswer': 'Onyesha jibu',
  'checks.hideAnswer': 'Ficha jibu',
  'checks.empty': 'Hakuna maswali ya aina hii katika mada hii.',
  'checks.useInClass': 'Tumia haya katika majadiliano ya darasa, kazi ya wawili, au maswali ya kutoka.',
  'checks.backToOverview': 'Rudi kwenye muhtasari',

  'about.title': 'Kuhusu Funza',
  'about.body':
    'Funza ni msaada wa maandalizi kwa walimu pekee. Haikusanyi majina ya wanafunzi, kazi zao, wala akaunti zao. Kila mada imeandaliwa kutoka mtaala wa KICD wa Gredi ya 10 na inabaki kupatikana kwenye kifaa hiki ikishafunguliwa.',
  'about.back': 'Andaa mada kuu',

  'notFound.title': 'Mada haijakamilika',
  'notFound.body': 'Mada hiyo bado haina maandalizi. Chagua nyingine kutoka ukurasa wa nyumbani.',
}

const dictionaries: Record<Language, Record<TranslationKey, string>> = { en, sw }

export type Translate = (key: TranslationKey, values?: Record<string, string | number>) => string

type I18nValue = {
  lang: Language
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: Translate
}

const I18nContext = createContext<I18nValue | null>(null)

function readStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)

  return stored === 'sw' || stored === 'en' ? stored : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Language) => setLangState(next), [])
  const toggleLang = useCallback(() => setLangState((current) => (current === 'en' ? 'sw' : 'en')), [])

  const t = useCallback<Translate>(
    (key, values) => {
      const template = dictionaries[lang][key] ?? en[key]

      if (!values) {
        return template
      }

      return template.replace(/\{(\w+)\}/g, (match, name: string) =>
        name in values ? String(values[name]) : match
      )
    },
    [lang]
  )

  const value = useMemo<I18nValue>(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return context
}
