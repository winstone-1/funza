import type { LucideIcon } from "lucide-react";
import {
  Apple,
  BookOpen,
  HeartPulse,
  Leaf,
  Microscope,
  ShieldCheck,
  UserRoundCheck,
  Wind,
} from "lucide-react";

/**
 * One content pack per Grade 10 Biology strand. Everything a teacher sees in the
 * preparation flow comes from here, so each strand shows its own lessons, concepts
 * and questions rather than a shared placeholder set.
 *
 * Curriculum text stays in English: it is teaching material a teacher reads out,
 * not interface chrome, so it is not part of the en/sw dictionary in lib/i18n.
 */

/** The four teaching moves every lesson follows, in order. */
export const stepPhases: { label: string; icon: LucideIcon; color: string }[] = [
  { label: "Start", icon: UserRoundCheck, color: "bg-emerald-700" },
  { label: "Explain", icon: BookOpen, color: "bg-amber-500" },
  { label: "Class activity", icon: Leaf, color: "bg-sky-600" },
  { label: "Check", icon: ShieldCheck, color: "bg-violet-700" },
];

export type LessonStep = {
  title: string;
  note: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: string;
  /** One entry per phase in `stepPhases`, in the same order. */
  steps: LessonStep[];
  misconception: string;
  tip: string;
};

export type CheckType = "recall" | "understand" | "apply";

export type QuickCheck = {
  type: CheckType;
  question: string;
  answer: string;
};

export type Concept = {
  term: string;
  meaning: string;
};

export type StrandPack = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  /** Used as the hero watermark for strands with no illustration. */
  icon: LucideIcon;
  /** Matches `strands.name` in Supabase, taken from the KICD source document. */
  curriculumStrand: string;
  /** The part of the strand the generated explanation covers, when there is one. */
  subStrand?: string;
  source: string;
  heroNote: string;
  teacherNote: string;
  /** Offline default for the Understand panel; Supabase content replaces it when present. */
  explanation: string;
  outcomes: string[];
  concepts: Concept[];
  lessons: Lesson[];
  quickChecks: QuickCheck[];
};

