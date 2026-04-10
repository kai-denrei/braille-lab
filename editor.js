// ===== BRAILLE LAB — INLINE EDITOR =====
// Lightweight editor modal for micro-editing braille animations.
// Localhost-only: only injects UI when running on localhost/127.0.0.1/file.
//
// Usage from any module:
//   <script src="../editor.js"></script>   (or ./editor.js from root)
//   brailleEditor.open({ cellCols, cellRows, fps, loop, frames }, updatedData => { ... });

(function() {
  const isLocal = ['localhost','127.0.0.1',''].includes(location.hostname);
  if (!isLocal) return;

  const DOT_BITS = [[0x01,0x08],[0x02,0x10],[0x04,0x20],[0x40,0x80]];

  function createGrid(rows, cols) { return Array.from({length: rows}, () => Array(cols).fill(0)); }
  function cloneGrid(g) { return g.map(r => [...r]); }

  function gridToBraille(grid, cellCols, cellRows) {
    const lines = [];
    for (let cr = 0; cr < cellRows; cr++) {
      let line = '';
      for (let cc = 0; cc < cellCols; cc++) {
        let mask = 0;
        for (let r = 0; r < 4; r++)
          for (let c = 0; c < 2; c++) {
            const gr = cr*4+r, gc = cc*2+c;
            if (gr < grid.length && gc < grid[0].length && grid[gr][gc]) mask |= DOT_BITS[r][c];
          }
        line += String.fromCodePoint(0x2800 + mask);
      }
      lines.push(line);
    }
    return lines;
  }

  // State
  let st = null;
  let onSave = null;
  let undoStack = [];
  let playTimer = null;
  let isPlaying = false;
  let pointerDown = false;
  let paintVal = 1;

  function pixelRows() { return st.cellRows * 4; }
  function pixelCols() { return st.cellCols * 2; }
  function curGrid() { return st.frames[st.currentFrame]; }

  function pushUndo() {
    undoStack.push({ frames: st.frames.map(cloneGrid), currentFrame: st.currentFrame });
    if (undoStack.length > 50) undoStack.shift();
  }

  function undo() {
    if (!undoStack.length) return;
    const snap = undoStack.pop();
    st.frames = snap.frames;
    st.currentFrame = snap.currentFrame;
    render();
  }

  // ===== BUILD MODAL =====
  let overlay, container;

  function buildUI() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.id = 'be-overlay';
    overlay.innerHTML = `
      <div id="be-modal">
        <div id="be-topbar">
          <span id="be-title">Editor</span>
          <span id="be-frame-info"></span>
          <button id="be-close">&times;</button>
        </div>
        <div id="be-body">
          <div id="be-grid-wrap">
            <div id="be-grid"></div>
          </div>
          <div id="be-preview-col">
            <div id="be-preview"></div>
            <div id="be-braille-str"></div>
          </div>
        </div>
        <div id="be-toolbar">
          <button class="be-btn be-mode active" data-mode="draw">Draw</button>
          <button class="be-btn be-mode" data-mode="erase">Erase</button>
          <span class="be-sep"></span>
          <button class="be-btn" id="be-fill">Fill</button>
          <button class="be-btn" id="be-invert">Invert</button>
          <button class="be-btn" id="be-clear">Clear</button>
          <span class="be-sep"></span>
          <button class="be-btn" id="be-undo">Undo</button>
        </div>
        <div id="be-framebar">
          <button class="be-btn" id="be-prev">&#9665;</button>
          <button class="be-btn" id="be-play">&#9654; Play</button>
          <button class="be-btn" id="be-next">&#9655;</button>
          <span class="be-sep"></span>
          <button class="be-btn" id="be-add">+ New</button>
          <button class="be-btn" id="be-dup">Dup</button>
          <button class="be-btn" id="be-del">Del</button>
          <span class="be-sep"></span>
          <span class="be-label">FPS</span>
          <input type="range" id="be-fps" min="1" max="24" value="4">
          <span id="be-fps-val">4</span>
        </div>
        <div id="be-strip"></div>
        <div id="be-actions">
          <button class="be-btn" id="be-copy">Copy JSON</button>
          <button class="be-btn be-primary" id="be-save">Save & Close</button>
          <button class="be-btn" id="be-cancel">Cancel</button>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #be-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:'SF Mono','Fira Code',monospace; }
      #be-modal { background:#111;border:1px solid #333;border-radius:8px;width:95vw;max-width:560px;max-height:95vh;overflow-y:auto;color:#e0e0e0; }
      #be-topbar { display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #222; }
      #be-title { font-size:12px;color:#888; }
      #be-frame-info { font-size:11px;color:#555; }
      #be-close { background:none;border:none;color:#666;font-size:18px;cursor:pointer;padding:0 4px; }
      #be-close:hover { color:#ccc; }
      #be-body { display:flex;gap:16px;padding:14px;align-items:flex-start;justify-content:center; }
      #be-grid-wrap { flex-shrink:0; }
      #be-grid { display:inline-grid;gap:2px;user-select:none; }
      .be-dot { width:24px;height:24px;border-radius:3px;background:#1a1a2e;cursor:pointer;transition:background 0.05s; }
      .be-dot.on { background:#e0e0e0; }
      .be-dot:hover { outline:1px solid #555; }
      .be-dot.cell-right { margin-right:4px; }
      .be-dot.cell-bottom { margin-bottom:4px; }
      #be-preview-col { display:flex;flex-direction:column;align-items:center;gap:8px;min-width:60px; }
      #be-preview { font-size:48px;line-height:1;color:#e0e0e0;white-space:pre; }
      #be-braille-str { font-size:10px;color:#555;word-break:break-all;text-align:center; }
      #be-toolbar,#be-framebar { display:flex;align-items:center;gap:4px;padding:6px 14px;border-top:1px solid #1a1a1a;flex-wrap:wrap; }
      .be-btn { font-size:10px;font-family:inherit;padding:4px 10px;border-radius:3px;border:1px solid #333;background:#151520;color:#aaa;cursor:pointer; }
      .be-btn:hover { background:#1e1e2e;color:#ddd; }
      .be-btn.active { border-color:#555;color:#e0e0e0; }
      .be-btn.be-primary { background:#1a3a2a;border-color:#2a5a3a;color:#6fda8f; }
      .be-btn.be-primary:hover { background:#1f4a32; }
      .be-sep { width:1px;height:16px;background:#222;margin:0 4px; }
      .be-label { font-size:10px;color:#555; }
      #be-fps { width:60px;accent-color:#555; }
      #be-fps-val { font-size:10px;color:#888;min-width:14px; }
      #be-strip { display:flex;gap:4px;padding:6px 14px;overflow-x:auto;border-top:1px solid #1a1a1a; }
      .be-thumb { padding:4px 6px;border:1px solid #222;border-radius:3px;font-size:14px;cursor:pointer;line-height:1;white-space:pre;color:#888;flex-shrink:0; }
      .be-thumb.active { border-color:#555;color:#e0e0e0;background:#1a1a2e; }
      .be-thumb:hover { border-color:#444; }
      #be-actions { display:flex;gap:6px;padding:10px 14px;border-top:1px solid #222;justify-content:flex-end; }
      @media(max-width:480px) {
        .be-dot { width:18px;height:18px; }
        #be-preview { font-size:32px; }
        #be-body { flex-direction:column;align-items:center; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    // Event wiring
    overlay.querySelector('#be-close').onclick = close;
    overlay.querySelector('#be-cancel').onclick = close;
    overlay.querySelector('#be-save').onclick = save;
    overlay.querySelector('#be-copy').onclick = copyJSON;

    overlay.querySelectorAll('.be-mode').forEach(btn => {
      btn.onclick = () => {
        overlay.querySelectorAll('.be-mode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        st.mode = btn.dataset.mode;
      };
    });

    overlay.querySelector('#be-fill').onclick = () => { pushUndo(); const g=curGrid(); for(let r=0;r<g.length;r++)for(let c=0;c<g[0].length;c++)g[r][c]=1; render(); };
    overlay.querySelector('#be-invert').onclick = () => { pushUndo(); const g=curGrid(); for(let r=0;r<g.length;r++)for(let c=0;c<g[0].length;c++)g[r][c]=g[r][c]?0:1; render(); };
    overlay.querySelector('#be-clear').onclick = () => { pushUndo(); const g=curGrid(); for(let r=0;r<g.length;r++)for(let c=0;c<g[0].length;c++)g[r][c]=0; render(); };
    overlay.querySelector('#be-undo').onclick = undo;

    overlay.querySelector('#be-prev').onclick = () => { if(st.currentFrame>0){st.currentFrame--;render();} };
    overlay.querySelector('#be-next').onclick = () => { if(st.currentFrame<st.frames.length-1){st.currentFrame++;render();} };
    overlay.querySelector('#be-play').onclick = togglePlay;
    overlay.querySelector('#be-add').onclick = () => { pushUndo(); st.frames.splice(st.currentFrame+1,0,createGrid(pixelRows(),pixelCols())); st.currentFrame++; render(); };
    overlay.querySelector('#be-dup').onclick = () => { pushUndo(); st.frames.splice(st.currentFrame+1,0,cloneGrid(curGrid())); st.currentFrame++; render(); };
    overlay.querySelector('#be-del').onclick = () => { if(st.frames.length<=1)return; pushUndo(); st.frames.splice(st.currentFrame,1); if(st.currentFrame>=st.frames.length)st.currentFrame--; render(); };

    const fpsSlider = overlay.querySelector('#be-fps');
    fpsSlider.oninput = () => { st.fps = parseInt(fpsSlider.value); overlay.querySelector('#be-fps-val').textContent = st.fps; if(isPlaying){stopPlay();startPlay();} };

    overlay.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); undo(); }
    });
  }

  function togglePlay() {
    if (isPlaying) stopPlay(); else startPlay();
  }
  function startPlay() {
    if (st.frames.length <= 1) return;
    isPlaying = true;
    overlay.querySelector('#be-play').innerHTML = '&#9646;&#9646;';
    playTimer = setInterval(() => {
      st.currentFrame = (st.currentFrame + 1) % st.frames.length;
      render();
    }, 1000 / st.fps);
  }
  function stopPlay() {
    isPlaying = false;
    overlay.querySelector('#be-play').innerHTML = '&#9654; Play';
    clearInterval(playTimer);
  }

  // ===== RENDER =====
  function render() {
    const grid = curGrid();
    const rows = pixelRows(), cols = pixelCols();
    const gridEl = overlay.querySelector('#be-grid');
    gridEl.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    gridEl.innerHTML = '';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dot = document.createElement('div');
        dot.className = 'be-dot';
        if (grid[r] && grid[r][c]) dot.classList.add('on');
        if (c % 2 === 1 && c < cols - 1) dot.classList.add('cell-right');
        if (r % 4 === 3 && r < rows - 1) dot.classList.add('cell-bottom');
        dot.dataset.r = r;
        dot.dataset.c = c;

        dot.addEventListener('pointerdown', e => {
          e.preventDefault();
          pointerDown = true;
          paintVal = st.mode === 'erase' ? 0 : (grid[r][c] ? 0 : 1);
          pushUndo();
          grid[r][c] = paintVal;
          render();
        });
        dot.addEventListener('pointerenter', () => {
          if (!pointerDown) return;
          grid[r][c] = paintVal;
          render();
        });

        gridEl.appendChild(dot);
      }
    }

    document.addEventListener('pointerup', () => pointerDown = false, { once: true });

    // Preview
    const lines = gridToBraille(grid, st.cellCols, st.cellRows);
    overlay.querySelector('#be-preview').textContent = lines.join('\n');
    overlay.querySelector('#be-braille-str').textContent = lines.join('');

    // Frame info
    overlay.querySelector('#be-frame-info').textContent = `${st.currentFrame + 1} / ${st.frames.length}`;

    // Strip
    const strip = overlay.querySelector('#be-strip');
    strip.innerHTML = '';
    st.frames.forEach((frame, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'be-thumb' + (i === st.currentFrame ? ' active' : '');
      const br = gridToBraille(frame, st.cellCols, st.cellRows);
      thumb.textContent = br.join('\n');
      thumb.onclick = () => { st.currentFrame = i; render(); };
      strip.appendChild(thumb);
    });
  }

  // ===== ACTIONS =====
  function save() {
    stopPlay();
    const data = {
      cellCols: st.cellCols,
      cellRows: st.cellRows,
      fps: st.fps,
      loop: st.loop,
      frames: st.frames.map(cloneGrid),
    };
    if (onSave) onSave(data);
    close();
  }

  function copyJSON() {
    const data = { cellCols: st.cellCols, cellRows: st.cellRows, fps: st.fps, loop: st.loop, frames: st.frames };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    const btn = overlay.querySelector('#be-copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy JSON', 1000);
  }

  function close() {
    stopPlay();
    overlay.style.display = 'none';
    st = null;
    onSave = null;
    undoStack = [];
  }

  // ===== PUBLIC API =====
  window.brailleEditor = {
    open(animData, callback) {
      buildUI();
      st = {
        cellCols: animData.cellCols || 4,
        cellRows: animData.cellRows || 2,
        fps: animData.fps || 4,
        loop: animData.loop !== false,
        frames: (animData.frames || [createGrid(8, 8)]).map(cloneGrid),
        currentFrame: 0,
        mode: 'draw',
      };
      onSave = callback || null;
      undoStack = [];

      overlay.style.display = 'flex';
      overlay.querySelector('#be-fps').value = st.fps;
      overlay.querySelector('#be-fps-val').textContent = st.fps;
      overlay.querySelectorAll('.be-mode').forEach(b => b.classList.toggle('active', b.dataset.mode === 'draw'));
      render();
      overlay.focus();
    },

    isAvailable() { return isLocal; },
  };
})();
