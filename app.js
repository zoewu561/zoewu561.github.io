'use strict';
const main = document.querySelector('#main');
const trips = window.TRIPS;
const math = window.JourneyMath;
const years = [...new Set(trips.map(trip => trip.year))].sort((a, b) => a - b);
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let disposePage = () => {};

function doodle(kind, className = '') {
  const shapes = {
    timeline: '<path d="M12 40Q46 35 76 40T120 38"/><circle cx="15" cy="39" r="5" fill="#d6bfdf"/><circle cx="48" cy="38" r="5" fill="#d6bfdf"/><circle cx="83" cy="40" r="5" fill="#d6bfdf"/><circle cx="117" cy="38" r="5" fill="#d6bfdf"/>',
    map: '<path d="m10 22 16-10 13 4 7 13-7 10 7 11-11 16-10-7-3-17-10-5Z M64 15l17-6 11 11 17 1 12 13-10 10-13-2-4 14-12 9-6-16-12-5 6-12-9-7Z"/><path d="m104 61 14-4 5 11-12 4Z"/>',
    view: '<path d="m10 62 33-37 13 16 20-27 38 48Z"/><path d="m61 33 15-19 15 23-14-8-7 7Z"/><circle cx="26" cy="16" r="8"/>',
    walk: '<path d="M24 65V22h25v43M49 65V10h25v55M74 65V30h28v35M12 66h105"/><path d="M32 30h7m-7 10h7m18-20h8m-8 12h8m18 9h10M58 65V49h9"/>',
    drink: '<path d="m35 27 5 40h45l5-40Z M33 27h59M51 14v13m22-14v14M49 7c-6 5 5 6 0 12m24-14c-6 5 5 6 0 12M90 35h8c17 0 14 22-11 22M29 71h67"/><path d="M49 43q14-7 27 0"/>',
    food: '<path d="M18 46q44-41 90 0v20H18Z M18 47q22 10 45 0t45 0 M32 35l10 6m15-17 2 13m18-10-4 11m20 0-8 4 M12 72h104"/>',
    arrival: '<path d="m12 43 43-9 17-22 8 2-10 19 37-4 8 7-47 9-12 18-8 1 6-18-25 3-10 10-7-1 8-14Z"/>',
    home: '<path d="m22 34 41-25 41 25M31 30v39h65V30M54 69V47h19v22M42 36h8m28 0h8"/><path d="m103 14 3-7 4 7 8 3-8 3-4 7-3-7-7-3Z"/>',
    cover: '<rect x="17" y="8" width="94" height="63" rx="5" stroke-dasharray="4 5"/><path d="m29 57 22-23 16 15 15-18 18 26"/><circle cx="84" cy="23" r="5"/>',
    star: '<path d="m62 5 10 25 26 8-26 9-10 26-9-26-26-9 26-8Z"/>'
  };
  return `<svg class="${className}" viewBox="0 0 128 80" aria-hidden="true">${shapes[kind] || shapes.view}</svg>`;
}
function backLink(href, label) { return `<a class="back-link" href="${href}">${escapeHtml(label)}</a>`; }
function pageTitle(title, subtitle, eyebrow = '') {
  return `<div class="page-title">${eyebrow ? `<div class="eyebrow">${escapeHtml(eyebrow)}</div>` : ''}<h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle)}</p></div>`;
}
function shortDate(date) {
  return new Intl.DateTimeFormat('en-US', {month:'short', day:'numeric', timeZone:'UTC'}).format(new Date(date + 'T12:00:00Z'));
}
function tripCard(trip, from) {
  const portraits = (trip.characters ?? []).filter(character => character.portrait)
    .map(({name, portrait, portraitHover}) => {
      const hover = portraitHover
        ? `<img class="trip-portrait-hover" src="${escapeHtml(portraitHover)}" alt="" aria-hidden="true" width="68" height="68">`
        : '';
      return `<span class="trip-portrait"><img src="${escapeHtml(portrait)}" alt="${escapeHtml(name)}" width="68" height="68">${hover}</span>`;
    }).join('');
  return `<a class="trip-card" href="#/trip/${trip.id}?from=${encodeURIComponent(from)}">
    <h2>${escapeHtml(trip.country)}, ${escapeHtml(trip.city)}</h2>
    <div class="cover-space ${trip.accent}">${trip.cover ? `<img src="${escapeHtml(trip.cover)}" alt="${escapeHtml(trip.city)} trip illustration">` : `${doodle('cover')}<span>Your illustration goes here</span>`}</div>
    <p class="trip-month">${escapeHtml(trip.month)} ${trip.year}</p>
    ${portraits ? `<div class="trip-portraits">${portraits}</div>` : ''}
  </a>`;
}
function renderHome() {
  main.innerHTML = `<section class="home-page">
    <div class="home-intro"><div class="eyebrow">Places, little moments & memories</div><h1>Zoe’s <span>travel log</span></h1><p>How would you like to explore?</p><svg class="home-spark" viewBox="0 0 50 60" aria-hidden="true"><path d="m25 4 5 18 16 7-16 6-5 19-5-19L4 29l16-7Z"/></svg></div>
    <div class="home-choices">
      <a class="home-choice" href="#/timeline"><div class="choice-icon">${doodle('timeline')}</div><h2>Timeline</h2><p>One year at a time.</p></a>
      <a class="home-choice" href="#/map"><div class="choice-icon">${doodle('map')}</div><h2>Map</h2><p>One place at a time.</p></a>
    </div><p class="home-note">A little preview of the journal. The memories and pictures come next.</p>
  </section>`;
}
function renderYears() {
  main.innerHTML = `<section class="page">${backLink('#/', 'Back home')}${pageTitle('Through the years', 'Pick a year to revisit.')}<div class="year-choices">${years.map(year => `<a class="year-choice" href="#/year/${year}"><strong>${year}</strong><span>${trips.filter(t => t.year === year).length} sample ${trips.filter(t => t.year === year).length === 1 ? 'journey' : 'journeys'}</span></a>`).join('')}</div></section>`;
}
function renderYear(year) {
  const selected = trips.filter(trip => trip.year === year);
  if (!selected.length) return renderMissing();
  main.innerHTML = `<section class="page">${backLink('#/timeline', 'All years')}${pageTitle(String(year), 'Which trip would you like to revisit?')}<nav class="list-tabs" aria-label="Choose a year">${years.map(y => `<a href="#/year/${y}" class="${y === year ? 'selected' : ''}" ${y === year ? 'aria-current="page"' : ''}>${y}</a>`).join('')}</nav><div class="trip-grid">${selected.map(t => tripCard(t, 'year/' + year)).join('')}</div><p class="page-note">Your hand-drawn trip covers will go in these spaces.</p></section>`;
}
function renderCountry(code) {
  const selected = trips.filter(trip => trip.countryCode === code);
  if (!selected.length) return renderMissing();
  main.innerHTML = `<section class="page">${backLink('#/map', 'World map')}${pageTitle(selected[0].country, 'Which trip would you like to revisit?')}<div class="trip-grid">${selected.map(t => tripCard(t, 'country/' + code)).join('')}</div><p class="page-note">Sample trips from different years, collected in one place.</p></section>`;
}
function renderMap() {
  const countries = window.WORLD_COUNTRIES || [];
  const visited = new Map();
  trips.forEach(trip => {
    const existing = visited.get(trip.countryCode);
    visited.set(trip.countryCode, {name:trip.country, count:existing ? existing.count + 1 : 1});
  });
  main.innerHTML = `<section class="page map-page">${backLink('#/', 'Back home')}${pageTitle('A world of memories', window.matchMedia('(max-width:760px)').matches ? 'Tap a coloured country, or choose a place below.' : 'Hover over a coloured country, then click to explore.')}
    <div class="map-canvas"><svg class="world-map" viewBox="0 0 1000 500" role="group" aria-label="World map of sample journeys">${countries.map(country => {
      const record = visited.get(country.code);
      const label = record ? `${record.name}: ${record.count} sample ${record.count === 1 ? 'trip' : 'trips'}. Open country.` : country.name;
      return `<path class="country-shape ${record ? 'visited' : ''}" d="${country.path}" ${record ? `data-country="${country.code}" tabindex="0" role="link" aria-label="${escapeHtml(label)}"` : 'aria-hidden="true"'}><title>${escapeHtml(label)}</title></path>`;
    }).join('')}</svg></div><div class="country-shortcuts" aria-label="Countries with sample trips">${[...visited].map(([code, record]) => `<a class="country-shortcut" href="#/country/${code}">${escapeHtml(record.name)}<span aria-label="${record.count} sample trips">${record.count}</span></a>`).join('')}</div><p class="map-note">Coloured countries have sample journeys. Your own trips will colour the map.</p>
    <div class="map-tooltip" role="tooltip" hidden></div>
  </section>`;
  const tooltip = main.querySelector('.map-tooltip');
  const showTooltip = (path, x, y) => {
    const record = visited.get(path.dataset.country);
    tooltip.textContent = `${record.name} · ${record.count} ${record.count === 1 ? 'trip' : 'trips'}`;
    tooltip.hidden = false;
    tooltip.style.left = `${math.clamp(x + 12, 8, window.innerWidth - tooltip.offsetWidth - 12)}px`;
    tooltip.style.top = `${math.clamp(y + 17, 8, window.innerHeight - tooltip.offsetHeight - 12)}px`;
  };
  main.querySelectorAll('[data-country]').forEach(path => {
    path.addEventListener('pointermove', event => showTooltip(path, event.clientX, event.clientY));
    path.addEventListener('pointerleave', () => { tooltip.hidden = true; });
    path.addEventListener('focus', () => { const rect = path.getBoundingClientRect(); showTooltip(path, rect.right, rect.top); });
    path.addEventListener('blur', () => { tooltip.hidden = true; });
    path.addEventListener('click', () => { location.hash = '/country/' + path.dataset.country; });
    path.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); location.hash = '/country/' + path.dataset.country; }
    });
  });
}
function placeholderCharacter() {
  return `<div class="walker" role="img" aria-label="Placeholder character, walking across the journey"><svg class="walker-art" viewBox="0 0 83 111" aria-hidden="true">
    <ellipse cx="40" cy="105" rx="23" ry="3" fill="#ece5ef"/>
    <g class="leg-back"><path class="line" d="m38 69-9 18-9 9 13 3"/></g>
    <g class="leg-front"><path class="line" d="m44 70 10 19-1 12 15 1"/></g>
    <path class="shirt" d="m35 43-10 9 6 21 23-1 2-23-8-8Z"/>
    <path class="line" d="m29 50-10 9 5 12"/>
    <circle class="head" cx="46" cy="27" r="18"/>
    <path class="hair" d="M29 30q-11-14 1-22Q43-1 58 11l7 7-10-1-6-6q-1 14-20 19Z"/>
    <path class="hair" d="m29 19-6 6 3 9-8 2 4-9-5-3 9-8Z"/>
    <circle cx="54" cy="25" r="1.7" fill="#665b70"/><path class="line mouth" d="M53 33q5 3 8-2"/>
    <circle cx="46" cy="32" r="3" fill="#efd2dc"/>
    <g class="arm"><path class="line" d="m48 49 12 10 10-3"/></g>
  </svg><span class="walker-date"></span></div>`;
}
function illustratedCharacters(characters) {
  const portraits = characters.map(({image, walkCycle, tastingImage}) => {
    const source = escapeHtml(walkCycle ?? image);
    const cycleClass = walkCycle ? ' walker-cycle' : '';
    const tasting = tastingImage
      ? `<img class="walker-taste-pose" src="${escapeHtml(tastingImage)}" alt="" draggable="false">`
      : '';
    return `<div class="walker-portrait${tasting ? ' walker-portrait--tasting' : ''}"><img class="walker-travel-pose${cycleClass}" src="${source}" alt="" draggable="false">${tasting}</div>`;
  }).join('');
  return `<div class="walker walker--illustrated" role="img"><div class="walker-portraits" aria-hidden="true">${portraits}</div><span class="walker-date"></span></div>`;
}
function renderJourney(id, from) {
  // Old sample links continue to lead to an available preview.
  const aliases = {'japan-spring':'tokyo-demo', 'seoul-autumn':'seoul-demo', 'germany-summer':'osaka-demo'};
  const trip = trips.find(t => t.id === (aliases[id] || id));
  if (!trip) return renderMissing();
  const stops = math.buildStops(trip);
  const characters = trip.characters ?? [];
  const illustrated = characters.length > 0;
  const animated = characters.some(({walkCycle}) => walkCycle);
  const walkerName = illustrated
    ? new Intl.ListFormat('en').format(characters.map(({name}) => name))
    : 'Placeholder character';
  const railAttributes = illustrated
    ? `class="controller-rail controller-rail--illustrated" style="--character-count:${characters.length}"`
    : 'class="controller-rail"';
  const allowedFrom = /^(year\/\d{4}|country\/[A-Z]{3})$/.test(from || '') ? from : 'year/' + trip.year;
  const returnHref = '#/' + allowedFrom;
  main.innerHTML = `<article class="journey-scroll" style="--travel-distance:${Math.max(3800, stops.length * 490)}px">
    <div class="journey-stage${illustrated ? ' journey-stage--illustrated' : ''}" role="region" aria-label="Interactive sample trip. Scroll down to walk forward, scroll up to return. Left and right arrow keys also move the character.">
      <div class="trip-topbar">${backLink(returnHref, 'Back to trips')}<div class="journey-name"><span>${trip.year}</span><h1>${escapeHtml(trip.country)}, ${escapeHtml(trip.city)}</h1><p class="trip-preview">${trip.days.length}-day sample journey</p></div></div>
      <section class="story-copy" aria-live="polite" aria-atomic="true"><div class="story-time"></div><h2></h2><p></p></section>
      <div class="memory-layer">${stops.map((stop, i) => `<div class="memory" data-stop="${i}" aria-hidden="true"><div class="memory-space">${stop.image ? `<img src="${escapeHtml(stop.image)}" alt="${escapeHtml(stop.label)}">` : `${doodle(stop.kind)}<span>${escapeHtml(stop.label)}</span>`}</div><div class="memory-tag">${escapeHtml(stop.time)}</div>${['food','drink'].includes(stop.kind) ? `<button type="button" class="taste-button" data-taste="${i}" tabindex="-1">${stop.kind === 'drink' ? 'Try a little sip' : 'Try a little bite'}</button>` : ''}<div class="taste-note" hidden></div></div>`).join('')}</div>
      <div class="journey-controls">
        <div class="mobile-dock-heading"><output class="mobile-current-date"></output><span class="mobile-current-day"></span></div>
        <div ${railAttributes}>
          ${illustrated ? illustratedCharacters(characters) : placeholderCharacter()}
          <input class="journey-range" type="range" min="0" max="10000" step="1" value="0" aria-label="Drag to move forward or back through the trip">
        </div>
        <div class="mobile-dock-footer"><button class="mobile-step mobile-previous" type="button">Back</button><span>Drag to explore</span><button class="mobile-step mobile-next" type="button">Next</button></div>
      </div>
      <div class="journey-end"><p>A little trip, remembered.</p><a href="${returnHref}">Back to trips</a></div>
      <p class="journey-instructions"><span class="mouse" aria-hidden="true"></span>Scroll to walk. Scroll back to revisit.</p><span class="journey-key-hint">Keyboard: left / right</span>
    </div>
  </article>`;
  const track = main.querySelector('.journey-scroll');
  const stage = main.querySelector('.journey-stage');
  const walker = main.querySelector('.walker');
  const story = main.querySelector('.story-copy');
  const memories = [...main.querySelectorAll('.memory')];
  const date = main.querySelector('.walker-date');
  const ending = main.querySelector('.journey-end');
  const rail = main.querySelector('.controller-rail');
  const range = main.querySelector('.journey-range');
  const previousButton = main.querySelector('.mobile-previous');
  const nextButton = main.querySelector('.mobile-next');
  const mobileDate = main.querySelector('.mobile-current-date');
  const mobileDay = main.querySelector('.mobile-current-day');
  const mobileQuery = window.matchMedia('(max-width:760px)');
  let mobile = mobileQuery.matches;
  let scrubbing = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let displayed = 0;
  let target = 0;
  let lastIndex = -1;
  let frame = 0;
  let tasteTimer = 0;
  let active = true;
  let travel = 1;
  let trackTop = 0;

  function measure() {
    stage.setAttribute('aria-label', mobile ? 'Interactive sample trip. Drag along the track at the bottom, or use Back and Next to explore each memory.' : 'Interactive sample trip. Scroll down to walk forward, scroll up to return. Left and right arrow keys also move the character.');
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    trackTop = window.scrollY + track.getBoundingClientRect().top - headerHeight;
    travel = Math.max(1, track.offsetHeight - stage.offsetHeight);
    const stageWidth = stage.clientWidth;
    const walkerWidth = walker.offsetWidth;
    memories.forEach((memory, index) => {
      if (mobile) {
        memory.style.left = '';
        memory.style.width = '';
        return;
      }
      const bounds = math.memoryBounds(stops, index, stageWidth, walkerWidth);
      memory.style.left = `${bounds.left}px`;
      memory.style.width = `${bounds.width}px`;
    });
  }
  function updateCopy(state) {
    if (lastIndex === state.index) return;
    lastIndex = state.index;
    walker.classList.remove('tasting');
    clearTimeout(tasteTimer);
    story.querySelector('.story-time').textContent = `Day ${state.stop.dayIndex + 1} · ${state.stop.time}`;
    story.querySelector('h2').textContent = state.stop.title;
    story.querySelector('p').textContent = state.stop.text;
    date.textContent = shortDate(state.stop.date);
    mobileDate.textContent = shortDate(state.stop.date);
    mobileDay.textContent = `Day ${state.stop.dayIndex + 1} of ${trip.days.length}`;
    walker.setAttribute('aria-label', `${walkerName}. ${shortDate(state.stop.date)}. ${state.stop.title}`);
    memories.forEach((memory, index) => {
      const selected = index === state.index;
      memory.classList.toggle('active', selected);
      memory.setAttribute('aria-hidden', String(!selected));
      const button = memory.querySelector('button');
      if (button) button.tabIndex = selected ? 0 : -1;
    });
    story.classList.remove('changed');
    // Restart the small text fade, without moving the layout.
    void story.offsetWidth;
    story.classList.add('changed');
  }
  function paint() {
    frame = 0;
    if (!active) return;
    const delta = target - displayed;
    const moving = Math.abs(delta) > 0.0001;
    displayed = !moving || reducedMotion || scrubbing ? target : displayed + delta * 0.22;
    const state = math.stateAt(stops, displayed);
    const walkerWidth = walker.offsetWidth;
    const stageWidth = mobile ? rail.clientWidth : stage.clientWidth;
    const left = mobile
      ? math.sliderLeft(displayed, stageWidth, walkerWidth)
      : math.characterLeft(displayed, stageWidth, walkerWidth);
    walker.style.transform = `translateX(${left}px)`;
    const phase = left * 0.11;
    const stride = moving && !reducedMotion ? Math.sin(phase) * 26 : 0;
    walker.style.setProperty('--stride', `${stride}deg`);
    walker.style.setProperty('--opposite-stride', `${-stride}deg`);
    walker.style.setProperty('--bob', `${moving && !reducedMotion ? -Math.abs(Math.sin(phase)) * 2 : 0}px`);
    if (animated && !reducedMotion) {
      const start = mobile ? 0 : math.characterLeft(0, stageWidth, walkerWidth);
      const step = Math.floor((left - start) / (mobile ? 6 : 10));
      walker.style.setProperty('--walk-frame', step % 4);
      walker.style.setProperty('--alternate-walk-frame', (step + 2) % 4);
    }
    updateCopy(state);
    ending.classList.toggle('visible', state.complete);
    range.value = String(Math.round(displayed * 10000));
    range.setAttribute('aria-valuetext', `Day ${state.stop.dayIndex + 1} of ${trip.days.length}, ${shortDate(state.stop.date)}. ${state.stop.title}`);
    previousButton.disabled = state.index === 0 && displayed === 0;
    nextButton.disabled = state.complete;
    if (moving && !reducedMotion) frame = requestAnimationFrame(paint);
  }
  function schedule() { if (!frame && active) frame = requestAnimationFrame(paint); }
  function onScroll() {
    if (mobile) return;
    target = math.clamp((window.scrollY - trackTop) / travel, 0, 1);
    schedule();
  }
  function onResize() {
    const nextMobile = mobileQuery.matches;
    const changedMode = nextMobile !== mobile;
    mobile = nextMobile;
    measure();
    if (changedMode) {
      // Keep the same moment when rotating a phone or crossing the desktop breakpoint.
      window.scrollTo({top:mobile ? 0 : trackTop + target * travel, behavior:'instant'});
      schedule();
    } else if (mobile) schedule();
    else onScroll();
  }
  function onRangeInput() {
    if (!mobile) return;
    target = math.clamp(range.valueAsNumber / 10000, 0, 1);
    schedule();
  }
  function seekStop(direction) {
    target = math.adjacentStopPosition(stops, target, direction);
    if (!mobile) window.scrollTo({top:trackTop + target * travel, behavior:'instant'});
    else {
      // A long note may have been scrolled; bring the new moment back into view.
      window.scrollTo({top:0, behavior:'instant'});
    }
    schedule();
  }
  range.addEventListener('input', onRangeInput);
  range.addEventListener('pointerdown', () => { scrubbing = true; });
  function stopScrubbing() { scrubbing = false; schedule(); }
  window.addEventListener('pointerup', stopScrubbing);
  window.addEventListener('pointercancel', stopScrubbing);
  previousButton.addEventListener('click', () => seekStop(-1));
  nextButton.addEventListener('click', () => seekStop(1));
  function onKey(event) {
    if (event.altKey || event.metaKey || event.ctrlKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const sign = event.key === 'ArrowRight' ? 1 : -1;
      target = math.clamp(target + sign * 0.035, 0, 1);
      if (!mobile) window.scrollTo({top:trackTop + target * travel, behavior:'instant'});
      schedule();
    }
  }
  main.querySelectorAll('[data-taste]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.taste);
    if (lastIndex !== index) return;
    const memory = memories[index];
    const note = memory.querySelector('.taste-note');
    memory.classList.add('eaten');
    note.textContent = stops[index].kind === 'drink' ? 'A happy little sip!' : 'A delicious little memory!';
    note.hidden = false;
    button.textContent = 'Try again';
    clearTimeout(tasteTimer);
    walker.classList.remove('tasting');
    void walker.offsetWidth;
    walker.classList.add('tasting');
    tasteTimer = setTimeout(() => { if (active) walker.classList.remove('tasting'); }, 1300);
  }));
  measure();
  updateCopy(math.stateAt(stops, 0));
  if (mobile) schedule(); else onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKey);
  disposePage = () => {
    active = false;
    cancelAnimationFrame(frame);
    clearTimeout(tasteTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('pointerup', stopScrubbing);
    window.removeEventListener('pointercancel', stopScrubbing);
  };
}
function renderMissing() {
  main.innerHTML = '<section class="not-found"><h1>This page wandered off.</h1><p>There isn’t a journey here yet.</p><a href="#/">Back home</a></section>';
}
function render() {
  disposePage();
  disposePage = () => {};
  const [path, query = ''] = (location.hash.slice(1) || '/').split('?');
  const parts = path.split('/').filter(Boolean);
  const from = new URLSearchParams(query).get('from');
  document.body.classList.toggle('is-journey', parts[0] === 'trip');
  // Reset before mounting a journey, so a previous page's scroll cannot move it.
  window.scrollTo({top:0, behavior:'instant'});
  let currentNav = ['timeline','year'].includes(parts[0]) ? 'timeline' : ['map','country'].includes(parts[0]) ? 'map' : parts[0] === 'trip' ? (from?.startsWith('country/') ? 'map' : 'timeline') : '';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const selected = link.dataset.nav === currentNav;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  });
  if (!parts.length) renderHome();
  else if (parts[0] === 'timeline') renderYears();
  else if (parts[0] === 'year') renderYear(Number(parts[1]));
  else if (parts[0] === 'map') renderMap();
  else if (parts[0] === 'country') renderCountry(parts[1]);
  else if (parts[0] === 'trip') renderJourney(parts[1], from);
  else renderMissing();
  const title = parts[0] === 'year' ? parts[1] : parts[0] === 'country' ? trips.find(t => t.countryCode === parts[1])?.country : parts[0] === 'trip' ? trips.find(t => t.id === parts[1])?.city : parts[0] === 'map' ? 'World map' : parts[0] === 'timeline' ? 'Timeline' : '';
  document.title = title ? `${title} · Zoe’s Travel Log` : 'Zoe’s Travel Log';
  main.focus({preventScroll:true});
}
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus({preventScroll:true});
});
window.addEventListener('hashchange', render);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
render();