const cellBiology: StrandPack = {
  id: "cell-biology",
  title: "Cell Biology",
  subject: "Biology",
  grade: "Grade 10",
  icon: Microscope,
  curriculumStrand: "Cell Biology and Biodiversity",
  subStrand: "1.1 Introduction to Biology",
  source: "KICD Grade 10 Biology Curriculum Design",
  heroNote:
    "You have not taught this before. Let us get you ready to walk into the classroom prepared.",
  teacherNote:
    "Focus first on helping learners connect new ideas to things they can see or experience in real life.",
  explanation: `## Why we study Biology

Biology is the study of living things. Learners meet it every day without naming it: digesting food, recovering from illness, growing maize, or brewing uji all involve biological processes.

## What a cell is

- A cell is the smallest unit of life.
- Every living thing is made of one or more cells.
- Cells are too small to see without a microscope, but their effects are visible everywhere.

## Where Biology leads

Fields of study such as botany, zoology, genetics and microbiology each open different careers, from agricultural officer to laboratory technician.

**Note:** This offline summary covers the basics. Connect to the internet once to load the full curriculum-generated explanation.`,
  outcomes: [
    "Explain the application of Biology in everyday life",
    "Relate fields of study in Biology to career opportunities",
    "Illustrate the careers related to fields of study in Biology",
    "Appreciate the importance of Biology in everyday life",
  ],
  concepts: [
    { term: "Cell", meaning: "The basic unit of life in living organisms." },
    { term: "Cell membrane", meaning: "Controls what enters and leaves the cell." },
    { term: "Nucleus", meaning: "Controls cell activities and carries genetic information." },
    { term: "Cytoplasm", meaning: "Jelly-like material where many cell activities happen." },
    { term: "Mitochondria", meaning: "Releases energy for the cell." },
    { term: "Chloroplast", meaning: "Contains chlorophyll for photosynthesis in plant cells." },
  ],
  lessons: [
    {
      id: "cell-structure",
      title: "Introduction to cell structure",
      minutes: "40-50 minutes",
      steps: [
        {
          title: 'Ask: "What do you think makes up a living thing?"',
          note: "Allow learners to share ideas before correcting any of them.",
        },
        {
          title: "Introduce the cell as the basic unit of life.",
          note: "Use a chalkboard diagram or any simple model available.",
        },
        {
          title: "Learners observe and draw a cell from a slide or a wall chart.",
          note: "Pair learners so those without a clear view still take part.",
        },
        {
          title: "Ask learners to label three parts on their drawing.",
          note: "Use their answers to decide what to recap next lesson.",
        },
      ],
      misconception: "Learners often think cells are only found in animals. Point out that plants, fungi and bacteria are also made of cells.",
      tip: "Onion skin and cheek cells are the cheapest specimens available, and both work without staining.",
    },
    {
      id: "cell-components",
      title: "Cell components and functions",
      minutes: "40 minutes",
      steps: [
        {
          title: "Recap the cell drawing from the previous lesson.",
          note: "Ask two learners to name a part they remember.",
        },
        {
          title: "Match each part to the job it does in the cell.",
          note: "Compare the cell to a homestead: fence, store, kitchen.",
        },
        {
          title: "In groups, learners build a labelled cell poster.",
          note: "Recycled paper and coloured chalk are enough.",
        },
        {
          title: "Each group states the function of one part aloud.",
          note: "Correct only the functions, not the artwork.",
        },
      ],
      misconception: "Learners confuse the cell wall with the cell membrane. Stress that a wall is rigid and only plants have one.",
      tip: "The homestead comparison sticks: the membrane is the gate, the nucleus is the head of the home.",
    },
    {
      id: "plant-vs-animal",
      title: "Plant and animal cells compared",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "Is a maize plant alive in the same way a goat is?"',
          note: "Let the disagreement run for a minute before resolving it.",
        },
        {
          title: "Draw both cells side by side and mark the differences.",
          note: "Cell wall, chloroplasts and a large vacuole are plant-only.",
        },
        {
          title: "Learners complete a two-column comparison table.",
          note: "Similarities column first, differences column second.",
        },
        {
          title: "Ask for one similarity and one difference from each row.",
          note: "Listen for learners who list only differences.",
        },
      ],
      misconception: "Learners often think plant and animal cells are completely different. Help them see both the similarities and the differences.",
      tip: "Use everyday examples like onion skin, a cheek cell or a leaf to make it real.",
    },
    {
      id: "cell-processes",
      title: "How cells support life",
      minutes: "45 minutes",
      steps: [
        {
          title: 'Ask: "Why does a cut heal but a stone stay broken?"',
          note: "This opens the idea of cells dividing and repairing.",
        },
        {
          title: "Explain growth, repair and energy release as cell work.",
          note: "Keep to processes the syllabus names; do not go into detail on respiration yet.",
        },
        {
          title: "Learners list three things their own body did today because of cells.",
          note: "Breathing, healing and growing all count.",
        },
        {
          title: "Exit question: how do cells support life in living organisms?",
          note: "Collect written answers to check who is following.",
        },
      ],
      misconception: "Learners think cells stop working when a person is asleep. Explain that repair and growth continue.",
      tip: "Link back to healing, because every learner has had a wound close over.",
    },
  ],
  quickChecks: [
    {
      type: "recall",
      question: "What is the main function of the cell membrane?",
      answer: "It controls what enters and leaves the cell.",
    },
    {
      type: "understand",
      question: "Label the parts A, B and C on the cell diagram.",
      answer: "Expect the nucleus, the cytoplasm and the cell membrane, in any order that matches your diagram.",
    },
    {
      type: "understand",
      question: "Why are mitochondria called the powerhouse of the cell?",
      answer: "Because they release the energy the cell needs to do its work.",
    },
    {
      type: "recall",
      question: "Give one similarity between plant and animal cells.",
      answer: "Both have a cell membrane, cytoplasm and a nucleus.",
    },
    {
      type: "apply",
      question: "If a cell does not have a nucleus, what type of cell is it likely to be?",
      answer: "A bacterial cell, or a mature red blood cell, which loses its nucleus.",
    },
    {
      type: "apply",
      question: "Explain how cells support life in living organisms.",
      answer: "They carry out growth, repair, energy release and the transport of materials.",
    },
  ],
};

