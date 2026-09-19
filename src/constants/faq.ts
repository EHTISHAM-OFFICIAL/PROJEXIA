export const FAQ_ITEMS = [
  {
    question: 'How does a project actually start?',
    answer:
      'Fill in the request form with as much or as little technical detail as you have. MECTEC replies with a real scope and, where possible, a rough cost — not a form-letter asking for more information.',
  },
  {
    question: 'Do I get the source code and schematics when it\u2019s done?',
    answer:
      'Yes, always. Firmware, wiring notes and any schematics are handed over with the finished build — nothing is kept back or locked to a proprietary format.',
  },
  {
    question: 'I don\u2019t know which microcontroller or platform I need — is that a problem?',
    answer:
      'No. Most of the request form is optional for exactly that reason. Describe what the system should do, and platform, sensor and component choices can be worked out together.',
  },
  {
    question: 'What if my budget is small, or I\u2019m not sure what things cost?',
    answer:
      '\u201CNot decided yet\u201D is a valid answer on the request form. A budget range just helps suggest components that actually fit — it isn\u2019t a commitment either way.',
  },
  {
    question: 'Can you work from a rough sketch or an existing broken prototype?',
    answer:
      'Yes — the request form has a place to mention existing hardware or code you already have, and to attach photos or sketches.',
  },
  {
    question: 'How long does a typical build take?',
    answer:
      'It depends entirely on scope — a single-sensor build is days, a connected multi-channel system is weeks. Timeline expectations get set during scoping, before any work starts, and the request form has a field for deadlines if you have one.',
  },
] as const;
