export function Bad({ cond }) {
    if (cond) {
        useContext(ThemeContext);
    }
}