const nutrition: StrandPack = {
  id: "nutrition",
  title: "Nutrition",
  subject: "Biology",
  grade: "Grade 10",
  icon: Apple,
  curriculumStrand: "Nutrition in Plants and Animals",
  source: "KICD Grade 10 Biology Curriculum Design",
  heroNote:
    "Nutrition connects directly to what learners eat and grow. Use that before you use the textbook.",
  teacherNote:
    "Learners already know a lot about food. Start from their plate at home, then name the science.",
  explanation: `## What nutrition means

Nutrition is how living things obtain and use food. Plants make their own food; animals take it in ready-made.

## The two routes to food

- **Autotrophic nutrition** — green plants build food from carbon dioxide and water using sunlight.
- **Heterotrophic nutrition** — animals, fungi and most bacteria feed on food made by others.

## Why it matters in class

- A balanced diet prevents deficiency diseases learners may have seen: kwashiorkor, rickets, anaemia.
- Farming decisions at home depend on knowing what plants need to grow.

**Note:** This offline summary is written from the curriculum outline. Connect once to load a fuller explanation if one has been generated.`,
  outcomes: [
    "Describe the modes of nutrition in plants and animals",
    "Explain the process of photosynthesis and its importance",
    "Describe the human digestive system and the role of enzymes",
    "Appreciate the value of a balanced diet in everyday life",
  ],
  concepts: [
    { term: "Nutrition", meaning: "How living things obtain and use food." },
    { term: "Photosynthesis", meaning: "How green plants make food using sunlight, carbon dioxide and water." },
    { term: "Chlorophyll", meaning: "The green pigment that traps light energy for photosynthesis." },
    { term: "Enzyme", meaning: "A substance that speeds up the breakdown of food in digestion." },
    { term: "Balanced diet", meaning: "A meal containing all nutrients in the right proportions." },
    { term: "Deficiency disease", meaning: "An illness caused by lacking a particular nutrient." },
  ],
  lessons: [
    {
      id: "food-and-nutrients",
      title: "Food and the main nutrients",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "What did you eat before coming to school?"',
          note: "Write four or five answers on the board to use as examples.",
        },
        {
          title: "Group those foods into carbohydrates, proteins, fats, vitamins and minerals.",
          note: "Ugali, beans and sukuma wiki cover most groups between them.",
        },
        {
          title: "Learners sort a list of local foods into nutrient groups.",
          note: "Groups of three, one list per group.",
        },
        {
          title: "Ask each group to name the nutrient their breakfast was missing.",
          note: "This surfaces misconceptions about what counts as a full meal.",
        },
      ],
      misconception: "Learners equate eating a lot with eating well. Stress proportion, not quantity.",
      tip: "Use only foods sold at the nearest market so the examples stay checkable.",
    },
    {
      id: "photosynthesis",
      title: "Photosynthesis in plants",
      minutes: "45-50 minutes",
      steps: [
        {
          title: 'Ask: "Who feeds the maize plant?"',
          note: "Most learners will say the farmer or the soil. Let that stand for now.",
        },
        {
          title: "Give the word equation and name the four requirements.",
          note: "Light, chlorophyll, carbon dioxide and water; glucose and oxygen come out.",
        },
        {
          title: "Compare a leaf grown in sunlight with one kept in the dark.",
          note: "Set this up a day early if you can; otherwise use a covered patch of grass.",
        },
        {
          title: "Ask learners to explain what would happen to a plant kept indoors.",
          note: "Look for reasoning about light, not just a memorised equation.",
        },
      ],
      misconception: "Learners believe plants take their food from the soil. Soil provides mineral salts and water, not food.",
      tip: "A yellow patch under a plank left on grass is the cheapest demonstration available.",
    },
    {
      id: "human-digestion",
      title: "The human digestive system",
      minutes: "45 minutes",
      steps: [
        {
          title: 'Ask: "Where does food go after you swallow?"',
          note: "Have a learner trace the path on their own body.",
        },
        {
          title: "Walk through mouth, oesophagus, stomach, small intestine, large intestine.",
          note: "Name one job per part. Do not list every enzyme.",
        },
        {
          title: "Learners label a digestive system diagram and mark where absorption happens.",
          note: "The small intestine is the answer they most often miss.",
        },
        {
          title: "Ask what would change if the small intestine were smooth instead of folded.",
          note: "Tests whether they connected surface area to absorption.",
        },
      ],
      misconception: "Learners think digestion happens only in the stomach. Most absorption is in the small intestine.",
      tip: "Chewing a piece of dry ugali until it tastes sweet demonstrates salivary digestion in class.",
    },
    {
      id: "balanced-diet",
      title: "Balanced diet and deficiency",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "Can someone eat every day and still be unhealthy?"',
          note: "Most learners will know someone this applies to.",
        },
        {
          title: "Link named nutrients to the diseases their absence causes.",
          note: "Protein and kwashiorkor, vitamin D and rickets, iron and anaemia.",
        },
        {
          title: "Learners plan a balanced day of meals using local foods only.",
          note: "Set a realistic budget so the plan is usable.",
        },
        {
          title: "Each group defends one meal choice on nutritional grounds.",
          note: "Correct reasoning, not taste.",
        },
      ],
      misconception: "Learners treat deficiency diseases as rare. Several are common and preventable with local foods.",
      tip: "Keep the discussion respectful; some learners may be personally affected.",
    },
  ],
  quickChecks: [
    {
      type: "recall",
      question: "Name the two main modes of nutrition.",
      answer: "Autotrophic nutrition and heterotrophic nutrition.",
    },
    {
      type: "recall",
      question: "What are the raw materials for photosynthesis?",
      answer: "Carbon dioxide and water, using light energy trapped by chlorophyll.",
    },
    {
      type: "understand",
      question: "Why is the small intestine folded and lined with villi?",
      answer: "To increase the surface area available for absorbing digested food.",
    },
    {
      type: "understand",
      question: "Explain why a plant kept in a dark room eventually dies.",
      answer: "Without light it cannot photosynthesise, so it runs out of stored food.",
    },
    {
      type: "apply",
      question: "A learner eats only ugali every day. Which deficiency is most likely, and why?",
      answer: "Protein deficiency, leading to kwashiorkor, because ugali is mainly carbohydrate.",
    },
    {
      type: "apply",
      question: "Suggest one cheap local food that would balance a maize-only meal.",
      answer: "Beans or groundnuts add protein; sukuma wiki adds vitamins and minerals.",
    },
  ],
};

