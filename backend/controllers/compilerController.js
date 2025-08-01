const { executeCode } = require("../services/compilerService");

exports.compileCode = async (req, res) => {
  const { language, code, input } = req.body;

  if (!language || !code) {
    return res.status(400).json({ success: false, error: "Language and code are required." });
  }

  try {
    const output = await executeCode(language, code, input || "");
    res.json({ success: true, output });  // ✅ Add `success: true`
  } catch (err) {
    res.status(500).json({ success: false, error: err.message || "Compilation error" });  // ✅ Add `success: false`
  }
};
