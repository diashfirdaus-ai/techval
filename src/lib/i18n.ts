"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { LanguageCode } from "./api-types";

export const translations = {
  en: {
    appName: "TechVal AI",
    appSubtitle: "Telkom University × Bandung Techno Park",
    nav: {
      advisor: "AI Valuation Advisor",
      portfolio: "Technology & IP Hub",
      submission: "Patent & Tech Dossier",
      pipeline: "AI Valuation Pipeline",
      assessment: "Technology & TRL Score",
      commercialization: "Market & Licensing Readiness",
      valuation: "WIPO Valuation Studio (IDR)",
      governance: "TTO & Industry Sign-Off",
      reports: "Industrial Valuation Reports",
      methodology: "WIPO & TRL Methodology",
      evaluation: "Validation & Benchmark",
      groupMain: "Workspace & AI",
      groupResults: "Valuation & Commercialization",
      groupMore: "Governance & Standards",
    },
    fourOutputs: {
      bannerTitle: "Four independent pillars. Scores are never converted into money — pure WIPO financial valuation.",
      techAssessment: "Technology Maturity",
      commReadiness: "Market & Licensing Readiness",
      econValuation: "WIPO Economic Valuation (IDR)",
      evidenceCompleteness: "Evidence Auditability",
      techHint: "Verified technical maturity & NASA TRL",
      commHint: "Industry adoption & licensing readiness",
      econHint: "Auditable DCF & Royalty value in Rupiah",
      evidenceHint: "Traceable patent & test quote coverage",
      provisionalBadge: "Preliminary",
      verifiedBadge: "WIPO & TRL Verified",
      demoBadge: "Tel-U × BTP Flagship Case",
      scoreConversionNotice:
        "Scores and TRL levels are never converted into monetary values, royalty rates, or discount rates.",
    },
    common: {
      activeTechnology: "Technology",
      role: "Role",
      language: "Language",
      save: "Save Changes",
      cancel: "Cancel",
      loading: "Loading...",
      errorPrefix: "Something went wrong:",
      observed: "Found",
      missing: "Missing",
      notApplicable: "Not Applicable",
      draftWatermark: "Draft",
      approvedStatus: "Approved by BTP / Reviewer",
      staleStatus: "Needs re-review",
      advanced: "Advanced options",
      showMore: "Show more",
      showLess: "Show less",
    },
  },
  id: {
    appName: "TechVal AI",
    appSubtitle: "Telkom University × Bandung Techno Park",
    nav: {
      advisor: "Penasihat Valuasi AI",
      portfolio: "Portofolio & Hub Valuasi",
      submission: "Berkas Paten & Bukti",
      pipeline: "Mesin AI Valuasi",
      assessment: "Kematangan & TKT/TRL",
      commercialization: "Kesiapan Lisensi & Pasar",
      valuation: "Studio Valuasi WIPO (IDR)",
      governance: "Validasi Pakar & TTO",
      reports: "Laporan Valuasi & Lisensi",
      methodology: "Standar WIPO & TRL",
      evaluation: "Uji Akurasi & Validasi",
      groupMain: "Ruang Kerja & AI",
      groupResults: "Valuasi & Komersialisasi",
      groupMore: "Tata Kelola & Standar",
    },
    fourOutputs: {
      bannerTitle: "Empat pilar terpisah. Skor teknis tidak pernah dikonversi menjadi uang — murni valuasi finansial WIPO.",
      techAssessment: "Kematangan Teknologi",
      commReadiness: "Kesiapan Lisensi & Pasar",
      econValuation: "Valuasi Ekonomi WIPO (IDR)",
      evidenceCompleteness: "Keterlacakan Bukti Audit",
      techHint: "Kematangan teknis & verifikasi NASA TRL",
      commHint: "Kesiapan adopsi industri & lisensi komersial",
      econHint: "Nilai DCF & Royalti teraudit dalam Rupiah",
      evidenceHint: "Kelengkapan kutipan paten & uji pilot",
      provisionalBadge: "Sementara",
      verifiedBadge: "Terverifikasi WIPO & TRL",
      demoBadge: "Kasus Unggulan Tel-U × BTP",
      scoreConversionNotice:
        "Skor penilaian dan tingkat TKT/TRL tidak pernah dikonversi menjadi nilai moneter, tarif royalti, atau tingkat diskonto.",
    },
    common: {
      activeTechnology: "Teknologi",
      role: "Peran",
      language: "Bahasa",
      save: "Simpan Perubahan",
      cancel: "Batal",
      loading: "Memuat...",
      errorPrefix: "Terjadi kesalahan:",
      observed: "Ditemukan",
      missing: "Belum Ada",
      notApplicable: "Tidak Berlaku",
      draftWatermark: "Draf",
      approvedStatus: "Disetujui Pakar / BTP",
      staleStatus: "Perlu ditinjau ulang",
      advanced: "Opsi lanjutan",
      showMore: "Tampilkan lebih banyak",
      showLess: "Tampilkan lebih sedikit",
    },
  },
};

interface AppContextState {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (typeof translations)["en"];
  selectedTechId: string | null;
  setSelectedTechId: (id: string | null) => void;
}

const AppContext = createContext<AppContextState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>("id");
  const [selectedTechId, setSelectedTechIdState] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = window.localStorage.getItem("techval_lang") as LanguageCode | null;
    if (savedLang === "en" || savedLang === "id") {
      setLangState(savedLang);
    }
    const savedTech = window.localStorage.getItem("techval_selected_tech_id");
    if (savedTech) {
      setSelectedTechIdState(savedTech);
    }
  }, []);

  const setLang = (next: LanguageCode) => {
    setLangState(next);
    window.localStorage.setItem("techval_lang", next);
  };

  const setSelectedTechId = (id: string | null) => {
    setSelectedTechIdState(id);
    if (id) {
      window.localStorage.setItem("techval_selected_tech_id", id);
    } else {
      window.localStorage.removeItem("techval_selected_tech_id");
    }
  };

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        lang,
        setLang,
        t: translations[lang],
        selectedTechId,
        setSelectedTechId,
      },
    },
    children
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
