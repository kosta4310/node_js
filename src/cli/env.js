const parseEnv = () => {
    const reg = /^RSS_\w+/;
    const arrEnv = Object.entries(process.env);
    const res = arrEnv.reduce((acc,[key, value]) => {
        if (key.match(reg)) {
            return [...acc, [key, value].join('=')];
        } else return acc;
    }, []).join('; ');
    console.log(res);
};

parseEnv();