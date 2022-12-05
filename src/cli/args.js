const parseArgs = () => {
    const arrArgv = process.argv.slice(2);
    let temp = [];
    const res = arrArgv.reduce((acc, curr) => {
        if (curr.match(/^--\w+/)) curr = curr.slice(2);
        temp.push(curr);
        if (temp.length === 2) {
            acc = [...acc, temp.join(' is ')];
            temp = [];
            return acc;
        } else return acc;
    }, []).join(', ');
    console.log(res);
};

parseArgs();