"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function Source() {
  // language
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'en';
    }
    return 'en';
  });

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
      },
      infoSection: {
        title: "JPG 형식에 대한 가이드",
        content: `JPEG(또는 JPG)는 Joint Photographic Experts Group에서 개발한 가장 널리 사용되는 이미지 파일 형식 중 하나입니다. 이 형식은 손실 압축 알고리즘을 사용하여 파일 크기를 크게 줄이면서도 시각적으로 만족스러운 품질을 유지합니다.

JPG 형식은 특히 사진과 복잡한 이미지에 적합합니다. 이 형식의 주요 장점은 작은 파일 크기로 인한 빠른 로딩 속도와 웹 호환성입니다. 대부분의 웹사이트, 소셜 미디어 플랫폼, 이메일 클라이언트에서 JPG를 지원하므로 이미지를 공유하거나 업로드할 때 문제없이 사용할 수 있습니다.

JPG로 변환할 때 고려해야 할 주요 사항은 품질 설정입니다. 높은 품질(80-95%)은 더 나은 이미지 품질을 제공하지만 파일 크기가 커집니다. 반면 낮은 품질(40-60%)은 파일 크기를 크게 줄이지만 이미지 세부사항이 손실될 수 있습니다. 일반적으로 80% 품질은 품질과 파일 크기 사이의 좋은 균형을 제공합니다.

PNG 파일을 JPG로 변환하는 경우, PNG는 투명도를 지원하지만 JPG는 그렇지 않다는 점을 알아두세요. 투명한 배경은 흰색으로 변환됩니다. WebP 형식도 최신 웹 표준이지만, 모든 브라우저에서 완벽하게 지원되지 않을 수 있으므로 호환성을 위해 JPG로 변환하는 것이 좋습니다.

우리의 JPG 변환기는 100% 브라우저에서 실행되므로 이미지를 서버에 업로드할 필요가 없습니다. 이는 개인정보 보호와 보안 측면에서 큰 장점입니다. 변환된 이미지는 즉시 다운로드되어 사용할 수 있습니다.`
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
      },
      infoSection: {
        title: "Understanding JPG Format",
        content: `JPEG (or JPG) is one of the most widely used image file formats, developed by the Joint Photographic Experts Group. This format uses a lossy compression algorithm that significantly reduces file size while maintaining visually satisfactory quality.

JPG format is particularly suitable for photographs and complex images. The main advantages of this format are fast loading speeds due to small file sizes and excellent web compatibility. Most websites, social media platforms, and email clients support JPG, so you can use it without any issues when sharing or uploading images.

When converting to JPG, the main consideration is the quality setting. High quality (80-95%) provides better image quality but results in larger file sizes. On the other hand, low quality (40-60%) significantly reduces file size but may result in loss of image detail. Generally, 80% quality provides a good balance between quality and file size.

When converting PNG files to JPG, it's important to note that PNG supports transparency while JPG does not. Transparent backgrounds will be converted to white. WebP format is also a modern web standard, but since it's not perfectly supported in all browsers, converting to JPG is better for compatibility.

Our JPG converter runs 100% in your browser, so there's no need to upload images to a server. This is a significant advantage in terms of privacy and security. Converted images are immediately available for download and use.`
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

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

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
          <div className="logo-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="9" cy="9" r="2" fill="currentColor"/>
              <path d="M4 16l4-4 3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
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
              onClick={() => {
                setLang("ko");
                if (typeof window !== 'undefined') {
                  localStorage.setItem('lang', 'ko');
                }
              }}
            >
              한글
            </button>
            <button 
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => {
                setLang("en");
                if (typeof window !== 'undefined') {
                  localStorage.setItem('lang', 'en');
                }
              }}
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

      <section className="info-section">
        <h2>{texts.infoSection.title}</h2>
        <div className="info-content">
          {texts.infoSection.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      <footer>© {year} {texts.footer}</footer>
    </div>
  );
}

