const fetch = (val = 0) => new Promise(r => setTimeout(() => r(val), 200));

const flow = async (fn) => {
    return (async() => {
        const gen = fn();
        let end = false, result;
        
        while (!end) {
            const {value, done} = gen.next(result);
            result = await value;
            end = done;
        }

        return result;
    })()
};

let result;

flow(function*(){
    const a = yield fetch(1);
    const b = yield fetch(20);
    result = b + a;
    const c = yield fetch(100);
    result +=  c;
});

setTimeout(() => console.log(result), 1000);
