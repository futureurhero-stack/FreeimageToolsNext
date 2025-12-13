"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function HomePage() {
  // tabs
  const [tab, setTab] = useState("jpg");

  // sliders
  const [jpgQuality, setJpgQuality] = useState(80);
  const [resizeTargetKB, setResizeTargetKB] = useState(500);
  const [idTargetKB, setIdTargetKB] = useState(200);

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
  const [jpgStatus, setJpgStatus] = useState("Waiting for images...");
  const [resizeStatus, setResizeStatus] = useState("Waiting for images...");
  const [idStatus, setIdStatus] = useState("Waiting for images...");

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
    if (!images.length) return setJpgStatus("No image files detected.");

    setJpgStatus(`Processing ${images.length} file(s)...`);
    let idx = 0;

    for (const file of images) {
      idx++;
      setJpgStatus(`Processing ${idx} / ${images.length}\nCurrent: ${file.name}`);
      try {
        await convertToJpgAndDownload(file, jpgQuality);
        setJpgStatus((prev) => prev + "\n→ Done.");
      } catch (e) {
        setJpgStatus((prev) => prev + `\n→ Error: ${e.message}`);
      }
    }
    setJpgStatus((prev) => prev + "\n\nFinished.");
  }

  async function onDropResize(files) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return setResizeStatus("No image files detected.");

    setResizeStatus(`Processing ${images.length} file(s)...`);
    let idx = 0,
      success = 0,
      fail = 0;

    for (const file of images) {
      idx++;
      setResizeStatus(`Processing ${idx} / ${images.length}\nCurrent: ${file.name}`);
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
            `\n→ Done: ${origKB} KB → ${newKB} KB (q=${result.finalQuality.toFixed(
              3
            )}, ${result.width}x${result.height})`
        );
      } catch (e) {
        fail++;
        setResizeStatus((prev) => prev + `\n→ Error: ${e.message}`);
      }
    }

    setResizeStatus(
      (prev) => prev + `\n\nFinished.\nSuccess: ${success}, Failed: ${fail}`
    );
  }

  async function onDropId(files) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return setIdStatus("No image files detected.");

    setIdStatus(`Processing ${images.length} file(s)...`);
    let idx = 0,
      success = 0,
      fail = 0;

    for (const file of images) {
      idx++;
      setIdStatus(`Processing ${idx} / ${images.length}\nCurrent: ${file.name}`);
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
            `\n→ Done: ${origKB} KB → ${newKB} KB (q=${result.finalQuality.toFixed(
              3
            )}, ${idWidth}x${idHeight})`
        );
      } catch (e) {
        fail++;
        setIdStatus((prev) => prev + `\n→ Error: ${e.message}`);
      }
    }

    setIdStatus((prev) => prev + `\n\nFinished.\nSuccess: ${success}, Failed: ${fail}`);
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
            <h1>FreeImageTools</h1>
            <span>Free JPG converter & image size reducer in your browser.</span>
          </div>
        </div>
        <div className="top-right">
          <div className="hero-note">100% browser-based · No upload to server</div>
        </div>
      </header>

      <main className="card">
        <div className="tabs">
          <button className={`tab-btn ${tab === "jpg" ? "active" : ""}`} onClick={() => setTab("jpg")}>
            JPG Converter
          </button>
          <button className={`tab-btn ${tab === "resize" ? "active" : ""}`} onClick={() => setTab("resize")}>
            Image Size
          </button>
          <button className={`tab-btn ${tab === "idphoto" ? "active" : ""}`} onClick={() => setTab("idphoto")}>
            ID Photo
          </button>
        </div>

        {/* JPG */}
        <section className={`panel ${tab === "jpg" ? "active" : ""}`}>
          <div className="panel-header">
            <div className="panel-title">JPG Converter</div>
            <div className="panel-sub">Convert PNG, WebP and more into JPG files.</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <label htmlFor="jpgQuality">JPG Quality</label>
              <small>(Higher = bigger file, better quality)</small>
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
              <div className="drop-main">Drag & drop image file(s)</div>
              <div className="drop-sub">PNG, WebP, etc. will be converted to JPG.</div>
            </div>
            <div className="status-box">
              <div className="status-title">Status</div>
              {jpgStatus}
            </div>
          </div>
        </section>

        {/* Resize */}
        <section className={`panel ${tab === "resize" ? "active" : ""}`}>
          <div className="panel-header">
            <div className="panel-title">Image Size Adjustment</div>
            <div className="panel-sub">Compress images to your target size (KB).</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <label htmlFor="resizeTarget">Target size</label>
              <small>Move the slider (50KB ~ 1000KB). 50KB step.</small>
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
              <div className="drop-main">Drag & drop image file(s)</div>
              <div className="drop-sub">Each image will be recompressed under the selected size.</div>
            </div>
            <div className="status-box">
              <div className="status-title">Status</div>
              {resizeStatus}
            </div>
          </div>
        </section>

        {/* ID Photo */}
        <section className={`panel ${tab === "idphoto" ? "active" : ""}`}>
          <div className="panel-header">
            <div className="panel-title">ID Photo</div>
            <div className="panel-sub">Create standard ID photos for passport, visa, and forms.</div>
          </div>

          <div className="option-block">
            <div className="option-row">
              <span>Size preset</span>
              <small>Common standards (center-crop + resize).</small>
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
              <label htmlFor="idTarget">File size</label>
              <small>50KB ~ 1000KB. 100–300KB is good for most online forms. 50KB step.</small>
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
              <div className="drop-main">Drag & drop face photo(s)</div>
              <div className="drop-sub">
                The image will be center-cropped to the selected ratio and resized to ID photo size.
              </div>
            </div>
            <div className="status-box">
              <div className="status-title">Status</div>
              {idStatus}
            </div>
          </div>
        </section>
      </main>

      <footer>© {year} FreeImageTools. Free web tools for everyone.</footer>
    </div>
  );
}
