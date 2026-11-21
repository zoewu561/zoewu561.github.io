# Zoe’s Travel Log — illustrated journey scaffold

This revision follows Zoe’s November 21 sketch and subsequent clarifications.
All journeys, dates, notes, character drawings and illustration spaces are examples.
The final photos, trip covers and character artwork are intentionally left to add later.

## Explore

- Home → Timeline → year → trips → one journey.
- Home → Map → coloured country → trips across years → one journey.
- Scroll down to move the character across one fixed scene; scroll up to return.
- The character starts on the left and ends at the right edge of the journey.
- Days have their own dates and multiple ordered memory stops.
- Red timeline lines and dots from the explanatory sketch are not displayed.
- Only the current date and memory are shown. Memory illustrations appear at their
  position along the path, then fade when the next stop is reached.
- Food and drink stops include a simple replayable bite/sip demonstration.
- Keyboard left/right is also available. Mobile-specific controls are deferred.

## Content and future artwork

Edit `data.js`. Each trip has a year, country, ISO alpha-3 countryCode, city,
month, start/end date, optional cover path, and an ordered days array.
Each day has its date and an ordered stops array of any length.
Stops have title, time, kind, label, text, and optional image path.
Use relative image paths, e.g. `assets/my-trip-cover.png`.
The map counts trips automatically, and year/country lists use the same trip records.

Illustration placeholders are native SVG shapes. The full-body character in app.js
is an animated placeholder; its own approved artwork can replace it later.
Images are contained in their reserved space so transparent food cutouts are not cropped.
Patrick Hand is loaded from Google Fonts; local handwritten/cursive fallbacks are provided.

## Run and verify

Open `index.html` directly, or serve this folder with any static HTTP server.
No build, package install, API keys or paid services are required.
Run calculation checks with `node --test tests/journey.test.cjs`.

Desktop browser checks cover home/year/trip/country navigation, scrolling in both
 directions, day changes, the last-day endpoint and the replayable drink interaction.
Mobile presentation is a temporary basic adaptation, not the final mobile design.

The existing repository README is preserved. Old stock photo files may remain from
an earlier revision but are not used in this scaffold. World map data continues to
use the Natural Earth-derived geo-countries dataset noted in the previous package.
