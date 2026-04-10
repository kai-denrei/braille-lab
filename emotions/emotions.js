// ===== INLINE DATA (fallback for file://) =====
const EMOTIONS_INLINE = [{"id":"neutral","label":"Neutral","group":"base","tags":["valence:0","arousal:0"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]]]}},{"id":"happy","label":"Happy","group":"positive","tags":["valence:1","arousal:0.3"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0]]]}},{"id":"glee","label":"Glee","group":"positive","tags":["valence:1","arousal:0.8"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0]]]}},{"id":"awe","label":"Awe","group":"positive","tags":["valence:0.6","arousal:0.9"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,0,1,0,0,1,0,0],[0,0,1,1,1,1,0,0]]]}},{"id":"sad","label":"Sad","group":"negative","tags":["valence:-1","arousal:-0.3"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,1,0,0,1,0,0],[0,1,0,0,0,0,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0]]]}},{"id":"worried","label":"Worried","group":"negative","tags":["valence:-0.5","arousal:0.4"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,1,0,0,1,0,0],[0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"scared","label":"Scared","group":"negative","tags":["valence:-0.8","arousal:0.9"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,1,0,0,1,0,0],[0,1,0,0,0,0,1,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0]]]}},{"id":"angry","label":"Angry","group":"assertive","tags":["valence:-0.8","arousal:0.7"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"frustrated","label":"Frustrated","group":"assertive","tags":["valence:-0.6","arousal:0.5"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]]]}},{"id":"focused","label":"Focused","group":"assertive","tags":["valence:0","arousal:0.4"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"unimpressed","label":"Unimpressed","group":"withdrawn","tags":["valence:-0.3","arousal:-0.5"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0]]]}},{"id":"skeptical","label":"Skeptical","group":"withdrawn","tags":["valence:-0.2","arousal:0.1"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,1,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"suspicious","label":"Suspicious","group":"withdrawn","tags":["valence:-0.4","arousal:0.3"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1],[0,0,0,0,0,1,0,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]]]}},{"id":"surprised","label":"Surprised","group":"reactive","tags":["valence:0.2","arousal:0.9"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,0,1,0,0,1,0,0],[0,0,1,1,1,1,0,0]]]}},{"id":"sleepy","label":"Sleepy","group":"reactive","tags":["valence:0","arousal:-0.9"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"blink","label":"Blink","group":"reactive","tags":["valence:0","arousal:0"],"animation":{"cellCols":4,"cellRows":2,"fps":3,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]]]}},{"id":"scan","label":"Scan","group":"reactive","tags":["valence:0","arousal:0.2"],"animation":{"cellCols":4,"cellRows":2,"fps":3,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[1,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]]]}},{"id":"curious","label":"Curious","group":"reactive","tags":["valence:0.3","arousal:0.3"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0]]]}},{"id":"determined","label":"Determined","group":"reactive","tags":["valence:0","arousal:0.6"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,0,0,1,1,1],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,0,0,0,0,0]]]}},{"id":"grin","label":"Grin","group":"special","tags":["valence:0.7","arousal:0.4"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[0,1,0,1,0,1,0,1]]]}},{"id":"love","label":"Love","group":"special","tags":["valence:1","arousal:0.6"],"animation":{"cellCols":4,"cellRows":2,"fps":4,"loop":true,"frames":[[[0,1,1,0,0,1,1,0],[0,0,0,0,0,0,0,0],[0,1,0,1,1,0,1,0],[0,0,1,0,0,1,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0]]]}}];

// ===== BRAILLE ENCODING (from DAB) =====
const DOT_BITS = [
  [0x01, 0x08],
  [0x02, 0x10],
  [0x04, 0x20],
  [0x40, 0x80],
];

function gridToBraille(grid, cellCols, cellRows) {
  const lines = [];
  for (let cr = 0; cr < cellRows; cr++) {
    let line = '';
    for (let cc = 0; cc < cellCols; cc++) {
      let mask = 0;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 2; c++) {
          const gr = cr * 4 + r;
          const gc = cc * 2 + c;
          if (gr < grid.length && gc < grid[0].length && grid[gr][gc]) {
            mask |= DOT_BITS[r][c];
          }
        }
      }
      line += String.fromCodePoint(0x2800 + mask);
    }
    lines.push(line);
  }
  return lines;
}

