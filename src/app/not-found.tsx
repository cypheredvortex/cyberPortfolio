"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { container, buttonClasses } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { messages } = useI18n();

  return (
    <div className="relative flex min-h-[70vh] items-center">
      <div className={`${container} py-20`}>
        <div className="relative max-w-xl">
          <p
            aria-hidden="true"
            className="font-mono text-[5rem] font-bold leading-none text-primary/25 sm:text-[7rem]"
          >
            {messages.notFound.code}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {messages.notFound.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {messages.notFound.description}
          </p>
          <Link
            href="/"
            className={`${buttonClasses("primary")} mt-8`}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            {messages.notFound.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
