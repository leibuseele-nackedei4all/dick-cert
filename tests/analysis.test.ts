import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateOverallScore, formatScore, generateDemoAnalysis } from '../src/analysis.ts';

test('the overall score is the equally weighted mean of the four scores', () => {
  assert.equal(calculateOverallScore({ length: 9, girth: 9, shape: 8, aesthetics: 8 }), 8.5);
  assert.equal(calculateOverallScore({ length: 8, girth: 9, shape: 9, aesthetics: 8 }), 8.5);
  assert.equal(calculateOverallScore({ length: 7, girth: 8, shape: 8, aesthetics: 10 }), 8.3);
  assert.equal(calculateOverallScore({ length: 8, girth: 8, shape: 9, aesthetics: 10 }), 8.8);
});

test('the report and certificate can use one stable result snapshot', () => {
  const draws = [0, 0.5, 0.8, 0, 0.2, 0];
  const demo = generateDemoAnalysis('  Demo Person  ', () => draws.shift() ?? assert.fail('Unexpected random draw'), new Date(2026, 10, 18, 12));
  assert.deepEqual(demo.scores, { length: 7, girth: 9, shape: 10, aesthetics: 8 });
  assert.equal(demo.overallScore, 8.5);
  assert.equal(demo.name, 'Demo Person');
  assert.equal(demo.issuedOn, '18. November 2026');
  assert.equal(demo.title, 'Elite Harmoniker');
  assert.equal(draws.length, 0);
  assert.equal(formatScore(demo.overallScore), '8,5');
});

test('German score formatting keeps one decimal even for whole numbers', () => {
  assert.equal(formatScore(9), '9,0');
  assert.equal(formatScore(8.3), '8,3');
});
