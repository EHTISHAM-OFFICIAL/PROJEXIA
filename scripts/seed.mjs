/**
 * Seeds Firestore with sample projects so the site has something to show while
 * you set it up.
 *
 *   node scripts/seed.mjs            # add the sample projects
 *   node scripts/seed.mjs --remove   # delete them again
 *
 * Every seeded document carries `isSample: true` and a slug beginning with
 * "sample-", so --remove can find them and you can never confuse them with real
 * work. Delete this file once you have your own projects in.
 *
 * Requires the same .env as the app, plus an admin account to sign in with,
 * because firestore.rules only lets admins create projects:
 *
 *   SEED_EMAIL=you@example.com SEED_PASSWORD=yourpassword npm run seed
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';

const here = dirname(fileURLToPath(import.meta.url));

/** Minimal .env reader — avoids adding dotenv just for this script. */
function loadEnv() {
  const env = {};
  try {
    const raw = readFileSync(resolve(here, '..', '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const index = trimmed.indexOf('=');
      if (index === -1) continue;
      env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
    }
  } catch {
    console.error('Could not read .env. Copy .env.example to .env first.');
    process.exit(1);
  }
  return env;
}

const env = loadEnv();
const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;

if (!email || !password) {
  console.error(
    'Set SEED_EMAIL and SEED_PASSWORD to an admin account.\n' +
      'Example: SEED_EMAIL=you@example.com SEED_PASSWORD=secret npm run seed'
  );
  process.exit(1);
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);
const auth = getAuth(app);
const projects = collection(db, 'projects');

const daysAgo = (days) => Timestamp.fromDate(new Date(Date.now() - days * 86_400_000));

/**
 * Sample projects. No image URLs — the UI shows a neutral placeholder instead,
 * which is honest about the fact that these are placeholders.
 */
const SAMPLE_PROJECTS = [
  {
    title: 'Smart Water Level Monitoring System',
    slug: 'sample-smart-water-level-monitor',
    shortDescription:
      'An ultrasonic tank monitor that shows the water level on an OLED display and cuts the pump automatically when the tank is full.',
    description:
      'Overhead water tanks are usually managed by guesswork: someone starts the pump, forgets about it, and the tank overflows. This project measures the level continuously and controls the pump without anyone watching it.\n\nAn ultrasonic sensor mounted in the tank lid measures the distance to the water surface. The controller converts that to a percentage, drives an OLED display, and switches the pump through a relay when the level crosses the configured thresholds.',
    category: 'IoT',
    subcategory: null,
    status: 'completed',
    difficulty: 'intermediate',
    technologies: ['ESP32', 'C++', 'WiFi'],
    tags: ['water management', 'automation', 'sensors'],
    objectives: [
      'Measure tank level continuously without a float switch',
      'Stop the pump automatically at a configurable full level',
      'Show the current level locally without needing a phone',
    ],
    features: [
      'Live level reading as a percentage and in litres',
      'Automatic pump cut-off with a configurable threshold',
      'Dry-run protection if the level does not rise while the pump runs',
      'Readings published over WiFi for optional remote viewing',
    ],
    problemStatement:
      'Manual pump operation leads to overflow, wasted water and a pump that runs dry. Float switches corrode and stick, and give no indication of the actual level.',
    solutionOverview:
      'A non-contact ultrasonic sensor measures the air gap above the water. Because nothing touches the water, there is nothing to corrode. The controller handles the switching logic and shows the level on a small display at the tap point.',
    howItWorks:
      'The ultrasonic sensor emits a pulse and times the echo. Distance to the surface is subtracted from the known tank depth to get the water column height, which is converted to a percentage of capacity.\n\nA median filter over several readings removes the spikes caused by ripples. When the level drops below the low threshold the relay energises the pump; when it reaches the high threshold the relay opens.',
    challenges: [
      'Surface ripple caused jumpy readings — solved with a median filter over nine samples',
      'Condensation on the sensor face gave false echoes, so the sensor was recessed into a short shroud',
      'Long cable runs between the tank and the display picked up noise, fixed by moving to a shielded cable and adding a pull-up',
    ],
    results:
      'Level readings are accurate to within about two centimetres across the tank depth, and the pump has not overflowed the tank since installation. Running cost is negligible.',
    components: [
      { name: 'ESP32 DevKit', category: 'Controller', quantity: 1, notes: 'WiFi enabled' },
      { name: 'JSN-SR04T ultrasonic sensor', category: 'Sensor', quantity: 1, notes: 'Waterproof variant' },
      { name: '0.96" OLED display', category: 'Output', quantity: 1, notes: 'I2C' },
      { name: '5V relay module', category: 'Output', quantity: 1, notes: 'Opto-isolated' },
      { name: '5V 2A power supply', category: 'Power', quantity: 1, notes: '' },
    ],
    specifications: [
      { label: 'Range', value: '25 cm – 4.5 m' },
      { label: 'Accuracy', value: '±2 cm' },
      { label: 'Power', value: '5V DC, ~120 mA' },
    ],
    estimatedCost: { amount: 8500, currency: 'PKR' },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: true,
    published: true,
    completedAt: daysAgo(40),
    createdOffsetDays: 45,
  },
  {
    title: 'Automatic Street Light Controller',
    slug: 'sample-automatic-street-light-controller',
    shortDescription:
      'A light-sensing controller that switches street lighting at dusk and dawn, with a manual override and a fail-safe timer.',
    description:
      'Street lights left on through the day waste a surprising amount of energy. This controller switches a lighting circuit based on ambient light, with hysteresis so passing headlights or a cloudy afternoon do not cause it to flicker on and off.',
    category: 'Automation',
    subcategory: null,
    status: 'completed',
    difficulty: 'beginner',
    technologies: ['Arduino', 'C++'],
    tags: ['energy saving', 'lighting'],
    objectives: [
      'Switch lighting automatically at dusk and dawn',
      'Avoid rapid switching in changing light conditions',
      'Allow a manual override without reprogramming',
    ],
    features: [
      'Light-dependent switching with adjustable threshold',
      'Hysteresis band to prevent chatter',
      'Manual on/off override switch',
      'Fail-safe timer that forces lights off during daytime hours',
    ],
    problemStatement:
      'Manually operated lighting is either switched late, switched early, or forgotten entirely. Simple LDR circuits without hysteresis chatter around the switching point.',
    solutionOverview:
      'A light-dependent resistor feeds an analog input. The firmware applies separate on and off thresholds so the lights only change state after a sustained change in ambient light.',
    howItWorks:
      'The LDR forms a voltage divider read by the analog input. Readings are averaged over thirty seconds. If the average stays below the on-threshold for two consecutive windows, the relay closes. The off-threshold is set higher than the on-threshold, creating a dead band that ignores brief changes.',
    challenges: [
      'Passing vehicle headlights triggered switching, solved with a thirty-second averaging window',
      'The relay coil induced resets on the controller until a flyback diode and separate supply rail were added',
    ],
    results:
      'Lighting now runs only during genuine darkness. Measured over one month, on-time dropped by roughly a third compared to the previous manual schedule.',
    components: [
      { name: 'Arduino Nano', category: 'Controller', quantity: 1, notes: '' },
      { name: 'LDR (5mm)', category: 'Sensor', quantity: 1, notes: 'With 10k divider resistor' },
      { name: '10A relay module', category: 'Output', quantity: 1, notes: 'Rated for the lighting load' },
      { name: 'Enclosure (IP65)', category: 'Mechanical', quantity: 1, notes: 'Outdoor rated' },
    ],
    specifications: [
      { label: 'Switching load', value: 'Up to 10 A at 230 V AC' },
      { label: 'Response time', value: '30–60 s' },
    ],
    estimatedCost: { amount: 3200, currency: 'PKR' },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: true,
    published: true,
    completedAt: daysAgo(90),
    createdOffsetDays: 95,
  },
  {
    title: 'IoT Temperature and Humidity Logger',
    slug: 'sample-iot-temperature-humidity-logger',
    shortDescription:
      'A battery-powered sensor node that logs temperature and humidity to the cloud and sends an alert when readings go out of range.',
    description:
      'Built for a small storeroom where humidity needed to stay within a set band. The node wakes periodically, takes a reading, publishes it, and goes back to deep sleep.',
    category: 'IoT',
    subcategory: null,
    status: 'completed',
    difficulty: 'intermediate',
    technologies: ['ESP32', 'Firebase', 'WiFi', 'C++'],
    tags: ['monitoring', 'data logging', 'alerts'],
    objectives: [
      'Log temperature and humidity at fixed intervals',
      'Run for weeks on a single battery charge',
      'Alert immediately when readings leave the safe band',
    ],
    features: [
      'Readings every fifteen minutes with timestamps',
      'Deep sleep between readings for long battery life',
      'Threshold alerts pushed to a phone',
      'History viewable as a chart',
    ],
    problemStatement:
      'Stock was being damaged by humidity swings that nobody noticed until afterwards. A manual hygrometer only tells you the reading at the moment you look at it.',
    solutionOverview:
      'A low-power node samples on a schedule and uploads to a cloud database, so the history is always available and out-of-range conditions raise an alert without anyone checking.',
    howItWorks:
      'The controller wakes from deep sleep on a timer, powers the sensor, takes three readings and averages them, connects to WiFi, publishes the result with a server timestamp, then sleeps again. Average current between readings is a few tens of microamps, which is what makes the battery life practical.',
    challenges: [
      'The first version kept WiFi on continuously and lasted two days; deep sleep between readings extended this to several weeks',
      'Self-heating from the controller skewed readings until the sensor was moved onto a short lead away from the board',
    ],
    results:
      'Runs roughly six weeks on a 2000 mAh cell at fifteen-minute intervals. Two humidity excursions were caught and corrected within minutes of the alert.',
    components: [
      { name: 'ESP32 (low power board)', category: 'Controller', quantity: 1, notes: 'Deep sleep capable' },
      { name: 'DHT22 sensor', category: 'Sensor', quantity: 1, notes: 'Temperature and humidity' },
      { name: 'Li-ion cell 2000 mAh', category: 'Power', quantity: 1, notes: 'With protection circuit' },
      { name: 'TP4056 charger module', category: 'Power', quantity: 1, notes: '' },
    ],
    specifications: [
      { label: 'Interval', value: '15 minutes' },
      { label: 'Battery life', value: '~6 weeks' },
      { label: 'Accuracy', value: '±0.5 °C, ±2 % RH' },
    ],
    estimatedCost: { amount: 6500, currency: 'PKR' },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: true,
    published: true,
    completedAt: daysAgo(15),
    createdOffsetDays: 20,
  },
  {
    title: 'Line Following Robot',
    slug: 'sample-line-following-robot',
    shortDescription:
      'A two-wheeled robot that tracks a line using a reflectance sensor array and a tuned PID loop.',
    description:
      'A teaching build that demonstrates closed-loop control. The interesting part is not the chassis — it is what happens when you change the gains.',
    category: 'Robotics',
    subcategory: null,
    status: 'completed',
    difficulty: 'intermediate',
    technologies: ['Arduino', 'C++'],
    tags: ['control systems', 'PID', 'education'],
    objectives: [
      'Track a line reliably around curves',
      'Demonstrate the effect of each PID term',
      'Recover automatically when the line is lost',
    ],
    features: [
      'Five-channel reflectance array for position sensing',
      'PID control with gains adjustable without reflashing',
      'Line-loss recovery that reverses to the last known position',
    ],
    problemStatement:
      'Simple on/off line followers oscillate badly and fall off tight curves. Students see the robot fail without understanding why.',
    solutionOverview:
      'A weighted position is calculated from the sensor array and fed into a PID controller that sets a differential between the two motor speeds.',
    howItWorks:
      'Each sensor returns a reflectance value. These are combined into a single position error relative to the array centre. The proportional term reacts to current error, the derivative term damps overshoot on curves, and a small integral term corrects a persistent bias caused by unequal motors.',
    challenges: [
      'Ambient light changed the sensor readings between rooms, fixed with a calibration routine run at startup',
      'Unequal motor speeds caused a constant drift that only the integral term removed',
    ],
    results:
      'Completes a course with 15 cm radius curves without leaving the line. Changing a single gain visibly changes the behaviour, which is the point of the build.',
    components: [
      { name: 'Arduino Uno', category: 'Controller', quantity: 1, notes: '' },
      { name: 'QTR-8A reflectance array', category: 'Sensor', quantity: 1, notes: '5 channels used' },
      { name: 'TB6612FNG motor driver', category: 'Driver', quantity: 1, notes: '' },
      { name: 'N20 geared motors', category: 'Actuator', quantity: 2, notes: '200 RPM' },
    ],
    specifications: [
      { label: 'Top tracking speed', value: '0.4 m/s' },
      { label: 'Minimum curve radius', value: '15 cm' },
    ],
    estimatedCost: { amount: 7200, currency: 'PKR' },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: false,
    published: true,
    completedAt: daysAgo(150),
    createdOffsetDays: 160,
  },
  {
    title: 'Smart Home Relay Controller',
    slug: 'sample-smart-home-relay-controller',
    shortDescription:
      'A four-channel relay board controlled from a phone over local WiFi, with physical switches that keep working if the network is down.',
    description:
      'Retrofits existing light and fan circuits for app control without removing the wall switches. Losing WiFi should never mean losing the ability to turn a light on.',
    category: 'Smart Home',
    subcategory: null,
    status: 'in-progress',
    difficulty: 'advanced',
    technologies: ['ESP32', 'MQTT', 'C++', 'WiFi'],
    tags: ['home automation', 'lighting', 'retrofit'],
    objectives: [
      'Control four circuits from a phone',
      'Keep the existing wall switches fully functional',
      'Operate entirely on the local network, with no cloud dependency',
    ],
    features: [
      'Four independently switched channels',
      'Physical switch inputs that stay authoritative',
      'State published over MQTT for use with existing home automation',
      'Schedules stored on the device so they survive a reboot',
    ],
    problemStatement:
      'Most retrofit smart switches stop working when the internet is down, and many require replacing the wall plate entirely.',
    solutionOverview:
      'The controller sits behind the existing switches. Each channel tracks both the physical switch state and the network command, with the most recent change winning.',
    howItWorks:
      'Switch inputs are read on an interrupt and toggle the channel state directly, so there is no perceptible delay and no dependency on the network. Network commands set the same state variable. The device publishes every change so any dashboard stays in sync.',
    challenges: [
      'Mechanical switch bounce produced double toggles, resolved with debouncing in the interrupt handler',
      'Mains isolation and enclosure clearances required more care than the electronics itself',
    ],
    results:
      'Three channels are in daily use. The fourth and the scheduling interface are still being finished.',
    components: [
      { name: 'ESP32', category: 'Controller', quantity: 1, notes: '' },
      { name: '4-channel relay board', category: 'Output', quantity: 1, notes: 'Opto-isolated, 10 A' },
      { name: 'AC-DC 5V module', category: 'Power', quantity: 1, notes: 'Hi-Link 5V 3W' },
      { name: 'DIN enclosure', category: 'Mechanical', quantity: 1, notes: '' },
    ],
    specifications: [
      { label: 'Channels', value: '4' },
      { label: 'Load per channel', value: 'Up to 10 A at 230 V AC' },
      { label: 'Protocol', value: 'MQTT over local WiFi' },
    ],
    estimatedCost: { amount: 12000, currency: 'PKR' },
    media: { thumbnailUrl: '', heroImageUrl: null, gallery: [], videoUrl: null },
    externalLinks: { github: null, documentation: null, demo: null },
    seo: { metaTitle: null, metaDescription: null, keywords: [] },
    featured: false,
    published: true,
    completedAt: null,
    createdOffsetDays: 8,
  },
];

async function removeSamples() {
  const snapshot = await getDocs(query(projects, where('isSample', '==', true)));
  if (snapshot.empty) {
    console.log('No sample projects found.');
    return;
  }
  for (const document of snapshot.docs) {
    await deleteDoc(doc(db, 'projects', document.id));
    console.log(`Removed: ${document.data().title}`);
  }
  console.log(`\nRemoved ${snapshot.size} sample project(s).`);
}

async function addSamples() {
  const existing = await getDocs(query(projects, where('isSample', '==', true)));
  if (!existing.empty) {
    console.log(
      `${existing.size} sample project(s) already exist. Run "node scripts/seed.mjs --remove" first.`
    );
    return;
  }

  for (const sample of SAMPLE_PROJECTS) {
    const { createdOffsetDays, ...project } = sample;
    await addDoc(projects, {
      ...project,
      isSample: true,
      viewCount: 0,
      createdAt: daysAgo(createdOffsetDays),
      updatedAt: serverTimestamp(),
    });
    console.log(`Added: ${project.title}`);
  }

  console.log(
    `\nAdded ${SAMPLE_PROJECTS.length} sample projects.\n` +
      'They have no images, so cards show a placeholder. Remove them with:\n' +
      '  node scripts/seed.mjs --remove'
  );
}

async function main() {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(`Could not sign in as ${email}: ${error.code ?? error.message}`);
    process.exit(1);
  }

  try {
    if (process.argv.includes('--remove')) await removeSamples();
    else await addSamples();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    if (error.code === 'permission-denied') {
      console.error(
        'That account is not an admin. Create a document at admins/<uid> in Firestore — see the README.'
      );
    }
    process.exit(1);
  }

  process.exit(0);
}

main();
