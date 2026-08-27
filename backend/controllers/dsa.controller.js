import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js";
import axios from "axios";
import JUDGE0_LANGUAGE_IDS from "../services/dsa.service.js";

export const GenerateQustein = async (req, res) => {
  try {
    const { difficulty, topic } = req.body;
    if (!difficulty || !topic) {
      return res
        .status(400)
        .json({ message: "difficulty, topic are required." });
    }
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: "Not enough credits. Minimum 50 required.",
      });
    }
    const userPrompt = `
Difficulty: ${difficulty}
Topic: ${topic}
`;

    if (!userPrompt) {
      return res.status(400).json({
        message: "Prompt content is empty.",
      });
    }

    const messages = [
      {
        role: "system",
        content: `
You are an expert DSA interviewer and coding problem setter.

Generate exactly ONE DSA coding problem based on the user's requested difficulty and topic.

Return ONLY valid JSON in this exact format:

{
  "title": "",
  "difficulty": "",
  "topic": "",
  "description": "",
  "constraints": [
    ""
  ],
  "examples": [
    {
      "input": "",
      "output": "",
      "explanation": ""
    },
    {
      "input": "",
      "output": "",
      "explanation": ""
    }
  ],
  "testcase": [
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    },
    {
      "input": "",
      "output": ""
    }
  ]
}

RULES:

1. Generate exactly ONE problem.
2. Match the requested difficulty exactly.
3. Match the requested topic exactly.
4. Make the problem clear and interview-ready.
5. Include at least 3 constraints.
6. Generate exactly 2 examples.
7. Generate exactly 7 test cases.
8. Every example and testcase must be valid according to the constraints.
9. Every output must be correct.
10. Test cases must gradually increase in complexity.
11. Include appropriate edge cases.
12. Do not generate solutions or code.
13. Do not include code templates.
14. Do not include execution templates.
15. Do not include hints unless explicitly requested.
16. Do not include explanations outside the examples.
17. The testcase output must be the exact expected answer for that input.
18. Return ONLY JSON.
19. Do not use markdown or code fences.

TEST CASE REQUIREMENTS:

Test case 1:
- Very simple/basic case.

Test case 2:
- Another simple case with different behavior.

Test case 3:
- Moderate case.

Test case 4:
- Important edge case.

Test case 5:
- Larger case.

Test case 6:
- Tricky or difficult edge case.

Test case 7:
- Largest/most complex case allowed by the constraints.

Before returning the JSON, verify every testcase manually and make sure every expected output is correct.

The examples and testcases must use the exact input and output format required by the problem.

Do not invent outputs.

`,
      },

      {
        role: "user",
        content: userPrompt,
      },
    ];
    const aiResponse = await askAi(messages);

    if (!aiResponse) {
      return res.status(500).json({
        message: "AI returned empty response.",
      });
    }
    const cleanedquestien = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const problem = JSON.parse(cleanedquestien);
    user.credits -= 50;
    await user.save();
    const creditleft = user.credits;

    return res.status(200).json({
      success: true,
      problem,
      creditleft,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate question.",
    });
  }
};

const JUDGE0_URL = process.env.JUDGE0_URL;
export const runCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is missing",
      });
    }

    if (!language) {
      return res.status(400).json({
        success: false,
        message: "Language is missing",
      });
    }

    const languageId = JUDGE0_LANGUAGE_IDS[language];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        message: "Unsupported language",
      });
    }

    // Submit code to Judge0
    const submissionResponse = await axios.post(
      `${JUDGE0_URL}/submissions?base64_encoded=true&wait=true`,
      {
        language_id: languageId,
        source_code: Buffer.from(code, "utf8").toString("base64"),
        stdin: input ? Buffer.from(input, "utf8").toString("base64") : "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const response = submissionResponse.data;

    return res.status(200).json({
      success: true,
      output: response.stdout
        ? Buffer.from(response.stdout, "base64").toString("utf8")
        : "",
      error: response.stderr
        ? Buffer.from(response.stderr, "base64").toString("utf8")
        : response.compile_output
          ? Buffer.from(response.compile_output, "base64").toString("utf8")
          : "",
      compile_output: response.compile_output
        ? Buffer.from(response.compile_output, "base64").toString("utf8")
        : "",
      status: response.status,
      time: response.time,
      memory: response.memory,
    });
  } catch (error) {
    console.error("Judge0 execution error:", error);

    return res.status(500).json({
      success: false,
      message: "Code execution failed",
      error: error.response?.data || error.message,
    });
  }
};
