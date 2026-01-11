
import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'foundation',
    title: 'Ildiz',
    subtitle: 'O‘zlikni anglash va poydevor',
    content: 'Har qanday yuksalish chuqur ildizdan boshlanadi. O‘zligingizni tanimay turib, cho‘qqiga intilish — qum ustiga imorat qurishdir. Bu bosqichda siz o‘z qo‘rquvlaringiz va qadriyatlaringizni kashf etasiz.',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1920',
    color: 'from-stone-900 to-black'
  },
  {
    id: 'ascent',
    title: 'Intilish',
    subtitle: 'Konfort zonadan chiqish',
    content: 'O‘sish har doim noqulaylikda sodir bo‘ladi. Eski odatlar bilan yangi natijaga erishib bo‘lmaydi. Har bir qadam — bu o‘zligingizning kechagi versiyasi ustidan g‘alaba.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920',
    color: 'from-blue-900/40 to-black'
  },
  {
    id: 'storm',
    title: 'Dovul',
    subtitle: 'Inqiroz va matonat',
    content: 'Yo‘lning o‘rtasida albatta bo‘ron bo‘ladi. Bu bosqich sizni sindirish uchun emas, balki toblash uchun beriladi. Haqiqiy xarakter hamma narsa yaxshi bo‘lganda emas, hamma narsa qiyinlashganda shakllanadi.',
    imageUrl: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1920',
    color: 'from-zinc-900 to-black'
  },
  {
    id: 'enlightenment',
    title: 'Ziyo',
    subtitle: 'Bilim va onglilik',
    // Fixed: Escaped single quote in "bo'ladi" to prevent breaking the string literal
    content: "Bilim — bu kuch, lekin onglilik — bu erkinlikdir. Atrofingizdagi dunyoni emas, ichingizdagi dunyoni boshqarishni boshlaganingizda, haqiqiy o‘sish sodir bo'ladi.",
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
    color: 'from-amber-900/30 to-black'
  },
  {
    id: 'zenith',
    title: 'Cho‘qqi',
    subtitle: 'Meros va xizmat',
    content: 'Shaxsiy rivojlanishning eng yuqori nuqtasi — bu o‘zidan keyin yorug‘lik qoldirishdir. Siz endi nafaqat o‘zingiz uchun, balki butun borliq uchun foydali bo‘la boshlaysiz.',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1920',
    color: 'from-indigo-950 to-black'
  }
];