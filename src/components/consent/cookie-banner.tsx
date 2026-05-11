"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ceroespalda.consent.v1";

type ConsentValue = "accepted" | "rejected";

interface ConsentRecord {
  value: ConsentValue;
  ads: boolean;
  analytics: boolean;
  ts: string;
}

function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentRecord;
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = {
    value,
    ads: value === "accepted",
    analytics: value === "accepted",
    ts: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  document.cookie = `cookie_consent=${value}; path=/; max-age=${
    60 * 60 * 24 * 180
  }; samesite=lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) setVisible(true);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    writeConsent("accepted");
    setVisible(false);
  }
  function handleReject() {
    writeConsent("rejected");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Usamos cookies propias y de terceros para mejorar tu experiencia,
          analizar el tráfico y, en el futuro, mostrar publicidad personalizada.
          Puedes aceptarlas todas o rechazarlas. Más información en nuestra{" "}
          <Link
            href="/cookies"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={handleReject}>
            Rechazar
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Aceptar todas
          </Button>
        </div>
      </div>
    </div>
  );
}
