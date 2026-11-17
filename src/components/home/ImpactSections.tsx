"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/LandingSections";

export function ImpactSection({ id }: { id: boolean }) {
  const groups = [
    {
      who: id
        ? "Peneliti & Inventor Kampus (Telkom University)"
        : "University Researchers & Inventors (Telkom University)",
      what: id
        ? "Mengubah hasil riset laboratorium dan paten menjadi dokumen valuasi resmi berstandar WIPO (IDR) serta bukti kematangan TRL yang siap ditawarkan ke mitra industri."
        : "Transforms laboratory research and patents into official WIPO-compliant IDR valuation dossiers and verified TRL evidence ready for industrial partners.",
    },
    {
      who: id
        ? "Bandung Techno Park (BTP) & Kantor Transfer Teknologi (TTO)"
        : "Bandung Techno Park (BTP) & Technology Transfer Offices (TTO)",
      what: id
        ? "Mempercepat kurasi portofolio Kekayaan Intelektual (KI), menetapkan tarif royalti lisensi yang objektif, dan menyiapkan paket komersialisasi siap lisensi bagi tenant maupun spin-off startup."
        : "Accelerates IP portfolio curation, establishes objective licensing royalty rates, and prepares deal-ready commercialization packages for incubated startups and tenants.",
    },
    {
      who: id
        ? "Mitra Industri, Manufaktur, BUMN & Korporasi"
        : "Industrial Partners, Manufacturers, SOEs & Corporations",
      what: id
        ? "Meminimalkan risiko investasi adopsi teknologi baru dengan transparansi penuh atas kesiapan rantai pasok (TKDN), penghematan OPEX/CAPEX, dan rentang nilai wajar teknologi sebelum menandatangani kontrak lisensi."
        : "De-risks technology acquisition and licensing by providing full transparency into local supply chain readiness (TKDN), OPEX/CAPEX savings, and fair valuation ranges before signing contracts.",
    },
    {
      who: id
        ? "Komite Investasi Korporasi & Penilai Valuasi"
        : "Corporate Investment Committees & IP Valuers",
      what: id
        ? "Menerima laporan valuasi dalam Rupiah dari model finansial deterministik (DCF, Relief-from-Royalty, Cost, Market) yang dilengkapi simulasi probabilitas Monte Carlo (P10, P50, P90) dan jejak audit SHA-256."
        : "Receives auditable Rupiah valuation reports backed by deterministic financial models (DCF, Relief-from-Royalty, Cost, Market), Monte Carlo probability bands (P10, P50, P90), and SHA-256 provenance.",
    },
  ];

  return (
    <section id="dampak" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={id ? "Manfaat Nyata bagi Ekosistem" : "Real-World Ecosystem Impact"}
            title={
              id
                ? "Menghubungkan Riset Telkom University, Bandung Techno Park, dan Dunia Industri."
                : "Connecting Telkom University Research, Bandung Techno Park, and Industry."
            }
          />
        </Reveal>
        <dl className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {groups.map((g, i) => (
            <Reveal key={g.who} delay={i * 70}>
              <div className="grid gap-2 py-6 md:grid-cols-3 md:gap-8">
                <dt className="text-base font-bold text-slate-900">{g.who}</dt>
                <dd className="text-base leading-relaxed text-slate-600 md:col-span-2">{g.what}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

const BENCH = [
  { key: "llm", f1: 0.615, qwk: 0.178 },
  { key: "agent", f1: 0.941, qwk: 0.808 },
  { key: "full", f1: 1.0, qwk: 1.0 },
];

export function ValidationSection({ id }: { id: boolean }) {
  const labels: Record<string, string> = {
    llm: id ? "AI tunggal (tanpa verifikasi bukti)" : "Single AI (unverified)",
    agent: id ? "Pipeline Analisis Multi-Tahap" : "Multi-Stage Analysis Pipeline",
    full: id ? "Pipeline + Verifikasi Kutipan & WIPO" : "Pipeline + Quote & WIPO Verification",
  };

  return (
    <section id="validasi" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={id ? "Validasi & Akurasi Metodologi" : "Methodological Validation & Accuracy"}
            title={
              id
                ? "Mengapa mitra industri dan komite investasi mempercayai hasil TechVal AI."
                : "Why industrial partners and investment committees trust TechVal AI."
            }
          >
            {id
              ? "Pengujian pembandingan 4-kondisi membuktikan bahwa alur analisis terstruktur dengan gerbang verifikasi kutipan menghasilkan konsistensi penilaian pakar (F1 & QWK) serta presisi kalkulasi finansial WIPO dengan nol kesalahan hitung (MAE Rp 0)."
              : "Four-condition benchmark evaluation demonstrates that our structured analysis pipeline with strict quote-verification gates achieves superior expert agreement (F1 & QWK) and zero calculation error on WIPO financial fixtures (MAE Rp 0)."}
          </SectionHeading>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            {BENCH.map((b) => (
              <div key={b.key} className="grid items-center gap-3 md:grid-cols-4">
                <div className="text-sm font-semibold text-slate-900">{labels[b.key]}</div>
                <Bar label="Extraction F1" value={b.f1} />
                <Bar label="Expert Agreement (QWK)" value={b.qwk} />
                <div className="text-right text-xs font-mono text-emerald-700">
                  {b.key === "full"
                    ? id
                      ? "100% Kutipan Terverifikasi • MAE Rp 0"
                      : "100% Verified Quotes • MAE Rp 0"
                    : ""}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Link
          href="/evaluation"
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
        >
          {id ? "Lihat matriks evaluasi lengkap (F1, QWK, ICC, MAE)" : "See full evaluation matrix (F1, QWK, ICC, MAE)"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="md:col-span-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="font-semibold tabular-nums text-slate-800">{value.toFixed(3)}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-red-600" style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  );
}
