"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppState } from "@/lib/i18n";
import { apiClient, getSavedSession } from "@/lib/api-client";
import type { TechnologyItem } from "@/lib/api-types";
import {
  Card,
  Badge,
  Button,
  FourOutputsGrid,
  EmptyState,
  Collapsible,
} from "@/components/ui/primitives";
import {
  PlusCircle,
  ArrowRight,
  FileUp,
  FileText,
  Calculator,
  Microscope,
  CheckCircle2,
  Download,
  TrendingUp,
} from "lucide-react";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200";
const labelClass = "block text-sm font-medium text-slate-800";

export default function DemoWorkspacePage() {
  const { lang, t, selectedTechId, setSelectedTechId } = useAppState();
  const id = lang === "id";
  const [technologies, setTechnologies] = useState<TechnologyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [newCode, setNewCode] = useState("TELU-BTP-PAT-2026-002");
  const [newTitleEn, setNewTitleEn] = useState("");
  const [newTitleId, setNewTitleId] = useState("");
  const [newDomain, setNewDomain] = useState("Environmental & IoT Smart Engineering");
  const [newDescEn, setNewDescEn] = useState("");
  const [newClaimedTrl, setNewClaimedTrl] = useState<number>(6);
  const [newPatentStatus, setNewPatentStatus] = useState("patent_pending");

  const loadPortfolio = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await apiClient.listTechnologies();
      setTechnologies(items);
      if (items.length > 0 && !selectedTechId) {
        setSelectedTechId(items[0].id);
      }
    } catch (e: any) {
      setError(e.message || "Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleCreateTech = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      const created = await apiClient.createTechnology({
        code: newCode,
        title_en: newTitleEn,
        title_id: newTitleId || newTitleEn,
        domain: newDomain,
        inventor_organization: "Telkom University & Bandung Techno Park (BTP)",
        description_en: newDescEn,
        description_id: newDescEn,
        claimed_trl: Number(newClaimedTrl),
        patent_status: newPatentStatus,
        is_synthetic_demo: false,
      });
      setShowCreateForm(false);
      setSelectedTechId(created.id);
      setSuccess(
        id
          ? "Paten / Inovasi baru berhasil didaftarkan. Silakan lanjut ke Langkah 1 (Unggah Dokumen) atau Langkah 2 (Hitung Valuasi)."
          : "New patent / innovation registered. Proceed to Step 1 (Upload Documents) or Step 2 (Calculate Valuation)."
      );
      setNewTitleEn("");
      setNewTitleId("");
      setNewDescEn("");
      await loadPortfolio();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const activeTech =
    technologies.find((x) => x.id === selectedTechId) || technologies[0] || null;
  const titleOf = (tech: TechnologyItem) =>
    id && tech.title_id ? tech.title_id : tech.title_en;

  const handleQuickDownloadReport = async () => {
    if (!activeTech) return;
    setDownloadingPdf(true);
    setError(null);
    try {
      const report = await apiClient.generateReport({
        technology_id: activeTech.id,
        language: lang,
      });
      const session = getSavedSession();
      const res = await fetch(apiClient.getReportDownloadUrl(report.id), {
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan_Valuasi_${activeTech.code}_${lang.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Gagal mengunduh laporan PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const quickSteps = [
    {
      step: "1",
      href: "/submission",
      icon: FileUp,
      title: id ? "Unggah Dokumen Paten / Invensi" : "Upload Patent / Tech Documents",
      desc: id
        ? "Masukkan file deskripsi paten atau hasil uji lab/pilot. Sistem otomatis memeriksa kelengkapan bukti dan tingkat kesiapan (TKT/TRL)."
        : "Upload patent specifications or lab/pilot test files. The system automatically checks evidence completeness and TRL.",
      cta: id ? "Unggah Dokumen" : "Upload Documents",
    },
    {
      step: "2",
      href: "/valuation",
      icon: Calculator,
      title: id ? "Hitung Valuasi & Royalti (Rupiah)" : "Calculate Valuation & Royalty (IDR)",
      desc: id
        ? "Tentukan nilai ekonomi paten dalam Rupiah menggunakan standar WIPO (DCF, Relief-from-Royalty, dan Biaya Riset) secara mudah."
        : "Determine the economic value of the patent in Rupiah using WIPO standards (DCF, Relief-from-Royalty, and Cost Approach).",
      cta: id ? "Buka Kalkulator Valuasi" : "Open Valuation Calculator",
      primary: true,
    },
    {
      step: "3",
      href: "/reports",
      icon: FileText,
      title: id ? "Cetak Laporan Resmi (PDF)" : "Download Official Report (PDF)",
      desc: id
        ? "Unduh dokumen hasil penilaian & valuasi resmi siap pakai untuk keperluan DJKI, kampus (TTO/BTP), maupun mitra lisensi industri."
        : "Download the official assessment & valuation PDF ready for DJKI, university TTOs, and industrial licensing partners.",
      cta: id ? "Lihat & Unduh Laporan" : "View & Download Reports",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Simple & Clear Header for DJKI / Campus / BTP Users */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
              <img
                src="/logos/telkom-university-official.png"
                alt="Telkom University"
                className="h-5 w-auto object-contain"
              />
              <span className="text-xs font-bold text-slate-400">×</span>
              <img
                src="/logos/bandung-technopark.png"
                alt="Bandung Techno Park"
                className="h-5 w-auto object-contain"
              />
              <span className="text-xs font-semibold text-red-700">
                {id
                  ? "Dashboard Valuasi Paten & Teknologi · Siap Pakai untuk Kampus, BTP & DJKI"
                  : "Patent & Technology Valuation Dashboard · Built for Universities, BTP & DJKI"}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {id
                ? "Beranda Valuasi & Komersialisasi Teknologi"
                : "Technology Valuation & Commercialization Dashboard"}
            </h1>
            <p className="text-sm leading-relaxed text-slate-600">
              {id
                ? "Gunakan 3 langkah mudah di bawah ini untuk menilai kematangan teknologi (TKT/TRL), menghitung nilai valuasi ekonomi dalam Rupiah (Standar WIPO), dan mengunduh laporan PDF resmi."
                : "Follow the 3 simple steps below to assess technology readiness (TRL), calculate WIPO economic valuation in Rupiah, and download official PDF reports."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="border-slate-300"
            >
              <PlusCircle className="h-4 w-4 text-red-600" />
              {id ? "Daftarkan Paten / Inovasi Baru" : "Register New Patent / Tech"}
            </Button>
            <Link
              href="/valuation"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700"
            >
              <Calculator className="h-4 w-4" />
              {id ? "Langsung Hitung Valuasi" : "Calculate Valuation Now"}
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-800"
        >
          {t.common.errorPrefix} {error}
        </div>
      )}
      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          {success}
        </div>
      )}

      {/* Simple Create Form when clicked */}
      {showCreateForm && (
        <Card className="border-red-200 bg-red-50/20">
          <h2 className="mb-1 text-xl font-bold text-slate-900">
            {id ? "Daftarkan Paten / Inovasi Baru" : "Register a New Patent / Innovation"}
          </h2>
          <p className="mb-5 text-sm text-slate-600">
            {id
              ? "Cukup isi nama invensi dan deskripsi singkatnya untuk memulai penilaian."
              : "Simply enter the invention name and a short description to begin."}
          </p>
          <form onSubmit={handleCreateTech} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="title-en">
                  {id ? "Judul Paten / Nama Inovasi" : "Patent Title / Innovation Name"}
                </label>
                <input
                  id="title-en"
                  required
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder={
                    id
                      ? "Contoh: Sistem Sensor IoT Pemantau Kualitas Air Industri"
                      : "e.g., Industrial Water Quality IoT Sensor System"
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="patent">
                  {id ? "Status Kekayaan Intelektual (KI)" : "IP / Patent Status"}
                </label>
                <select
                  id="patent"
                  value={newPatentStatus}
                  onChange={(e) => setNewPatentStatus(e.target.value)}
                  className={inputClass}
                >
                  <option value="granted">
                    {id ? "Paten Terdaftar / Granted (DJKI)" : "Granted Patent (DJKI)"}
                  </option>
                  <option value="patent_pending">
                    {id ? "Paten Sedang Didaftarkan (Pending)" : "Patent Pending"}
                  </option>
                  <option value="invention_disclosure">
                    {id ? "Invensi Baru / Belum Didaftarkan" : "Invention Disclosure"}
                  </option>
                  <option value="non_patent_ip">
                    {id ? "Hak Cipta / Perangkat Lunak / Desain Industri" : "Copyright / Software / Industrial Design"}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="desc">
                {id ? "Ringkasan Fungsi & Manfaat untuk Industri" : "Summary of Function & Industrial Benefit"}
              </label>
              <textarea
                id="desc"
                required
                rows={3}
                value={newDescEn}
                onChange={(e) => setNewDescEn(e.target.value)}
                placeholder={
                  id
                    ? "Jelaskan secara singkat cara kerja teknologi dan masalah industri yang diselesaikan..."
                    : "Briefly describe how the technology works and the industrial problem it solves..."
                }
                className={inputClass}
              />
            </div>
            <Collapsible title={id ? "Opsi Tambahan (Kode, Bidang, TKT/TRL)" : "Additional Options (Code, Field, TRL)"}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass} htmlFor="code">
                    {id ? "Kode Dokumen / Paten" : "Document / Patent Code"}
                  </label>
                  <input
                    id="code"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="domain">
                    {id ? "Bidang Teknologi" : "Technology Field"}
                  </label>
                  <input
                    id="domain"
                    required
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="trl">
                    {id ? "Klaim Awal TKT / TRL (1–9)" : "Initial Claimed TRL (1–9)"}
                  </label>
                  <input
                    id="trl"
                    type="number"
                    min={1}
                    max={9}
                    value={newClaimedTrl}
                    onChange={(e) => setNewClaimedTrl(Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              </div>
            </Collapsible>
            <div className="flex flex-wrap justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                {t.common.cancel}
              </Button>
              <Button type="submit" disabled={saving}>
                {saving
                  ? id
                    ? "Menyimpan..."
                    : "Saving..."
                  : id
                  ? "Simpan & Mulai Penilaian"
                  : "Save & Start Assessment"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* 3 Simple Steps Workflow Banner */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {id
              ? "3 Langkah Mudah Penggunaan (Standar DJKI, Kampus & Industri)"
              : "3 Simple Steps (For DJKI, Universities & Industry)"}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickSteps.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  s.primary
                    ? "border-red-300 bg-red-50/40 hover:border-red-500"
                    : "border-slate-200 bg-white hover:border-red-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      {id ? `Langkah ${s.step}` : `Step ${s.step}`}
                    </span>
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-700 transition group-hover:bg-red-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-base font-bold text-slate-900">{s.title}</div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{s.desc}</p>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-red-700 group-hover:translate-x-1 transition-transform">
                  <span>{s.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {loading ? (
        <div className="py-12 text-center text-base text-slate-500">{t.common.loading}</div>
      ) : technologies.length === 0 ? (
        <EmptyState
          title={id ? "Belum ada paten atau teknologi" : "No patents or technologies yet"}
          description={
            id
              ? "Mulai dengan mendaftarkan paten atau inovasi pertama Anda."
              : "Start by registering your first patent or innovation."
          }
          action={
            <Button onClick={() => setShowCreateForm(true)}>
              <PlusCircle className="h-5 w-5" />
              {id ? "Daftarkan Paten / Inovasi" : "Register Patent / Innovation"}
            </Button>
          }
        />
      ) : (
        <>
          {/* Active Technology Summary Card */}
          {activeTech && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-red-50 px-2.5 py-0.5 font-mono text-xs font-bold text-red-700">
                      {activeTech.code}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      • {id ? "No. Paten / Status:" : "Patent No. / Status:"}{" "}
                      <strong className="text-slate-800">
                        {activeTech.patent_application_number || activeTech.patent_status}
                      </strong>
                    </span>
                    <span className="text-xs text-slate-500">
                      • {activeTech.inventor_organization}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-xl font-bold text-slate-900">
                    {titleOf(activeTech)}
                  </h3>
                </div>

                {/* Instant Action Buttons for Active Patent */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href="/valuation"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-emerald-800"
                  >
                    <Calculator className="h-4 w-4" />
                    {id ? "Ubah Asumsi Valuasi (IDR)" : "Adjust Valuation (IDR)"}
                  </Link>
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <Microscope className="h-4 w-4 text-blue-700" />
                    {id ? "Cek Bukti & TKT/TRL" : "Check Evidence & TRL"}
                  </Link>
                  <Link
                    href="/commercialization"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                    {id ? "Kesiapan Lisensi" : "Licensing Readiness"}
                  </Link>
                  <button
                    type="button"
                    onClick={handleQuickDownloadReport}
                    disabled={downloadingPdf}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" />
                    {downloadingPdf
                      ? id
                        ? "Menyiapkan PDF..."
                        : "Preparing PDF..."
                      : id
                      ? "Unduh PDF Resmi"
                      : "Download Official PDF"}
                  </button>
                </div>
              </div>

              <FourOutputsGrid
                outputs={activeTech.four_separate_outputs}
                isDemo={activeTech.is_synthetic_demo}
                expertStatus={activeTech.expert_review_status}
              />
            </section>
          )}

          {/* Simple Portfolio Switcher */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {id
                  ? "Daftar Paten & Teknologi Terdaftar (Klik untuk Memilih)"
                  : "Registered Patents & Technologies (Click to Select)"}
              </h2>
              <span className="text-xs font-medium text-slate-500">
                {technologies.length} {id ? "dokumen terdaftar" : "registered items"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {technologies.map((tech) => {
                const isSelected = tech.id === (activeTech?.id ?? null);
                const fo = tech.four_separate_outputs;
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => setSelectedTechId(tech.id)}
                    aria-pressed={isSelected}
                    className={`rounded-2xl border p-5 text-left transition ${
                      isSelected
                        ? "border-red-500 bg-red-50/40 ring-2 ring-red-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-red-700">
                            {tech.code}
                          </span>
                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {id ? "Sedang Aktif" : "Active"}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 truncate text-base font-bold text-slate-900">
                          {titleOf(tech)}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">{tech.domain}</div>
                      </div>
                      {tech.expert_review_status === "approved" ? (
                        <Badge variant="success">{t.common.approvedStatus}</Badge>
                      ) : tech.expert_review_status === "stale" ? (
                        <Badge variant="danger">{t.common.staleStatus}</Badge>
                      ) : (
                        <Badge variant="outline">{t.common.draftWatermark}</Badge>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-sm">
                      <div>
                        <div className="text-xs text-slate-500">
                          {id ? "Kematangan (TRL)" : "Maturity (TRL)"}
                        </div>
                        <div className="font-bold text-slate-900">
                          {((fo.technology_assessment.normalized_score ?? 0) * 100).toFixed(0)}% (TRL{" "}
                          {fo.technology_assessment.trl_native_1_to_9 || "-"})
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          {id ? "Kesiapan Lisensi" : "Licensing Readiness"}
                        </div>
                        <div className="font-bold text-slate-900">
                          {((fo.commercialization_readiness.normalized_score ?? 0) * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">
                          {id ? "Valuasi WIPO (IDR)" : "WIPO Valuation"}
                        </div>
                        <div className="truncate font-bold text-emerald-700">
                          {fo.economic_valuation.dcf_base_formatted}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