// ===== GROUPS =====
const GROUPS = [
  { id: 'positive',  label: 'Positive',  color: '#facc15', angle: 0 },
  { id: 'reactive',  label: 'Reactive',  color: '#f97316', angle: 60 },
  { id: 'assertive', label: 'Assertive', color: '#f87171', angle: 120 },
  { id: 'negative',  label: 'Negative',  color: '#a78bfa', angle: 180 },
  { id: 'withdrawn', label: 'Withdrawn', color: '#60a5fa', angle: 240 },
  { id: 'special',   label: 'Special',   color: '#34d399', angle: 300 },
];

// ===== STATE =====
let emotions = [];
let selected = null;
let animTimer = null;
let animFrame = 0;
let currentFps = 1;

// ===== INIT =====
async function init() {
  // Try fetch first (works on HTTP), fall back to inline data (works on file://)
  try {
    const resp = await fetch('emotions.json');
    if (resp.ok) emotions = await resp.json();
    else throw new Error('fetch failed');
  } catch (e) {
    emotions = EMOTIONS_INLINE;
  }

  // Add neutral to center
  const neutralIdx = emotions.findIndex(e => e.group === 'base');

  buildRadialMenu();
  buildMobileGrid();

  // Select neutral by default
  if (neutralIdx >= 0) selectEmotion(emotions[neutralIdx]);
  else if (emotions.length > 0) selectEmotion(emotions[0]);
}

// ===== RADIAL MENU (SVG) =====
function buildRadialMenu() {
  const svg = document.getElementById('radial');
  const cx = 300, cy = 300;
  const innerR = 130, outerR = 270, labelR = 285;
  const nodeR = 200;
  const sectorAngle = 60;

  // Draw sectors
  GROUPS.forEach((g, gi) => {
    const startDeg = g.angle - sectorAngle / 2 - 90;
    const endDeg = startDeg + sectorAngle;
    const startRad = startDeg * Math.PI / 180;
    const endRad = endDeg * Math.PI / 180;

    // Sector arc path
    const x1o = cx + outerR * Math.cos(startRad);
    const y1o = cy + outerR * Math.sin(startRad);
    const x2o = cx + outerR * Math.cos(endRad);
    const y2o = cy + outerR * Math.sin(endRad);
    const x1i = cx + innerR * Math.cos(endRad);
    const y1i = cy + innerR * Math.sin(endRad);
    const x2i = cx + innerR * Math.cos(startRad);
    const y2i = cy + innerR * Math.sin(startRad);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d',
      `M ${x1o} ${y1o} A ${outerR} ${outerR} 0 0 1 ${x2o} ${y2o} ` +
      `L ${x1i} ${y1i} A ${innerR} ${innerR} 0 0 0 ${x2i} ${y2i} Z`
    );
    path.setAttribute('fill', 'transparent');
    path.setAttribute('stroke', '#222');
    path.setAttribute('stroke-width', '1');
    path.setAttribute('class', 'sector');
    path.dataset.group = g.id;
    svg.appendChild(path);

    // Group label at rim
    const midDeg = g.angle - 90;
    const midRad = midDeg * Math.PI / 180;
    const lx = cx + labelR * Math.cos(midRad);
    const ly = cy + labelR * Math.sin(midRad);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', lx);
    label.setAttribute('y', ly);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'middle');
    label.setAttribute('fill', '#555');
    label.setAttribute('font-size', '11');
    label.setAttribute('font-family', 'inherit');
    label.textContent = g.label;
    // Rotate label to follow arc
    let rot = g.angle;
    if (rot > 90 && rot < 270) rot += 180;
    label.setAttribute('transform', `rotate(${rot}, ${lx}, ${ly})`);
    svg.appendChild(label);

    // Expression nodes in this sector
    const groupEmotions = emotions.filter(e => e.group === g.id);
    const count = groupEmotions.length;
    groupEmotions.forEach((em, ei) => {
      const spread = Math.min(sectorAngle - 10, count * 14);
      const step = count === 1 ? 0 : spread / (count - 1);
      const angleDeg = g.angle - spread / 2 + ei * step - 90;
      const angleRad = angleDeg * Math.PI / 180;
      const nx = cx + nodeR * Math.cos(angleRad);
      const ny = cy + nodeR * Math.sin(angleRad);

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('class', 'node');
      group.dataset.id = em.id;
      group.style.cursor = 'pointer';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', nx);
      circle.setAttribute('cy', ny);
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', g.color);
      circle.setAttribute('opacity', '0.7');
      group.appendChild(circle);

      // Tiny braille preview
      const preview = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const previewR = nodeR + 22;
      const px = cx + previewR * Math.cos(angleRad);
      const py = cy + previewR * Math.sin(angleRad);
      preview.setAttribute('x', px);
      preview.setAttribute('y', py);
      preview.setAttribute('text-anchor', 'middle');
      preview.setAttribute('dominant-baseline', 'middle');
      preview.setAttribute('fill', '#888');
      preview.setAttribute('font-size', '9');
      preview.setAttribute('font-family', 'inherit');
      preview.textContent = em.label;
      group.appendChild(preview);

      group.addEventListener('click', () => selectEmotion(em));
      group.addEventListener('mouseenter', () => {
        circle.setAttribute('r', '9');
        circle.setAttribute('opacity', '1');
      });
      group.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '6');
        circle.setAttribute('opacity', '0.7');
      });

      svg.appendChild(group);
    });
  });

  // Center dot for neutral/base
  const baseEm = emotions.find(e => e.group === 'base');
  if (baseEm) {
    const cg = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    cg.style.cursor = 'pointer';
    const cc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    cc.setAttribute('cx', cx);
    cc.setAttribute('cy', cy);
    cc.setAttribute('r', '8');
    cc.setAttribute('fill', '#888');
    cc.setAttribute('opacity', '0.6');
    cg.appendChild(cc);
    cg.addEventListener('click', () => selectEmotion(baseEm));
    cg.addEventListener('mouseenter', () => { cc.setAttribute('r', '11'); cc.setAttribute('opacity', '1'); });
    cg.addEventListener('mouseleave', () => { cc.setAttribute('r', '8'); cc.setAttribute('opacity', '0.6'); });
    svg.appendChild(cg);
  }
}

