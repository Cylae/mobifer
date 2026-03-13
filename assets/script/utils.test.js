import { test } from "node:test";
import assert from "node:assert";
import { normalizeString } from "./utils.js";

test("normalizeString basic functionality", () => {
	assert.strictEqual(normalizeString("Hello"), "hello");
});

test("normalizeString removes diacritics", () => {
	assert.strictEqual(normalizeString("Évry"), "evry");
	assert.strictEqual(normalizeString("Château de Vincennes"), "chateau de vincennes");
});

test("normalizeString handles dashes (current behavior: only first hyphen)", () => {
	// En-dash to hyphen, then " - " to "-", then "-" to " "
	assert.strictEqual(normalizeString("Villejuif – Gustave Roussy"), "villejuif gustave roussy");
	// Normal hyphen to space
	assert.strictEqual(normalizeString("Saint-Lazare"), "saint lazare");
    assert.strictEqual(normalizeString("Bécon-les-Bruyères"), "becon les-bruyeres");
    assert.strictEqual(normalizeString("Saint-Germain-en-Laye"), "saint germain-en-laye");
});

test("normalizeString handles apostrophes", () => {
	assert.strictEqual(normalizeString("Aéroport d'Orly"), "aeroport d’orly");
});

test("normalizeString handles mixed cases", () => {
    assert.strictEqual(
        normalizeString("L'Haÿ-les-Roses"),
        "l’hay les-roses"
    );
});
