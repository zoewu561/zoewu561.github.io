/**
 * PREVIEW DATA ONLY — these are layout examples, not Zoe's travel records.
 * Add a cover image later with cover: 'assets/your-cover.png'.
 * Add a stop image with image: 'assets/your-photo.png'.
 * Give a trip a characters array to show its illustrated walkers.
 * A character’s optional portrait appears under the date on the trip card.
 * Optional walkCycle images contain four left-to-right frames of equal width.
 * Each day may contain any number of stops. Array order is travel order.
 * Day names and image spaces are generated automatically.
 * countryCode: ISO alpha-3, matching WORLD_COUNTRIES.
 */
window.TRIPS = [
  {
    id: 'tokyo-demo', year: 2026, country: 'Japan', countryCode: 'JPN', city: 'Tokyo',
    characters: [
      {name: 'Zoe', image: 'assets/zoe-traveler.png', portrait: 'assets/zoe-portrait.png?v=2', walkCycle: 'assets/zoe-walk-cycle.png', tastingImage: 'assets/zoe-tasting.png'},
      {name: 'her travel companion', image: 'assets/travel-companion.png', portrait: 'assets/companion-portrait.png?v=2', walkCycle: 'assets/companion-walk-cycle.png', tastingImage: 'assets/companion-tasting.png'}
    ],
    month: 'September', start: '2026-09-25', end: '2026-09-28', accent: 'lavender', cover: '',
    days: [
      {date: '2026-09-25', stops: [
        {title: 'And so, the trip begins.', time: 'Morning', kind: 'arrival', label: 'Your arrival photo', text: 'A first little moment in a new city. Your arrival story will go here.', image: ''},
        {title: 'A coffee along the way.', time: 'Afternoon', kind: 'drink', label: 'Your coffee photo', text: 'A tiny stop worth remembering. This space is ready for a café photo and your own note.', image: ''},
        {title: 'The city after sunset.', time: 'Evening', kind: 'view', label: 'Your evening photo', text: 'The first day winds down. Add a night view, a sketch, or a memory from the evening.', image: ''}
      ]},
      {date: '2026-09-26', stops: [
        {title: 'A first glimpse of Fuji.', time: 'Morning', kind: 'view', label: 'Your landscape or drawing', text: 'A place for the scenery that made you stop and look. Your thoughts about this moment will appear here.', image: ''},
        {title: 'Something delicious.', time: 'Lunch', kind: 'food', label: 'Your lunch photo', text: 'A favourite meal, a small discovery, a taste of the day. Add your food photo and a little review.', image: ''},
        {title: 'Taking the long way.', time: 'Afternoon', kind: 'walk', label: 'Your street photo', text: 'Some of the nicest moments happen between destinations. Leave a little story from your walk.', image: ''}
      ]},
      {date: '2026-09-27', stops: [
        {title: 'A slow morning.', time: 'Morning', kind: 'walk', label: 'Your morning photo', text: 'Another day, another little chapter. Your picture and memory of the morning will go here.', image: ''},
        {title: 'One more sweet stop.', time: 'Afternoon', kind: 'food', label: 'Your dessert photo', text: 'For the treat you would happily go back for. Add a cutout photo or a drawing of something sweet.', image: ''},
        {title: 'A view to keep.', time: 'Evening', kind: 'view', label: 'Your favourite view', text: 'A quiet moment to end the day. This space can hold a photo, an illustration, and your own words.', image: ''}
      ]},
      {date: '2026-09-28', stops: [
        {title: 'A few last little things.', time: 'Morning', kind: 'walk', label: 'Your last-day photo', text: 'A final wander before heading home. Add a last stop, a souvenir, or something you want to remember.', image: ''},
        {title: 'A sip before goodbye.', time: 'Afternoon', kind: 'drink', label: 'Your last drink photo', text: 'One last drink, one more memory. Your photo and note will live here.', image: ''},
        {title: 'Until the next little trip.', time: 'Heading home', kind: 'home', label: 'Your goodbye photo', text: 'The end of this journey. Add your final thoughts and the moment you would take home with you.', image: ''}
      ]}
    ]
  },
  {
    id: 'seoul-demo', year: 2026, country: 'South Korea', countryCode: 'KOR', city: 'Seoul',
    month: 'April', start: '2026-04-10', end: '2026-04-12', accent: 'pink', cover: '',
    days: [
      {date: '2026-04-10', stops: [
        {title: 'Hello, Seoul.', time: 'Arriving', kind: 'arrival', label: 'Your arrival photo', text: 'The first page of a new adventure. Your own story will go here.', image: ''},
        {title: 'Finding a little café.', time: 'Afternoon', kind: 'drink', label: 'Your café photo', text: 'A place for the coffee, the café, and the moment you want to keep.', image: ''}
      ]},
      {date: '2026-04-11', stops: [
        {title: 'A neighbourhood to wander.', time: 'Morning', kind: 'walk', label: 'Your street photo', text: 'Add a sketch or photo of a favourite little street.', image: ''},
        {title: 'A taste of the city.', time: 'Evening', kind: 'food', label: 'Your dinner photo', text: 'A memorable meal belongs here, with your own little review.', image: ''}
      ]},
      {date: '2026-04-12', stops: [
        {title: 'Just one more stop.', time: 'Morning', kind: 'view', label: 'Your favourite photo', text: 'Keep a favourite moment from the last day here.', image: ''},
        {title: 'See you again, Seoul.', time: 'Heading home', kind: 'home', label: 'Your goodbye photo', text: 'The end of a sample journey, ready for your real memories.', image: ''}
      ]}
    ]
  },
  {
    id: 'osaka-demo', year: 2025, country: 'Japan', countryCode: 'JPN', city: 'Osaka',
    month: 'April', start: '2025-04-06', end: '2025-04-08', accent: 'mint', cover: '',
    days: [
      {date: '2025-04-06', stops: [
        {title: 'A little Osaka adventure.', time: 'Arriving', kind: 'arrival', label: 'Your arrival photo', text: 'Begin this journey with your own picture and a few words.', image: ''},
        {title: 'The first delicious stop.', time: 'Evening', kind: 'food', label: 'Your food photo', text: 'A little space for something delicious from the first day.', image: ''}
      ]},
      {date: '2025-04-07', stops: [
        {title: 'Out exploring.', time: 'Morning', kind: 'view', label: 'Your scenery or drawing', text: 'A favourite scene from the day will live here.', image: ''},
        {title: 'Time for a little break.', time: 'Afternoon', kind: 'drink', label: 'Your drink photo', text: 'A café, a drink, or simply a moment of rest.', image: ''}
      ]},
      {date: '2025-04-08', stops: [
        {title: 'A last little wander.', time: 'Morning', kind: 'walk', label: 'Your street photo', text: 'One more memory before the journey comes to an end.', image: ''},
        {title: 'Taking the memories home.', time: 'Heading home', kind: 'home', label: 'Your goodbye photo', text: 'Your closing thoughts about the journey go here.', image: ''}
      ]}
    ]
  }
];
