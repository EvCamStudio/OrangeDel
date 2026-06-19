export interface AboutChapter {
  num: string;
  label: string;
  heading: string;
  body: string;
  stat: string;
  statLabel: string;
}

export const ABOUT_CHAPTERS: AboutChapter[] = [
  {
    num: "01",
    label: "Asal Usul",
    heading: "Berakar dari\nkecintaan alam.",
    body: "OrangeDel lahir pada 2010 dari tekad seorang petani lokal yang ingin membuktikan bahwa jeruk berkualitas premium bisa tumbuh di tanah Indonesia. Bukan sekadar bisnis — ini adalah panggilan jiwa.",
    stat: "2010",
    statLabel: "Tahun Berdiri",
  },
  {
    num: "02",
    label: "Lahan Kami",
    heading: "Tanah subur,\nhasil melimpah.",
    body: "Kebun kami membentang di atas lahan seluas lebih dari 5 hektar di dataran tinggi yang kaya mineral. Iklim sejuk dan tanah vulkanik menciptakan kondisi ideal untuk menghasilkan jeruk dengan rasa yang tak tertandingi.",
    stat: "5+",
    statLabel: "Hektar Kebun",
  },
  {
    num: "03",
    label: "Kualitas",
    heading: "Alami,\ntanpa kompromi.",
    body: "Kami berkomitmen pada pertanian organik. Tanpa pestisida kimia berbahaya, tanpa pupuk sintetis. Hanya proses alami yang menjaga kualitas buah dan kelestarian lingkungan untuk generasi mendatang.",
    stat: "100%",
    statLabel: "Organik Alami",
  },
  {
    num: "04",
    label: "Komunitas",
    heading: "Untuk keluarga,\nuntuk Indonesia.",
    body: "Setiap jeruk yang kami tanam adalah bagian dari komitmen kami kepada masyarakat lokal. Kami memberdayakan petani sekitar, menciptakan lapangan kerja, dan memastikan kesegaran jeruk terbaik sampai ke meja makan keluarga Indonesia.",
    stat: "1000+",
    statLabel: "Keluarga Pelanggan",
  },
];

export const ABOUT_STATS = [
  { number: "15+", label: "Tahun Pengalaman" },
  { number: "5+",  label: "Hektar Kebun" },
  { number: "10+", label: "Varietas Jeruk" },
  { number: "1000+", label: "Pelanggan Setia" },
];
