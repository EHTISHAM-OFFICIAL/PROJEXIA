import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';

function loadEnv() {
  const env = {};
  const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1).replace(/^['"]|['"]$/g, '');
  }
  return env;
}

const env = loadEnv();
const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;

if (!email || !password) {
  console.error('Set SEED_EMAIL and SEED_PASSWORD to an admin account.');
  console.error('Example: SEED_EMAIL=you@example.com SEED_PASSWORD=secret npm run seed:blog');
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

const auth = getAuth(app);
const db = getFirestore(app);
const posts = collection(db, 'posts');

const POST = {
  title: 'What Is an RFID Door Lock and How Does It Work?',
  slug: 'what-is-an-rfid-door-lock-and-how-does-it-work',
  excerpt:
    'Learn how RFID door locks work, including RFID cards, readers, microcontrollers, authentication, servo motors, and the electronics behind an access-control system.',
  body: `An RFID door lock is an electronic access-control system that uses Radio Frequency Identification (RFID) to identify an authorized card, key fob, or tag before allowing access. Instead of relying on a traditional physical key, the system detects an RFID credential wirelessly, sends its identification data to a controller, checks whether it is authorized, and then operates an electronic locking mechanism.

RFID door locks are a useful example of how several areas of electronics work together: RFID communication, microcontrollers, firmware, motor control, power management, and physical hardware. They can be used in electronics prototypes, educational projects, laboratory demonstrations, cabinets, equipment enclosures, and other applications where electronic identification is required.

How does an RFID door lock work?

A basic RFID door-lock system can be divided into an RFID card or tag, an RFID reader, a microcontroller, a locking mechanism, a power supply, and firmware. The overall flow is RFID tag → RFID reader → microcontroller → authentication → lock mechanism.

When a compatible RFID tag is brought close to the reader, the reader detects it and retrieves the information required by the application. The microcontroller receives that information and compares it with the credentials recognized by the system. If the credential is authorized, the controller activates the locking mechanism. In a small prototype, this may mean rotating a servo motor to an unlocked position and later returning it to the locked position.

What is RFID?

RFID stands for Radio Frequency Identification. It allows information stored in an RFID tag to be read wirelessly using radio-frequency communication.

An RFID tag may be built into a card, key fob, sticker, label, or another small form factor. Depending on the RFID technology, a tag can contain an integrated circuit and antenna that interact with the reader.

The RFID reader provides the wireless interface between the tag and the electronics. A commonly used module in hobby and prototype projects is the MFRC522, which can communicate with compatible microcontrollers such as Arduino boards and ESP32-based systems.

What happens when an RFID card is scanned?

First, the reader detects a compatible tag within its operating range. It then communicates with the tag and obtains the identification information required by the application.

Next, the reader passes the relevant data to the microcontroller. Many simple prototype systems use an identifier such as the tag UID as part of their authorization logic.

The firmware then checks whether the detected credential is authorized. Conceptually, the process is: scanned ID → compare with authorized credentials → allow or deny.

If the credential is accepted, the microcontroller sends a control signal to the locking mechanism. If it is not recognized, the system can keep the lock secured and optionally provide feedback through an LED, buzzer, display, or another output.

Main components of an RFID door lock

The RFID reader handles communication with the tag. The RFID card or key fob provides the credential used by the system. The microcontroller acts as the central controller and can read RFID data, perform authorization checks, control the lock, manage timing, and operate user feedback.

The locking mechanism is the part that physically secures or releases the mechanism. A servo motor is convenient for many small prototypes because its position can be controlled through firmware. Other designs can use solenoids, electromagnetic locks, electronic strikes, or other electrically controlled hardware.

The power supply is equally important. The reader, controller, and locking mechanism need suitable power, and motors or solenoids can have substantially different current requirements from the microcontroller. Power planning should therefore be part of the design from the beginning.

RFID door locks with Arduino

Arduino-compatible boards are commonly used for RFID door-lock prototypes because they make it straightforward to connect readers, motors, indicators, and other components.

A simplified architecture is RFID reader → Arduino → servo motor. The Arduino checks for a detected tag, reads the relevant identifier, compares it with the authorized credentials, and operates the servo when access is allowed.

This demonstrates a fundamental embedded-system pattern: input → processing → decision → output. The exact implementation depends on the RFID module, development board, library, locking hardware, and desired behavior.

Can an ESP32 be used for an RFID door lock?

Yes. An ESP32 can communicate with compatible RFID readers and is especially useful when the project needs additional connectivity or processing capabilities.

For example, an ESP32-based access-control prototype could combine RFID with Wi-Fi, additional sensors, data logging, a web interface, or other network functionality. However, adding connectivity also introduces additional software and security considerations.

For a simple standalone RFID lock, networking may not be necessary. For a connected system, an ESP32 can provide a practical foundation.

RFID authentication and authorization

One important distinction is that reading an RFID tag and deciding whether access should be granted are separate tasks.

A basic prototype might contain a list of authorized identifiers in its firmware. When a tag is scanned, the controller checks the received identifier against that list. More advanced systems can use other credential-management approaches.

The security of a real access-control product therefore depends on much more than simply connecting an RFID reader to an Arduino. The RFID technology, authentication method, credential storage, firmware, physical lock, power system, and overall architecture all matter.

RFID door locks and servo motors

Servo motors are useful in small RFID locking prototypes because the controller can command a specific position.

After an authorized RFID credential is detected, the controller can rotate the servo to release the mechanism. After the programmed condition is reached, it can return the servo to the locked position.

This approach is well suited to small demonstrations and prototype mechanisms. A full-size physical door may require different locking hardware based on the mechanical load, environment, power requirements, safety requirements, and intended application.

RFID compared with a traditional key

A traditional key provides mechanical authentication, while an RFID system provides electronic authentication.

With a traditional lock, access depends mainly on the physical key and lock mechanism. With an RFID lock, the credential is read electronically and software participates in the access decision.

This makes an RFID system programmable and expandable, but it also means that the design has additional electronic and software dependencies.

Advantages of RFID door-lock systems

RFID can provide keyless operation, programmable access, and straightforward integration with microcontrollers. It can also be expanded with indicators, displays, sensors, logging, networking, and other embedded-system features.

For learning and prototyping, RFID is particularly useful because it demonstrates how an input device can become part of a complete embedded system.

Security and practical limitations

A simple RFID prototype should not automatically be considered a secure commercial access-control product.

Security depends on the RFID technology, authentication method, credential handling, firmware, physical locking hardware, and complete system architecture. A basic system that simply compares a tag identifier in firmware is fundamentally different from a professionally engineered access-control system using stronger authentication and protected credential management.

Other practical considerations include power failure, physical tampering, credential management, lock hardware failure, incorrect wiring, and software errors.

Common RFID door-lock problems

If an RFID reader does not detect cards, check wiring, power, communication configuration, supported tag type, software configuration, and the expected operating range.

If a card is detected but the lock does not move, the problem may be in the authorization logic, servo or lock wiring, motor power, control signal, or firmware conditions.

If a servo causes the microcontroller to reset, review the power architecture. Motors can introduce electrical disturbances and can require more current than a development board's supply path can comfortably provide.

If unknown cards are accepted, inspect the authorization logic and make sure the application clearly defines which credentials are allowed.

Where can RFID door locks be used?

RFID access systems can be considered for electronics projects, educational demonstrations, laboratory prototypes, cabinets and enclosures, equipment access, small controlled-access systems, and connected access-control prototypes.

The appropriate implementation depends on the environment and required security level.

RFID as an embedded-systems project

An RFID door lock is more than an RFID project. It combines input, processing, decision-making, and output in one practical application.

The RFID reader provides the input. The microcontroller processes the credential. Firmware performs the authorization decision. The servo, solenoid, or other mechanism provides the physical output. LEDs, buzzers, displays, or interfaces can provide feedback.

This makes an RFID access-control system a useful way to understand how hardware and firmware interact.

Frequently asked questions

What is an RFID door lock?

An RFID door lock is an electronic locking system that uses RFID credentials to identify users and control an electrically operated locking mechanism.

How does an RFID door lock work?

An RFID reader detects a compatible tag, sends its identification information to a controller, and the controller determines whether access should be granted. If authorized, it activates the lock mechanism.

Can Arduino control an RFID door lock?

Yes. An Arduino-compatible microcontroller can communicate with an RFID reader and control a suitable locking mechanism such as a servo in a prototype.

Can ESP32 be used with RFID?

Yes. ESP32 boards can communicate with compatible RFID modules and can also provide connectivity for projects that require Wi-Fi-based functionality.

What RFID module is commonly used with Arduino projects?

The MFRC522 is a commonly used RFID reader module for electronics prototypes and educational projects.

Can an RFID door lock be made with a servo motor?

Yes. Servo motors can be used in small RFID locking prototypes where the mechanical design is suitable for the servo.

Is an RFID door lock secure?

Security depends on the RFID technology, authentication method, credential handling, firmware, physical locking hardware, and overall system design. A simple hobby prototype should not automatically be treated as a high-security access-control system.

Can RFID be combined with other authentication methods?

Yes. RFID can be combined with other inputs or authentication mechanisms depending on the requirements of the project.

Build an RFID-based electronics project

RFID door locks demonstrate how identification, microcontrollers, firmware, motor control, and physical hardware can work together in a single system.

If you have an idea for an RFID access-control system or another custom electronics project, you can describe your requirements through the MECTEC Project Request form: /request-project.`,
  coverImageUrl: null,
  published: true,
};

async function main() {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(`Could not sign in as ${email}: ${error.code ?? error.message}`);
    process.exit(1);
  }

  const existing = await getDocs(query(posts, where('slug', '==', POST.slug)));

  if (existing.empty) {
    await addDoc(posts, {
      ...POST,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`Published: ${POST.title}`);
  } else {
    const document = existing.docs[0];
    await updateDoc(document.ref, {
      ...POST,
      updatedAt: serverTimestamp(),
    });
    console.log(`Updated existing post: ${POST.title}`);
  }

  console.log(`URL: /blog/${POST.slug}`);
}

main().catch((error) => {
  console.error('Blog seeding failed:', error.message);
  process.exit(1);
});
