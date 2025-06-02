class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor;
        this.hashMap = new Array(this.capacity);
        this.hashMap[1] = "test";
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
}

const hashMap = new HashMap();

hashMap.hash("hey how are ya?");
hashMap.hash("Vivian Simon");

console.log(hashMap.length());
