"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export default function ResizePage() {
  // language
  const [lang, setLang] = useState("en");

  // sliders
  const [resizeTargetKB, setResizeTargetKB] = useState(500);

  // translations
  const t = useMemo(() => ({
    ko: {
      title: "FreeImageTools",
      subtitle: "브라우저에서 무료로 JPG 변환 및 이미지 크기 축소",
      heroNote: "100% 브라우저 기반 · 서버 업로드 없음",
      resize: {
        title: "이미지 크기 조정",
        sub: "이미지를 목표 크기(KB)로 압축합니다.",
        targetSize: "목표 크기",
        targetSizeDesc: "슬라이더를 이동하세요 (50KB ~ 1000KB). 50KB 단위.",
        dropMain: "이미지 파일을 드래그 & 드롭하세요",
        dropSub: "각 이미지가 선택한 크기로 재압축됩니다.",
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
      },
      infoSection: {
        title: "이미지 압축과 파일 크기 최적화 가이드",
        content: `이미지 파일 크기를 최적화하는 것은 현대 웹 환경에서 매우 중요한 작업입니다. 큰 이미지 파일은 웹사이트 로딩 속도를 저하시키고, 모바일 데이터 사용량을 증가시키며, 사용자 경험을 해칠 수 있습니다.

효과적인 이미지 압축을 위해서는 목표 용도를 고려해야 합니다. 이메일 첨부파일의 경우 일반적으로 200-500KB 사이가 적절하며, 소셜 미디어 게시물은 플랫폼마다 다른 제한이 있지만 대부분 1MB 이하를 권장합니다. 웹사이트 이미지의 경우, 썸네일은 50-100KB, 일반 이미지는 100-300KB, 고해상도 배너는 500KB 이하가 좋습니다.

이미지 압축 시 품질과 크기의 균형을 찾는 것이 핵심입니다. 너무 높은 압축률은 이미지 품질을 심각하게 손상시킬 수 있지만, 적절한 압축은 눈에 띄는 품질 저하 없이 파일 크기를 크게 줄일 수 있습니다. 대부분의 경우 70-85%의 품질 설정이 최적의 균형점을 제공합니다.

해상도 조정도 파일 크기 최적화에 중요한 요소입니다. 원본 해상도가 목적에 비해 너무 높은 경우, 적절한 크기로 리사이즈하면 파일 크기를 획기적으로 줄일 수 있습니다. 예를 들어, 웹 디스플레이용 이미지는 보통 1920px 너비면 충분하며, 모바일 최적화된 이미지는 800-1200px가 적절합니다.

우리의 이미지 크기 조정 도구는 이진 탐색 알고리즘을 사용하여 목표 파일 크기에 가장 가까운 품질 설정을 자동으로 찾아줍니다. 이를 통해 수동으로 여러 번 시도하는 번거로움 없이 최적의 결과를 얻을 수 있습니다. 모든 처리는 브라우저에서 이루어지므로 개인정보가 보호되고 빠른 처리가 가능합니다.`
      }
    },
    en: {
      title: "FreeImageTools",
      subtitle: "Free JPG converter & image size reducer in your browser.",
      heroNote: "100% browser-based · No upload to server",
      resize: {
        title: "Image Size Adjustment",
        sub: "Compress images to your target size (KB).",
        targetSize: "Target size",
        targetSizeDesc: "Move the slider (50KB ~ 1000KB). 50KB step.",
        dropMain: "Drag & drop image file(s)",
        dropSub: "Each image will be recompressed under the selected size.",
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
      },
      infoSection: {
        title: "Image Compression and File Size Optimization Guide",
        content: `Optimizing image file sizes is crucial in modern web environments. Large image files can slow down website loading times, increase mobile data usage, and harm user experience.

For effective image compression, you need to consider the target use case. For email attachments, typically 200-500KB is appropriate, while social media posts have different platform limitations, with most recommending under 1MB. For website images, thumbnails should be 50-100KB, regular images 100-300KB, and high-resolution banners under 500KB.

The key to image compression is finding the balance between quality and size. Too high compression rates can severely damage image quality, but proper compression can significantly reduce file size without noticeable quality degradation. In most cases, a quality setting of 70-85% provides the optimal balance.

Resolution adjustment is also an important factor in file size optimization. If the original resolution is too high for the intended purpose, resizing to an appropriate size can dramatically reduce file size. For example, images for web display typically need only 1920px width, while mobile-optimized images are appropriate at 800-1200px.

Our image size adjustment tool uses a binary search algorithm to automatically find the quality setting closest to the target file size. This allows you to get optimal results without the hassle of manually trying multiple times. All processing is done in your browser, ensuring privacy protection and fast processing.`
      }
    }
  }), []);

  const texts = t[lang];

  // status texts
  const [resizeStatus, setResizeStatus] = useState(() => t[lang].resize.waiting);

  // Update status texts when language changes
  useEffect(() => {
    const currentTexts = t[lang];
    const koWaiting = t.ko.resize.waiting;
    const enWaiting = t.en.resize.waiting;
    if (resizeStatus === koWaiting || resizeStatus === enWaiting) {
      setResizeStatus(currentTexts.resize.waiting);
    }
  }, [lang, resizeStatus, t]);

  const year = new Date().getFullYear();

  // drag styles
  const [resizeDrag, setResizeDrag] = useState(false);

  // file input refs
  const resizeFileInputRef = useRef(null);

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

  function loadImageFileWithMeta(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => resolve({ img, width: img.width, height: img.height });
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

  async function binarySearchQuality(img, w, h, targetKB) {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);

    let low = 0.1,
      high = 0.95;
    let bestBlob = null,
      bestQ = low,
      under = false;

    for (let i = 0; i < 10; i++) {
      const q = (low + high) / 2;
      const blob = await canvasToBlob(canvas, "image/jpeg", q);
      const kb = blob.size / 1024;
      if (kb <= targetKB) {
        bestBlob = blob;
        bestQ = q;
        under = true;
        low = q;
      } else {
        high = q;
      }
      if (Math.abs(kb - targetKB) < 8) break;
    }

    if (!bestBlob) {
      const blob = await canvasToBlob(canvas, "image/jpeg", low);
      const kb = blob.size / 1024;
      return { blob, finalQuality: low, width: w, height: h, under: kb <= targetKB };
    }
    return { blob: bestBlob, finalQuality: bestQ, width: w, height: h, under };
  }

  async function compressToTargetSizeAuto(file, targetKB) {
    const meta = await loadImageFileWithMeta(file);
    let w = meta.width;
    let h = meta.height;

    let bestBlob = null;
    let bestInfo = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      const { blob, finalQuality, width, height, under } = await binarySearchQuality(
        meta.img,
        w,
        h,
        targetKB
      );

      if (under) return { blob, finalQuality, width, height };

      if (!bestBlob || blob.size < bestBlob.size) {
        bestBlob = blob;
        bestInfo = { finalQuality, width, height };
      }

      w = Math.round(w * 0.7);
      h = Math.round(h * 0.7);
      if (w < 400 || h < 400) break;
    }

    if (bestBlob) return { blob: bestBlob, finalQuality: bestInfo.finalQuality, width: bestInfo.width, height: bestInfo.height };
    throw new Error("Failed to compress image to target size.");
  }

  // ---------- drop handlers ----------
  async function onDropResize(files) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return setResizeStatus(texts.resize.noImages);

    setResizeStatus(`${texts.resize.processing} ${images.length} ${texts.resize.file}...`);
    let idx = 0,
      success = 0,
      fail = 0;

    for (const file of images) {
      idx++;
      setResizeStatus(`${texts.resize.processing} ${idx} / ${images.length}\n${lang === "ko" ? "현재: " : "Current: "}${file.name}`);
      try {
        const result = await compressToTargetSizeAuto(file, resizeTargetKB);
        const origKB = (file.size / 1024).toFixed(1);
        const newKB = (result.blob.size / 1024).toFixed(1);
        const base = file.name.replace(/\.[^/.]+$/, "");
        triggerDownload(result.blob, `${base}_${resizeTargetKB}k.jpg`);
        success++;
        setResizeStatus(
          (prev) =>
            prev +
            `\n→ ${texts.resize.done}: ${origKB} KB → ${newKB} KB (q=${result.finalQuality.toFixed(
              3
            )}, ${result.width}x${result.height})`
        );
      } catch (e) {
        fail++;
        setResizeStatus((prev) => prev + `\n→ ${texts.resize.error}: ${e.message}`);
      }
    }

    setResizeStatus(
      (prev) => prev + `\n\n${texts.resize.finished}\n${texts.resize.success}: ${success}, ${texts.resize.failed}: ${fail}`
    );
  }

  function getFilesFromDrop(e) {
    const files = Array.from(e.dataTransfer.files || []);
    return files;
  }

  function getFilesFromInput(e) {
    const files = Array.from(e.target.files || []);
    return files;
  }

  function handleResizeFileSelect(e) {
    const files = getFilesFromInput(e);
    if (files.length > 0) {
      onDropResize(files);
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
        <Link href="/resize" className="nav-link active">{texts.nav.resize}</Link>
        <Link href="/idphoto" className="nav-link">{texts.nav.idphoto}</Link>
      </nav>

      <main className="card">
        <section className="panel active">
          <div className="panel-header">
            <div className="panel-title">{texts.resize.title}</div>
            <div className="panel-sub">{texts.resize.sub}</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <label htmlFor="resizeTarget">{texts.resize.targetSize}</label>
              <small>{texts.resize.targetSizeDesc}</small>
            </div>
            <div className="option-row">
              <input
                type="range"
                id="resizeTarget"
                min="50"
                max="1000"
                step="50"
                value={resizeTargetKB}
                onChange={(e) => setResizeTargetKB(parseInt(e.target.value, 10))}
              />
              <span className="slider-value">{resizeTargetKB} KB</span>
            </div>
          </div>

          <div className="drop-row">
            <div
              className={`drop-zone ${resizeDrag ? "dragover" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setResizeDrag(true); }}
              onDragLeave={(e) => { e.preventDefault(); setResizeDrag(false); }}
              onDrop={async (e) => {
                e.preventDefault();
                setResizeDrag(false);
                await onDropResize(getFilesFromDrop(e));
              }}
            >
              <div className="drop-main">{texts.resize.dropMain}</div>
              <div className="drop-sub">{texts.resize.dropSub}</div>
              <input
                type="file"
                ref={resizeFileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={handleResizeFileSelect}
              />
              <button
                className="file-select-btn"
                onClick={() => resizeFileInputRef.current?.click()}
              >
                {texts.resize.selectFiles}
              </button>
            </div>
            <div className="status-box">
              <div className="status-title">{texts.status}</div>
              {resizeStatus}
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

