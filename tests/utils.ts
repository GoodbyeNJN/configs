import { spawn } from "node:child_process";

export const $ = async (
    command: string,
    args: string[],
): Promise<{ stdout: string; stderr: string }> => {
    const p = spawn(command, args);

    let stdout = "";
    let stderr = "";
    for await (const chunk of p.stdout) {
        stdout += chunk;
    }
    for await (const chunk of p.stderr) {
        stderr += chunk;
    }

    return { stdout, stderr };
};
