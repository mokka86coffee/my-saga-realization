const fetch = (val = 0) => new Promise(r => setTimeout(() => r(val), 200));
  
const flow = async function (fn) {
    const gen = fn();

    let end = false, result;
        
    while (!end) {
        if (result && 'then' in result) {
          result = await result;
          const {value, done} = gen.next(result);
          result = value;
          end = done;
        } else {
            const {value, done} = gen.next(result);
            result = value;
            end = done;
        }
    }

    return result;
};

const fromFlow = flow(function*(){
    const a = yield fetch(1);
    const b = yield fetch(2);
    const c = yield fetch(3);
    const d = yield fetch('d');
    const e = yield fetch('e');
    console.log(a + b + c + d + e); // 6de
});
