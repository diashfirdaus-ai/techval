"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Calculator,
  Building2,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Factory,
} from "lucide-react";
import { useAppState } from "@/lib/i18n";
import { computeDcf, formatRupiah } from "@/lib/dcf-demo";
import { CountUp, Reveal } from "@/components/home/Reveal";
import { InteractiveSandboxPreview } from "@/components/home/InteractiveSandboxPreview";
import { BackgroundSection, SectionHeading, SolutionSection } from "@/components/home/LandingSections";
import { ImpactSection, ValidationSection } from "@/components/home/ImpactSections";

const BASE_NPV = computeDcf(0.15, 0.75, 1).npv;

export default function CompanyProfileHomePage() {
  const { lang, setLang } = useAppState();
  const id = lang === "id";

  const nav = [
    { href: "#valuasi", label: id ? "Fokus Valuasi" : "Valuation Focus" },
    { href: "#coba", label: id ? "Kalkulator WIPO" : "WIPO Simulator" },
    { href: "#ekosistem", label: id ? "Kampus & Industri" : "Campus & Industry" },
    { href: "#solusi", label: id ? "4 Pilar Valuasi" : "4 Valuation Pillars" },
    { href: "#validasi", label: id ? "Validasi" : "Validation" },
  ];

  const facts = [
    {
      value: <CountUp to={BASE_NPV} format={formatRupiah} />,
      label: id ? "Valuasi Dasar DCF WIPO (IDR)" : "Base WIPO DCF Valuation (IDR)",
      highlight: true,
    },
    {
      value: "Rp 3,48 M",
      label: id ? "Valuasi Lisensi (Relief-from-Royalty)" : "Licensing Valuation (Relief-from-Royalty)",
      highlight: false,
    },
    {
      value: <CountUp to={78.13} format={(v) => `${v.toFixed(1)}%`} />,
      label: id ? "Skor Kematangan (TRL 6 / 9)" : "Tech Maturity (TRL 6 / 9)",
      highlight: false,
    },
    {
      value: <CountUp to={77.5} format={(v) => `${v.toFixed(1)}%`} />,
      label: id ? "Kesiapan Lisensi & Adopsi Industri" : "Industrial Licensing Readiness",
      highlight: false,
    },
  ];

  const valueProps = [
    {
      icon: GraduationCap,
      badge: id ? "Hilirisasi Kampus & TTO (BTP)" : "University & TTO (BTP) Commercialization",
      title: id
        ? "Ubah Riset & Paten Kampus Menjadi Aset Siap Komersialisasi Bernilai Rupiah"
        : "Turn Campus Patents & Research into Commercialization-Ready IDR Assets",
      desc: id
        ? "Memudahkan peneliti Telkom University dan tim Bandung Techno Park menyusun dokumen valuasi resmi berstandar WIPO untuk menetapkan nilai dasar kekayaan intelektual (IP), pembentukan spin-off startup, dan kontrak komersialisasi."
        : "Empowers Telkom University researchers and Bandung Techno Park IP managers to generate official WIPO-compliant valuation dossiers for baseline IP pricing, startup spin-offs, and commercialization contracts.",
      bullets: id
        ? [
            "Verifikasi otomatis NASA TRL 1–9 beserta kutipan bukti halaman/paragraf",
            "Perhitungan Nilai Kini Bersih (DCF) & batas bawah biaya riset (Cost Floor)",
            "Siap untuk audit kekayaan intelektual & hilirisasi perguruan tinggi",
          ]
        : [
            "Automated NASA TRL 1–9 verification with exact page/paragraph quotes",
            "Net Present Value (DCF) & R&D replacement Cost Floor computation",
            "Ready for university IP audits and technology transfer",
          ],
    },
    {
      icon: Factory,
      badge: id ? "Lisensi & Akuisisi Mitra Industri" : "Industrial Licensing & Acquisition",
      title: id
        ? "Transparansi Harga Beli, Royalti, & Efisiensi bagi Industri"
        : "Transparent Buyout Pricing, Royalties, & Efficiency for Industry",
      desc: id
        ? "Mitra industri dan korporasi mendapatkan kepastian nilai ekonomi sebelum mengakuisisi atau melisensi teknologi. Setiap angka valuasi Rupiah didukung proyeksi arus kas 5 tahun, penghematan OPEX/CAPEX, dan kesiapan rantai pasok (TKDN)."
        : "Industrial partners and corporations gain full economic clarity before licensing or acquiring technology. Every Rupiah valuation figure is backed by 5-year cash flow models, OPEX/CAPEX savings, and local supply-chain (TKDN) readiness.",
      bullets: id
        ? [
            "4 Metode WIPO: Income (DCF), Relief-from-Royalty, Cost, & Market Comparable",
            "Simulasi sensitivitas tarif royalti & tingkat diskonto (WACC) secara langsung",
            "Kesiapan kontrak lisensi eksklusif maupun non-eksklusif (EPC/Manufaktur)",
          ]
        : [
            "4 WIPO Methods: Income (DCF), Relief-from-Royalty, Cost, & Market Comparable",
            "Live sensitivity simulation for royalty rates and discount rates (WACC)",
            "Contract-ready for exclusive or non-exclusive industrial licensing",
          ],
    },
    {
      icon: ShieldCheck,
      badge: id ? "Due Diligence & Investasi Korporasi" : "Corporate Due Diligence & Investment",
      title: id
        ? "Dokumen Valuasi Teraudit dengan Simulasi Risiko Monte Carlo"
        : "Auditable Valuation Dossiers with Monte Carlo Risk Simulation",
      desc: id
        ? "Komite investasi korporasi, BUMN, dan penilai independen membutuhkan bukti terukur. Ekspor laporan PDF dwibahasa (ID/EN) bersegel SHA-256 yang merinci rentang probabilitas nilai wajar teknologi (P10, P50, P90)."
        : "Corporate investment committees, SOEs, and valuers require verifiable proof. Export SHA-256 sealed bilingual (ID/EN) PDF valuation reports detailing fair-value probability bands (P10, P50, P90).",
      bullets: id
        ? [
            "Pemisahan tegas (Firewall): skor teknis tidak pernah dipaksa jadi angka uang",
            "Bebas halusinasi: 100% klaim performa terikat ke lokasi dokumen asli [page:N]",
            "Laporan eksekutif siap meja negosiasi lisensi & komite investasi industri",
          ]
        : [
            "Strict firewall: qualitative scores are never forced into monetary multipliers",
            "Zero hallucination: 100% of claims bound to source locators [page:N]",
            "Executive reports ready for licensing negotiation tables and investment committees",
          ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Navbar with Telkom University & Bandung Techno Park Logos */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logos/telkom-university-official.png"
              alt="Telkom University"
              className="h-9 w-auto object-contain sm:h-10"
            />
            <span className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <img
                src="/logos/bandung-technopark.png"
                alt="Bandung Techno Park"
                className="h-8 w-auto object-contain sm:h-9"
              />
              <div className="hidden sm:block leading-tight">
                <div className="text-xs font-bold tracking-tight text-slate-900">
                  Bandung Techno Park
                </div>
                <div className="text-[10px] font-medium text-red-700">
                  TechVal AI Platform
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-red-700">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLang(id ? "en" : "id")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5 text-red-600" />
              {id ? "ID" : "EN"}
            </button>
            <Link
              href="/valuation"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
            >
              <Calculator className="h-3.5 w-3.5" />
              {id ? "Studio Valuasi" : "Valuation Studio"}
            </Link>
            <Link
              href="/demo"
              className="rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              {id ? "Buka Ruang Kerja" : "Open Workspace"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section: Collaboration Banner & Industrial Technology Valuation Focus */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            {/* Collaboration Partner Banner */}
            <div className="inline-flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logos/telkom-university-official.png"
                  alt="Logo Telkom University"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-xs font-bold text-slate-400">×</span>
                <div className="flex items-center gap-1.5">
                  <img
                    src="/logos/bandung-technopark.png"
                    alt="Logo Bandung Techno Park"
                    className="h-7 w-auto object-contain"
                  />
                  <div className="leading-none">
                    <div className="text-xs font-bold text-slate-800">Bandung Techno Park</div>
                    <div className="text-[10px] text-slate-500">Inspire • Innovate • Impact</div>
                  </div>
                </div>
              </div>
              <span className="hidden h-5 w-px bg-slate-200 sm:inline-block" />
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                {id
                  ? "Kolaborasi Strategis Valuasi & Komersialisasi Teknologi Industri"
                  : "Strategic Industrial Technology Valuation & Commercialization"}
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-6xl">
              {id ? (
                <>
                  Valuasi Teknologi Berstandar WIPO agar Inovasi Kampus{" "}
                  <span className="text-red-600">Siap Dikomersialisasikan</span> &{" "}
                  <span className="text-slate-800 underline decoration-red-500/40 decoration-wavy underline-offset-8">
                    Dilisensikan ke Industri
                  </span>
                  .
                </>
              ) : (
                <>
                  WIPO-Standard Technology Valuation Built for{" "}
                  <span className="text-red-600">Commercialization Readiness</span> &{" "}
                  <span className="text-slate-800 underline decoration-red-500/40 decoration-wavy underline-offset-8">
                    Industrial Licensing
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
              {id
                ? "Platform resmi kolaborasi Telkom University dan Bandung Techno Park (BTP) untuk menyelesaikan seluruh pekerjaan valuasi teknologi secara tuntas: menghitung nilai wajar invensi dalam Rupiah (DCF, Relief-from-Royalty, Cost, & Market), memverifikasi kematangan NASA TRL 1–9, dan menerbitkan dokumen komersialisasi yang siap ditransaksikan dengan mitra industri."
                : "An official collaboration platform by Telkom University and Bandung Techno Park (BTP) providing end-to-end technology valuation: computing fair value in Rupiah (DCF, Relief-from-Royalty, Cost, & Market), verifying NASA TRL 1–9 maturity, and generating transaction-ready commercialization dossiers for industrial partners."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/valuation"
                className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
              >
                <Calculator className="h-5 w-5" />
                {id ? "Hitung Valuasi Teknologi (IDR)" : "Calculate Tech Valuation (IDR)"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                {id ? "Buka Portofolio BTP" : "Open BTP Portfolio"}
              </Link>
              <Link
                href="/advisor"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:text-red-800"
              >
                <Sparkles className="h-4 w-4" />
                {id ? "Konsultasi Valuasi AI" : "Ask AI Valuation Advisor"}
              </Link>
            </div>
          </Reveal>

          {/* Flagship Case Valuation Metrics Bar */}
          <Reveal delay={150}>
            <div className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {id
                      ? "Studi Kasus Unggulan Tel-U × Bandung Techno Park (Paten IDP000089421)"
                      : "Tel-U × Bandung Techno Park Flagship Case (Patent IDP000089421)"}
                  </p>
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {id
                    ? "Reaktor Membran Nanokomposit TiO2-Zeolit • 4 Metode Valuasi WIPO Aktif"
                    : "TiO2-Zeolite Nanocomposite Membrane Reactor • 4 Active WIPO Valuation Models"}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className={`rounded-xl p-4 ${
                      f.highlight
                        ? "border border-emerald-200 bg-emerald-50/60"
                        : "bg-slate-50/80"
                    }`}
                  >
                    <dd
                      className={`text-2xl font-bold tabular-nums tracking-tight sm:text-3xl ${
                        f.highlight ? "text-emerald-800" : "text-slate-900"
                      }`}
                    >
                      {f.value}
                    </dd>
                    <dt className="mt-1 text-xs font-medium text-slate-600">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Strategic Ecosystem Section: Campus & Industry */}
      <section id="valuasi" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={
                id
                  ? "Sinergi Hilirisasi Telkom University × Bandung Techno Park"
                  : "Telkom University × Bandung Techno Park Commercialization Synergy"
              }
              title={
                id
                  ? "Menjembatani Riset Kampus menjadi Produk & Lisensi yang Dibeli Industri."
                  : "Bridging University Research into Products & Licenses Acquired by Industry."
              }
            >
              {id
                ? "Banyak hasil riset berhenti di laboratorium karena belum memiliki kepastian nilai komersialisasi, perhitungan tarif royalti, dan uji kelayakan finansial yang dibutuhkan oleh manajemen korporasi maupun mitra manufaktur."
                : "Many research outputs remain in laboratories because they lack transparent commercialization value, royalty rate calculations, and financial feasibility metrics required by corporate management and manufacturing partners."}
            </SectionHeading>
          </Reveal>

          <div id="ekosistem" className="mt-12 grid gap-6 lg:grid-cols-3">
            {valueProps.map((vp, idx) => {
              const Icon = vp.icon;
              return (
                <Reveal key={vp.title} delay={idx * 90}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:border-red-300 hover:shadow-md">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          <Icon className="h-3.5 w-3.5" />
                          {vp.badge}
                        </span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900">
                        {vp.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{vp.desc}</p>
                      <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-700">
                        {vp.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-2">
                      <Link
                        href="/valuation"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800"
                      >
                        {id ? "Simulasikan Valuasi Sekarang" : "Simulate Valuation Now"}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive WIPO Valuation Sandbox */}
      <section id="coba" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow={
                  id
                    ? "Simulasi Valuasi & Negosiasi Lisensi Interaktif (Standar WIPO)"
                    : "Interactive WIPO Valuation & Licensing Simulator"
                }
                title={
                  id
                    ? "Hitung nilai kini bersih (NPV), tarif royalti, dan atribusi paten secara instan."
                    : "Compute net present value (NPV), royalty rates, and IP attribution instantly."
                }
              >
                {id
                  ? "Gunakan simulator di bawah ini saat menyusun valuasi komersialisasi/lisensi di Bandung Techno Park atau saat negosiasi kontrak dengan mitra industri."
                  : "Use the simulator below when structuring commercialization and licensing valuations at Bandung Techno Park or during contract negotiations with industrial partners."}
              </SectionHeading>
            </Reveal>
            <Link
              href="/valuation"
              className="group inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <TrendingUp className="h-4 w-4" />
              {id ? "Buka 4 Metode WIPO + Monte Carlo" : "Open All 4 WIPO Methods + Monte Carlo"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <Reveal delay={100} className="mt-10">
            <InteractiveSandboxPreview id={id} />
          </Reveal>
        </div>
      </section>

      <BackgroundSection id={id} />
      <SolutionSection id={id} />
      <ImpactSection id={id} />
      <ValidationSection id={id} />

      {/* Bottom CTA Banner */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 px-6 py-14 text-center sm:px-12">
              <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-2 shadow">
                <img
                  src="/logos/telkom-university-official.png"
                  alt="Telkom University"
                  className="h-7 w-auto object-contain"
                />
                <span className="text-xs font-bold text-slate-400">×</span>
                <img
                  src="/logos/bandung-technopark.png"
                  alt="Bandung Techno Park"
                  className="h-6 w-auto object-contain"
                />
                <span className="text-xs font-bold text-slate-800">Bandung Techno Park</span>
              </div>
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {id
                  ? "Siap Menghitung Valuasi Teknologi untuk Komersialisasi & Kontrak Industri?"
                  : "Ready to Value Your Technology for Commercialization & Industrial Deals?"}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                {id
                  ? "Langsung gunakan studi kasus paten Telkom University × Bandung Techno Park atau unggah dokumen invensi Anda sendiri untuk menghasilkan laporan valuasi resmi berstandar WIPO."
                  : "Start immediately with the pre-loaded Telkom University × Bandung Techno Park patent case or upload your own invention dossier to generate an official WIPO valuation report."}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/valuation"
                  className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-red-500"
                >
                  <Calculator className="h-5 w-5" />
                  {id ? "Buka Studio Valuasi WIPO" : "Open WIPO Valuation Studio"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  <FileCheck2 className="h-5 w-5 text-red-600" />
                  {id ? "Ruang Kerja Portofolio" : "Portfolio Workspace"}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-10 text-sm text-slate-600">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 sm:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <img
              src="/logos/telkom-university-official.png"
              alt="Telkom University"
              className="h-8 w-auto object-contain"
            />
            <span className="h-5 w-px bg-slate-300" />
            <img
              src="/logos/bandung-technopark.png"
              alt="Bandung Techno Park"
              className="h-7 w-auto object-contain"
            />
            <span className="font-medium text-slate-700">
              {id
                ? "TechVal AI · Kolaborasi Telkom University & Bandung Techno Park (BTP)"
                : "TechVal AI · Collaboration of Telkom University & Bandung Techno Park (BTP)"}
            </span>
          </div>
          <div className="flex flex-wrap gap-5 font-medium">
            <Link href="/valuation" className="hover:text-red-700">
              {id ? "Studio Valuasi" : "Valuation Studio"}
            </Link>
            <Link href="/demo" className="hover:text-red-700">
              {id ? "Portofolio" : "Portfolio"}
            </Link>
            <Link href="/methodology" className="hover:text-red-700">
              {id ? "Metodologi WIPO" : "WIPO Methodology"}
            </Link>
            <Link href="/reports" className="hover:text-red-700">
              {id ? "Laporan PDF" : "PDF Reports"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
