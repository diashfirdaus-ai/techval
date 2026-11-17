export interface MuseAgentSpec {
  index: number;
  node: string;
  model: string;
  endpoint: "/v1/chat/completions";
  chatCompatible: boolean;
  name_id: string;
  name_en: string;
  role_id: string;
  role_en: string;
  advisor_prompt_id?: string;
  advisor_prompt_en?: string;
}

export const MUSE_AGENTS: MuseAgentSpec[] = [
  {
    index: 1,
    node: "evidence_extraction",
    model: "muse-spark-1.3",
    endpoint: "/v1/chat/completions",
    chatCompatible: true,
    name_id: "Modul Audit Klaim Paten & Bukti Dokumen",
    name_en: "Patent Claim & Evidence Audit Module",
    role_id:
      "Mengekstrak klaim teknis, spesifikasi paten, dan kutipan bukti langsung beserta lokasi [page:N] / [para:N] untuk keperluan due diligence industri.",
    role_en:
      "Extracts technical claims, patent specifications, and verbatim evidence quotes with exact [page:N] / [para:N] locators for industrial due diligence.",
    advisor_prompt_id:
      "Jawab dengan mengutamakan kutipan langsung dan penanda lokasi [page:N] atau [para:N] serta kekuatan klaim paten.",
    advisor_prompt_en:
      "Answer by foregrounding verbatim quotes, [page:N] or [para:N] locators, and patent claim strength.",
  },
  {
    index: 2,
    node: "technical_trl_assessment",
    model: "muse-wonder-1.0",
    endpoint: "/v1/chat/completions",
    chatCompatible: true,
    name_id: "Modul Verifikasi Kematangan & NASA TRL 1–9",
    name_en: "Technical Maturity & NASA TRL 1–9 Module",
    role_id:
      "Memverifikasi pemenuhan kriteria keluar NASA TRL 1–9 dan performa operasional berdasarkan bukti uji laboratorium atau pilot skala industri.",
    role_en:
      "Verifies NASA TRL 1–9 exit criteria and operational performance against resolved laboratory or industrial pilot test evidence.",
    advisor_prompt_id:
      "Fokus pada bukti pemenuhan kriteria keluar NASA TRL dan kesiapan skala rekayasa industri.",
    advisor_prompt_en:
      "Focus on NASA TRL exit criteria evidence and industrial engineering scale-up readiness.",
  },
  {
    index: 3,
    node: "market_intelligence",
    model: "muse-spark-1.3-contributor",
    endpoint: "/v1/chat/completions",
    chatCompatible: true,
    name_id: "Modul Kesiapan Industri, Rantai Pasok & TKDN",
    name_en: "Industrial Market, Supply Chain & TKDN Module",
    role_id:
      "Memetakan kebutuhan industri sasaran, efisiensi biaya (OPEX/CAPEX), kesiapan manufaktur lokal (TKDN), dan daya serap pasar komersial.",
    role_en:
      "Maps target industry demand, OPEX/CAPEX efficiency, local manufacturing readiness (TKDN), and commercial adoption potential.",
    advisor_prompt_id:
      "Fokus pada pasar sasaran, mitra manufaktur industri, TKDN, dan kesiapan adopsi komersial.",
    advisor_prompt_en:
      "Focus on target market, industrial manufacturing partners, TKDN, and commercial adoption readiness.",
  },
  {
    index: 4,
    node: "commercialization_pathway",
    model: "muse-spark-1.2-contributor",
    endpoint: "/v1/chat/completions",
    chatCompatible: true,
    name_id: "Modul Valuasi WIPO, Struktur Lisensi & Royalti",
    name_en: "WIPO Valuation, Licensing & Royalty Module",
    role_id:
      "Menyusun struktur lisensi industri, parameter royalti, dan analisis valuasi ekonomi WIPO (DCF, Relief-from-Royalty, Cost, Market) dalam Rupiah.",
    role_en:
      "Structures industrial licensing terms, royalty parameters, and WIPO economic valuation analysis (DCF, Relief-from-Royalty, Cost, Market) in IDR.",
    advisor_prompt_id:
      "Fokus pada valuasi ekonomi WIPO (DCF, Relief-from-Royalty, Cost, Market), struktur royalti lisensi industri, dan pemisahan skor dari nilai uang.",
    advisor_prompt_en:
      "Focus on WIPO economic valuation (DCF, Relief-from-Royalty, Cost, Market), industrial licensing royalty structure, and keeping scores separate from money.",
  },
];

export const NODE_MODEL_MAP: Record<string, string> = Object.fromEntries(
  MUSE_AGENTS.map((a) => [a.node, a.model])
);
