import db from "./db.js";

// Les Chapitres de l'Amour
const firstCollection = [
  {
    name: "I. Love at first sight",
    description: `A stolen moment suspended in time—the first glance, where everything begins.
    Two souls collide in silence, unaware that fate has just turned its page. The air shifts. The heart stirs. It is sweetness wrapped in uncertainty, a beginning already laced with its ending.
    This scent captures the fragile beauty of newness: a luminous veil of citrus and delicate florals that bloom with the innocence of curiosity. Beneath the surface, a soft tension unfolds—ambered musks and tender woods echo the quiet promise of a story still unwritten.
    Unisex and ephemeral, it lingers like the memory of a gaze—haunting, beautiful, and irreversibly life-changing.
    It is not love, not yet—but the breathless ache of its possibility. `,
    price: 9111,
    image: "/imgs/storyOfLove/placeholder1.png",
    gallery: [
      "/imgs/storyOfLove/placeholder2.png",
      "/imgs/storyOfLove/placeholder3.png",
    ],
  },
  {
    name: "II. First Kiss",
    description: `This is the moment when hope breathes form into desire.
    Fleeting but electric, the kiss binds two people in silent agreement: we are not imagining this. The perfume opens with a sudden burst of ripe fruit—lush, unguarded, and full of promise. At its heart, a warm floral accord pulses with heartbeat rhythm—roses and osmanthus entwined, lips meeting, time pausing.
    Base notes of suede, skin musk, and a touch of salted caramel linger like warmth left behind on a collar.
    Not a question anymore—this is love beginning to believe in itself.`,
    price: 9222,
    image: "/imgs/storyOfLove/placeholder2.png",
    gallery: [
      "/imgs/storyOfLove/placeholder3.png",
      "/imgs/storyOfLove/placeholder4.png",
      "/imgs/storyOfLove/placeholder5.png",
    ],
  },
  {
    name: "III. La Promesse",
    description: `We spoke of forever with trembling mouths.
    This is the high point—the sacred space where dreams are shared, and love feels invincible. It is delicate but full of conviction, as if by speaking their future aloud, the lovers could carve it into time.
    The fragrance opens with pear blossom and heliotrope—tender, hopeful. A heart of iris, creamy sandalwood, and almond milk evokes warmth and comfort, like falling asleep wrapped in each other’s breath.
    At the base: soft vanilla and white amber, glowing like candlelight—promises not yet broken.
    This is the chapter of belief. That love will be enough.`,
    price: 9444,
    image: "/imgs/storyOfLove/placeholder3.png",
    gallery: [],
  },
  {
    name: "IV. Beneath the Skin",
    description: `A love no longer worn—it has become who we are.
    This chapter captures when desire moves inward, when lust is no longer about touch but about possession. There is no air between them. Every glance, every silence is loaded. Obsession masquerades as devotion.
    The scent opens with rich spiced fig and saffron—intoxicating, indulgent. The heart throbs with narcotic jasmine and dark resin, like secrets that stain. Base notes of animalic musk, patchouli, and warm skin accord hold on too long, like a lover who won’t let go.
    It’s not love anymore. It’s the hunger to dissolve into the other. To be consumed, and to consume.
    This is desire with no exit.`,
    price: 9777,
    image: "/imgs/storyOfLove/placeholder4.png",
    gallery: [],
  },
  {
    name: "V. L’Étreinte Vide",
    description: `So close. So far. So quietly slipping away.
    The bodies are still together, but something has changed. Touch no longer reassures—it conceals. The embrace becomes a ritual. This chapter is about the fear of losing what still appears whole.
    Sharp opening notes of rhubarb and metallic rose pierce through the warmth. The heart is powdery and fragile: iris, mimosa, and pale leather—beauty trying to stay alive. Beneath it all, grey musk and cold cedar settle like a sigh in a cold room.
    It is not the ending. But it is the beginning of pretending.`,
    price: 9555,
    image: "/imgs/storyOfLove/placeholder5.png",
    gallery: [],
  },
  {
    name: "VI. Le Goût de l’Oubli",
    description: `When the fire dies, smoke is all that remains.
    This is the chapter where love, swollen with too much meaning, begins to suffocate. What once was passion now exhausts. Every word is too sharp. Every silence too loud. The perfume opens with overripe fruit and burnt sugar—decay disguised as sweetness.
    At its heart: wilted tuberose, smoked leather, and crushed violet—a bouquet left too long in the sun. The dry down is cold: vetiver, ashen incense, and ghostly white musk.
    It remembers what it was, but cannot return.
    This is not heartbreak. It is detachment. A forgetting that tastes like mourning.`,
    price: 9666,
    image: "/imgs/storyOfLove/placeholder6.png",
    gallery: [],
  },

  {
    name: "VII. Les Adieux",
    description: `Love, once a symphony, becomes a single fading note.
    There’s grace in the goodbye. There has to be. This scent is quiet, refined, and aching. It opens with bitter almond and iris—elegant, distant. A heart of incense and ghostly white florals captures the feeling of walking away but still looking back.
    The base is hollowed woods and faded musk, a scent that haunts more than it holds.
    This is not about forgetting. It’s about remembering with tenderness—and letting go.`,
    price: 9999,
    image: "/imgs/storyOfLove/placeholder7.png",
    gallery: ["/imgs/storyOfLove/placeholder3.png"],
  },
];

// XX Collection
const secondCollection = [
  {
    name: "Loin de Toi",
    description: `The quiet after everything.
    Time has passed. The tears have dried. But the imprint remains. This final chapter is not about pain—it’s about distance, clarity, and the soft echo of once having loved.
    A sheer opening of icy aldehydes and tea leaves leads to a heart of iris and bare woods—elegant, weightless, a whisper. The base is pale amber and tonka—warmth, but no longer heat.
    This is solitude, not loneliness. A scent that walks alone, but unburdened.
    It is not a return. It is peace.`,
    price: "9212",
  },
];

function insertData() {
  const query = db.prepare(
    `INSERT INTO perfumes (name, description, price, image) VALUES (?, ?, ?, ?)`
  );

  for (const perfume of firstCollection) {
    const execQuery = query.run(
      perfume.name,
      perfume.description,
      perfume.price,
      perfume.image
    );

    const perfumeId = execQuery.lastInsertRowid;

    if (perfume.gallery.length > 0) {
      for (const path of perfume.gallery) {
        db.prepare(
          `INSERT INTO perfume_images (perfume_id, path) VALUES (?, ?)`
        ).run(perfumeId, path);
      }
    }
  }
}

insertData();

// TODO: populate through cli from excel file
