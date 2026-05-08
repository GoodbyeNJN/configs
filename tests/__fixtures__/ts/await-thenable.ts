const fn = async () => {
    const nonThenable = {};
    await nonThenable;

    const thenable = {
        then: (resolve: (value: string) => void) => {
            resolve("resolved value");
        }
    };
    await thenable;
};
