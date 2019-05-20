import path from "path";
import fs from "fs";
import assert from "assert";
import { transformFileSync } from "@babel/core";
import plugin from "../src/index";
import { trim } from "ramda";

describe("Ramda modularized builds", () => {
  const fixturesDir = path.join(__dirname, "fixtures");
  const errorFixturesDir = path.join(__dirname, "error-fixtures");

  fs.readdirSync(fixturesDir).map(caseName => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const actualFile = path.join(fixtureDir, "actual.js");
    const expectedFile = path.join(fixtureDir, "expected.js");

    describe(`should work with ${caseName.split("-").join(" ")}`, () => {
      // Programmatically test with the useES option both on and off
      specify("src", () => {
        const actual = transformFileSync(actualFile, {
          compact: true,
          plugins: [plugin]
        }).code;
        const expected = transformFileSync(expectedFile, { compact: true }).code;
        assert.equal(trim(actual), trim(expected));
      });

      specify("es", () => {
        const actual = transformFileSync(actualFile, {
          compact: true,
          plugins: [[plugin, { useES: true }]]
        }).code;

        // The only difference is that src should be replaced with es. This way, no changes to
        // the tests are needed to cover testing of useES.
        const expected = transformFileSync(expectedFile, { compact: true })
          .code
          .replace(/src/g, "es");
        assert.equal(trim(actual), trim(expected));
      });
    });
  });

  fs.readdirSync(errorFixturesDir).map(caseName => {
    const fixtureDir = path.join(fixturesDir, caseName);
    const actualFile = path.join(fixtureDir, "actual.js");

    it(`should throw an error with ${caseName.split("-").join(" ")}`, () => {
      assert.throws(function() {
        const actual = transformFileSync(actualFile, {
          plugins: [plugin]
        }).code;
      });
    });
  });
});