// ===== MOBILE GRID =====
function buildMobileGrid() {
  const container = document.getElementById('mobile-grid');
  const allGroups = [{ id: 'base', label: 'Base', color: '#888' }, ...GROUPS];
  allGroups.forEach(g => {
    const groupEmotions = emotions.filter(e => e.group === g.id);
    if (groupEmotions.length === 0) return;
    const section = document.createElement('div');
    section.className = 'mobile-section';
    const title = document.createElement('div');
    title.className = 'mobile-group-label';
    title.textContent = g.label;
    title.style.color = g.color;
    section.appendChild(title);
    const btns = document.createElement('div');
    btns.className = 'mobile-buttons';
    groupEmotions.forEach(em => {
      const btn = document.createElement('button');
      btn.className = 'mobile-btn';
      btn.textContent = em.label;
      btn.addEventListener('click', () => selectEmotion(em));
      btns.appendChild(btn);
    });
    section.appendChild(btns);
    container.appendChild(section);
  });
}

// ===== PLAY MODES =====
let playMode = null; // null, 'seq', 'rand'
let playTimer = null;
let playIndex = 0;
let wheelOrder = []; // built after data loads

function buildWheelOrder() {
  // base first, then groups in angle order, emotions within each group in data order
  wheelOrder = [];
  const base = emotions.filter(e => e.group === 'base');
  wheelOrder.push(...base);
  GROUPS.forEach(g => {
    wheelOrder.push(...emotions.filter(e => e.group === g.id));
  });
}

function startPlay(mode) {
  stopPlay();
  playMode = mode;
  playIndex = 0;

  document.getElementById('play-seq').style.display = mode ? 'none' : '';
  document.getElementById('play-rand').style.display = mode ? 'none' : '';
  document.getElementById('play-stop').style.display = mode ? '' : 'none';

  if (mode === 'seq') {
    // find current emotion in wheel order
    if (selected) playIndex = Math.max(0, wheelOrder.indexOf(selected));
    advancePlay();
  } else if (mode === 'rand') {
    advancePlay();
  }
}

function stopPlay() {
  playMode = null;
  if (playTimer) clearTimeout(playTimer);
  playTimer = null;
  document.getElementById('play-seq').style.display = '';
  document.getElementById('play-rand').style.display = '';
  document.getElementById('play-stop').style.display = 'none';
}

