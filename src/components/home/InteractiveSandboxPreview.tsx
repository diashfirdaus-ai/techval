"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, TrendingUp, Award } from "lucide-react";
import { computeDcf, formatRupiah } from "@/lib/dcf-demo";

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-800">{label}</span>
        <span className="rounded bg-red-50 px-2 py-0.5 font-mono text-xs font-bold tabular-nums text-red-700">
          {display}
        </span>
      </div>
      {hint && <div className="mt-0.5 text-[11px] text-slate-500">{hint}</div>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full cursor-pointer accent-red-600"
      />
    </label>
  );
}

export function InteractiveSandboxPreview({ id }: { id: boolean }) {
  const [rate, setRate] = useState(15);
  const [attribution, setAttribution] = useState(75);
  const [revenue, setRevenue] = useState(100);
  const [royaltyRate, setRoyaltyRate] = useState(5.0);

  const { npv, rows } = computeDcf(rate / 100, attribution / 100, revenue / 100);
  const maxPv = Math.max(...rows.map((r) => Math.abs(r.pv)), 1);

  // Compute indicative Relief-from-Royalty PV for comparison
  const baseRevenues = [1200000000, 2500000000, 4200000000, 5800000000, 7000000000];
  const rfrPv = baseRevenues.reduce((acc, rev, idx) => {
    const netRoyalty = rev * (revenue / 100) * (royaltyRate / 100) * (1 - 0.22);
    return acc + netRoyalty / Math.pow(1 + rate / 100, idx + 1);
  }, 0);

  return (
    <div className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-5">
      <div className="space-y-5 lg:col-span-2">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Calculator className="h-4 w-4 text-red-600" />
          <span className="text-sm font-bold text-slate-900">
            {id ? "Parameter Negosiasi & Valuasi" : "Negotiation & Valuation Parameters"}
          </span>
        </div>

        <Slider
          label={id ? "Tingkat Diskonto / WACC (r)" : "Discount Rate / WACC (r)"}
          hint={id ? "Risiko modal proyek komersialisasi" : "Commercialization project cost of capital"}
          value={rate}
          display={`${rate.toFixed(1)}%`}
          min={8}
          max={25}
          step={0.5}
          onChange={setRate}
        />
        <Slider
          label={id ? "Faktor Atribusi Paten/Teknologi (α)" : "IP / Technology Attribution Factor (α)"}
          hint={id ? "Porsi nilai produk yang berasal dari invensi ini" : "Share of product value driven by this IP"}
          value={attribution}
          display={`${attribution}%`}
          min={25}
          max={100}
          step={5}
          onChange={setAttribution}
        />
        <Slider
          label={id ? "Skala Penjualan Industri" : "Industrial Sales Projection"}
          hint={id ? "Target adopsi pasar mitra industri (5 tahun)" : "5-year target market adoption"}
          value={revenue}
          display={`${revenue}%`}
          min={75}
          max={150}
          step={5}
          onChange={setRevenue}
        />
        <Slider
          label={id ? "Tarif Royalti Lisensi" : "Licensing Royalty Rate"}
          hint={id ? "Untuk pembanding metode Relief-from-Royalty" : "For Relief-from-Royalty comparison"}
          value={royaltyRate}
          display={`${royaltyRate.toFixed(1)}%`}
          min={2}
          max={12}
          step={0.5}
          onChange={setRoyaltyRate}
        />

        <p className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
          {id
            ? "Simulasi kasus TELU-BTP-PAT-2026-001. Sesuai pedoman WIPO, skor teknis & TRL tidak pernah dikalikan menjadi uang."
            : "Simulated on TELU-BTP-PAT-2026-001. Per WIPO guidelines, technical scores & TRL are never used as monetary multipliers."}
        </p>
      </div>

      <div className="flex flex-col justify-between lg:col-span-3">
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>{id ? "Nilai Kini Bersih (WIPO DCF)" : "Net Present Value (WIPO DCF)"}</span>
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight text-emerald-950 sm:text-3xl">
                {formatRupiah(npv)}
              </div>
              <div className="mt-1 text-[11px] text-emerald-800">
                {id ? "Acuan utama akuisisi / spin-off" : "Primary benchmark for spin-off / buyout"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{id ? "Nilai Lisensi (Relief-from-Royalty)" : "Licensing Value (Relief-from-Royalty)"}</span>
                <Award className="h-4 w-4 text-red-600" />
              </div>
              <div className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight text-slate-900 sm:text-3xl">
                {formatRupiah(rfrPv)}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                {id
                  ? `Estimasi nilai kontrak royalti ${royaltyRate.toFixed(1)}%`
                  : `Estimated value at ${royaltyRate.toFixed(1)}% royalty rate`}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>
                {id
                  ? "Arus Kas Teratribusi & Terdiskonto (Tahun 1 – Tahun 5)"
                  : "Attributed & Discounted Cash Flows (Year 1 – Year 5)"}
              </span>
              <span>IDR (Rupiah)</span>
            </div>
            <div className="space-y-3">
              {rows.map((r) => (
                <div key={r.year} className="flex items-center gap-3 text-sm">
                  <span className="w-16 shrink-0 font-medium text-slate-600">
                    {id ? "Tahun" : "Year"} {r.year}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 ease-out"
                      style={{ width: `${Math.max(4, (Math.abs(r.pv) / maxPv) * 100)}%` }}
                    />
                  </div>
                  <span className="w-36 shrink-0 text-right font-mono text-xs font-semibold tabular-nums text-slate-800">
                    {formatRupiah(r.pv)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-500">
            {id
              ? "Butuh analisis Monte Carlo (P10/P50/P90), Cost Approach, & Laporan PDF?"
              : "Need Monte Carlo (P10/P50/P90), Cost Approach, & PDF Reports?"}
          </span>
          <Link
            href="/valuation"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-800"
          >
            {id ? "Buka Studio Valuasi Lengkap" : "Open Full Valuation Studio"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