const transport: StrandPack = {
  id: "transport",
  title: "Transport in Plants and Animals",
  subject: "Biology",
  grade: "Grade 10",
  icon: HeartPulse,
  curriculumStrand: "Transport in Plants and Animals",
  source: "KICD Grade 10 Biology Curriculum Design",
  heroNote:
    "This strand rewards diagrams. Plan your board space before the lesson starts.",
  teacherNote:
    "Keep returning to one question: what is being moved, from where, to where, and why.",
  explanation: `## Why transport is needed

Every cell needs food and oxygen, and every cell produces waste. In anything larger than a few cells, diffusion alone is too slow, so a transport system is required.

## In plants

- **Xylem** carries water and mineral salts upward from the roots.
- **Phloem** carries dissolved food from the leaves to the rest of the plant.
- Water lost through the leaves by transpiration keeps the flow moving.

## In animals

- Blood carries oxygen, food, wastes and heat.
- The heart pumps it through arteries, veins and capillaries.

**Note:** This offline summary is written from the curriculum outline. Connect once to load a fuller explanation if one has been generated.`,
  outcomes: [
    "Explain the need for transport systems in plants and animals",
    "Describe the structure and function of xylem and phloem",
    "Describe the structure of the human heart and blood vessels",
    "Appreciate the role of blood in maintaining health",
  ],
  concepts: [
    { term: "Diffusion", meaning: "Movement of particles from where they are many to where they are few." },
    { term: "Xylem", meaning: "Plant tissue that carries water and mineral salts upwards." },
    { term: "Phloem", meaning: "Plant tissue that carries dissolved food to all parts of the plant." },
    { term: "Transpiration", meaning: "Loss of water vapour from the leaves, which pulls water up the plant." },
    { term: "Artery", meaning: "A vessel carrying blood away from the heart, under high pressure." },
    { term: "Capillary", meaning: "A very thin vessel where exchange with body cells happens." },
  ],
  lessons: [
    {
      id: "need-for-transport",
      title: "Why living things need transport",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "Why can an amoeba survive without a heart?"',
          note: "Size is the answer you are steering towards.",
        },
        {
          title: "Explain that diffusion is fast over short distances and slow over long ones.",
          note: "Distance, not complexity, is the deciding factor.",
        },
        {
          title: "Learners compare how long a drop of dye takes to spread in a cup and in a bucket.",
          note: "Water and any available colouring will do.",
        },
        {
          title: "Ask why a tall tree needs xylem but moss does not.",
          note: "Checks whether the size argument transferred to plants.",
        },
      ],
      misconception: "Learners think only animals need transport systems. Tall plants need one just as much.",
      tip: "The dye demonstration works even with a pinch of soil in place of dye.",
    },
    {
      id: "transport-in-plants",
      title: "Transport in plants",
      minutes: "45 minutes",
      steps: [
        {
          title: 'Ask: "How does water reach the top leaf of a tall tree?"',
          note: "Let learners guess before you name transpiration pull.",
        },
        {
          title: "Distinguish xylem from phloem by direction and by what they carry.",
          note: "Xylem up with water; phloem to wherever food is needed.",
        },
        {
          title: "Stand a pale flower or celery stalk in coloured water and observe.",
          note: "Set this up at the start of the lesson and check at the end.",
        },
        {
          title: "Ask learners to predict where the colour will appear tomorrow.",
          note: "Their prediction shows whether they understood the direction of flow.",
        },
      ],
      misconception: "Learners assume phloem also moves upwards only. Food travels wherever it is needed, including down to roots.",
      tip: "Any white-petalled flower from the school compound works for the dye demonstration.",
    },
    {
      id: "circulatory-system",
      title: "The human circulatory system",
      minutes: "45-50 minutes",
      steps: [
        {
          title: "Have learners find their own pulse and count for 15 seconds.",
          note: "Multiply by four; write the class range on the board.",
        },
        {
          title: "Draw the heart's four chambers and the direction blood flows.",
          note: "Keep to two circuits: to the lungs, and to the body.",
        },
        {
          title: "Learners re-measure their pulse after 20 star jumps.",
          note: "Excuse any learner who should not exercise.",
        },
        {
          title: "Ask why the pulse rose, in terms of oxygen demand.",
          note: "Look for a link between muscle work and oxygen supply.",
        },
      ],
      misconception: "Learners believe arteries always carry oxygenated blood. The pulmonary artery is the exception.",
      tip: "The pulse activity gets every learner involved and needs no apparatus.",
    },
    {
      id: "blood",
      title: "Blood and its functions",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "What is blood actually made of?"',
          note: "Collect answers before naming the four components.",
        },
        {
          title: "Name plasma, red cells, white cells and platelets, with one job each.",
          note: "Transport, defence and clotting are the three ideas to land.",
        },
        {
          title: "Learners draw a labelled pie chart of blood composition.",
          note: "Approximate proportions are enough at this level.",
        },
        {
          title: "Ask what would happen to a person with too few red cells.",
          note: "Anaemia links this lesson back to nutrition.",
        },
      ],
      misconception: "Learners think white cells carry oxygen. Only red cells, through haemoglobin, do that.",
      tip: "Connecting anaemia to iron in food links two strands the learners have already met.",
    },
  ],
  quickChecks: [
    {
      type: "recall",
      question: "Which tissue carries water up a plant?",
      answer: "Xylem.",
    },
    {
      type: "recall",
      question: "Name the four chambers of the human heart.",
      answer: "Right atrium, right ventricle, left atrium and left ventricle.",
    },
    {
      type: "understand",
      question: "Why are the walls of arteries thicker than those of veins?",
      answer: "Arteries carry blood at high pressure from the heart, so they need stronger walls.",
    },
    {
      type: "understand",
      question: "Explain how transpiration helps move water up a stem.",
      answer: "Water lost from the leaves creates a pull that draws the column of water upwards.",
    },
    {
      type: "apply",
      question: "A learner's pulse rises during a race. Explain why.",
      answer: "Working muscles need more oxygen and food, so the heart pumps faster to deliver them.",
    },
    {
      type: "apply",
      question: "A ring of bark is cut from a tree trunk. What is likely to happen, and why?",
      answer: "The tree may die below the cut, because removing the bark removes the phloem carrying food downwards.",
    },
  ],
};

