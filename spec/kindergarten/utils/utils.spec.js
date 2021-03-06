import { _ } from 'lodash';

import {
  isGoverness,
  isSandbox,
  isRule
} from '../../../src/kindergarten/utils';

import FactoryGirl from '../../support/FactoryGirl';

describe('utils', () => {
  describe('isGoverness', () => {
    it('should return true if given arg is a governess', () => {
      _.each([
        new (new FactoryGirl('HeadGoverness'))({}),
        new (new FactoryGirl('StrictGoverness'))({}),
        new (new FactoryGirl('EasyGoverness'))({}),
        new (new FactoryGirl('GermanGoverness'))({})
      ], (s) => {
        expect(isGoverness(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a governess', () => {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('Sandbox')
      ], (s) => {
        expect(isGoverness(s)).toBe(false);
      });
    });
  });

  describe('isSandbox', () => {
    it('should return true if given arg is a sandbox', () => {
      _.each([
        new (new FactoryGirl('Sandbox'))({})
      ], (s) => {
        expect(isSandbox(s)).toBe(true);
      });
    });

    it('should return false if given arg is not a sandbox', () => {
      _.each([
        null, undefined, [], 1, 0, -1, function () {}, {},
        new FactoryGirl('GermanGoverness')
      ], (s) => {
        expect(isSandbox(s)).toBe(false);
      });
    });
  });

  describe('isRule', () => {
    it('should return true if given arg is a rule', () => {
      expect(isRule(
        new(new FactoryGirl('Rule'))('can watch', /tv/)
      )).toBe(true);
    });

    it('should return false if given arg is not a rule', () => {
      expect(isRule(new FactoryGirl('child'))).toBe(false);
    });
  });
});
