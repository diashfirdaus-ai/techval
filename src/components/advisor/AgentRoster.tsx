"use client";

import React from "react";
import { MUSE_AGENTS } from "@/lib/muse-agents";

export function AgentRoster({ id }: { id: boolean }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {MUSE_AGENTS.map((a) => (
        <div
          key={a.node}
          className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:border-red-300 hover:shadow-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              {a.index}. {id ? a.name_id : a.name_en}
            </h3>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
            {id ? a.role_id : a.role_en}
          </p>
        </div>
      ))}
    </div>
  );
}
