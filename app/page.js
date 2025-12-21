"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function JpgConverterPage() {
  // language
  const [lang, setLang] = useState("en");

  // sliders
  const [jpgQuality, setJpgQuality] = useState(80);

  // translations
  const t = useMemo(() => ({
    ko: {
      title: "FreeImageTools",
      subtitle: "브라우저에서 무료로 JPG 변환 및 이미지 크기 축소",
      heroNote: "100% 브라우저 기반 · 서버 업로드 없음",
      jpg: {
        title: "JPG 변환기",
        sub: "PNG, WebP 등 다양한 형식을 JPG 파일로 변환합니다.",
        quality: "JPG 품질",
        qualityDesc: "(높을수록 파일 크기는 크고 품질은 좋음)",
        dropMain: "이미지 파일을 드래그 & 드롭하세요",
        dropSub: "PNG, WebP 등이 JPG로 변환됩니다.",
        selectFiles: "파일 선택",
        waiting: "이미지 대기 중...",
        noImages: "이미지 파일이 감지되지 않았습니다.",
        processing: "처리 중",
        file: "파일",
        done: "완료",
        error: "오류",
        finished: "완료되었습니다."
      },
      status: "상태",
      footer: "FreeImageTools. 모든 사람을 위한 무료 웹 도구",
      nav: {
        jpg: "JPG 변환기",
        resize: "이미지 크기",
        idphoto: "증명사진"
      }
    },
    en: {
      title: "FreeImageTools",
      subtitle: "Free JPG converter & image size reducer in your browser.",
      heroNote: "100% browser-based · No upload to server",
      jpg: {
        title: "JPG Converter",
        sub: "Convert PNG, WebP and more into JPG files.",
        quality: "JPG Quality",
        qualityDesc: "(Higher = bigger file, better quality)",
        dropMain: "Drag & drop image file(s)",
        dropSub: "PNG, WebP, etc. will be converted to JPG.",
        selectFiles: "Select Files",
        waiting: "Waiting for images...",
        noImages: "No image files detected.",
        processing: "Processing",
        file: "file(s)",
        done: "Done",
        error: "Error",
        finished: "Finished."
      },
      status: "Status",
      footer: "FreeImageTools. Free web tools for everyone",
      nav: {
        jpg: "JPG Converter",
        resize: "Image Size",
        idphoto: "ID Photo"
      }
    }
  }), []);

  const texts = t[lang];

  // status texts
  const [jpgStatus, setJpgStatus] = useState(() => t[lang].jpg.waiting);

  // Update status texts when language changes
  useEffect(() => {
    const currentTexts = t[lang];
    const koWaiting = t.ko.jpg.waiting;
    const enWaiting = t.en.jpg.waiting;
    if (jpgStatus === koWaiting || jpgStatus === enWaiting) {
      setJpgStatus(currentTexts.jpg.waiting);
    }
  }, [lang, jpgStatus, t]);

  const year = new Date().getFullYear();

  // drag styles
  const [jpgDrag, setJpgDrag] = useState(false);

  // file input refs
  const jpgFileInputRef = useRef(null);

  // ---------- helpers ----------
  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Invalid image file."));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file."));
      reader.readAsDataURL(file);
    });
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) reject(new Error("Failed to create blob from canvas."));
          else resolve(blob);
        },
        type,
        quality
      );
    });
  }

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  async function convertToJpgAndDownload(file, quality) {
    const img = await loadImageFile(file);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const blob = await canvasToBlob(canvas, "image/jpeg", quality / 100);
    const base = file.name.replace(/\.[^/.]+$/, "");
    triggerDownload(blob, base + "_converted.jpg");
  }

  // ---------- drop handlers ----------
  async function onDropJpg(files) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return setJpgStatus(texts.jpg.noImages);

    setJpgStatus(`${texts.jpg.processing} ${images.length} ${texts.jpg.file}...`);
    let idx = 0;

    for (const file of images) {
      idx++;
      setJpgStatus(`${texts.jpg.processing} ${idx} / ${images.length}\n${lang === "ko" ? "현재: " : "Current: "}${file.name}`);
      try {
        await convertToJpgAndDownload(file, jpgQuality);
        setJpgStatus((prev) => prev + `\n→ ${texts.jpg.done}`);
      } catch (e) {
        setJpgStatus((prev) => prev + `\n→ ${texts.jpg.error}: ${e.message}`);
      }
    }
    setJpgStatus((prev) => prev + `\n\n${texts.jpg.finished}`);
  }

  function getFilesFromDrop(e) {
    const files = Array.from(e.dataTransfer.files || []);
    return files;
  }

  function getFilesFromInput(e) {
    const files = Array.from(e.target.files || []);
    return files;
  }

  function handleJpgFileSelect(e) {
    const files = getFilesFromInput(e);
    if (files.length > 0) {
      onDropJpg(files);
    }
    e.target.value = '';
  }

  // ---------- UI ----------
  return (
    <div className="wrapper">
      <header className="site-header">
        <div className="brand">
          <Link href="/" className="brand-link">
            <div className="logo-circle">FI</div>
            <div className="brand-text">
              <h1>{texts.title}</h1>
              <span>{texts.subtitle}</span>
            </div>
          </Link>
        </div>
        <div className="top-right">
          <div className="lang-buttons">
            <button 
              className={`lang-btn ${lang === "ko" ? "active" : ""}`}
              onClick={() => setLang("ko")}
            >
              한글
            </button>
            <button 
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              ENGLISH
            </button>
          </div>
          <div className="hero-note">{texts.heroNote}</div>
        </div>
      </header>

      <nav className="page-nav">
        <Link href="/" className="nav-link active">{texts.nav.jpg}</Link>
        <Link href="/resize" className="nav-link">{texts.nav.resize}</Link>
        <Link href="/idphoto" className="nav-link">{texts.nav.idphoto}</Link>
      </nav>

      <main className="card">
        <section className="panel active">
          <div className="panel-header">
            <div className="panel-title">{texts.jpg.title}</div>
            <div className="panel-sub">{texts.jpg.sub}</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <label htmlFor="jpgQuality">{texts.jpg.quality}</label>
              <small>{texts.jpg.qualityDesc}</small>
            </div>
            <div className="option-row">
              <input
                type="range"
                id="jpgQuality"
                min="40"
                max="95"
                value={jpgQuality}
                onChange={(e) => setJpgQuality(parseInt(e.target.value, 10))}
              />
              <span className="slider-value">{jpgQuality}</span>
            </div>
          </div>

          <div className="drop-row">
            <div
              className={`drop-zone ${jpgDrag ? "dragover" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setJpgDrag(true); }}
              onDragLeave={(e) => { e.preventDefault(); setJpgDrag(false); }}
              onDrop={async (e) => {
                e.preventDefault();
                setJpgDrag(false);
                await onDropJpg(getFilesFromDrop(e));
              }}
            >
              <div className="drop-main">{texts.jpg.dropMain}</div>
              <div className="drop-sub">{texts.jpg.dropSub}</div>
              <input
                type="file"
                ref={jpgFileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={handleJpgFileSelect}
              />
              <button
                className="file-select-btn"
                onClick={() => jpgFileInputRef.current?.click()}
              >
                {texts.jpg.selectFiles}
              </button>
            </div>
            <div className="status-box">
              <div className="status-title">{texts.status}</div>
              {jpgStatus}
            </div>
          </div>
        </section>
      </main>

      <footer>© {year} {texts.footer}</footer>
    </div>
  );
}
