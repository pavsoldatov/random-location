import seedrandom from 'seedrandom';
import randomLocation from './index';

describe('random-location', () => {
  describe('distance between two points (haversine)', () => {
    test('close distance points', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      // Notre-Dame Cathedral
      const P2 = {
        latitude: 48.8529717,
        longitude: 2.3477134,
      };
      expect(Math.floor(randomLocation.distance(P1, P2))).toEqual(4098);
    });

    test('far distance points', () => {
      // Nordkapp
      const P1 = {
        latitude: 71.1685659,
        longitude: 25.7802643,
      };
      // Oslo
      const P2 = {
        latitude: 59.8939225,
        longitude: 10.7150777,
      };
      expect(Math.floor(randomLocation.distance(P1, P2))).toEqual(1423662);
    });
  });

  describe('random generation of points', () => {
    test('on a circle circumference; given center point and radius', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const R = 1234; // meters

      for (let i = 0; i < 100; i++) {
        const randomPoint = randomLocation.randomCircumferencePoint(P1, R);
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(R + 1);
        expect(distance).toBeGreaterThanOrEqual(R - 1);
      }
    });
    test('inside a circle circumference; given center point and radius', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const R = 1234; // meters

      for (let i = 0; i < 100; i++) {
        const randomPoint = randomLocation.randomCirclePoint(P1, R);
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(R + 1);
      }
    });
    test('on a circle circumference; given center point and radius with seedrandom', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const R = 1234; // meters
      const seed = 'this is a seed';

      for (let i = 0; i < 100; i++) {
        const randomFn = seedrandom(seed);
        const randomPoint = randomLocation.randomCircumferencePoint(
          P1,
          R,
          randomFn
        );
        expect(randomPoint).toEqual({
          latitude: 48.858329622669594,
          longitude: 2.3091601425977983,
        });
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(R + 1);
        expect(distance).toBeGreaterThanOrEqual(R - 1);
      }
    });
    test('inside a circle circumference; given center point and radius with seedrandom', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const R = 1234; // meters
      const seed = 'this is another seed';

      for (let i = 0; i < 100; i++) {
        const randomFn = seedrandom(seed);
        const randomPoint = randomLocation.randomCirclePoint(P1, R, randomFn);
        expect(randomPoint).toEqual({
          latitude: 48.86346576500599,
          longitude: 2.2832169347223297,
        });
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(R + 1);
      }
    });
  });

  describe('random generation of random annulus points', () => {
    test('innerRadius is larger than outerRadius', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const innerRadius = 1000; // meters
      const outerRadius = 123;
      expect(() =>
        randomLocation.randomAnnulusPoint(P1, innerRadius, outerRadius)
      ).toThrow(
        `innerRadius (${innerRadius}) should be smaller than outerRadius (${outerRadius})`
      );
    });

    test('on an annulus of two concentric circles', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const innerRadius = 1000; // meters
      const outerRadius = 2000;

      for (let i = 0; i < 100; i++) {
        const randomPoint = randomLocation.randomAnnulusPoint(
          P1,
          innerRadius,
          outerRadius
        );
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(outerRadius);
        expect(distance).toBeGreaterThanOrEqual(innerRadius);
      }
    });
    test('on an annulus of two concentric circles; using seedrandom', () => {
      // Eiffel Tower
      const P1 = {
        latitude: 48.8583736,
        longitude: 2.2922926,
      };
      const innerRadius = 1000; // meters
      const outerRadius = 2000;
      const seed = 'this is another seed';
      const randomFn = seedrandom(seed);

      for (let i = 0; i < 100; i++) {
        const randomPoint = randomLocation.randomAnnulusPoint(
          P1,
          innerRadius,
          outerRadius,
          randomFn
        );
        const distance = Math.floor(randomLocation.distance(P1, randomPoint));
        expect(distance).toBeLessThanOrEqual(outerRadius);
        expect(distance).toBeGreaterThanOrEqual(innerRadius);
      }
    });
  });
});
