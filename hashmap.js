const { Node, LinkedList } = require("./linked-lists.js");

class HashMap {
    constructor() {
        this.defaultCapacity = 16;
        this.capacity = this.defaultCapacity;
        this.loadFactor;
        this.threshold = 0.6;
        this.hashMap = new Array(this.capacity);
    }

    initializeHashMap() {}

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    length() {
        let count = 0;
        for (let i = 0; i < this.hashMap.length; i++) {
            if (this.hashMap[i]) {
                count += 1;
            }
        }
        return count;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        try {
            this.outOfBoundsCheck(hashCode);
        } catch (err) {
            console.error(`Caught error in set(key, value) ${err.message}`);
            return;
        }

        // create something in the hashMap array
        if (!this.hashMap[hashCode]) {
            this.hashMap[hashCode] = new LinkedList();
        }
        if (this.hashMap[hashCode].containsKey(key)) {
            const linkedIndex = this.hashMap[hashCode].find(key);
            this.hashMap[hashCode].at(linkedIndex).value.value = value;
            return true;
        }

        this.hashMap[hashCode].append({ key, value });

        const currentLength = this.length();
        this.loadFactor = currentLength / this.capacity;
        if (this.loadFactor > this.threshold) {
            console.log("before capacity increase");
            console.log(`used capacity: ${this.length()}`);
            console.log(`hashmap capacity: ${this.capacity}`);
            console.log(`load factor: ${this.checkLoadFactor()}\n`);
        }
        if (this.resize()) {
            console.log("after capacity increase");
            console.log(`used capacity: ${this.length()}`);
            console.log(`hashmap capacity: ${this.capacity}`);
            console.log(`load factor: ${this.checkLoadFactor()}\n`);
        }
        return true;
    }

    get(key) {
        // return the value of the hashmap at this index

        const hashCode = this.hash(key);

        try {
            this.outOfBoundsCheck(hashCode);
        } catch (err) {
            console.error(`Caught error in get(key, value) ${err.message}`);
            return;
        }

        if (!this.hashMap[hashCode]) return null;
        const valueIndex = this.hashMap[hashCode].find(key);
        
        if (valueIndex === null) return null;
        return this.hashMap[hashCode].at(valueIndex).value.value;
    }

    has(key) {
        const hashCode = this.hash(key);

        try {
            this.outOfBoundsCheck(hashCode);
        } catch (err) {
            console.error(`Caught error in get(key, value) ${err.message}`);
            return;
        }

        // If there's nothing in the array at the hash
        // return false.
        // If there is a LinkedList in the array at the hash,
        // see if there's something in the LinkedList with the
        // corresponding key
        if (!this.hashMap[hashCode]) return false;
        const valueIndex = this.hashMap[hashCode].find(key);
        return valueIndex !== null;
    }

    remove(key) {
        const hashCode = this.hash(key);

        try {
            this.outOfBoundsCheck(hashCode);
        } catch (err) {
            console.error(`Caught error in get(key, value) ${err.message}`);
            return;
        }

        // if the given key is in the hashmap
        // remove the entry with that key and
        // return true
        if (!this.has(key)) return false;
        const keyIndex = this.hashMap[hashCode].find(key);
        this.hashMap[hashCode].removeAt(keyIndex);
        return true;
    }

    clear() {
        this.hashMap = new Array(this.defaultCapacity);
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.hashMap.length; i++) {
            if (this.hashMap[i]) {
                let linkedKeys = this.hashMap[i].keysToArray();
                keys.push(...linkedKeys);
            }
        }
        return keys;
    }

    values() {
        const keys = [];
        for (let i = 0; i < this.hashMap.length; i++) {
            if (this.hashMap[i]) {
                let linkedValues = this.hashMap[i].valuesToArray();
                keys.push(...linkedValues);
            }
        }
        return keys;
    }

    entries() {
        const keys = [];
        for (let i = 0; i < this.hashMap.length; i++) {
            if (this.hashMap[i]) {
                let linkedObjects = this.hashMap[i].objectsToArray();
                keys.push(...linkedObjects);
            }
        }
        return keys;
    }

    resize() {
        /*
            Check if the threshold has been passed by the
            load factor yet. If it has, then double the capacity
            of the hashmap and refill it with the new hash.
        */

        const currentLength = this.length();
        this.loadFactor = currentLength / this.capacity;

        if (this.loadFactor < this.threshold) return false;

        this.capacity *= 2;
        let newArray = [];
        let entries = this.entries();
        this.hashMap = [];
        // console.log(entries.length);
        for (let i = 0; i < entries.length; i++) {
            this.set(entries[i][0], entries[i][1]);
        }

        return true;
    }

    checkLoadFactor() {
        return this.length() / this.capacity;
    }

    outOfBoundsCheck(index) {
        if (index < 0 || index >= this.hashMap.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
    }
}

const hashMap = new HashMap();

module.exports = { HashMap };
