"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function IdPhotoPage() {
  // language
  const [lang, setLang] = useState("en");

  // sliders
  const [idTargetKB, setIdTargetKB] = useState(200);

  // translations
  const t = useMemo(() => ({
    ko: {
      title: "FreeImageTools",
      subtitle: "브라우저에서 무료로 JPG 변환 및 이미지 크기 축소",
      heroNote: "100% 브라우저 기반 · 서버 업로드 없음",
      idphoto: {
        title: "증명사진",
        sub: "여권, 비자, 서식용 표준 증명사진을 만듭니다.",
        sizePreset: "크기 프리셋",
        sizePresetDesc: "일반적인 표준 (중앙 크롭 + 리사이즈)",
        fileSize: "파일 크기",
        fileSizeDesc: "50KB ~ 1000KB. 대부분의 온라인 서식에는 100-300KB가 적합합니다. 50KB 단위.",
        dropMain: "얼굴 사진을 드래그 & 드롭하세요",
        dropSub: "이미지는 선택한 비율로 중앙 크롭되고 증명사진 크기로 리사이즈됩니다.",
        selectFiles: "파일 선택",
        waiting: "이미지 대기 중...",
        noImages: "이미지 파일이 감지되지 않았습니다.",
        processing: "처리 중",
        file: "파일",
        done: "완료",
        error: "오류",
        finished: "완료되었습니다.",
        success: "성공",
        failed: "실패"
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
      idphoto: {
        title: "ID Photo",
        sub: "Create standard ID photos for passport, visa, and forms.",
        sizePreset: "Size preset",
        sizePresetDesc: "Common standards (center-crop + resize)",
        fileSize: "File size",
        fileSizeDesc: "50KB ~ 1000KB. 100–300KB is good for most online forms. 50KB step.",
        dropMain: "Drag & drop face photo(s)",
        dropSub: "The image will be center-cropped to the selected ratio and resized to ID photo size.",
        selectFiles: "Select Files",
        waiting: "Waiting for images...",
        noImages: "No image files detected.",
        processing: "Processing",
        file: "file(s)",
        done: "Done",
        error: "Error",
        finished: "Finished.",
        success: "Success",
        failed: "Failed"
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

  // id presets
  const presets = useMemo(
    () => [
      { w: 413, h: 531, label: "35×45mm · 413×531 (Passport / Global)" },
      { w: 354, h: 472, label: "30×40mm · 354×472 (Standard ID)" },
      { w: 600, h: 600, label: "2×2 inch · 600×600 (US Visa)" }
    ],
    []
  );
  const [idPresetIndex, setIdPresetIndex] = useState(0);
  const idWidth = presets[idPresetIndex].w;
  const idHeight = presets[idPresetIndex].h;

  // status texts
  const [idStatus, setIdStatus] = useState(() => t[lang].idphoto.waiting);

  // Update status texts when language changes
  useEffect(() => {
    const currentTexts = t[lang];
    const koWaiting = t.ko.idphoto.waiting;
    const enWaiting = t.en.idphoto.waiting;
    if (idStatus === koWaiting || idStatus === enWaiting) {
      setIdStatus(currentTexts.idphoto.waiting);
    }
  }, [lang, idStatus, t]);

  const year = new Date().getFullYear();

  // drag styles
  const [idDrag, setIdDrag] = useState(false);

  // file input refs
  const idFileInputRef = useRef(null);

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

  async function createIdPhoto(file, targetW, targetH, targetKB) {
    const img = await loadImageFile(file);

    const targetRatio = targetW / targetH;
    const imgRatio = img.width / img.height;

    let sx, sy, sw, sh;
    if (imgRatio > targetRatio) {
      sh = img.height;
      sw = Math.round(sh * targetRatio);
      sx = Math.round((img.width - sw) / 2);
      sy = 0;
    } else {
      sw = img.width;
      sh = Math.round(sw / targetRatio);
      sx = 0;
      sy = Math.round((img.height - sh) / 2);
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);

    let low = 0.1,
      high = 0.95;
    let bestBlob = null,
      bestQ = low;

    for (let i = 0; i < 10; i++) {
      const q = (low + high) / 2;
      const blob = await canvasToBlob(canvas, "image/jpeg", q);
      const kb = blob.size / 1024;
      if (kb <= targetKB) {
        bestBlob = blob;
        bestQ = q;
        low = q;
      } else {
        high = q;
      }
      if (Math.abs(kb - targetKB) < 8) break;
    }

    if (!bestBlob) {
      const blob = await canvasToBlob(canvas, "image/jpeg", low);
      return { blob, finalQuality: low, width: targetW, height: targetH };
    }
    return { blob: bestBlob, finalQuality: bestQ, width: targetW, height: targetH };
  }

  // ---------- drop handlers ----------
  async function onDropId(files) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return setIdStatus(texts.idphoto.noImages);

    setIdStatus(`${texts.idphoto.processing} ${images.length} ${texts.idphoto.file}...`);
    let idx = 0,
      success = 0,
      fail = 0;

    for (const file of images) {
      idx++;
      setIdStatus(`${texts.idphoto.processing} ${idx} / ${images.length}\n${lang === "ko" ? "현재: " : "Current: "}${file.name}`);
      try {
        const result = await createIdPhoto(file, idWidth, idHeight, idTargetKB);
        const origKB = (file.size / 1024).toFixed(1);
        const newKB = (result.blob.size / 1024).toFixed(1);
        const base = file.name.replace(/\.[^/.]+$/, "");
        triggerDownload(result.blob, `${base}_ID_${idWidth}x${idHeight}.jpg`);
        success++;
        setIdStatus(
          (prev) =>
            prev +
            `\n→ ${texts.idphoto.done}: ${origKB} KB → ${newKB} KB (q=${result.finalQuality.toFixed(
              3
            )}, ${idWidth}x${idHeight})`
        );
      } catch (e) {
        fail++;
        setIdStatus((prev) => prev + `\n→ ${texts.idphoto.error}: ${e.message}`);
      }
    }

    setIdStatus((prev) => prev + `\n\n${texts.idphoto.finished}\n${texts.idphoto.success}: ${success}, ${texts.idphoto.failed}: ${fail}`);
  }

  function getFilesFromDrop(e) {
    const files = Array.from(e.dataTransfer.files || []);
    return files;
  }

  function getFilesFromInput(e) {
    const files = Array.from(e.target.files || []);
    return files;
  }

  function handleIdFileSelect(e) {
    const files = getFilesFromInput(e);
    if (files.length > 0) {
      onDropId(files);
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
        <Link href="/" className="nav-link">{texts.nav.jpg}</Link>
        <Link href="/resize" className="nav-link">{texts.nav.resize}</Link>
        <Link href="/idphoto" className="nav-link active">{texts.nav.idphoto}</Link>
      </nav>

      <main className="card">
        <section className="panel active">
          <div className="panel-header">
            <div className="panel-title">{texts.idphoto.title}</div>
            <div className="panel-sub">{texts.idphoto.sub}</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <span>{texts.idphoto.sizePreset}</span>
              <small>{texts.idphoto.sizePresetDesc}</small>
            </div>
            <div className="size-buttons">
              {presets.map((p, i) => (
                <button
                  key={p.label}
                  className={`id-size-btn ${i === idPresetIndex ? "active" : ""}`}
                  onClick={() => setIdPresetIndex(i)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <label htmlFor="idTarget">{texts.idphoto.fileSize}</label>
              <small>{texts.idphoto.fileSizeDesc}</small>
            </div>
            <div className="option-row">
              <input
                type="range"
                id="idTarget"
                min="50"
                max="1000"
                step="50"
                value={idTargetKB}
                onChange={(e) => setIdTargetKB(parseInt(e.target.value, 10))}
              />
              <span className="slider-value">{idTargetKB} KB</span>
            </div>
          </div>

          <div className="drop-row">
            <div
              className={`drop-zone ${idDrag ? "dragover" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setIdDrag(true); }}
              onDragLeave={(e) => { e.preventDefault(); setIdDrag(false); }}
              onDrop={async (e) => {
                e.preventDefault();
                setIdDrag(false);
                await onDropId(getFilesFromDrop(e));
              }}
            >
              <div className="drop-main">{texts.idphoto.dropMain}</div>
              <div className="drop-sub">
                {texts.idphoto.dropSub}
              </div>
              <input
                type="file"
                ref={idFileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={handleIdFileSelect}
              />
              <button
                className="file-select-btn"
                onClick={() => idFileInputRef.current?.click()}
              >
                {texts.idphoto.selectFiles}
              </button>
            </div>
            <div className="status-box">
              <div className="status-title">{texts.status}</div>
              {idStatus}
            </div>
          </div>
        </section>
      </main>

      <footer>© {year} {texts.footer}</footer>
    </div>
  );
}

