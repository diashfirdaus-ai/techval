"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold text-red-700">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-base leading-relaxed text-slate-600">{children}</p>}
    </div>
  );
}

export function BackgroundSection({ id }: { id: boolean }) {
  const points = [
    {
      title: id
        ? "Inovasi Kampus Berhenti di Sertifikat Paten"
        : "Campus Innovations Stop at the Patent Certificate",
      desc: id
        ? "Riset unggulan universitas sering terkendala masuk ke mitra industri di Science Techno Park karena belum memiliki dokumen valuasi harga lisensi dan royalti yang terukur serta siap diaudit."
        : "University inventions often struggle to secure industrial partners at Science Techno Parks because they lack auditable licensing and royalty valuation documents.",
    },
    {
      title: id
        ? "Kebuntuan Negosiasi Harga dengan Mitra Industri"
        : "Pricing Deadlocks with Industrial Partners",
      desc: id
        ? "Dalam negosiasi lisensi maupun akuisisi teknologi, pihak kampus dan industri sering kesulitan menyepakati nilai wajar karena tidak adanya simulasi DCF, Relief-from-Royalty, dan Cost Floor berstandar WIPO."
        : "During licensing or technology buyout negotiations, universities and corporate partners struggle to agree on fair value due to the absence of WIPO-standard DCF, Relief-from-Royalty, and Cost Floor models.",
    },
    {
      title: id
        ? "Due Diligence Industri Menuntut Bukti Nyata"
        : "Industrial Due Diligence Demands Verifiable Proof",
      desc: id
        ? "Keputusan investasi dan lisensi manufaktur menuntut kepastian teknis dan finansial. Setiap klaim performa, penghematan OPEX, dan TKDN wajib tertaut langsung ke halaman dan paragraf dokumen uji pilot."
        : "Manufacturing licensing and corporate investment decisions demand hard technical and financial proof. Every performance, OPEX saving, and local content (TKDN) claim must trace directly to pilot test documents.",
    },
  ];

  return (
    <section id="latar-belakang" className="scroll-mt-20 border-t border-slate-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={id ? "Tantangan Hilirisasi & Lisensi Industri" : "Commercialization & Industrial Licensing Challenges"}
            title={
              id
                ? "Mengapa banyak paten potensial gagal dikomersialisasikan ke industri?"
                : "Why do promising patents fail to commercialize into industry?"
            }
          />
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="border-t-2 border-red-600/20 pt-5">
                <div className="text-sm font-bold tabular-nums text-red-600">0{i + 1}</div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection({ id }: { id: boolean }) {
  const outputs = [
    {
      badge: id ? "Pilar Utama Transaksi Industri" : "Core Industrial Deal Pillar",
      title: id ? "1. Valuasi Ekonomi WIPO (Rupiah / IDR)" : "1. WIPO Economic Valuation (IDR)",
      desc: id
        ? "Perhitungan finansial deterministik berbasis standar WIPO: Discounted Cash Flow (DCF), Relief-from-Royalty, Cost Approach, Market Comparables, serta simulasi risiko Monte Carlo (P10, P50, P90) untuk menentukan harga jual dan tarif royalti yang adil bagi kampus & industri."
        : "Deterministic financial valuation grounded in WIPO standards: Discounted Cash Flow (DCF), Relief-from-Royalty, Cost Approach, Market Comparables, plus Monte Carlo risk simulation (P10, P50, P90) for fair campus-industry licensing deals.",
      highlight: true,
    },
    {
      badge: id ? "Kesiapan Pasar & Manufaktur" : "Market & Manufacturing Readiness",
      title: id ? "2. Kesiapan Komersialisasi & Lisensi Industri" : "2. Commercialization & Industrial Licensing Readiness",
      desc: id
        ? "Mengukur permintaan pasar sasaran, keunggulan biaya (OPEX/CAPEX), kepatuhan regulasi & TKDN, kesiapan rantai pasok manufaktur, serta struktur lisensi dengan pembobotan Saaty AHP (CR ≤ 0.10)."
        : "Evaluates target market demand, cost advantage (OPEX/CAPEX), regulatory & TKDN compliance, manufacturing supply chain, and licensing readiness using Saaty AHP weighting (CR ≤ 0.10).",
      highlight: false,
    },
    {
      badge: id ? "Standar Teknis" : "Technical Standard",
      title: id ? "3. Kematangan Teknologi & NASA TRL 1–9" : "3. Technology Maturity & NASA TRL 1–9",
      desc: id
        ? "Skor teknis terukur (0–100%) dari rubrik ilmiah 1–5 yang disandingkan dengan verifikasi tingkat kesiapan teknologi NASA TRL 1–9 pada skala aslinya berdasarkan bukti uji laboratorium atau pilot skala industri."
        : "Normalized technical score (0–100%) from 1–5 rubrics paired with native NASA TRL 1–9 exit-criteria verification grounded in lab or industrial pilot test evidence.",
      highlight: false,
    },
    {
      badge: id ? "Kredibilitas Due Diligence" : "Due Diligence Credibility",
      title: id ? "4. Keterlacakan & Kelengkapan Bukti Audit" : "4. Evidence Completeness & Audit Traceability",
      desc: id
        ? "Menampilkan secara transparan indikator mana yang sudah terbukti dengan kutipan [page:N]/[para:N], mana yang belum lengkap, dan mana yang tidak relevan—memberikan kepastian penuh bagi auditor dan mitra industri."
        : "Transparently reports which indicators are backed by exact [page:N]/[para:N] quotes, which are missing, and which are not applicable—providing full certainty for corporate auditors and industrial partners.",
      highlight: false,
    },
  ];

  return (
    <section id="solusi" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow={id ? "Arsitektur 4 Pilar TechVal AI" : "TechVal AI 4-Pillar Architecture"}
              title={
                id
                  ? "Menyelesaikan seluruh pekerjaan valuasi teknologi secara tuntas dan siap transaksi."
                  : "Completing end-to-end technology valuation workflows ready for industrial transactions."
              }
            >
              {id
                ? "Dikembangkan bersama oleh Telkom University dan Bandung Techno Park, TechVal AI memisahkan penilaian teknis dari perhitungan uang secara tegas sesuai pedoman WIPO."
                : "Co-developed by Telkom University and Bandung Techno Park, TechVal AI enforces a strict methodological firewall between qualitative scores and monetary valuation per WIPO guidelines."}
            </SectionHeading>
          </Reveal>
          <Link
            href="/methodology"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800"
          >
            {id ? "Pelajari standar WIPO & TRL" : "Explore WIPO & TRL standards"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {outputs.map((o, i) => (
            <Reveal key={o.title} delay={i * 80}>
              <div
                className={`h-full rounded-2xl border p-6 transition duration-200 hover:shadow-md ${
                  o.highlight
                    ? "border-emerald-300 bg-emerald-50/40"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                    o.highlight
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {o.badge}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
