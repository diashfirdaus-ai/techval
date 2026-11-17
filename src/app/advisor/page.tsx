"use client";

import React from "react";
import { useAppState } from "@/lib/i18n";
import { AdvisorChat } from "@/components/advisor/AdvisorChat";
import { AgentRoster } from "@/components/advisor/AgentRoster";

export default function AdvisorPage() {
  const { lang } = useAppState();
  const id = lang === "id";

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-red-700 shadow-sm">
          <img
            src="/logos/telkom-university-official.png"
            alt="Telkom University"
            className="h-4 w-auto object-contain"
          />
          <span>×</span>
          <img
            src="/logos/bandung-technopark.png"
            alt="Bandung Techno Park"
            className="h-4 w-auto object-contain"
          />
          <span>Telkom University × Bandung Techno Park</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {id
            ? "Penasihat Valuasi Teknologi & Komersialisasi Industri"
            : "Technology Valuation & Industrial Commercialization Advisor"}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-slate-600">
          {id
            ? "Asisten analisis kolaborasi Telkom University dan Bandung Techno Park (BTP) untuk mendampingi peneliti, TTO, dan mitra industri menyelesaikan seluruh tahapan valuasi teknologi. Pilih fokus analisis di bawah: setiap jawaban mengutip lokasi bukti dokumen asli dan menjaga kemurnian valuasi WIPO (tanpa mengubah skor teknis menjadi Rupiah)."
            : "Collaborative valuation assistant by Telkom University and Bandung Techno Park (BTP) supporting researchers, TTOs, and industrial partners across end-to-end technology valuation. Select a focus module below: every answer cites exact document locators and upholds WIPO valuation integrity."}
        </p>
      </div>

      <AdvisorChat />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {id
            ? "4 Modul Analisis Valuasi Teknologi"
            : "4 Core Technology Valuation Modules"}
        </h2>
        <p className="text-sm text-slate-600">
          {id
            ? "Seluruh pekerjaan valuasi teknologi dan kesiapan transaksi industri diselesaikan secara terpadu melalui empat modul utama berikut:"
            : "All technology valuation and industrial transaction readiness tasks are completed end-to-end across these four core modules:"}
        </p>
        <AgentRoster id={id} />
      </div>
    </div>
  );
}
