const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
        /[^.]+$/.exec(filename) : undefined;
};



export default getExtention