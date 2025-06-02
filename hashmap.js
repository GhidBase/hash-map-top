const { Node, LinkedList } = require('./linked-lists.js');

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor;
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
        // create something in the hashMap array
        if (!this.hashMap[hashCode]) {
            this.hashMap[hashCode] = new LinkedList();
        }
        this.hashMap[hashCode].append(value);
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

console.log(hashMap.length());
console.log(hashMap.hashMap[8].toString())
