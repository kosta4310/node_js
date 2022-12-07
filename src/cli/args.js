export const parseArgs = () => {
    const arrArgv = process.argv.slice(2);
    if (arrArgv.length) {
      const [argument] = arrArgv;
      const [_, name] = argument.split("=");
      if (name) {
        return name;
      }
    }
    return 'unname';
};

