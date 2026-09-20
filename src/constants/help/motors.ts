import type { HelpEntry } from "./types";

export const MOTOR_HELP: HelpEntry[] = [
  // ─────────────────────────────────────────────────────────────
  // FOUNDATIONS / MOTOR TYPES
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-types",
    category: "motors",
    intent: "comparison",
    question:
      "What is the difference between a DC motor, servo motor, and stepper motor?",
    variations: [
      "What is the difference between a DC motor, servo motor, and stepper motor",
      "DC vs servo vs stepper",
      "Which motor should I use",
      "What motor types are available",
      "Motor type comparison",
      "Compare DC servo stepper motors",
    ],
    keywords: ["DC motor", "servo", "stepper", "motor", "comparison"],
    answer:
      "A DC motor is commonly used for continuous rotation and speed control. A servo motor is designed for controlled angular positioning and usually contains internal feedback/control electronics. A stepper motor moves in discrete steps and is useful when repeatable positioning is required. The correct choice depends on torque, speed, positioning accuracy, control method, and application.",
    priority: 14,
  },

  {
    id: "motor-purpose",
    category: "motors",
    intent: "purpose",
    question: "What are motors used for?",
    variations: [
      "What are motors used for",
      "What is a motor used for",
      "What can a motor do",
      "Where are motors used",
      "What is the purpose of a motor",
      "Motor applications",
    ],
    keywords: ["motor", "used", "purpose", "application", "motion"],
    answer:
      "Motors are used to produce motion in devices such as robots, drones, fans, pumps, conveyors, CNC machines, 3D printers, cameras and automated mechanisms. The right motor depends on the required torque, speed and positioning.",
    priority: 14,
  },

  // ─────────────────────────────────────────────────────────────
  // HOW TO USE (procedure entries)
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-servo-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a servo motor?",
    variations: [
      "How do I use a servo motor",
      "How to use a servo",
      "How to use servo motor",
      "How do I use servo",
      "Using a servo motor",
      "How to connect a servo",
      "How to control a servo",
      "Servo motor usage",
      "Servo tutorial",
      "Getting started with servo",
    ],
    keywords: ["servo", "use", "how", "connect", "control", "motor"],
    answer:
      "To use a servo: connect its power (typically 5–6V), ground, and signal wire to a PWM-capable output. Drive the signal at about 50 Hz, where ~1 ms pulse ≈ 0°, ~1.5 ms ≈ 90° and ~2 ms ≈ 180°. If the servo draws more current than the controller can supply, power it from a separate supply with a shared ground.",
    priority: 15,
  },

  {
    id: "motor-servo-continuous-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a continuous rotation servo?",
    variations: [
      "How do I use a continuous rotation servo",
      "How to use a continuous servo",
      "How to use a 360 servo",
      "How to control a continuous rotation servo",
      "Using a continuous servo",
      "Continuous servo tutorial",
      "Getting started with continuous servo",
    ],
    keywords: ["servo", "continuous", "use", "how", "rotation", "motor"],
    answer:
      "A continuous rotation servo uses the same three wires as a standard servo, but pulse width controls speed and direction instead of angle. Roughly 1.5 ms stops it, values below rotate one way, and values above rotate the other. The exact stop value varies by servo, so calibrate it first.",
    priority: 15,
  },

  {
    id: "motor-stepper-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a stepper motor?",
    variations: [
      "How do I use a stepper motor",
      "How to use a stepper",
      "How to use stepper motor",
      "How do I use stepper",
      "Using a stepper motor",
      "How to connect a stepper",
      "How to control a stepper",
      "Stepper motor usage",
      "Stepper tutorial",
      "Getting started with stepper",
    ],
    keywords: ["stepper", "use", "how", "driver", "connect", "motor"],
    answer:
      "To use a stepper: connect the motor coils to a driver such as A4988, DRV8825 or TMC2209, set the driver current to match the motor rating, and drive the driver with step and direction signals from the controller. Ramp speed up and down to avoid missed steps at higher speeds.",
    priority: 15,
  },

  {
    id: "motor-bldc-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a BLDC motor?",
    variations: [
      "How do I use a BLDC motor",
      "How to use a brushless motor",
      "How to use BLDC",
      "How to drive a BLDC motor",
      "Using a BLDC motor",
      "Brushless motor usage",
      "BLDC tutorial",
      "Getting started with BLDC",
    ],
    keywords: ["bldc", "brushless", "use", "how", "esc", "motor"],
    answer:
      "A BLDC motor needs an ESC or a dedicated driver to perform electronic commutation. Connect the three motor phases to the controller, supply the correct voltage, and send the control signal (often a servo-style PWM or a digital protocol). Configure direction, startup, and any Hall sensor or sensorless settings per the controller's documentation.",
    priority: 15,
  },

  {
    id: "motor-dc-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a DC motor?",
    variations: [
      "How do I use a DC motor",
      "How to use a DC motor",
      "How to use dc motor",
      "How do I use a brushed motor",
      "Using a DC motor",
      "How to connect a DC motor",
      "How to control a DC motor",
      "DC motor usage",
      "DC motor tutorial",
      "Getting started with DC motor",
    ],
    keywords: ["dc", "brushed", "motor", "use", "how", "driver"],
    answer:
      "To use a DC motor, connect it to a suitable driver such as an H-bridge or MOSFET driver rather than directly to a GPIO. Drive the driver with PWM to control speed and with direction pins to control rotation. Add a flyback diode and decoupling where inductive kickback or noise is a concern.",
    priority: 15,
  },

  {
    id: "motor-solenoid-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a solenoid?",
    variations: [
      "How do I use a solenoid",
      "How to use a solenoid",
      "How to use solenoid",
      "How do I control a solenoid",
      "Using a solenoid",
      "How to connect a solenoid",
      "Solenoid usage",
      "Solenoid tutorial",
      "Getting started with solenoid",
    ],
    keywords: ["solenoid", "use", "how", "coil", "driver", "valve"],
    answer:
      "A solenoid is driven through a transistor, MOSFET or relay that can handle its current. Connect a flyback diode across the coil to protect the driver from voltage spikes when it turns off. Check the rated voltage and duty cycle so the coil does not overheat during continuous operation.",
    priority: 15,
  },

  {
    id: "motor-gear-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a gear motor?",
    variations: [
      "How do I use a gear motor",
      "How to use a geared motor",
      "How to use gear motor",
      "How do I use a gearbox motor",
      "Using a gear motor",
      "Gear motor usage",
      "Geared motor tutorial",
      "Getting started with gear motor",
    ],
    keywords: ["gear", "motor", "use", "how", "torque", "gearbox"],
    answer:
      "A gear motor is driven like any comparable DC or stepper motor, through a suitable driver. Because gearing increases torque and lowers output speed, size the driver and supply for the gearbox output load, not just the motor's free-running current. Verify the output shaft speed and torque against what your mechanism actually needs.",
    priority: 15,
  },

  {
    id: "motor-linear-actuator-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a linear actuator?",
    variations: [
      "How do I use a linear actuator",
      "How to use a linear actuator",
      "How to use linear actuator",
      "How do I use an actuator",
      "Using a linear actuator",
      "Linear actuator usage",
      "Linear actuator tutorial",
      "Getting started with linear actuator",
    ],
    keywords: ["linear", "actuator", "use", "how", "control", "motion"],
    answer:
      "A linear actuator is driven like a DC or stepper motor, usually through a driver or relay. Wire the drive lines to a suitable driver, provide the rated voltage and current, and if the actuator has feedback (limit switches or potentiometer), use that to stop travel at the ends and control position.",
    priority: 15,
  },

  {
    id: "motor-esc-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use an ESC?",
    variations: [
      "How do I use an ESC",
      "How to use an ESC",
      "How to use esc",
      "How do I control an ESC",
      "Using an ESC",
      "ESC usage",
      "ESC tutorial",
      "Getting started with ESC",
      "How to connect an ESC",
    ],
    keywords: ["esc", "use", "how", "control", "motor", "signal"],
    answer:
      "To use an ESC: connect the three motor phases to the ESC, connect the power leads to a battery or supply, and connect the signal wire to the controller. Most ESCs are calibrated by powering them and sending the minimum-throttle signal first, then maximum, following the manufacturer's procedure. After calibration, the signal controls motor speed.",
    priority: 15,
  },

  {
    id: "motor-l298n-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use an L298N motor driver?",
    variations: [
      "How do I use an L298N motor driver",
      "How to use L298N",
      "How to use l298n",
      "How do I connect an L298N",
      "Using L298N",
      "L298N tutorial",
      "Getting started with L298N",
      "L298N usage",
    ],
    keywords: ["l298n", "driver", "use", "how", "motor", "connect"],
    answer:
      "To use an L298N module: connect the motor leads to one of the two output channels, connect the motor supply and ground, and connect the control pins (IN1/IN2 for direction, ENA for PWM speed) to the controller. Share a common ground between the controller and the module, and choose a motor supply within the module's rated voltage and current.",
    priority: 15,
  },

  {
    id: "motor-l293d-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use an L293D motor driver?",
    variations: [
      "How do I use an L293D motor driver",
      "How to use L293D",
      "How to use l293d",
      "How do I connect an L293D",
      "Using L293D",
      "L293D tutorial",
      "Getting started with L293D",
      "L293D usage",
    ],
    keywords: ["l293d", "driver", "use", "how", "motor", "connect"],
    answer:
      "To use an L293D: connect the motor to one of the two outputs, connect the motor supply (Vcc2) and the logic supply (Vcc1), then drive the enable pin with PWM and the two input pins for direction. Add the recommended flyback diodes if they are not already in the IC. Keep currents within the chip's rating.",
    priority: 15,
  },

  {
    id: "motor-tb6612-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a TB6612 motor driver?",
    variations: [
      "How do I use a TB6612 motor driver",
      "How to use TB6612",
      "How to use tb6612",
      "How do I connect a TB6612",
      "Using TB6612",
      "TB6612 tutorial",
      "Getting started with TB6612",
      "TB6612 usage",
    ],
    keywords: ["tb6612", "driver", "use", "how", "motor", "connect"],
    answer:
      "To use a TB6612: connect the motor to one of the two outputs, connect VM (motor supply) and VCC (logic supply), and drive the direction pins and PWM pin from the controller. Set the standby (STBY) pin high to enable the driver. Keep motor current within the chip's rating and share a common ground.",
    priority: 15,
  },

  {
    id: "motor-a4988-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use an A4988 stepper driver?",
    variations: [
      "How do I use an A4988 stepper driver",
      "How to use A4988",
      "How to use a4988",
      "How do I connect an A4988",
      "Using A4988",
      "A4988 tutorial",
      "Getting started with A4988",
      "A4988 usage",
    ],
    keywords: ["a4988", "driver", "stepper", "use", "how", "connect"],
    answer:
      "To use an A4988: connect one motor coil to each pair of output pins, connect the motor supply and ground, and connect STEP, DIR and ENABLE to the controller. Set the current using the Vref trimmer to match the motor's rated current, and set the microstep pins for the resolution you want. Ramp step rates so the motor does not stall.",
    priority: 15,
  },

  {
    id: "motor-drv8825-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a DRV8825 stepper driver?",
    variations: [
      "How do I use a DRV8825 stepper driver",
      "How to use DRV8825",
      "How to use drv8825",
      "How do I connect a DRV8825",
      "Using DRV8825",
      "DRV8825 tutorial",
      "Getting started with DRV8825",
      "DRV8825 usage",
    ],
    keywords: ["drv8825", "driver", "stepper", "use", "how", "connect"],
    answer:
      "To use a DRV8825: connect the motor coils to the output pins, connect the motor supply and ground, and connect STEP, DIR and ENABLE to the controller. Set current using the Vref trimmer (its scaling differs from A4988), and configure microstepping via the M0/M1/M2 pins. Provide adequate heatsinking if running near the chip's current limit.",
    priority: 15,
  },

  {
    id: "motor-tmc2209-how-to-use",
    category: "motors",
    intent: "procedure",
    question: "How do I use a TMC2209 stepper driver?",
    variations: [
      "How do I use a TMC2209 stepper driver",
      "How to use TMC2209",
      "How to use tmc2209",
      "How do I connect a TMC2209",
      "Using TMC2209",
      "TMC2209 tutorial",
      "Getting started with TMC2209",
      "TMC2209 usage",
    ],
    keywords: ["tmc2209", "driver", "stepper", "use", "how", "connect"],
    answer:
      "To use a TMC2209: connect the motor coils to the output pins, connect the motor supply and ground, and connect STEP, DIR and ENABLE to the controller. Configure current and microstepping either through the UART interface or via the hardware pins, depending on your board. The TMC2209 is designed for quiet operation and includes stall detection via StallGuard.",
    priority: 15,
  },
  
  {
    id: "motor-dc",
    category: "motors",
    intent: "definition",
    question: "What is a DC motor?",
    variations: [
      "What is a DC motor",
      "How does a DC motor work",
      "What does a DC motor do",
      "DC motor basics",
      "Brushed DC motor",
      "DC motor definition",
    ],
    keywords: ["dc", "motor", "brushed", "rotation", "speed"],
    answer:
      "A DC motor converts electrical energy into continuous rotational motion. Brushed DC motors are simple to drive and commonly used for fans, wheels, pumps and other applications where continuous rotation is needed.",
    priority: 13,
  },

  {
    id: "motor-bldc",
    category: "motors",
    intent: "definition",
    question: "What is a BLDC motor?",
    variations: [
      "What is a BLDC motor",
      "What is a brushless motor",
      "BLDC vs brushed motor",
      "How does BLDC motor work",
      "Brushless DC motor",
      "BLDC motor definition",
    ],
    keywords: ["bldc", "brushless", "motor", "esc", "commutation"],
    answer:
      "A BLDC, or Brushless DC, motor uses electronic commutation instead of brushes. It is more efficient and longer-lasting than a brushed motor but requires a controller or ESC to operate.",
    priority: 13,
  },

  {
    id: "motor-brushed-vs-brushless",
    category: "motors",
    intent: "comparison",
    question: "Brushed vs brushless motor — which is better?",
    variations: [
      "Brushed vs brushless motor",
      "Brushed vs brushless",
      "Should I use brushed or brushless",
      "Difference brushed brushless",
      "Brushless vs brushed DC",
      "Brushed vs brushless comparison",
    ],
    keywords: ["brushed", "brushless", "motor", "compare", "difference"],
    answer:
      "Brushed motors are simple and inexpensive but wear out due to brush contact. Brushless motors are more efficient, quieter and longer-lasting but require more complex control electronics. The choice depends on cost, lifespan, efficiency and control needs.",
    priority: 14,
  },

  {
    id: "motor-stepper",
    category: "motors",
    intent: "definition",
    question: "What is a stepper motor?",
    variations: [
      "What is a stepper motor",
      "How does a stepper motor work",
      "Where are stepper motors used",
      "Stepper motor basics",
      "Stepper motor definition",
      "Stepper motor purpose",
    ],
    keywords: ["stepper", "motor", "steps", "positioning", "control"],
    answer:
      "A stepper motor rotates in controlled angular steps when its coils are energized in a suitable sequence. It is commonly used for positioning applications such as mechanisms, CNC systems, robotics, and automated equipment.",
    priority: 13,
  },

  {
    id: "motor-servo",
    category: "motors",
    intent: "definition",
    question: "What is a servo motor?",
    variations: [
      "What is a servo motor",
      "What does servo do",
      "How to control servo",
      "Servo vs DC motor",
      "Servo motor types",
      "Servo motor definition",
    ],
    keywords: ["servo", "motor", "position", "control", "pwm"],
    answer:
      "A servo motor is designed for controlled angular positioning. It contains internal feedback and is controlled by a PWM signal.",
    priority: 13,
  },

  {
    id: "motor-servo-use",
    category: "motors",
    intent: "purpose",
    question: "When should I use a servo motor?",
    variations: [
      "When should I use a servo motor",
      "What are servos good for",
      "Can a servo control position",
      "Where are servo motors used",
      "Servo motor applications",
      "Servo motor use cases",
    ],
    keywords: ["servo", "position", "angle", "motor", "application"],
    answer:
      "Servo motors are useful when controlled angular positioning is required, such as moving a mechanism to a particular angle. Examples include robotic joints, small actuators, pan-tilt mechanisms, and automated locks.",
    priority: 13,
  },

  {
    id: "motor-gear",
    category: "motors",
    intent: "definition",
    question: "What is a gear motor?",
    variations: [
      "What is a gear motor",
      "Geared motor",
      "Gear motor vs normal motor",
      "Why use gear motor",
      "Gearbox motor",
      "Gear motor definition",
    ],
    keywords: ["gear", "motor", "gearbox", "torque", "reduction"],
    answer:
      "A gear motor combines a motor with a gearbox to increase torque and reduce output speed. It is used where higher torque at lower speed is needed.",
    priority: 13,
  },

  {
    id: "motor-gear-ratio",
    category: "motors",
    intent: "definition",
    question: "What is gear ratio?",
    variations: [
      "What is gear ratio",
      "Gear ratio motor",
      "How gear ratio works",
      "Calculate gear ratio",
      "Gear reduction",
      "Gear ratio definition",
    ],
    keywords: ["gear", "ratio", "motor", "torque", "speed"],
    answer:
      "Gear ratio describes the relationship between input and output speed. A higher ratio increases torque and reduces output speed.",
    priority: 13,
  },

  {
    id: "motor-linear-actuator",
    category: "motors",
    intent: "definition",
    question: "What is a linear actuator?",
    variations: [
      "What is a linear actuator",
      "Linear actuator motor",
      "How does linear actuator work",
      "Linear actuator uses",
      "Linear vs rotary motor",
      "Linear actuator definition",
    ],
    keywords: ["linear", "actuator", "motor", "motion", "push"],
    answer:
      "A linear actuator produces straight-line motion, often using a motor with a lead screw, belt or other mechanism. It is used for lifts, sliding mechanisms and applications needing controlled push or pull.",
    priority: 13,
  },

  {
    id: "motor-solenoid",
    category: "motors",
    intent: "definition",
    question: "What is a solenoid?",
    variations: [
      "What is a solenoid",
      "What does solenoid do",
      "How to control solenoid",
      "Solenoid vs motor",
      "Solenoid valve",
      "Solenoid definition",
    ],
    keywords: ["solenoid", "coil", "actuator", "valve", "control"],
    answer:
      "A solenoid is an electromagnetic actuator that converts electrical current into linear motion. It is used in valves, locks and other mechanisms.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // MOTOR DRIVING
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-driver",
    category: "motors",
    intent: "definition",
    question: "Why do motors need motor drivers?",
    variations: [
      "Why do motors need motor drivers",
      "Can I connect a motor directly to Arduino",
      "Why use a motor driver",
      "Can a microcontroller power a motor",
      "Motor driver purpose",
      "Why motor drivers are needed",
    ],
    keywords: ["motor driver", "Arduino", "GPIO", "current", "motor"],
    answer:
      "A microcontroller GPIO pin normally cannot safely supply the current required by many motors. A motor driver provides the required switching/current path and may also provide direction, speed, braking, or step control depending on the motor type.",
    priority: 15,
  },

  {
    id: "motor-driver-selection",
    category: "motors",
    intent: "procedure",
    question: "How do I choose a motor driver?",
    variations: [
      "How do I choose a motor driver",
      "Motor driver selection",
      "Which motor driver to use",
      "Best motor driver",
      "Choose motor driver",
      "Motor driver selection guide",
    ],
    keywords: ["driver", "motor", "selection", "current", "voltage"],
    answer:
      "Choose a driver rated for the motor voltage and current, with the required control interface, direction, braking and protection features. Consider peak and continuous current requirements.",
    priority: 15,
  },

  {
    id: "motor-hbridge",
    category: "motors",
    intent: "definition",
    question: "What is an H-bridge?",
    variations: [
      "What is an H-bridge",
      "H bridge motor driver",
      "How does H bridge work",
      "H bridge circuit",
      "Why use H bridge",
      "H-bridge definition",
    ],
    keywords: ["hbridge", "motor", "driver", "direction", "control"],
    answer:
      "An H-bridge is a circuit that allows a DC motor to be driven in both directions. It uses four switches to control the polarity applied to the motor.",
    priority: 13,
  },

  {
    id: "motor-esc",
    category: "motors",
    intent: "definition",
    question: "What is an ESC?",
    variations: [
      "What is an ESC",
      "ESC motor",
      "Electronic speed controller",
      "What does ESC do",
      "How to use ESC",
      "ESC definition",
    ],
    keywords: ["esc", "motor", "speed", "controller", "bldc"],
    answer:
      "An ESC, or Electronic Speed Controller, drives a brushless motor and controls its speed. It is controlled by a PWM or digital signal and is common in drones and RC vehicles.",
    priority: 13,
  },

  {
    id: "motor-l298n",
    category: "motors",
    intent: "definition",
    question: "What is an L298N motor driver?",
    variations: [
      "What is an L298N motor driver",
      "L298N motor driver",
      "How to use L298N",
      "L298N vs L293D",
      "L298N wiring",
      "L298N definition",
    ],
    keywords: ["l298n", "driver", "motor", "hbridge", "module"],
    answer:
      "The L298N is a dual H-bridge motor driver module commonly used with Arduino. It can control two DC motors or one stepper motor, but has limited efficiency due to its bipolar transistor output stage.",
    priority: 13,
  },

  {
    id: "motor-l293d",
    category: "motors",
    intent: "definition",
    question: "What is an L293D motor driver?",
    variations: [
      "What is an L293D motor driver",
      "L293D motor driver",
      "L293D vs L298N",
      "How to use L293D",
      "L293D wiring",
      "L293D definition",
    ],
    keywords: ["l293d", "driver", "motor", "hbridge", "ic"],
    answer:
      "The L293D is a dual H-bridge IC for small DC motors. It is easy to use but has limited current capability and significant voltage drop.",
    priority: 13,
  },

  {
    id: "motor-tb6612",
    category: "motors",
    intent: "definition",
    question: "What is a TB6612 motor driver?",
    variations: [
      "What is a TB6612 motor driver",
      "TB6612 motor driver",
      "TB6612 vs L298N",
      "How to use TB6612",
      "TB6612 wiring",
      "TB6612 definition",
    ],
    keywords: ["tb6612", "driver", "motor", "hbridge", "module"],
    answer:
      "The TB6612 is a MOSFET-based dual H-bridge driver. It is more efficient than the L298N and suitable for small to medium DC motors.",
    priority: 13,
  },

  {
    id: "motor-a4988",
    category: "motors",
    intent: "definition",
    question: "What is an A4988 stepper driver?",
    variations: [
      "What is an A4988 stepper driver",
      "A4988 stepper driver",
      "How to use A4988",
      "A4988 vs DRV8825",
      "A4988 wiring",
      "A4988 definition",
    ],
    keywords: ["a4988", "stepper", "driver", "motor", "microstepping"],
    answer:
      "The A4988 is a popular stepper motor driver with adjustable current, microstepping and step/direction interface. It is commonly used with 3D printers and CNC machines.",
    priority: 13,
  },

  {
    id: "motor-drv8825",
    category: "motors",
    intent: "definition",
    question: "What is a DRV8825 stepper driver?",
    variations: [
      "What is a DRV8825 stepper driver",
      "DRV8825 stepper driver",
      "How to use DRV8825",
      "DRV8825 vs A4988",
      "DRV8825 wiring",
      "DRV8825 definition",
    ],
    keywords: ["drv8825", "stepper", "driver", "motor", "microstepping"],
    answer:
      "The DRV8825 is a stepper driver similar to the A4988 but supports higher voltage and microstepping up to 1/32. It uses a step/direction interface.",
    priority: 13,
  },

  {
    id: "motor-tmc2209",
    category: "motors",
    intent: "definition",
    question: "What is a TMC2209 stepper driver?",
    variations: [
      "What is a TMC2209 stepper driver",
      "TMC2209 stepper driver",
      "TMC2209 vs A4988",
      "TMC2209 quiet stepper",
      "TMC2209 UART",
      "TMC2209 definition",
    ],
    keywords: ["tmc2209", "stepper", "driver", "motor", "quiet"],
    answer:
      "The TMC2209 is a quiet, efficient stepper driver with UART configuration, StealthChop and StallGuard features. It is popular in 3D printers.",
    priority: 13,
  },

  {
    id: "motor-servo-driver",
    category: "motors",
    intent: "requirements",
    question: "Do servos need a driver?",
    variations: [
      "Do servos need a driver",
      "Servo driver required",
      "Can I connect servo directly",
      "Servo power supply",
      "Servo driver board",
      "Servo driver requirements",
    ],
    keywords: ["servo", "driver", "power", "supply", "control"],
    answer:
      "Small hobby servos can be driven directly from a microcontroller signal, but they require an adequate power supply. Larger or multiple servos may need a separate driver or power distribution board.",
    priority: 13,
  },

  {
    id: "motor-brushless-driver",
    category: "motors",
    intent: "procedure",
    question: "How do I drive a BLDC motor?",
    variations: [
      "How do I drive a BLDC motor",
      "BLDC driver",
      "How to control brushless motor",
      "BLDC ESC",
      "Sensorless BLDC control",
      "BLDC motor driving",
    ],
    keywords: ["bldc", "driver", "esc", "motor", "brushless"],
    answer:
      "BLDC motors require a controller that performs electronic commutation. Options include dedicated ESCs, sensorless controllers and driver ICs with Hall sensor feedback.",
    priority: 13,
  },

  {
    id: "motor-brushed-driver",
    category: "motors",
    intent: "procedure",
    question: "How do I drive a brushed DC motor?",
    variations: [
      "How do I drive a brushed DC motor",
      "Brushed DC motor driver",
      "How to control DC motor",
      "DC motor H bridge",
      "DC motor speed control",
      "Brushed DC motor driving",
    ],
    keywords: ["dc", "brushed", "driver", "motor", "hbridge"],
    answer:
      "A brushed DC motor can be driven using a transistor, MOSFET or H-bridge. PWM controls speed; H-bridge controls direction.",
    priority: 13,
  },

  {
    id: "motor-stepper-driver",
    category: "motors",
    intent: "procedure",
    question: "What stepper motor driver should I use?",
    variations: [
      "What stepper motor driver should I use",
      "Best stepper driver",
      "A4988 vs DRV8825",
      "Stepper driver selection",
      "How to choose stepper driver",
      "Stepper driver options",
    ],
    keywords: ["stepper", "driver", "a4988", "drv8825", "tb6600"],
    answer:
      "Common stepper drivers include A4988, DRV8825, TMC2208/2209 and TB6600. Selection depends on motor current, voltage, microstepping requirements and control interface.",
    priority: 13,
  },

  {
    id: "motor-microstepping",
    category: "motors",
    intent: "definition",
    question: "What is microstepping?",
    variations: [
      "What is microstepping",
      "Microstepping stepper motor",
      "Why use microstepping",
      "Microstepping vs full step",
      "How does microstepping work",
      "Microstepping definition",
    ],
    keywords: ["microstepping", "stepper", "motor", "step", "smooth"],
    answer:
      "Microstepping divides each full step into smaller steps by varying current in the coils. It provides smoother motion, less vibration and finer positioning but may reduce torque per microstep.",
    priority: 13,
  },

  {
    id: "motor-microstep-torque",
    category: "motors",
    intent: "comparison",
    question: "Does microstepping reduce torque?",
    variations: [
      "Does microstepping reduce torque",
      "Microstepping torque",
      "Does microstepping lose torque",
      "Microstep torque loss",
      "Microstepping vs torque",
      "Microstepping and torque",
    ],
    keywords: ["microstepping", "torque", "stepper", "motor", "step"],
    answer:
      "Microstepping does not reduce holding torque, but incremental torque per microstep is smaller, so position accuracy under load may be affected. Full-step modes typically provide the highest incremental torque.",
    priority: 13,
  },

  {
    id: "motor-stepper-bipolar",
    category: "motors",
    intent: "definition",
    question: "What is a bipolar stepper motor?",
    variations: [
      "What is a bipolar stepper motor",
      "Bipolar stepper motor",
      "Bipolar vs unipolar stepper",
      "How to drive bipolar stepper",
      "Bipolar stepper wiring",
      "Bipolar stepper definition",
    ],
    keywords: ["stepper", "bipolar", "motor", "driver", "coil"],
    answer:
      "A bipolar stepper motor has two coils with no center tap. It requires an H-bridge driver such as A4988, DRV8825 or L298N to reverse current in each coil.",
    priority: 13,
  },

  {
    id: "motor-stepper-unipolar",
    category: "motors",
    intent: "definition",
    question: "What is a unipolar stepper motor?",
    variations: [
      "What is a unipolar stepper motor",
      "Unipolar stepper motor",
      "Unipolar vs bipolar stepper",
      "How to drive unipolar stepper",
      "Unipolar stepper wiring",
      "Unipolar stepper definition",
    ],
    keywords: ["stepper", "unipolar", "motor", "driver", "coil"],
    answer:
      "A unipolar stepper motor has center-tapped coils, allowing simpler drive circuits such as ULN2003. It provides less torque than an equivalent bipolar configuration.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // CONTROL / BEHAVIOR
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-control",
    category: "motors",
    intent: "capability",
    question: "Can MECTEC build motor-control systems?",
    variations: [
      "Can MECTEC build motor-control systems",
      "Can you control motors",
      "Can MECTEC automate motors",
      "Can you build a motor controller",
      "Motor control project",
      "Motor control capability",
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
    priority: 13,
  },

  {
    id: "motor-speed",
    category: "motors",
    intent: "procedure",
    question: "How do I control motor speed?",
    variations: [
      "How do I control motor speed",
      "Motor speed control",
      "How to change motor speed",
      "PWM motor speed",
      "Control RPM",
      "Motor speed methods",
    ],
    keywords: ["speed", "motor", "control", "pwm", "rpm"],
    answer:
      "Speed can be controlled using PWM for DC motors, pulse frequency for steppers, or control signals for servos and BLDC motors. Feedback may be required for precise speed control.",
    priority: 15,
  },

  {
    id: "motor-direction",
    category: "motors",
    intent: "procedure",
    question: "How do I change motor direction?",
    variations: [
      "How do I change motor direction",
      "Motor direction control",
      "How to reverse motor",
      "Change rotation direction",
      "H bridge direction",
      "Motor direction change",
    ],
    keywords: ["direction", "motor", "reverse", "hbridge", "rotation"],
    answer:
      "For DC motors, direction is changed by reversing the polarity using an H-bridge. For steppers, the step sequence is reversed. For servos, the control signal determines direction.",
    priority: 13,
  },

  {
    id: "motor-pwm-frequency",
    category: "motors",
    intent: "procedure",
    question: "What PWM frequency should I use for a motor?",
    variations: [
      "What PWM frequency should I use for a motor",
      "Motor PWM frequency",
      "Best PWM for motor",
      "PWM frequency selection",
      "Why does my motor whine",
      "Motor PWM frequency",
    ],
    keywords: ["pwm", "frequency", "motor", "whine", "control"],
    answer:
      "Motor PWM frequency typically ranges from a few kHz to tens of kHz. Higher frequencies reduce audible noise but increase switching losses. The correct value depends on the driver and motor.",
    priority: 13,
  },

  {
    id: "motor-pwm-vs-voltage",
    category: "motors",
    intent: "comparison",
    question: "Can I control motor speed with voltage instead of PWM?",
    variations: [
      "Can I control motor speed with voltage instead of PWM",
      "Voltage vs PWM motor control",
      "Motor speed voltage",
      "PWM vs analog motor",
      "Which is better PWM or voltage",
      "PWM vs voltage motor control",
    ],
    keywords: ["pwm", "voltage", "motor", "speed", "control"],
    answer:
      "Both methods work. PWM is more efficient because it switches the driver fully on and off. Voltage control can be simpler but wastes power in a linear regulator or driver.",
    priority: 13,
  },

  {
    id: "motor-braking",
    category: "motors",
    intent: "definition",
    question: "What is motor braking?",
    variations: [
      "What is motor braking",
      "Motor braking types",
      "Dynamic braking",
      "Regenerative braking",
      "How to stop motor quickly",
      "Motor braking definition",
    ],
    keywords: ["braking", "motor", "stop", "dynamic", "regenerative"],
    answer:
      "Braking slows or stops a motor. Methods include coasting, dynamic braking (shorting the motor), regenerative braking (returning energy) and plugging (reversing drive). The right method depends on the driver and application.",
    priority: 13,
  },

  {
    id: "motor-coasting",
    category: "motors",
    intent: "definition",
    question: "What is coasting in motor control?",
    variations: [
      "What is coasting in motor control",
      "Motor coast",
      "Coast vs brake motor",
      "Freewheel motor",
      "Motor disable",
      "Coasting definition",
    ],
    keywords: ["coast", "motor", "control", "freewheel", "stop"],
    answer:
      "Coasting lets the motor spin freely by disabling the driver outputs. It contrasts with braking, which actively slows the motor.",
    priority: 10,
  },

  {
    id: "motor-soft-start",
    category: "motors",
    intent: "procedure",
    question: "What is motor soft start?",
    variations: [
      "What is motor soft start",
      "Motor soft start",
      "Gradual motor start",
      "Inrush limiting motor",
      "Ramp motor start",
      "Motor soft start definition",
    ],
    keywords: ["soft", "start", "motor", "ramp", "inrush"],
    answer:
      "Soft start gradually increases motor voltage or PWM duty to reduce inrush current and mechanical shock. It can be implemented in the driver or firmware.",
    priority: 13,
  },

  {
    id: "motor-ramp-motion",
    category: "motors",
    intent: "procedure",
    question: "How do I ramp motion in firmware?",
    variations: [
      "How do I ramp motion in firmware",
      "Ramp motion firmware",
      "Accelerate decelerate MCU",
      "Motion profile code",
      "Speed ramp",
      "Ramping motion",
    ],
    keywords: ["ramp", "motion", "firmware", "accelerate", "profile"],
    answer:
      "Ramping gradually increases or decreases speed, limiting acceleration and reducing mechanical stress.",
    priority: 13,
  },

  {
    id: "motor-stepper-acceleration",
    category: "motors",
    intent: "procedure",
    question: "Why does my stepper need acceleration?",
    variations: [
      "Why does my stepper need acceleration",
      "Stepper acceleration",
      "Stepper ramp speed",
      "Stepper start speed",
      "AccelStepper",
      "Stepper acceleration need",
    ],
    keywords: ["stepper", "acceleration", "motor", "ramp", "speed"],
    answer:
      "Stepper motors cannot start instantly at high speed. Acceleration ramps the speed up and down to avoid missed steps and mechanical stress.",
    priority: 13,
  },

  {
    id: "motor-closed-loop",
    category: "motors",
    intent: "procedure",
    question: "What is closed-loop motor control?",
    variations: [
      "What is closed-loop motor control",
      "Closed loop motor",
      "Feedback motor control",
      "PID motor control",
      "Servo control loop",
      "Closed-loop motor control",
    ],
    keywords: ["closed", "loop", "motor", "feedback", "control"],
    answer:
      "Closed-loop control uses feedback from an encoder or sensor to adjust motor drive and maintain the desired speed or position.",
    priority: 13,
  },

  {
    id: "motor-open-loop",
    category: "motors",
    intent: "procedure",
    question: "What is open-loop motor control?",
    variations: [
      "What is open-loop motor control",
      "Open loop motor",
      "No feedback motor",
      "Open loop stepper",
      "Open loop control",
      "Open-loop motor control",
    ],
    keywords: ["open", "loop", "motor", "control", "feedback"],
    answer:
      "Open-loop control drives the motor without feedback. It is simpler but cannot correct for load or missed steps.",
    priority: 13,
  },

  {
    id: "motor-pid",
    category: "motors",
    intent: "procedure",
    question: "How do I use PID for motor control?",
    variations: [
      "How do I use PID for motor control",
      "PID motor control",
      "Motor PID tuning",
      "PID speed control motor",
      "PID position control",
      "PID for motors",
    ],
    keywords: ["pid", "motor", "control", "tuning", "feedback"],
    answer:
      "PID control adjusts the motor drive based on error between setpoint and measured value. It requires feedback and tuning of proportional, integral and derivative gains.",
    priority: 13,
  },

  {
    id: "motor-motion-profile",
    category: "motors",
    intent: "definition",
    question: "What is a motion profile?",
    variations: [
      "What is a motion profile",
      "Motion profile motor",
      "Trapezoidal profile",
      "S curve motion",
      "Motion profile definition",
      "Motion profiling",
    ],
    keywords: ["motion", "profile", "motor", "trapezoidal", "s-curve"],
    answer:
      "A motion profile defines how speed and acceleration change over time for smooth, controlled movement. Common profiles include trapezoidal and S-curve.",
    priority: 13,
  },

  {
    id: "motor-trapezoidal",
    category: "motors",
    intent: "definition",
    question: "What is a trapezoidal motion profile?",
    variations: [
      "What is a trapezoidal motion profile",
      "Trapezoidal profile",
      "Trapezoid motion",
      "Accel cruise decel",
      "Motion profile code",
      "Trapezoidal profile definition",
    ],
    keywords: ["trapezoidal", "motion", "profile", "motor", "accel"],
    answer:
      "A trapezoidal profile has acceleration, constant speed and deceleration phases. It is simple and widely used.",
    priority: 10,
  },

  {
    id: "motor-s-curve",
    category: "motors",
    intent: "definition",
    question: "What is an S-curve motion profile?",
    variations: [
      "What is an S-curve motion profile",
      "S curve firmware",
      "S curve motion",
      "Jerk limited profile",
      "Smooth motion profile",
      "S-curve definition",
    ],
    keywords: ["s", "curve", "motion", "profile", "jerk"],
    answer:
      "An S-curve profile limits jerk, producing smooth acceleration and deceleration. It is used in high-performance motion control.",
    priority: 10,
  },

  {
    id: "motor-jerk",
    category: "motors",
    intent: "definition",
    question: "What is jerk in motion control?",
    variations: [
      "What is jerk in motion control",
      "Jerk firmware",
      "Jerk limit motion",
      "Rate of acceleration change",
      "S curve jerk",
      "Jerk definition",
    ],
    keywords: ["jerk", "firmware", "motion", "acceleration", "control"],
    answer:
      "Jerk is the rate of change of acceleration. Limiting jerk reduces mechanical shock and improves smoothness.",
    priority: 10,
  },

  {
    id: "motor-homing",
    category: "motors",
    intent: "procedure",
    question: "What is homing in motion control?",
    variations: [
      "What is homing in motion control",
      "Homing firmware",
      "Find home position",
      "Reference position MCU",
      "Homing routine",
      "Homing definition",
    ],
    keywords: ["homing", "firmware", "position", "motion", "reference"],
    answer:
      "Homing moves the system to a known reference position, often using a limit switch or sensor, to establish an absolute position.",
    priority: 13,
  },

  {
    id: "motor-limit-switch",
    category: "motors",
    intent: "procedure",
    question: "How do I use a limit switch in firmware?",
    variations: [
      "How do I use a limit switch in firmware",
      "Limit switch firmware",
      "End stop MCU",
      "Position limit code",
      "Switch limit motion",
      "Limit switch usage",
    ],
    keywords: ["limit", "switch", "firmware", "motion", "position"],
    answer:
      "Limit switches indicate when a mechanism reaches an end or reference position. Firmware reads them and stops or changes motion.",
    priority: 13,
  },

  {
    id: "motor-soft-limit",
    category: "motors",
    intent: "definition",
    question: "What is a soft limit in firmware?",
    variations: [
      "What is a soft limit in firmware",
      "Soft limit firmware",
      "Software position limit",
      "Virtual limit MCU",
      "Prevent overtravel",
      "Soft limit definition",
    ],
    keywords: ["soft", "limit", "firmware", "position", "motion"],
    answer:
      "A soft limit is a software-defined boundary that prevents motion beyond a safe range, complementing physical limits.",
    priority: 10,
  },

  {
    id: "motor-hard-limit",
    category: "motors",
    intent: "definition",
    question: "What is a hard limit in firmware?",
    variations: [
      "What is a hard limit in firmware",
      "Hard limit firmware",
      "Physical limit switch",
      "Hardware limit motion",
      "End of travel",
      "Hard limit definition",
    ],
    keywords: ["hard", "limit", "firmware", "physical", "motion"],
    answer:
      "A hard limit is a physical switch or sensor that detects the end of travel. It provides a reliable safety boundary.",
    priority: 10,
  },

  {
    id: "motor-stop",
    category: "motors",
    intent: "procedure",
    question: "How do I stop motion safely in firmware?",
    variations: [
      "How do I stop motion safely in firmware",
      "Stop motion firmware",
      "Safe stop MCU",
      "Decelerate stop",
      "Emergency stop motion",
      "Safely stopping motion",
    ],
    keywords: ["motion", "stop", "firmware", "safe", "decelerate"],
    answer:
      "Motion can be stopped by decelerating to a halt, disabling the motor driver, or using an emergency stop. The method depends on the required stopping time and safety.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // FEEDBACK / SENSING
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-encoder",
    category: "motors",
    intent: "definition",
    question: "What is a motor encoder?",
    variations: [
      "What is a motor encoder",
      "Motor encoder",
      "How to use encoder with motor",
      "Encoder feedback motor",
      "Motor position feedback",
      "Motor encoder definition",
    ],
    keywords: ["encoder", "motor", "feedback", "position", "speed"],
    answer:
      "A motor encoder provides feedback on motor position or speed. It is used for closed-loop control and accurate positioning.",
    priority: 13,
  },

  {
    id: "motor-feedback",
    category: "motors",
    intent: "definition",
    question: "What feedback can a motor provide?",
    variations: [
      "What feedback can a motor provide",
      "Motor feedback types",
      "Encoder vs Hall sensor motor",
      "Position feedback motor",
      "Speed feedback motor",
      "Motor feedback options",
    ],
    keywords: ["feedback", "motor", "encoder", "hall", "position"],
    answer:
      "Feedback can come from encoders, Hall sensors, tachometers or current sensing. It enables closed-loop control of speed or position.",
    priority: 13,
  },

  {
    id: "motor-hall-sensor",
    category: "motors",
    intent: "definition",
    question: "What is a Hall sensor in a motor?",
    variations: [
      "What is a Hall sensor in a motor",
      "Hall sensor motor",
      "Hall effect motor feedback",
      "BLDC Hall sensor",
      "Motor Hall sensor",
      "Hall sensor in motors",
    ],
    keywords: ["hall", "sensor", "motor", "feedback", "position"],
    answer:
      "Hall sensors detect rotor position in motors, commonly used in BLDC motors for commutation. They provide digital pulses as the rotor rotates.",
    priority: 13,
  },

  {
    id: "motor-tachometer",
    category: "motors",
    intent: "definition",
    question: "What is a tachometer?",
    variations: [
      "What is a tachometer",
      "Motor tachometer",
      "Measure motor RPM",
      "How to measure motor speed",
      "Tachometer sensor",
      "Tachometer definition",
    ],
    keywords: ["tachometer", "motor", "speed", "rpm", "measurement"],
    answer:
      "A tachometer measures rotational speed, often outputting pulses proportional to RPM. It is used for speed feedback and control.",
    priority: 13,
  },

  {
    id: "motor-current-sense",
    category: "motors",
    intent: "procedure",
    question: "Why measure motor current?",
    variations: [
      "Why measure motor current",
      "Motor current sensing",
      "Why measure motor current",
      "Current feedback motor",
      "Motor overcurrent detection",
      "Measuring motor current",
    ],
    keywords: ["current", "motor", "sense", "feedback", "protection"],
    answer:
      "Motor current can indicate load, detect stalls and provide protection. It is often measured with a shunt resistor or Hall-effect sensor.",
    priority: 13,
  },

  {
    id: "motor-position-control",
    category: "motors",
    intent: "procedure",
    question: "How do I control motor position?",
    variations: [
      "How do I control motor position",
      "Position control motor",
      "Motor positioning",
      "Closed loop position",
      "Servo position control",
      "Motor position control",
    ],
    keywords: ["position", "control", "motor", "servo", "feedback"],
    answer:
      "Position control uses feedback to drive the motor to a target position. Servo motors include internal position control; DC or stepper motors require external feedback and control.",
    priority: 13,
  },

  {
    id: "motor-encoder-position",
    category: "motors",
    intent: "procedure",
    question: "How do I read encoder position in firmware?",
    variations: [
      "How do I read encoder position in firmware",
      "Encoder position firmware",
      "Read quadrature encoder",
      "Position tracking code",
      "Encoder count MCU",
      "Reading encoder position",
    ],
    keywords: ["encoder", "position", "firmware", "quadrature", "count"],
    answer:
      "Encoder position is tracked by counting pulses and determining direction from the phase relationship. It may be handled by a timer peripheral.",
    priority: 13,
  },

  {
    id: "motor-encoder-velocity",
    category: "motors",
    intent: "procedure",
    question: "How do I calculate velocity from an encoder?",
    variations: [
      "How do I calculate velocity from an encoder",
      "Encoder velocity firmware",
      "Speed from encoder",
      "Calculate RPM encoder",
      "Velocity measurement",
      "Velocity from encoder",
    ],
    keywords: ["encoder", "velocity", "firmware", "speed", "rpm"],
    answer:
      "Velocity is the change in position over time. Firmware can measure the time between pulses or count pulses over a fixed period.",
    priority: 13,
  },

  {
    id: "motor-odometry",
    category: "motors",
    intent: "procedure",
    question: "How do I implement odometry in firmware?",
    variations: [
      "How do I implement odometry in firmware",
      "Odometry firmware",
      "Wheel encoder position",
      "Track robot movement",
      "Distance calculation encoder",
      "Odometry implementation",
    ],
    keywords: ["odometry", "firmware", "encoder", "position", "distance"],
    answer:
      "Odometry uses wheel or motor encoder counts to estimate distance and heading. Wheel circumference, gear ratio and encoder resolution are used in the calculation.",
    priority: 13,
  },

  {
    id: "motor-dead-reckoning",
    category: "motors",
    intent: "definition",
    question: "What is dead reckoning in motion control?",
    variations: [
      "What is dead reckoning in motion control",
      "Dead reckoning embedded",
      "Estimate position without GPS",
      "Navigation firmware",
      "Odometry code",
      "Dead reckoning definition",
    ],
    keywords: ["dead", "reckoning", "firmware", "position", "navigation"],
    answer:
      "Dead reckoning estimates position by integrating speed, heading or motion over time. It drifts over time without external correction, so it is often combined with other sensors.",
    priority: 10,
  },

  // ─────────────────────────────────────────────────────────────
  // SELECTION / SIZING / POWER
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-torque",
    category: "motors",
    intent: "definition",
    question: "What is motor torque?",
    variations: [
      "What is motor torque",
      "Motor torque meaning",
      "What is torque",
      "How to measure motor torque",
      "Torque vs speed",
      "Motor torque definition",
    ],
    keywords: ["torque", "motor", "force", "rotation", "load"],
    answer:
      "Motor torque is the rotational force the motor can produce. It is typically measured in N·m or kg·cm and determines the motor's ability to drive a load.",
    priority: 13,
  },

  {
    id: "motor-torque-speed-curve",
    category: "motors",
    intent: "definition",
    question: "What is a torque-speed curve?",
    variations: [
      "What is a torque-speed curve",
      "Torque speed curve motor",
      "Motor characteristic curve",
      "Torque vs speed",
      "Motor performance curve",
      "Torque-speed curve definition",
    ],
    keywords: ["torque", "speed", "curve", "motor", "performance"],
    answer:
      "A torque-speed curve shows how much torque a motor can produce at different speeds. It helps select a motor and driver for an application.",
    priority: 10,
  },

  {
    id: "motor-load",
    category: "motors",
    intent: "procedure",
    question: "How do I calculate motor load?",
    variations: [
      "How do I calculate motor load",
      "Motor load calculation",
      "How much load can motor drive",
      "Motor sizing",
      "Torque required",
      "Motor load calculation",
    ],
    keywords: ["load", "motor", "calculation", "torque", "sizing"],
    answer:
      "Motor load depends on friction, inertia, gravity and required acceleration. Calculating required torque and speed helps choose a suitable motor and gearbox.",
    priority: 13,
  },

  {
    id: "motor-sizing",
    category: "motors",
    intent: "procedure",
    question: "How do I size a motor for my project?",
    variations: [
      "How do I size a motor for my project",
      "Motor sizing",
      "How to choose motor",
      "Select motor for project",
      "Motor selection guide",
      "Motor sizing guide",
    ],
    keywords: ["motor", "sizing", "selection", "torque", "speed"],
    answer:
      "Consider required torque, speed, acceleration, duty cycle, environment, voltage and available space. Add margin for friction and unexpected load.",
    priority: 15,
  },

  {
    id: "motor-supply",
    category: "motors",
    intent: "requirements",
    question: "What power supply do I need for a motor?",
    variations: [
      "What power supply do I need for a motor",
      "Motor power supply",
      "How to power motor",
      "Motor voltage and current",
      "Choose motor supply",
      "Motor power supply",
    ],
    keywords: ["power", "supply", "motor", "voltage", "current"],
    answer:
      "Motor power supply should match the motor voltage and provide enough current for the worst-case load, including startup and stall. Consider separate supplies for logic and motors if noise or current is an issue.",
    priority: 15,
  },

  {
    id: "motor-current",
    category: "motors",
    intent: "troubleshooting",
    question: "Why does my motor draw too much current?",
    variations: [
      "Why does my motor draw too much current",
      "Why is my motor consuming high current",
      "Motor current is very high",
      "Why does the motor stall",
      "Motor high current causes",
      "Excessive motor current",
    ],
    keywords: ["motor", "current", "stall", "overload", "power"],
    answer:
      "High motor current can occur during startup, acceleration, mechanical loading, or a stall condition. Check the motor rating, supply capability, driver rating, mechanical load, wiring, and whether the motor is being driven correctly.",
    priority: 15,
  },

  {
    id: "motor-startup-current",
    category: "motors",
    intent: "troubleshooting",
    question: "Why does motor current spike at startup?",
    variations: [
      "Why does motor current spike at startup",
      "Motor startup current",
      "Inrush current motor",
      "Why does my supply trip",
      "Startup spike motor",
      "Motor inrush current",
    ],
    keywords: ["startup", "current", "motor", "inrush", "spike"],
    answer:
      "At startup, a motor draws a higher current until it reaches operating speed. This inrush current can trip supplies, blow fuses or reset controllers if the power source is not sized appropriately.",
    priority: 14,
  },

  {
    id: "motor-stall",
    category: "motors",
    intent: "troubleshooting",
    question: "What is motor stall?",
    variations: [
      "What is motor stall",
      "Motor stall condition",
      "Why does motor stall",
      "Stall current motor",
      "Prevent motor stall",
      "Motor stall definition",
    ],
    keywords: ["stall", "motor", "current", "load", "torque"],
    answer:
      "Motor stall occurs when the motor cannot rotate despite power being applied, often due to excessive load. Stall current is usually higher than running current and can damage the motor or driver.",
    priority: 14,
  },

  {
    id: "motor-protection",
    category: "motors",
    intent: "procedure",
    question: "How do I protect a motor?",
    variations: [
      "How do I protect a motor",
      "Motor protection",
      "Overcurrent protection motor",
      "Motor thermal protection",
      "Protect motor from damage",
      "Motor protection methods",
    ],
    keywords: ["protection", "motor", "overcurrent", "thermal", "fuse"],
    answer:
      "Motor protection can include fuses, current limiting, thermal sensors, drivers with fault detection and software limits on current and duty cycle.",
    priority: 15,
  },

  {
    id: "motor-driver-protection",
    category: "motors",
    intent: "definition",
    question: "What protection features do motor drivers have?",
    variations: [
      "What protection features do motor drivers have",
      "Motor driver protection",
      "Driver overcurrent",
      "Driver thermal shutdown",
      "Motor driver faults",
      "Motor driver protection features",
    ],
    keywords: ["driver", "protection", "motor", "overcurrent", "thermal"],
    answer:
      "Many drivers include overcurrent, thermal, undervoltage and short-circuit protection. Some provide fault outputs for the controller to monitor.",
    priority: 13,
  },

  {
    id: "motor-cooling",
    category: "motors",
    intent: "procedure",
    question: "Do motors need cooling?",
    variations: [
      "Do motors need cooling",
      "Motor cooling",
      "Motor overheating",
      "How to cool motor",
      "Motor temperature",
      "Motor cooling requirements",
    ],
    keywords: ["cooling", "motor", "heat", "temperature", "fan"],
    answer:
      "Motors that run hot under load may need airflow, heat sinks or a larger motor. Keep within temperature ratings to ensure reliability and lifespan.",
    priority: 13,
  },

  {
    id: "motor-stepper-heat",
    category: "motors",
    intent: "troubleshooting",
    question: "Why does my stepper motor get hot?",
    variations: [
      "Why does my stepper motor get hot",
      "Stepper motor hot",
      "Stepper overheating",
      "Stepper current too high",
      "Stepper temperature",
      "Stepper motor heat",
    ],
    keywords: ["stepper", "hot", "motor", "current", "temperature"],
    answer:
      "Stepper motors often run warm, but excessive heat indicates current too high or inadequate cooling. Set driver current within the motor rating and consider reducing holding current when stationary.",
    priority: 13,
  },

  {
    id: "motor-stepper-current",
    category: "motors",
    intent: "procedure",
    question: "How do I set stepper driver current?",
    variations: [
      "How do I set stepper driver current",
      "Stepper current setting",
      "Set A4988 current",
      "Vref stepper driver",
      "Stepper driver current",
      "Stepper current adjustment",
    ],
    keywords: ["stepper", "current", "driver", "vref", "setting"],
    answer:
      "Stepper drivers such as A4988 and DRV8825 set current via a Vref voltage or a sense resistor. Adjust to match the motor's rated current, considering RMS and peak values.",
    priority: 13,
  },

  {
    id: "motor-stepper-missing-steps",
    category: "motors",
    intent: "troubleshooting",
    question: "Why is my stepper motor missing steps?",
    variations: [
      "Why is my stepper motor missing steps",
      "Stepper missing steps",
      "Stepper skips steps",
      "Stepper not accurate",
      "Stepper loses position",
      "Stepper missing steps",
    ],
    keywords: ["stepper", "missing", "steps", "motor", "position"],
    answer:
      "Missing steps can be caused by insufficient current, excessive speed, mechanical binding, acceleration too high or driver limitations. Increase current within motor rating, reduce speed or improve mechanics.",
    priority: 14,
  },

  {
    id: "motor-noise",
    category: "motors",
    intent: "troubleshooting",
    question: "Why is my motor noisy?",
    variations: [
      "Why is my motor noisy",
      "Motor noise",
      "Why does motor whine",
      "Reduce motor noise",
      "Motor vibration noise",
      "Motor noise causes",
    ],
    keywords: ["noise", "motor", "whine", "vibration", "reduce"],
    answer:
      "Motor noise can come from PWM frequency, mechanical vibration, worn bearings or commutation. Adjusting PWM frequency, adding damping or using a different motor can reduce noise.",
    priority: 13,
  },

  {
    id: "motor-vibration",
    category: "motors",
    intent: "troubleshooting",
    question: "Why does my motor vibrate?",
    variations: [
      "Why does my motor vibrate",
      "Motor vibration",
      "Why does motor shake",
      "Reduce motor vibration",
      "Motor imbalance",
      "Motor vibration causes",
    ],
    keywords: ["vibration", "motor", "shake", "imbalance", "reduce"],
    answer:
      "Vibration can be caused by imbalance, misalignment, bearing wear, stepper resonance or PWM issues. Fixing mechanics and tuning drive can reduce vibration.",
    priority: 13,
  },

  {
    id: "motor-resonance",
    category: "motors",
    intent: "troubleshooting",
    question: "What is stepper motor resonance?",
    variations: [
      "What is stepper motor resonance",
      "Stepper resonance",
      "Why does stepper vibrate",
      "Stepper mid band resonance",
      "Stepper resonance fix",
      "Stepper resonance definition",
    ],
    keywords: ["resonance", "stepper", "motor", "vibration", "fix"],
    answer:
      "Stepper resonance occurs at certain speeds due to interaction between step rate and mechanical dynamics. It can cause vibration or missed steps. Microstepping or adjusting speed can reduce it.",
    priority: 13,
  },

  {
    id: "motor-noise-suppression",
    category: "motors",
    intent: "procedure",
    question: "How do I reduce motor electrical noise?",
    variations: [
      "How do I reduce motor electrical noise",
      "Motor noise suppression",
      "Motor EMI",
      "Motor capacitor",
      "Motor interference",
      "Motor electrical noise",
    ],
    keywords: ["noise", "motor", "emi", "suppression", "capacitor"],
    answer:
      "Motor noise can be reduced with capacitors across motor terminals, ferrite beads on wires, proper grounding and separation from sensitive circuits.",
    priority: 13,
  },

  {
    id: "motor-wiring",
    category: "motors",
    intent: "procedure",
    question: "How do I wire a motor?",
    variations: [
      "How do I wire a motor",
      "Motor wiring",
      "How to connect motor",
      "Motor wiring diagram",
      "Motor connections",
      "Motor wiring guide",
    ],
    keywords: ["wiring", "motor", "connection", "driver", "power"],
    answer:
      "Motor wiring depends on the motor type. DC motors have two terminals; steppers have multiple coils; servos have power, ground and signal wires. Always check the datasheet for correct connections.",
    priority: 15,
  },

  // ─────────────────────────────────────────────────────────────
  // PLATFORMS
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-arduino",
    category: "motors",
    intent: "compatibility",
    question: "Can I control a motor with Arduino?",
    variations: [
      "Can I control a motor with Arduino",
      "Arduino motor control",
      "How to control motor with Arduino",
      "Arduino motor driver",
      "Motor with Arduino",
      "Arduino motor control",
    ],
    keywords: ["arduino", "motor", "control", "driver", "pwm"],
    answer:
      "Yes. Arduino can control motors through a motor driver using PWM, digital outputs or communication interfaces. The driver provides the required current and protection.",
    priority: 13,
  },

  {
    id: "motor-raspberry-pi",
    category: "motors",
    intent: "compatibility",
    question: "Can I control a motor with Raspberry Pi?",
    variations: [
      "Can I control a motor with Raspberry Pi",
      "Raspberry Pi motor control",
      "How to control motor with Pi",
      "Pi motor driver",
      "Motor with Raspberry Pi",
      "Raspberry Pi motor control",
    ],
    keywords: ["raspberry", "pi", "motor", "control", "driver"],
    answer:
      "Yes. Raspberry Pi can control motors through a motor driver or HAT using GPIO, PWM or communication interfaces.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // APPLICATIONS
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-applications",
    category: "motors",
    intent: "purpose",
    question: "What are common motor applications?",
    variations: [
      "What are common motor applications",
      "Motor applications",
      "Where are motors used",
      "Motor uses",
      "Motor in projects",
      "Motor application examples",
    ],
    keywords: ["applications", "motor", "uses", "projects", "robot"],
    answer:
      "Motors are used in robots, drones, fans, pumps, conveyors, CNC machines, 3D printers, cameras, locks and many other systems requiring motion.",
    priority: 13,
  },

  {
    id: "motor-robotics",
    category: "motors",
    intent: "procedure",
    question: "What motors are used in robotics?",
    variations: [
      "What motors are used in robotics",
      "Motors for robots",
      "Robot motor selection",
      "Best motor for robot",
      "DC motor robotics",
      "Motors in robotics",
    ],
    keywords: ["robotics", "motors", "robot", "servo", "stepper"],
    answer:
      "Common robotics motors include DC gear motors for drive wheels, servo motors for arms and positioning, and stepper motors for precise motion. The choice depends on torque, speed and feedback requirements.",
    priority: 13,
  },

  {
    id: "motor-cnc",
    category: "motors",
    intent: "procedure",
    question: "What motors are used in CNC machines?",
    variations: [
      "What motors are used in CNC machines",
      "CNC motor types",
      "Stepper vs servo CNC",
      "Best motor for CNC",
      "CNC motor selection",
      "Motors in CNC",
    ],
    keywords: ["cnc", "motors", "stepper", "servo", "control"],
    answer:
      "CNC machines commonly use stepper motors or servo motors depending on required precision, speed and feedback. Servo systems generally offer higher performance and closed-loop control.",
    priority: 13,
  },

  {
    id: "motor-3d-printer",
    category: "motors",
    intent: "procedure",
    question: "What motors are used in 3D printers?",
    variations: [
      "What motors are used in 3D printers",
      "3D printer motor types",
      "Stepper motor 3D printer",
      "Best motor for 3D printer",
      "3D printer motors",
      "Motors in 3D printers",
    ],
    keywords: ["3d", "printer", "stepper", "motors", "control"],
    answer:
      "3D printers typically use stepper motors for the X, Y, Z and extruder axes. They require accurate positioning and repeatable motion.",
    priority: 13,
  },

  {
    id: "motor-drone",
    category: "motors",
    intent: "procedure",
    question: "What motors are used in drones?",
    variations: [
      "What motors are used in drones",
      "Drone motor types",
      "Brushless motor drone",
      "Drone motor selection",
      "Drone ESC",
      "Motors in drones",
    ],
    keywords: ["drone", "bldc", "motors", "esc", "brushless"],
    answer:
      "Drones typically use brushless DC motors controlled by ESCs. Selection depends on thrust, prop size, battery voltage and flight time requirements.",
    priority: 13,
  },

  {
    id: "motor-fan",
    category: "motors",
    intent: "procedure",
    question: "How do I control a fan in firmware?",
    variations: [
      "How do I control a fan in firmware",
      "Fan firmware",
      "Control fan speed",
      "PWM fan code",
      "Cooling fan MCU",
      "Fan control",
    ],
    keywords: ["fan", "firmware", "control", "pwm", "speed"],
    answer:
      "Fans can be switched on/off or speed-controlled with PWM. Some provide tachometer feedback for RPM monitoring.",
    priority: 13,
  },

  {
    id: "motor-pump",
    category: "motors",
    intent: "procedure",
    question: "How do I control a pump in firmware?",
    variations: [
      "How do I control a pump in firmware",
      "Pump firmware",
      "Control pump MCU",
      "Pump driver code",
      "Water pump control",
      "Pump control",
    ],
    keywords: ["pump", "firmware", "control", "driver", "motor"],
    answer:
      "Pumps are controlled through relays, MOSFETs or motor drivers depending on type and power. Firmware may monitor flow, pressure or current for protection.",
    priority: 13,
  },

  {
    id: "motor-conveyor",
    category: "motors",
    intent: "procedure",
    question: "How do I control a conveyor in firmware?",
    variations: [
      "How do I control a conveyor in firmware",
      "Conveyor firmware",
      "Conveyor motor control",
      "Belt control MCU",
      "Conveyor system",
      "Conveyor control",
    ],
    keywords: ["conveyor", "firmware", "motor", "control", "belt"],
    answer:
      "Conveyor control usually uses a motor driver with speed and direction control, plus sensors for position, presence or safety. Emergency stop and interlocks should be included.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // SERVOS DETAILED
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-servo-types",
    category: "motors",
    intent: "comparison",
    question: "What types of servo motors are available?",
    variations: [
      "What types of servo motors are available",
      "Types of servo motors",
      "Standard vs continuous servo",
      "Servo motor types",
      "Hobby servo vs industrial servo",
      "Servo motor types",
    ],
    keywords: ["servo", "types", "motor", "standard", "continuous"],
    answer:
      "Common servo types include standard position servos, continuous rotation servos, digital servos and industrial servo motors. Each has different control and feedback characteristics.",
    priority: 13,
  },

  {
    id: "motor-servo-pwm",
    category: "motors",
    intent: "procedure",
    question: "How do I control a servo with PWM?",
    variations: [
      "How do I control a servo with PWM",
      "Servo PWM control",
      "How to control servo angle",
      "Servo pulse width",
      "Servo control signal",
      "Servo PWM",
    ],
    keywords: ["servo", "pwm", "control", "pulse", "angle"],
    answer:
      "A standard servo is controlled by a PWM signal, typically 50 Hz, where pulse width determines the angle. Common pulse widths are around 1 ms to 2 ms for 0 to 180 degrees.",
    priority: 13,
  },

  {
    id: "motor-servo-continuous",
    category: "motors",
    intent: "definition",
    question: "What is a continuous rotation servo?",
    variations: [
      "What is a continuous rotation servo",
      "Continuous servo motor",
      "How to use continuous servo",
      "Continuous vs standard servo",
      "360 servo",
      "Continuous servo definition",
    ],
    keywords: ["servo", "continuous", "rotation", "motor", "speed"],
    answer:
      "A continuous rotation servo rotates continuously. Pulse width controls speed and direction instead of position. It is useful for wheeled robots and simple drives.",
    priority: 13,
  },

  {
    id: "motor-servo-power",
    category: "motors",
    intent: "troubleshooting",
    question: "Why does my servo jitter or reset the board?",
    variations: [
      "Why does my servo jitter or reset the board",
      "Servo jitter",
      "Servo resets Arduino",
      "Servo power problem",
      "Servo unstable",
      "Servo jitter or reset",
    ],
    keywords: ["servo", "power", "jitter", "reset", "supply"],
    answer:
      "Servos can draw significant current, especially under load. If powered from the same supply as the microcontroller, voltage drops can cause resets or jitter. Use a separate, adequately rated supply with common ground.",
    priority: 15,
  },

  {
    id: "motor-servo-firmware",
    category: "motors",
    intent: "procedure",
    question: "How do I control a servo in firmware?",
    variations: [
      "How do I control a servo in firmware",
      "Servo Arduino code",
      "Servo PWM firmware",
      "Control servo angle",
      "Servo library",
      "Servo control in firmware",
    ],
    keywords: ["servo", "firmware", "pwm", "angle", "control"],
    answer:
      "A servo is controlled by a PWM signal with a pulse width corresponding to the desired angle. Firmware sets the pulse width within the servo's valid range and may use a library for convenience.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // STEPPER / BLDC DETAILED
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-stepper-firmware",
    category: "motors",
    intent: "procedure",
    question: "How do I control a stepper motor in firmware?",
    variations: [
      "How do I control a stepper motor in firmware",
      "Stepper motor code",
      "Step direction firmware",
      "AccelStepper library",
      "Stepper driver firmware",
      "Stepper control in firmware",
    ],
    keywords: ["stepper", "firmware", "step", "direction", "driver"],
    answer:
      "Firmware controls a stepper driver using step and direction signals or a serial command interface, depending on the driver. Speed, acceleration and position are managed by the firmware or a library.",
    priority: 13,
  },

  {
    id: "motor-bldc-firmware",
    category: "motors",
    intent: "procedure",
    question: "How do I control a BLDC motor?",
    variations: [
      "How do I control a BLDC motor",
      "BLDC firmware",
      "Brushless motor control",
      "ESC control firmware",
      "Sensorless BLDC",
      "BLDC control",
    ],
    keywords: ["bldc", "brushless", "firmware", "control", "esc"],
    answer:
      "BLDC control can use an ESC with a servo-style signal or implement commutation in firmware using Hall sensors or sensorless techniques. The approach depends on the motor, driver and required performance.",
    priority: 13,
  },

  {
    id: "motor-esc-signal",
    category: "motors",
    intent: "procedure",
    question: "How do I control an ESC?",
    variations: [
      "How do I control an ESC",
      "ESC signal",
      "ESC PWM",
      "Brushed ESC control",
      "Brushless ESC signal",
      "ESC control signal",
    ],
    keywords: ["esc", "control", "signal", "pwm", "motor"],
    answer:
      "Most ESCs are controlled by a PWM signal similar to a servo. Some support UART, I2C or CAN for telemetry and configuration. Always follow the ESC's documented protocol and calibration procedure.",
    priority: 13,
  },

  {
    id: "motor-stepper-driver-firmware",
    category: "motors",
    intent: "procedure",
    question: "How do I configure a stepper driver in firmware?",
    variations: [
      "How do I configure a stepper driver in firmware",
      "Stepper driver configuration",
      "Step pulse timing",
      "Microstep pins",
      "Stepper driver setup",
      "Configuring stepper drivers",
    ],
    keywords: ["stepper", "driver", "firmware", "pulse", "microstep"],
    answer:
      "Firmware sets the direction pin, applies step pulses at the required rate and configures microstepping pins. Current is typically set by hardware (Vref) or through the driver's interface.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // KINEMATICS / MECHANICAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-kinematics",
    category: "motors",
    intent: "definition",
    question: "What is kinematics in motion control?",
    variations: [
      "What is kinematics in motion control",
      "Kinematics robot firmware",
      "Forward inverse kinematics",
      "Motion calculation embedded",
      "Robot movement code",
      "Kinematics definition",
    ],
    keywords: ["kinematics", "firmware", "robot", "motion", "calculation"],
    answer:
      "Kinematics describes motion without considering forces. Forward kinematics calculates position from joint values; inverse kinematics calculates joint values for a desired position.",
    priority: 13,
  },

  {
    id: "motor-trajectory",
    category: "motors",
    intent: "procedure",
    question: "How do I plan a trajectory in firmware?",
    variations: [
      "How do I plan a trajectory in firmware",
      "Trajectory planning firmware",
      "Path planning embedded",
      "Motion trajectory code",
      "Robot path firmware",
      "Trajectory planning",
    ],
    keywords: ["trajectory", "firmware", "planning", "motion", "path"],
    answer:
      "Trajectory planning generates a path and timing for motion, respecting constraints such as speed, acceleration and obstacles. The complexity depends on the application.",
    priority: 13,
  },

  {
    id: "motor-motion-planning",
    category: "motors",
    intent: "definition",
    question: "What is motion planning?",
    variations: [
      "What is motion planning",
      "Motion planning firmware",
      "Plan movement MCU",
      "Trajectory planning motion",
      "Path planning control",
      "Motion planning definition",
    ],
    keywords: ["motion", "planning", "firmware", "trajectory", "control"],
    answer:
      "Motion planning determines the path and timing for movement, respecting constraints such as speed, acceleration and obstacles.",
    priority: 13,
  },

  {
    id: "motor-line-follow",
    category: "motors",
    intent: "procedure",
    question: "How do I follow a line in firmware?",
    variations: [
      "How do I follow a line in firmware",
      "Line following firmware",
      "Line follower robot",
      "Follow line code",
      "IR line sensor",
      "Line following",
    ],
    keywords: ["line", "following", "firmware", "robot", "sensor"],
    answer:
      "Line following uses sensors to detect a line and adjusts motor speeds to stay on it. PID control improves tracking.",
    priority: 13,
  },

  {
    id: "motor-wall-follow",
    category: "motors",
    intent: "procedure",
    question: "How do I follow a wall in firmware?",
    variations: [
      "How do I follow a wall in firmware",
      "Wall following firmware",
      "Wall follower robot",
      "Follow wall code",
      "Distance to wall control",
      "Wall following",
    ],
    keywords: ["wall", "following", "firmware", "robot", "distance"],
    answer:
      "Wall following uses distance sensors to maintain a set distance from a wall, adjusting steering accordingly.",
    priority: 10,
  },

  {
    id: "motor-pid-tuning",
    category: "motors",
    intent: "procedure",
    question: "How do I tune PID for a motor?",
    variations: [
      "How do I tune PID for a motor",
      "Motor PID tuning",
      "Tune motor control loop",
      "PID gains motor",
      "Motor PID setup",
      "Tuning PID for motors",
    ],
    keywords: ["pid", "tuning", "motor", "control", "gains"],
    answer:
      "Start with proportional gain, add integral to remove steady-state error, then derivative to reduce overshoot. Test step responses and adjust gradually, respecting mechanical and electrical limits.",
    priority: 13,
  },

  {
    id: "motor-control-loop",
    category: "motors",
    intent: "definition",
    question: "What is a control loop in motor systems?",
    variations: [
      "What is a control loop in motor systems",
      "Control loop embedded",
      "Closed loop firmware",
      "Feedback control code",
      "How to implement control loop",
      "Control loop definition",
    ],
    keywords: ["control", "loop", "firmware", "feedback", "closed"],
    answer:
      "A control loop reads a measurement, compares it to a setpoint and adjusts an output to reduce the error. It may be simple on/off, PID or another control strategy. Timing consistency is important.",
    priority: 13,
  },

  // ─────────────────────────────────────────────────────────────
  // BEST PRACTICES
  // ─────────────────────────────────────────────────────────────
  {
    id: "motor-best-practices",
    category: "motors",
    intent: "procedure",
    question: "What are best practices for motor control?",
    variations: [
      "What are best practices for motor control",
      "Motor control best practices",
      "Good motor design",
      "Motor usage guidelines",
      "How to use motors properly",
      "Motor control best practices",
    ],
    keywords: ["best", "practices", "motor", "control", "design"],
    answer:
      "Use appropriate drivers, provide adequate power, protect against overcurrent and thermal faults, ramp speed, add feedback when needed, and test under realistic load.",
    priority: 15,
  },

  {
    id: "motor-thermal-management",
    category: "motors",
    intent: "procedure",
    question: "How do I manage heat in motor control?",
    variations: [
      "How do I manage heat in motor control",
      "Motor thermal management",
      "Motor heat issues",
      "Cooling motor drivers",
      "Motor thermal design",
      "Motor thermal management",
    ],
    keywords: ["thermal", "motor", "heat", "cooling", "driver"],
    answer:
      "Use components within ratings, provide heatsinking or airflow for drivers, monitor temperature where possible and reduce current or duty cycle when limits are reached.",
    priority: 13,
  },

  {
    id: "motor-emc",
    category: "motors",
    intent: "procedure",
    question: "How do I design motor systems for EMC?",
    variations: [
      "How do I design motor systems for EMC",
      "Motor EMC",
      "Reduce EMI from motors",
      "Motor EMI design",
      "Motor EMC best practices",
      "EMC for motor systems",
    ],
    keywords: ["emc", "motor", "emi", "design", "compliance"],
    answer:
      "Use short motor cables, twisted pairs, shielding or ferrites where appropriate, separate noisy return paths, and follow good grounding and layout practices. Suppression components on the motor help reduce emissions.",
    priority: 13,
  },

  {
    id: "motor-reliability",
    category: "motors",
    intent: "procedure",
    question: "How do I make motor systems reliable?",
    variations: [
      "How do I make motor systems reliable",
      "Motor reliability",
      "Robust motor design",
      "Motor system reliability",
      "Motor reliability tips",
      "Reliable motor systems",
    ],
    keywords: ["reliability", "motor", "robust", "design", "protection"],
    answer:
      "Choose motors and drivers within their ratings, provide stable power and cooling, include protection and fault detection, and test under realistic conditions.",
    priority: 13,
  },
];
