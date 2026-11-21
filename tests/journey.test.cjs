const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const math = require('../journey.js');
const ctx = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../data.js'), 'utf8'), ctx);
const trips = ctx.window.TRIPS;

test('four-day example preserves every day and all twelve ordered memory stops', () => {
  const trip = trips.find(t => t.id === 'tokyo-demo');
  const stops = math.buildStops(trip);
  assert.equal(trip.days.length, 4);
  assert.equal(stops.length, 12);
  for (let day = 0; day < 4; day++) {
    const state = math.stateAt(stops, day / 4);
    assert.equal(state.stop.dayIndex, day);
    assert.equal(state.stop.date, trip.days[day].date);
  }
  for (let i = 0; i < stops.length; i++) {
    assert.equal(math.stateAt(stops, stops[i].position).index, i);
    if (i > 0) assert.ok(stops[i].position > stops[i - 1].position);
  }
});

test('walking backwards returns to the same memories and dates', () => {
  for (const trip of trips) {
    const stops = math.buildStops(trip);
    const forward = Array.from({length:101}, (_, i) => math.stateAt(stops, i / 100));
    const reverse = Array.from({length:101}, (_, i) => math.stateAt(stops, (100-i) / 100));
    for (let i = 0; i <= 100; i++) {
      assert.equal(forward[i].index, reverse[100-i].index);
      assert.equal(forward[i].stop.date, reverse[100-i].stop.date);
    }
    assert.equal(forward[0].stop.date, trip.start);
    assert.equal(forward[100].stop.date, trip.end);
    assert.equal(forward[100].complete, true);
  }
});

test('character crosses the viewport once and ends fully inside the right edge', () => {
  for (const width of [390, 1024, 1280, 1440, 1920]) {
    const xs = Array.from({length:101}, (_, i) => math.characterLeft(i / 100, width, 83));
    for (let i = 1; i < xs.length; i++) assert.ok(xs[i] >= xs[i-1]);
    assert.ok(xs[0] >= 0);
    assert.ok(xs[100] + 83 <= width);
    assert.ok(width - xs[100] - 83 <= 34);
  }
  assert.equal(math.characterLeft(-1, 1440, 83), math.characterLeft(0, 1440, 83));
  assert.equal(math.characterLeft(2, 1440, 83), math.characterLeft(1, 1440, 83));
});

test('a last day with one stop still starts at its correct day boundary', () => {
  const trip = {days:[{date:'2026-01-01',stops:[{title:'First'}]},{date:'2026-01-02',stops:[{title:'Last'}]}]};
  const stops = math.buildStops(trip);
  assert.equal(math.stateAt(stops, .5).stop.title, 'Last');
  assert.equal(math.stateAt(stops, 1).stop.title, 'Last');
});

test('map example has two Japan journeys and one South Korea journey', () => {
  assert.equal(trips.filter(t => t.countryCode === 'JPN').length, 2);
  assert.equal(trips.filter(t => t.countryCode === 'KOR').length, 1);
  assert.equal(new Set(trips.map(t => t.id)).size, trips.length);
  for (const trip of trips) {
    assert.ok(trip.days.every(day => day.stops.length > 0));
  }
});

test('mobile thumb follows the range at both edges, including a very narrow phone', () => {
  for (const width of [248, 284, 342, 382, 620]) {
    assert.equal(math.sliderLeft(0, width, 56), 0);
    assert.equal(math.sliderLeft(1, width, 56) + 56, width);
    assert.equal(math.sliderLeft(.5, width, 56), (width - 56) / 2);
  }
  assert.equal(math.sliderLeft(-1, 342, 56), 0);
  assert.equal(math.sliderLeft(3, 342, 56), 286);
});

test('mobile Next visits every memory and Back can return through every day', () => {
  for (const trip of trips) {
    const stops = math.buildStops(trip);
    let progress = 0;
    for (let i = 1; i < stops.length; i++) {
      progress = math.adjacentStopPosition(stops, progress, 1);
      assert.equal(math.stateAt(stops, progress).index, i);
    }
    assert.equal(math.adjacentStopPosition(stops, progress, 1), 1);
    for (let i = stops.length - 2; i >= 0; i--) {
      progress = math.adjacentStopPosition(stops, progress, -1);
      assert.equal(math.stateAt(stops, progress).index, i);
    }
    assert.equal(progress, 0);
  }
});

test('mobile can finish a trip whose last day has a single stop', () => {
  const stops = math.buildStops({days:[{date:'2026-01-01',stops:[{}]},{date:'2026-01-02',stops:[{}]}]});
  assert.equal(math.adjacentStopPosition(stops, 0, 1), .5);
  assert.equal(math.adjacentStopPosition(stops, .5, 1), 1);
  assert.equal(math.adjacentStopPosition(stops, .9, -1), .5);
});

test('each photo spans its walking interval, including the last one', () => {
  for (const trip of trips) {
    const stops = math.buildStops(trip);
    assert.ok(stops.at(-1).position < 1);
    for (const stageWidth of [761, 1024, 1440]) {
      const walkerWidth = trip.characters ? 165 : 83;
      for (const [i, stop] of stops.entries()) {
        const end = stops[i + 1]?.position ?? 1;
        const photo = math.memoryBounds(stops, i, stageWidth, walkerWidth);
        assert.equal(photo.left, math.characterLeft(stop.position, stageWidth, walkerWidth));
        assert.ok(photo.width > walkerWidth);
        assert.ok(Math.abs(photo.left + photo.width -
          (math.characterLeft(end, stageWidth, walkerWidth) + walkerWidth)) < 1e-8);
        assert.equal(math.stateAt(stops, (stop.position + end) / 2).index, i);
      }
    }
  }
});
