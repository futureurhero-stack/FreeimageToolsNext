"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function HomePage() {
  // language
  const [lang, setLang] = useState("ko");

  // tabs
  const [tab, setTab] = useState("jpg");

  // sliders
  const [jpgQuality, setJpgQuality] = useState(80);
  const [resizeTargetKB, setResizeTargetKB] = useState(500);
  const [idTargetKB, setIdTargetKB] = useState(200);

  // translations
  const t = useMemo(() => ({
    ko: {
      title: "FreeImageTools",
      subtitle: "브라우저에서 무료로 JPG 변환 및 이미지 크기 축소",
      heroNote: "100% 브라우저 기반 · 서버 업로드 없음",
      tabs: {
        jpg: "JPG 변환기",
        resize: "이미지 크기",
        idphoto: "증명사진"
      },
      jpg: {
        title: "JPG 변환기",
        sub: "PNG, WebP 등 다양한 형식을 JPG 파일로 변환합니다.",
        quality: "JPG 품질",
        qualityDesc: "(높을수록 파일 크기는 크고 품질은 좋음)",
        dropMain: "이미지 파일을 드래그 & 드롭하세요",
        dropSub: "PNG, WebP 등이 JPG로 변환됩니다.",
        waiting: "이미지 대기 중...",
        noImages: "이미지 파일이 감지되지 않았습니다.",
        processing: "처리 중",
        file: "파일",
        done: "완료",
        error: "오류",
        finished: "완료되었습니다."
      },
      resize: {
        title: "이미지 크기 조정",
        sub: "이미지를 목표 크기(KB)로 압축합니다.",
        targetSize: "목표 크기",
        targetSizeDesc: "슬라이더를 이동하세요 (50KB ~ 1000KB). 50KB 단위.",
        dropMain: "이미지 파일을 드래그 & 드롭하세요",
        dropSub: "각 이미지가 선택한 크기로 재압축됩니다.",
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
      idphoto: {
        title: "증명사진",
        sub: "여권, 비자, 서식용 표준 증명사진을 만듭니다.",
        sizePreset: "크기 프리셋",
        sizePresetDesc: "일반적인 표준 (중앙 크롭 + 리사이즈)",
        fileSize: "파일 크기",
        fileSizeDesc: "50KB ~ 1000KB. 대부분의 온라인 서식에는 100-300KB가 적합합니다. 50KB 단위.",
        dropMain: "얼굴 사진을 드래그 & 드롭하세요",
        dropSub: "이미지는 선택한 비율로 중앙 크롭되고 증명사진 크기로 리사이즈됩니다.",
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
      footer: "FreeImageTools. 모든 사람을 위한 무료 웹 도구"
    },
    en: {
      title: "FreeImageTools",
      subtitle: "Free JPG converter & image size reducer in your browser.",
      heroNote: "100% browser-based · No upload to server",
      tabs: {
        jpg: "JPG Converter",
        resize: "Image Size",
        idphoto: "ID Photo"
      },
      jpg: {
        title: "JPG Converter",
        sub: "Convert PNG, WebP and more into JPG files.",
        quality: "JPG Quality",
        qualityDesc: "(Higher = bigger file, better quality)",
        dropMain: "Drag & drop image file(s)",
        dropSub: "PNG, WebP, etc. will be converted to JPG.",
        waiting: "Waiting for images...",
        noImages: "No image files detected.",
        processing: "Processing",
        file: "file(s)",
        done: "Done",
        error: "Error",
        finished: "Finished."
      },
      resize: {
        title: "Image Size Adjustment",
        sub: "Compress images to your target size (KB).",
        targetSize: "Target size",
        targetSizeDesc: "Move the slider (50KB ~ 1000KB). 50KB step.",
        dropMain: "Drag & drop image file(s)",
        dropSub: "Each image will be recompressed under the selected size.",
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
      idphoto: {
        title: "ID Photo",
        sub: "Create standard ID photos for passport, visa, and forms.",
        sizePreset: "Size preset",
        sizePresetDesc: "Common standards (center-crop + resize)",
        fileSize: "File size",
        fileSizeDesc: "50KB ~ 1000KB. 100–300KB is good for most online forms. 50KB step.",
        dropMain: "Drag & drop face photo(s)",
        dropSub: "The image will be center-cropped to the selected ratio and resized to ID photo size.",
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
      footer: "FreeImageTools. Free web tools for everyone"
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
  const [jpgStatus, setJpgStatus] = useState(() => t[lang].jpg.waiting);
  const [resizeStatus, setResizeStatus] = useState(() => t[lang].resize.waiting);
  const [idStatus, setIdStatus] = useState(() => t[lang].idphoto.waiting);

  // Update status texts when language changes (only if showing default waiting message)
  useEffect(() => {
    const currentTexts = t[lang];
    const koWaiting = t.ko.jpg.waiting;
    const enWaiting = t.en.jpg.waiting;
    if (jpgStatus === koWaiting || jpgStatus === enWaiting) {
      setJpgStatus(currentTexts.jpg.waiting);
    }
    if (resizeStatus === t.ko.resize.waiting || resizeStatus === t.en.resize.waiting) {
      setResizeStatus(currentTexts.resize.waiting);
    }
    if (idStatus === t.ko.idphoto.waiting || idStatus === t.en.idphoto.waiting) {
      setIdStatus(currentTexts.idphoto.waiting);
    }
  }, [lang, jpgStatus, resizeStatus, idStatus, t]);

  const year = new Date().getFullYear();

  // drag styles
  const [jpgDrag, setJpgDrag] = useState(false);
  const [resizeDrag, setResizeDrag] = useState(false);
  const [idDrag, setIdDrag] = useState(false);

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

  // ---------- UI ----------
  return (
    <div className="wrapper">
      <header className="site-header">
        <div className="brand">
          <div className="logo-circle">FI</div>
          <div className="brand-text">
            <h1>{texts.title}</h1>
            <span>{texts.subtitle}</span>
          </div>
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
              EN
            </button>
          </div>
          <div className="hero-note">{texts.heroNote}</div>
        </div>
      </header>

      <main className="card">
        <div className="tabs">
          <button className={`tab-btn ${tab === "jpg" ? "active" : ""}`} onClick={() => setTab("jpg")}>
            {texts.tabs.jpg}
          </button>
          <button className={`tab-btn ${tab === "resize" ? "active" : ""}`} onClick={() => setTab("resize")}>
            {texts.tabs.resize}
          </button>
          <button className={`tab-btn ${tab === "idphoto" ? "active" : ""}`} onClick={() => setTab("idphoto")}>
            {texts.tabs.idphoto}
          </button>
        </div>

        {/* JPG */}
        <section className={`panel ${tab === "jpg" ? "active" : ""}`}>
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
            </div>
            <div className="status-box">
              <div className="status-title">{texts.status}</div>
              {jpgStatus}
            </div>
          </div>
        </section>

        {/* Resize */}
        <section className={`panel ${tab === "resize" ? "active" : ""}`}>
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
            </div>
            <div className="status-box">
              <div className="status-title">{texts.status}</div>
              {resizeStatus}
            </div>
          </div>
        </section>

        {/* ID Photo */}
        <section className={`panel ${tab === "idphoto" ? "active" : ""}`}>
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
