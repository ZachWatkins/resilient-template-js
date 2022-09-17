//@ts-check
/**
 * The instance of the class.
 *
 * @type {Singleton}
 */
let instance;

/**
 *
 */
function Singleton() {
    /**
     * The date the Singleton was instantiated
     *
     * @type {Date}
     * @readonly
     */
    this.date = new Date();
    /**
     * The purpose of the Singleton.
     *
     * @type {string}
     * @readonly
     */
    this.purpose =
        'For application-wide access to a single instance of a variable, object, or class.';
    /** @type {object} Examples for how to use the Singleton. */
    this.example = {
        /** @type {string} How to import the Singleton. */
        import: 'import useSingleton from "./Singleton.js";',
        /** @type {string} How to access the Singleton instance. */
        access: 'const refSingleton = useSingleton();',
    };
}

/**
 * Create the instance.
 *
 * @type {Function}
 */
const createInstance = function () {
    const singleton = new Singleton();
    return singleton;
};

/**
 * Exported reference to the singleton.
 *
 * @return
 */
export const useSingleton = function () {
    if (!instance) {
        instance = createInstance();
    }

    return instance;
};

export default useSingleton;
