import PubSub from '../../../src/kindergarten/utils/PubSub';

describe('PubSub', () => {
  beforeEach(function () {
    this.PubSub = PubSub;

    this.Subject = class extends this.PubSub {
      constructor() {
        super();
        this.name = 'subject';
      }
    };

    this.subject = new this.Subject();
  });

  describe('trigger', () => {
    it('calls the trigger method of it\'s parent', function () {
      spyOn(this.PubSub.prototype, 'trigger');

      this.subject.trigger('foo');

      expect(this.PubSub.prototype.trigger).toHaveBeenCalled();
    });

    it('calls the cb with right context and arguments', function () {
      const testContext = this;

      this.subject.on('foo', function (...args) {
        expect(args[0]).toBe(true);
        expect(args[1]).toBe(1);
        // can't compare subject and this directly (Babel magic..)
        expect(this.name).toBe(testContext.subject.name);
      });

      this.subject.trigger('foo', true, 1);
    });

    it('is proceed the callback synchronously', function () {
      let counter = 0;

      this.subject.on('foo', () => {
        ++counter;
      });

      this.subject.trigger('foo');

      expect(counter).toBe(1);
    });
  });

  describe('triggerAsync', () => {
    it('proceeds the callback asynchronously', function (done) {
      let counter = 0;

      this.subject.on('foo', () => {
        ++counter;
      });

      this.subject.triggerAsync('foo');

      expect(counter).toBe(0);

      setTimeout(() => {
        expect(counter).toBe(1);
        done();
      }, 1);
    });

    it('calls the cb with right context and arguments', function (done) {
      const testContext = this;
      let counter = 0;

      this.subject.on('foo', function (...args) {
        expect(args[0]).toBe(true);
        expect(args[1]).toBe(1);
        // can't compare subject and this directly (Babel magic..)
        expect(this.name).toBe(testContext.subject.name);
        ++counter;
      });

      this.subject.triggerAsync('foo', true, 1);

      setTimeout(() => {
        expect(counter).toBe(1); // make sure test got executed
        done();
      }, 1);
    });
  });
});