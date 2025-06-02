class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor;
        this.hashMap = new Array(5);
    }

    initializeHashMap() {

    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }
}


const hashMap = new HashMap;

console.log(hashMap.hash("hey how are ya?"))
console.log(hashMap.hash("Vivian Simon"))