const gaseousExchange: StrandPack = {
  id: "gaseous-exchange",
  title: "Gaseous Exchange",
  subject: "Biology",
  grade: "Grade 10",
  icon: Wind,
  curriculumStrand: "Gaseous Exchange",
  source: "KICD Grade 10 Biology Curriculum Design",
  heroNote:
    "Learners confuse breathing with respiration all the way to Form Four. Separate them in lesson one.",
  teacherNote:
    "Breathing moves air. Respiration releases energy inside cells. Say the difference out loud every lesson.",
  explanation: `## What gaseous exchange is

Gaseous exchange is the movement of oxygen into an organism and carbon dioxide out of it. It happens across a surface, by diffusion.

## What a good exchange surface needs

- Large surface area
- Thin walls, so gases cross quickly
- Moist lining
- A good blood or air supply to keep the concentration difference going

## Where it happens

- **Plants** exchange gases through stomata in the leaves and lenticels in the stem.
- **Humans** exchange gases in the alveoli of the lungs.

**Note:** This offline summary is written from the curriculum outline. Connect once to load a fuller explanation if one has been generated.`,
  outcomes: [
    "Explain the need for gaseous exchange in living organisms",
    "Describe the features of an efficient gaseous exchange surface",
    "Describe gaseous exchange in plants and in humans",
    "Distinguish between breathing and respiration",
  ],
  concepts: [
    { term: "Gaseous exchange", meaning: "Movement of oxygen in and carbon dioxide out of an organism." },
    { term: "Breathing", meaning: "The physical movement of air into and out of the lungs." },
    { term: "Respiration", meaning: "The release of energy from food inside cells." },
    { term: "Alveolus", meaning: "A tiny air sac in the lung where gases cross into the blood." },
    { term: "Stoma", meaning: "A pore in a leaf that lets gases in and out." },
    { term: "Diaphragm", meaning: "The sheet of muscle below the lungs that drives breathing." },
  ],
  lessons: [
    {
      id: "need-for-exchange",
      title: "Why organisms exchange gases",
      minutes: "40 minutes",
      steps: [
        {
          title: "Ask learners to hold their breath and notice what they feel.",
          note: "Stop after fifteen seconds. Ask what the body was demanding.",
        },
        {
          title: "Explain that cells need oxygen constantly and produce carbon dioxide constantly.",
          note: "Name the gases; keep respiration itself for lesson four.",
        },
        {
          title: "Learners list every living thing in view and say how each gets oxygen.",
          note: "Include the grass and the trees outside, not only animals.",
        },
        {
          title: "Ask why a sealed jar with a plant and no light eventually fails.",
          note: "Checks that they see exchange as two-way.",
        },
      ],
      misconception: "Learners think plants only give out oxygen. Plants respire day and night and take in oxygen too.",
      tip: "The breath-holding opener costs nothing and every learner participates.",
    },
    {
      id: "exchange-in-plants",
      title: "Gaseous exchange in plants",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "Where are the holes in a leaf?"',
          note: "Most learners have never considered that leaves have pores.",
        },
        {
          title: "Introduce stomata and guard cells, and where they sit on the leaf.",
          note: "Mostly on the lower surface, which reduces water loss.",
        },
        {
          title: "Learners peel a thin strip of leaf epidermis and view or sketch it.",
          note: "A hand lens is enough if no microscope is available.",
        },
        {
          title: "Ask why stomata are found mainly on the underside of a leaf.",
          note: "Answer should mention reducing water loss in the sun.",
        },
      ],
      misconception: "Learners think stomata are only for gaseous exchange. They also control water loss.",
      tip: "Sukuma wiki leaves peel more easily than most and are available everywhere.",
    },
    {
      id: "human-breathing",
      title: "The human breathing system",
      minutes: "45 minutes",
      steps: [
        {
          title: "Learners place a hand on their ribs and breathe deeply.",
          note: "Ask them to describe the movement in their own words.",
        },
        {
          title: "Trace the path of air: nose, trachea, bronchi, bronchioles, alveoli.",
          note: "Name the diaphragm's role in pulling air in.",
        },
        {
          title: "Learners build a bell-jar model with a bottle, balloons and a plastic sheet.",
          note: "One model per class is enough if materials are scarce.",
        },
        {
          title: "Ask which part of the model represents the diaphragm.",
          note: "The stretched sheet at the base.",
        },
      ],
      misconception: "Learners think lungs pull air in by themselves. It is the diaphragm and rib muscles that do the work.",
      tip: "A plastic bottle model survives many lessons; store it rather than rebuilding it.",
    },
    {
      id: "breathing-vs-respiration",
      title: "Breathing and respiration compared",
      minutes: "40 minutes",
      steps: [
        {
          title: 'Ask: "Are breathing and respiration the same thing?"',
          note: "Take a show of hands. Most will say yes.",
        },
        {
          title: "Separate the two clearly: air movement versus energy release in cells.",
          note: "Write both definitions on the board and leave them up.",
        },
        {
          title: "Learners sort ten statements into a breathing column and a respiration column.",
          note: "Prepare the statements on the board before the lesson.",
        },
        {
          title: "Exit question: which one continues while you are asleep?",
          note: "Both do. Listen for learners who say only breathing.",
        },
      ],
      misconception: "Learners use breathing and respiration as synonyms. Correct this every time it happens.",
      tip: "Leave both definitions on a corner of the board for the rest of the strand.",
    },
  ],
  quickChecks: [
    {
      type: "recall",
      question: "Name the structures where gaseous exchange happens in the human lung.",
      answer: "The alveoli.",
    },
    {
      type: "recall",
      question: "Which pores allow gaseous exchange in a leaf?",
      answer: "Stomata, controlled by guard cells.",
    },
    {
      type: "understand",
      question: "State three features of an efficient gaseous exchange surface.",
      answer: "Large surface area, thin walls, a moist lining, and a good blood or air supply.",
    },
    {
      type: "understand",
      question: "Explain the difference between breathing and respiration.",
      answer: "Breathing moves air in and out of the lungs; respiration releases energy from food inside cells.",
    },
    {
      type: "apply",
      question: "Why does a person breathe faster when climbing a hill?",
      answer: "Muscles need more oxygen and produce more carbon dioxide, so breathing speeds up to keep pace.",
    },
    {
      type: "apply",
      question: "A leaf's lower surface is smeared with petroleum jelly. Predict the effect.",
      answer: "Gaseous exchange is blocked at the stomata, so photosynthesis and respiration in the leaf slow down.",
    },
  ],
};

export const strandPacks: StrandPack[] = [
  cellBiology,
  nutrition,
  transport,
  gaseousExchange,
];

export const defaultStrandId = cellBiology.id;

export function findStrandPack(strandId: string | undefined) {
  return strandPacks.find((pack) => pack.id === strandId);
}
