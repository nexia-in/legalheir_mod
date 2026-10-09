import type { CSSProperties, ReactNode } from "react";

/** A4 at 96 dpi. */
export const A4_W = 794;
export const A4_H = 1123;

export const ML = `'Noto Sans Malayalam', 'Manjari', 'AnjaliOldLipi', 'Nirmala UI', sans-serif`;
export const EN = `'Noto Sans', 'Helvetica Neue', Arial, sans-serif`;

export const pageStyle: CSSProperties = {
  width: `${A4_W}px`,
  minHeight: `${A4_H}px`,
  height: `${A4_H}px`,
  backgroundColor: "#ffffff",
  color: "#000000",
  padding: "40px 44px 32px 44px",
  boxSizing: "border-box",
  fontFamily: EN,
  fontSize: "12px",
  lineHeight: 1.45,
  position: "relative",
  overflow: "hidden",
};

export function Page({
  children,
  pageNo,
  pageCount,
  formCode,
}: {
  children: ReactNode;
  pageNo: number;
  pageCount: number;
  formCode: string;
}) {
  return (
    <div style={pageStyle} data-pdf-page="1">
      {/* The fit wrapper has a hard height; generate.tsx shrinks the inner
          block if the content would ever exceed it, so nothing is clipped. */}
      <div data-pdf-fit="1" style={{ height: `${A4_H - 112}px`, overflow: "hidden" }}>
        <div data-pdf-inner="1" style={{ width: "100%" }}>
          {children}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "44px",
          right: "44px",
          bottom: "16px",
          borderTop: "1px solid #c8cdd4",
          paddingTop: "5px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "8.5px",
          color: "#555f6d",
        }}
      >
        <span>{formCode}</span>
        <span>
          Page {pageNo} of {pageCount}
        </span>
      </div>
    </div>
  );
}

export function FormHeader({
  malayalamTitle,
  englishTitle,
  subtitle,
  office,
}: {
  malayalamTitle: string;
  englishTitle: string;
  subtitle?: string;
  office?: string;
}) {
  return (
    <div style={{ textAlign: "center", borderBottom: "2px solid #0f2744", paddingBottom: "8px", marginBottom: "12px" }}>
      <div style={{ fontFamily: ML, fontSize: "19px", fontWeight: 700, lineHeight: 1.5 }}>{malayalamTitle}</div>
      <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.06em", marginTop: "3px" }}>
        {englishTitle}
      </div>
      {subtitle ? (
        <div style={{ fontFamily: ML, fontSize: "12px", marginTop: "3px" }}>{subtitle}</div>
      ) : null}
      {office ? (
        <div style={{ fontSize: "10.5px", marginTop: "4px", fontWeight: 600 }}>{office}</div>
      ) : null}
    </div>
  );
}

export function SectionTitle({ ml, en }: { ml: string; en: string }) {
  return (
    <div
      style={{
        backgroundColor: "#e8edf4",
        border: "1px solid #9aa7b8",
        padding: "4px 8px",
        margin: "10px 0 0 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <span style={{ fontFamily: ML, fontSize: "13px", fontWeight: 700 }}>{ml}</span>
      <span style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.05em", color: "#22364f" }}>{en}</span>
    </div>
  );
}

/** Label / value row inside a bordered block. */
export function Row({
  ml,
  en,
  value,
  half,
}: {
  ml: string;
  en: string;
  value: string;
  half?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #b9c2cd",
        borderLeft: "1px solid #b9c2cd",
        borderRight: "1px solid #b9c2cd",
        minHeight: "26px",
        width: half ? "50%" : "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: half ? "52%" : "38%",
          borderRight: "1px solid #b9c2cd",
          padding: "4px 7px",
          backgroundColor: "#f6f8fb",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontFamily: ML, fontSize: "11.5px", lineHeight: 1.35 }}>{ml}</div>
        <div style={{ fontSize: "8px", color: "#4a5663", letterSpacing: "0.03em" }}>{en}</div>
      </div>
      <div
        style={{
          flex: 1,
          padding: "5px 8px",
          fontSize: "11.5px",
          fontWeight: 600,
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
          boxSizing: "border-box",
        }}
      >
        {value || "\u00A0"}
      </div>
    </div>
  );
}

export function Block({ children }: { children: ReactNode }) {
  return <div style={{ borderTop: "1px solid #b9c2cd", marginBottom: "2px" }}>{children}</div>;
}

export function SignatureBox({
  caption,
  subCaption,
  width = "230px",
  height = "54px",
}: {
  caption: string;
  subCaption?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div style={{ width, textAlign: "center" }}>
      <div style={{ height, borderBottom: "1px dotted #44506080" }} />
      <div style={{ fontFamily: ML, fontSize: "11px", marginTop: "3px" }}>{caption}</div>
      {subCaption ? <div style={{ fontSize: "9px", color: "#3d4854" }}>{subCaption}</div> : null}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: "9px",
        color: "#3d4854",
        border: "1px dashed #9aa7b8",
        padding: "5px 7px",
        marginTop: "8px",
        lineHeight: 1.45,
      }}
    >
      {children}
    </div>
  );
}

export const th: CSSProperties = {
  border: "1px solid #7f8c9b",
  padding: "4px 5px",
  backgroundColor: "#e8edf4",
  fontSize: "9px",
  fontWeight: 700,
  textAlign: "center",
  verticalAlign: "middle",
};

export const td: CSSProperties = {
  border: "1px solid #7f8c9b",
  padding: "5px 5px",
  fontSize: "10.5px",
  verticalAlign: "top",
  wordBreak: "break-word",
};

export function ThCell({ ml, en, width }: { ml: string; en: string; width?: string }) {
  return (
    <th style={{ ...th, width }}>
      <div style={{ fontFamily: ML, fontSize: "10.5px", fontWeight: 700 }}>{ml}</div>
      <div style={{ fontSize: "8px", color: "#22364f" }}>{en}</div>
    </th>
  );
}

/** Split rows across pages: `first` rows on page 1, `rest` on later pages. */
export function chunkRows<T>(items: T[], first: number, rest: number): T[][] {
  if (items.length === 0) return [[]];
  const out: T[][] = [];
  let i = 0;
  out.push(items.slice(0, first));
  i = first;
  while (i < items.length) {
    out.push(items.slice(i, i + rest));
    i += rest;
  }
  return out;
}
