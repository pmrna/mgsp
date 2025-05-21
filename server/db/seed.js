const perfumes = [
  {
    name: "I. Love at first sight",
    description: `A stolen moment suspended in time—the first glance, where everything begins.
    Two souls collide in silence, unaware that fate has just turned its page. The air shifts. The heart stirs. It is sweetness wrapped in uncertainty, a beginning already laced with its ending.
    This scent captures the fragile beauty of newness: a luminous veil of citrus and delicate florals that bloom with the innocence of curiosity. Beneath the surface, a soft tension unfolds—ambered musks and tender woods echo the quiet promise of a story still unwritten.
    Unisex and ephemeral, it lingers like the memory of a gaze—haunting, beautiful, and irreversibly life-changing.
    It is not love, not yet—but the breathless ache of its possibility. `,
    price: 9999,
  },
];

for (const p of perfumes) {
  db.prepare(
    `
        INSERT INTO perfumes (name, description, price) VALUES (?, ?, ?)
    `
  ).run(p.name, p.description, p.price);
}

// TODO: populate through cli from excel file