function advancePlay() {
  if (!playMode) return;

  let em;
  if (playMode === 'seq') {
    em = wheelOrder[playIndex % wheelOrder.length];
    playIndex++;
  } else {
    em = emotions[Math.floor(Math.random() * emotions.length)];
  }

  selectEmotion(em, true);

  const delay = 1000 / currentFps;
  playTimer = setTimeout(advancePlay, Math.max(delay, 250));
}

document.getElementById('play-seq').addEventListener('click', () => startPlay('seq'));
document.getElementById('play-rand').addEventListener('click', () => startPlay('rand'));
document.getElementById('play-stop').addEventListener('click', () => stopPlay());

// ===== SELECT & RENDER =====
function selectEmotion(em, fromPlay) {
  if (!fromPlay) stopPlay();
  selected = em;
  animFrame = 0;

  // Terminal command
  document.getElementById('term-cmd').textContent = `show ${em.id}`;

  // Terminal face
  renderFrame();
  startFrameAnimation();

  // Highlight active node
  document.querySelectorAll('.node circle').forEach(c => c.setAttribute('opacity', '0.7'));
  const activeNode = document.querySelector(`.node[data-id="${em.id}"] circle`);
  if (activeNode) activeNode.setAttribute('opacity', '1');
}

function renderFrame() {
  if (!selected) return;
  const anim = selected.animation;
  const frame = anim.frames[animFrame % anim.frames.length];
  const lines = gridToBraille(frame, anim.cellCols, anim.cellRows);

  document.getElementById('term-face').textContent = lines.join('\n');
  document.getElementById('term-braille').textContent = lines.join('');
}

function startFrameAnimation() {
  if (animTimer) clearInterval(animTimer);
  if (!selected || selected.animation.frames.length <= 1) return;
  const fps = selected.animation.fps || 4;
  animTimer = setInterval(() => {
    animFrame = (animFrame + 1) % selected.animation.frames.length;
    renderFrame();
  }, 1000 / fps);
}

function flashCopy(id) {
  const btn = document.getElementById(id);
  const orig = btn.textContent;
  btn.textContent = 'Copied';
  setTimeout(() => btn.textContent = orig, 1000);
}

// ===== FPS SLIDER =====
document.getElementById('fps-slider').addEventListener('input', e => {
  currentFps = parseInt(e.target.value);
  document.getElementById('fps-val').textContent = currentFps;
});

// ===== COPY / DAB =====
document.getElementById('copy-braille').addEventListener('click', () => {
  if (!selected) return;
  const anim = selected.animation;
  const frame = anim.frames[0];
  const lines = gridToBraille(frame, anim.cellCols, anim.cellRows);
  navigator.clipboard.writeText(lines.join(''));
  flashCopy('copy-braille');
});

document.getElementById('copy-json').addEventListener('click', () => {
  if (!selected) return;
  navigator.clipboard.writeText(JSON.stringify(selected.animation, null, 2));
  flashCopy('copy-json');
});

document.getElementById('open-dab').addEventListener('click', () => {
  if (!selected) return;
  localStorage.setItem('dab-import', JSON.stringify(selected.animation));
  navigator.clipboard.writeText(JSON.stringify(selected.animation, null, 2));
  window.open('../dab/index.html', '_blank');
});

// ===== EDITOR (localhost only) =====
if (window.brailleEditor && brailleEditor.isAvailable()) {
  const editBtn = document.createElement('button');
  editBtn.className = 'ctrl-btn';
  editBtn.id = 'edit-btn';
  editBtn.textContent = 'Edit';
  document.querySelector('.controls').appendChild(editBtn);
  editBtn.addEventListener('click', () => {
    if (!selected) return;
    stopPlay();
    brailleEditor.open(selected.animation, updated => {
      selected.animation = updated;
      animFrame = 0;
      renderFrame();
      startFrameAnimation();
    }, async (updatedAnim) => {
      // Persist: update the emotion in the array and write emotions.json
      selected.animation = updatedAnim;
      const json = JSON.stringify(emotions, null, 2);
      return brailleEditor.saveToFile('emotions/emotions.json', json);
    });
  });
}

// ===== CURSOR BLINK =====
setInterval(() => {
  const c = document.getElementById('term-cursor');
  c.style.visibility = c.style.visibility === 'hidden' ? 'visible' : 'hidden';
}, 530);

// ===== START =====
async function start() {
  await init();
  buildWheelOrder();
  // Autoplay sequence on load
  startPlay('seq');
}
start();
