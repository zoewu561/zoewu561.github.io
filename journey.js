/** Pure journey calculations, shared by the screen and the verification checks. */
(function (root) {
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function buildStops(trip) {
    const stops = [];
    trip.days.forEach((day, dayIndex) => {
      const count = day.stops.length;
      day.stops.forEach((stop, stopIndex) => {
        // Each day occupies an equal part of the journey; its stops remain in order.
        const position = (dayIndex + stopIndex / count) / trip.days.length;
        stops.push({...stop, date: day.date, dayIndex, stopIndex, position});
      });
    });
    return stops;
  }
  function stateAt(stops, progress) {
    const value = clamp(Number(progress) || 0, 0, 1);
    let index = 0;
    for (let i = 1; i < stops.length; i++) {
      if (value + 0.000001 < stops[i].position) break;
      index = i;
    }
    return {progress: value, index, stop: stops[index], complete: value >= 0.9999};
  }
  function characterLeft(progress, width, characterWidth) {
    const inset = width < 600 ? 16 : 34;
    return inset + clamp(progress, 0, 1) * Math.max(0, width - characterWidth - 2 * inset);
  }
  function memoryBounds(stops, index, stageWidth, characterWidth) {
    const start = characterLeft(stops[index].position, stageWidth, characterWidth);
    const end = characterLeft(stops[index + 1]?.position ?? 1, stageWidth, characterWidth);
    return {left: start, width: end - start + characterWidth};
  }
  function sliderLeft(progress, width, thumbWidth) {
    return clamp(progress, 0, 1) * Math.max(0, width - thumbWidth);
  }
  function adjacentStopPosition(stops, progress, direction) {
    const state = stateAt(stops, progress);
    if (direction > 0) return state.index === stops.length - 1 ? 1 : stops[state.index + 1].position;
    // Back first returns to the start of the current stop, then to the one before it.
    if (state.progress - state.stop.position > 0.002) return state.stop.position;
    return stops[Math.max(0, state.index - 1)].position;
  }
  root.JourneyMath = {clamp, buildStops, stateAt, characterLeft, memoryBounds, sliderLeft, adjacentStopPosition};
  if (typeof module !== 'undefined' && module.exports) module.exports = root.JourneyMath;
})(typeof window !== 'undefined' ? window : globalThis);
