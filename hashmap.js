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
            const linkedIndex = this.hashMap[hashCode].find(key)
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
            console.log(`load factor: ${this.checkLoadFactor()}`);
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

//#region fill the hashmap
hashMap.set("first message", "hey how are ya?");
hashMap.set("second message", "whaddup");
hashMap.set("first message", "nothing much");

// console.log(hashMap.get("first message"));

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
hashMap.set("sixteenth message", "Ethan Baker");
hashMap.set("seventeenth message", "Mia Turner");
hashMap.set("eighteenth message", "William Scott");
hashMap.set("nineteenth message", "Charlotte Rivera");
hashMap.set("twentieth message", "James Reed");
hashMap.set("twenty-first message", "Amelia Perez");
hashMap.set("twenty-second message", "Henry Cox");
hashMap.set("twenty-third message", "Harper Ward");
hashMap.set("twenty-fourth message", "Alexander Brooks");
hashMap.set("twenty-fifth message", "Evelyn Sanders");
hashMap.set("twenty-sixth message", "Michael Price");
hashMap.set("twenty-seventh message", "Abigail Bennett");
hashMap.set("twenty-eighth message", "Daniel Ross");
hashMap.set("twenty-ninth message", "Ella Bailey");
hashMap.set("thirtieth message", "Matthew Rivera");
hashMap.set("twenty-eighth message", "OVERWRITE TEST");

//#endregion

// console.log(hashMap.get("twenty-eighth message"));

console.log(hashMap.hashMap[hashMap.hash("twenty-eighth message")]);
// console.log(hashMap.hashMap[2].toString());

//#region 100 records
/* hashMap.set("message 31", "Aria Morgan");
hashMap.set("message 32", "Logan Jenkins");
hashMap.set("message 33", "Chloe Barnes");
hashMap.set("message 34", "Aiden Perry");
hashMap.set("message 35", "Zoe Powell");
hashMap.set("message 36", "Jack Long");
hashMap.set("message 37", "Lily Patterson");
hashMap.set("message 38", "Owen Hughes");
hashMap.set("message 39", "Grace Flores");
hashMap.set("message 40", "Wyatt Ward");
hashMap.set("message 41", "Hannah Bryant");
hashMap.set("message 42", "Sebastian Torres");
hashMap.set("message 43", "Layla Fisher");
hashMap.set("message 44", "Gabriel Foster");
hashMap.set("message 45", "Riley Simmons");
hashMap.set("message 46", "Julian Butler");
hashMap.set("message 47", "Nora Gonzalez");
hashMap.set("message 48", "Levi Hayes");
hashMap.set("message 49", "Scarlett Bryant");
hashMap.set("message 50", "David Coleman");
hashMap.set("message 51", "Aurora Barnes");
hashMap.set("message 52", "Isaac Bennett");
hashMap.set("message 53", "Penelope Mitchell");
hashMap.set("message 54", "Anthony Russell");
hashMap.set("message 55", "Ellie Griffin");
hashMap.set("message 56", "Joseph West");
hashMap.set("message 57", "Hazel Chapman");
hashMap.set("message 58", "Samuel Henderson");
hashMap.set("message 59", "Violet Armstrong");
hashMap.set("message 60", "Caleb Graham");
hashMap.set("message 61", "Madelyn Wells");
hashMap.set("message 62", "Nathan Harper");
hashMap.set("message 63", "Aubrey Stone");
hashMap.set("message 64", "Christopher Weaver");
hashMap.set("message 65", "Claire Hudson");
hashMap.set("message 66", "Eli Gibson");
hashMap.set("message 67", "Lucy Ford");
hashMap.set("message 68", "Christian Murray");
hashMap.set("message 69", "Stella Burns");
hashMap.set("message 70", "Jonathan Hunter");
hashMap.set("message 71", "Savannah Carroll");
hashMap.set("message 72", "Thomas Spencer");
hashMap.set("message 73", "Brooklyn Ellis");
hashMap.set("message 74", "Aaron Stone");
hashMap.set("message 75", "Audrey Lane");
hashMap.set("message 76", "Charles Warren");
hashMap.set("message 77", "Camila Banks");
hashMap.set("message 78", "Jaxon Barker");
hashMap.set("message 79", "Elena McCoy");
hashMap.set("message 80", "Hunter Lambert");
hashMap.set("message 81", "Paisley Walsh");
hashMap.set("message 82", "Andrew Stephens");
hashMap.set("message 83", "Anna George");
hashMap.set("message 84", "Leo Black");
hashMap.set("message 85", "Sadie Crawford");
hashMap.set("message 86", "Adrian Morrison");
hashMap.set("message 87", "Caroline Hansen");
hashMap.set("message 88", "Josiah Reid");
hashMap.set("message 89", "Naomi Hicks");
hashMap.set("message 90", "Connor Henry");
hashMap.set("message 91", "Samantha Boyd");
hashMap.set("message 92", "Brayden Arnold");
hashMap.set("message 93", "Luna Holmes");
hashMap.set("message 94", "Robert Johnston");
hashMap.set("message 95", "Ruby Ray");
hashMap.set("message 96", "Jeremiah Jacobs");
hashMap.set("message 97", "Isla Franklin");
hashMap.set("message 98", "Easton Dean");
hashMap.set("message 99", "Vivienne Riley");
hashMap.set("message 100", "Jason Barker");
hashMap.set("message 101", "Mila Walton");
hashMap.set("message 102", "Diego Newton");
hashMap.set("message 103", "Cora Gibbs");
hashMap.set("message 104", "Miles Holt");
hashMap.set("message 105", "Valentina Arnold");
hashMap.set("message 106", "Roman Paul");
hashMap.set("message 107", "Delilah Massey");
hashMap.set("message 108", "Xavier Holloway");
hashMap.set("message 109", "Jade Holt");
hashMap.set("message 110", "Asher Wolfe");
hashMap.set("message 111", "Ivy Steele");
hashMap.set("message 112", "Hudson Pope");
hashMap.set("message 113", "Autumn Norris");
hashMap.set("message 114", "Dominic Neal");
hashMap.set("message 115", "Eliza Phelps");
hashMap.set("message 116", "Brody Peters");
hashMap.set("message 117", "Faith Erickson");
hashMap.set("message 118", "Colton Booth");
hashMap.set("message 119", "Jasmine Horton");
hashMap.set("message 120", "Silas Matthews");
hashMap.set("message 121", "Georgia Ryan");
hashMap.set("message 122", "Bentley Brewer");
hashMap.set("message 123", "Makayla Drake");
hashMap.set("message 124", "Gavin Walton");
hashMap.set("message 125", "Vivian Rice");
hashMap.set("message 126", "Parker Brady");
hashMap.set("message 127", "Adeline Terry");
hashMap.set("message 128", "Bryson Cain");
hashMap.set("message 129", "Rylee Curtis");
hashMap.set("message 130", "Everett Lindsey"); */

//#endregion
