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
        this.hashMap[hashCode].append({ key, value });
    }

    get(key) {
        // go to the LinkedList at the hash index on the hashMap
        // find the index of the desired key in that LinkedList
        // use that index to return the value stored in that field

        const hashCode = this.hash(key);

        try {
            this.outOfBoundsCheck(hashCode);
        } catch (err) {
            console.error(`Caught error in get(key, value) ${err.message}`);
            return;
        }

        if (!this.hashMap[hashCode]) return null;
        const valueIndex = this.hashMap[hashCode].find(key);
        if (!valueIndex) return null;
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

    outOfBoundsCheck(index) {
        if (index < 0 || index >= this.hashMap.capacity) {
            throw new Error("Trying to access index out of bounds");
        }
    }
}

const hashMap = new HashMap();

hashMap.set("first message", "hey how are ya?");
hashMap.set("second message", "Vivian Simon");
hashMap.set("first message", "Dylan Simon");
hashMap.set("second message", "Vivian Simon");
hashMap.set("third message", "Lena Simon");
hashMap.set("fourth message", "Jason Lee");
hashMap.set("fifth message", "Maria Chen");
hashMap.set("sixth message", "Alex Johnson");
hashMap.set("seventh message", "Emily Davis");
hashMap.set("eighth message", "Noah Brown");
hashMap.set("ninth message", "Olivia White");
hashMap.set("tenth message", "Liam Garcia");
hashMap.set("eleventh message", "Sophia Martinez");
hashMap.set("twelfth message", "Benjamin Kim");
hashMap.set("thirteenth message", "Ava Patel");
hashMap.set("fourteenth message", "Lucas Nguyen");
hashMap.set("fifteenth message", "Isabella Wright");

// console.log(hashMap.length());
// console.log(hashMap.hashMap[8].toString());

console.log(hashMap.hashMap[hashMap.hash("fifteenth message")].toString());
hashMap.remove("tenth message");
console.log(hashMap.hashMap[hashMap.hash("fifteenth message")].toString());
hashMap.clear();
console.log(hashMap.length());
