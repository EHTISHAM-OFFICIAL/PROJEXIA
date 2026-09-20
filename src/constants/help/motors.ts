import type { HelpEntry } from "./types";

export const MOTOR_HELP: HelpEntry[] = [
  {
    id: "motor-types",
    category: "motors",
    question:
      "What is the difference between a DC motor, servo motor, and stepper motor?",
    variations: [
      "DC vs servo vs stepper",
      "Which motor should I use?",
      "What motor types are available?",
    ],
    keywords: ["DC motor", "servo", "stepper", "motor"],
    answer:
      "A DC motor is commonly used for continuous rotation and speed control. A servo motor is designed for controlled angular positioning and usually contains internal feedback/control electronics. A stepper motor moves in discrete steps and is useful when repeatable positioning is required. The correct choice depends on torque, speed, positioning accuracy, control method, and application.",
  },
  {
    id: "stepper-motor",
    category: "motors",
    question: "What is a stepper motor?",
    variations: [
      "How does a stepper motor work?",
      "Where are stepper motors used?",
    ],
    keywords: ["stepper", "motor", "steps", "positioning"],
    answer:
      "A stepper motor rotates in controlled angular steps when its coils are energized in a suitable sequence. It is commonly used for positioning applications such as mechanisms, CNC systems, robotics, and automated equipment.",
  },
  {
    id: "motor-driver",
    category: "motors",
    question: "Why do motors need motor drivers?",
    variations: [
      "Can I connect a motor directly to Arduino?",
      "Why use a motor driver?",
      "Can a microcontroller power a motor?",
    ],
    keywords: ["motor driver", "Arduino", "GPIO", "current", "motor"],
    answer:
      "A microcontroller GPIO pin normally cannot safely supply the current required by many motors. A motor driver provides the required switching/current path and may also provide direction, speed, braking, or step control depending on the motor type.",
  },
  {
    id: "servo-use",
    category: "motors",
    question: "When should I use a servo motor?",
    variations: [
      "What are servos good for?",
      "Can a servo control position?",
      "Where are servo motors used?",
    ],
    keywords: ["servo", "position", "angle", "motor"],
    answer:
      "Servo motors are useful when controlled angular positioning is required, such as moving a mechanism to a particular angle. Examples include robotic joints, small actuators, pan-tilt mechanisms, and automated locks.",
  },
  {
    id: "motor-current",
    category: "motors",
    question: "Why does my motor draw too much current?",
    variations: [
      "Why is my motor consuming high current?",
      "Motor current is very high",
      "Why does the motor stall?",
    ],
    keywords: ["motor", "current", "stall", "overload", "power"],
    answer:
      "High motor current can occur during startup, acceleration, mechanical loading, or a stall condition. Check the motor rating, supply capability, driver rating, mechanical load, wiring, and whether the motor is being driven correctly.",
  },
  {
    id: "motor-control",
    category: "motors",
    question: "Can MECTEC build motor-control systems?",
    variations: [
      "Can you control motors?",
      "Can MECTEC automate motors?",
      "Can you build a motor controller?",
    ],
    keywords: [
      "motor control",
      "motor controller",
      "automation",
      "PWM",
      "driver",
    ],
    answer:
      "Yes. Motor-control projects can use suitable drivers, PWM, direction control, feedback, limit switches, encoders, and microcontrollers depending on the required speed, torque, and positioning behavior.",
  },
];
