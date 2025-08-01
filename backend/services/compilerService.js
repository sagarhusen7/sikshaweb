const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuid } = require("uuid");

const tempDir = path.join(__dirname, "..", "temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

exports.executeCode = (language, code, input = "") => {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    let filename, cmd;

    const inputPath = path.join(tempDir, `${jobId}.in`);
    const outputPath = path.join(tempDir, `${jobId}.out`);

    // Language config
    if (language === "c") {
      filename = `${jobId}.c`;
      cmd = `gcc ${filename} -o ${jobId}.exe && ${jobId}.exe < ${jobId}.in`;
    } else if (language === "cpp") {
      filename = `${jobId}.cpp`;
      cmd = `g++ ${filename} -o ${jobId}.exe && ${jobId}.exe < ${jobId}.in`;
    } else if (language === "python") {
      filename = `${jobId}.py`;
      cmd = `python ${filename} < ${jobId}.in`;
    } else if (language === "javascript") {
      filename = `${jobId}.js`;
      cmd = `node ${filename} < ${jobId}.in`;
    } else {
      return reject(new Error("Unsupported language"));
    }

    const filePath = path.join(tempDir, filename);
    fs.writeFileSync(filePath, code);
    fs.writeFileSync(inputPath, input);

    exec(
      cmd,
      { cwd: tempDir, timeout: 5000, maxBuffer: 1024 * 500 }, // timeout = 5s
      (err, stdout, stderr) => {
        // Cleanup files
        fs.unlinkSync(filePath);
        fs.unlinkSync(inputPath);
        const exePath = path.join(tempDir, `${jobId}.exe`);
        if (fs.existsSync(exePath)) fs.unlinkSync(exePath);

        if (err) {
          return reject(new Error(stderr || "Execution failed"));
        }
        resolve(stdout);
      }
    );
  });
};
