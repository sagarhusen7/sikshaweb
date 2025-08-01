const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Quiz = require("../models/Quiz");

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, "../.env") });

// Define quiz data - 17 subjects with 5 questions each
const quizzes = [
  {
    id: "quiz-html-basics",
    title: "HTML Basics",
    duration: 51,
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyper Terminal Machine Language",
        ],
        correctAnswer: 0,
        explanation: "HTML stands for Hyper Text Markup Language.",
      },
      {
        question: "Which tag is used to define a paragraph in HTML?",
        options: ["<p>", "<para>", "<pg>", "<paragraph>"],
        correctAnswer: 0,
        explanation: "The <p> tag defines a paragraph.",
      },
      {
        question: "Which tag is used to insert a line break in HTML?",
        options: ["<lb>", "<break>", "<br>", "<newline>"],
        correctAnswer: 2,
        explanation: "The <br> tag inserts a line break.",
      },
      {
        question: "Which HTML element is used to specify the title of a document?",
        options: ["<head>", "<title>", "<meta>", "<header>"],
        correctAnswer: 1,
        explanation: "The <title> element specifies the document's title.",
      },
      {
        question: "Which attribute is used to provide alternative text for an image?",
        options: ["alt", "src", "title", "href"],
        correctAnswer: 0,
        explanation: "The alt attribute provides alternative text for images.",
      },
    ],
  },
  {
    id: "quiz-css-basics",
    title: "CSS Basics",
    duration: 51,
    questions: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: 0,
        explanation: "CSS stands for Cascading Style Sheets.",
      },
      {
        question: "Which property is used to change the background color?",
        options: ["bgcolor", "background-color", "color", "bg-color"],
        correctAnswer: 1,
        explanation: "background-color changes the background color.",
      },
      {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        correctAnswer: 0,
        explanation: "font-size controls the size of text.",
      },
      {
        question: "How do you select an element with id 'header'?",
        options: [".header", "#header", "*header", "header"],
        correctAnswer: 1,
        explanation: "Use #header to select an element with id 'header'.",
      },
      {
        question: "Which value is NOT a valid display property?",
        options: ["block", "inline", "hidden", "flex"],
        correctAnswer: 2,
        explanation: "'hidden' is not a valid display value.",
      },
    ],
  },
  {
    id: "quiz-javascript-fundamentals",
    title: "JavaScript Fundamentals",
    duration: 51,
    questions: [
      {
        question: "Which is the correct way to declare a variable in JavaScript?",
        options: ["var myVar;", "variable myVar;", "declare myVar;", "v myVar;"],
        correctAnswer: 0,
        explanation: "Variables are declared using 'var', 'let' or 'const'.",
      },
      {
        question: "Which method is used to write HTML output in JavaScript?",
        options: ["document.write()", "console.log()", "innerHTML", "prompt()"],
        correctAnswer: 0,
        explanation: "document.write() writes directly to the HTML output.",
      },
      {
        question: "Which operator is used for strict equality?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 1,
        explanation: "=== checks for both value and type equality.",
      },
      {
        question: "Which keyword is used to define a function?",
        options: ["func", "def", "function", "lambda"],
        correctAnswer: 2,
        explanation: "The 'function' keyword defines a function.",
      },
      {
        question: "What will typeof null return?",
        options: ["null", "undefined", "object", "boolean"],
        correctAnswer: 2,
        explanation: "typeof null returns 'object' due to a historical bug.",
      },
    ],
  },
  {
    id: "quiz-react-intro",
    title: "React Basics",
    duration: 51,
    questions: [
      {
        question: "What is a React component?",
        options: [
          "A function or class that returns JSX",
          "A database",
          "A CSS file",
          "A Redux store",
        ],
        correctAnswer: 0,
        explanation: "Components are building blocks of a React app.",
      },
      {
        question: "Which hook is used to manage state in functional components?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        explanation: "useState is used to add state to functional components.",
      },
      {
        question: "What is JSX?",
        options: [
          "A JavaScript extension for writing HTML-like syntax",
          "A CSS preprocessor",
          "A templating engine",
          "A testing framework",
        ],
        correctAnswer: 0,
        explanation: "JSX allows writing HTML-like syntax in JS files.",
      },
      {
        question: "Which lifecycle method is replaced by useEffect in hooks?",
        options: ["componentDidMount", "render", "constructor", "shouldComponentUpdate"],
        correctAnswer: 0,
        explanation: "useEffect can replicate componentDidMount behavior.",
      },
      {
        question: "How do you pass data to a child component?",
        options: ["props", "state", "context", "refs"],
        correctAnswer: 0,
        explanation: "Props are used to pass data to child components.",
      },
    ],
  },
  {
    id: "quiz-nodejs-overview",
    title: "Node.js Overview",
    duration: 51,
    questions: [
      {
        question: "What is Node.js primarily used for?",
        options: [
          "Creating mobile apps",
          "Writing backend services using JavaScript",
          "Styling HTML",
          "Running SQL queries",
        ],
        correctAnswer: 1,
        explanation: "Node.js is used to write backend JavaScript code.",
      },
      {
        question: "Which package manager is commonly used with Node.js?",
        options: ["npm", "pip", "composer", "gem"],
        correctAnswer: 0,
        explanation: "npm is the default package manager for Node.js.",
      },
      {
        question: "Which global object is available in Node but not in browsers?",
        options: ["window", "process", "document", "navigator"],
        correctAnswer: 1,
        explanation: "process is a global object in Node.js environments.",
      },
      {
        question: "What is the purpose of package.json?",
        options: [
          "To list dependencies and metadata",
          "To store logs",
          "To run tests",
          "To compile code",
        ],
        correctAnswer: 0,
        explanation: "package.json holds project metadata and dependencies.",
      },
      {
        question: "Which module system does Node.js use?",
        options: ["CommonJS", "ES Modules", "AMD", "UMD"],
        correctAnswer: 0,
        explanation: "Node.js uses CommonJS by default.",
      },
    ],
  },
  {
    id: "quiz-mongodb-fundamentals",
    title: "MongoDB Fundamentals",
    duration: 51,
    questions: [
      {
        question: "Which type of database is MongoDB?",
        options: [
          "Relational",
          "Graph",
          "Document-based NoSQL",
          "Key-Value store",
        ],
        correctAnswer: 2,
        explanation: "MongoDB is a document-oriented NoSQL database.",
      },
      {
        question: "What is the primary data format used in MongoDB?",
        options: ["XML", "JSON", "BSON", "YAML"],
        correctAnswer: 2,
        explanation: "MongoDB stores data in BSON (Binary JSON).",
      },
      {
        question: "Which command is used to show all databases in MongoDB shell?",
        options: ["show dbs", "list databases", "show databases", "db.show()"],
        correctAnswer: 0,
        explanation: "show dbs lists all available databases.",
      },
      {
        question: "What is a collection in MongoDB equivalent to in SQL?",
        options: ["Table", "Row", "Column", "Schema"],
        correctAnswer: 0,
        explanation: "A collection is like a table in relational databases.",
      },
      {
        question: "Which operator is used to find documents where a field equals a value?",
        options: ["$eq", "$ne", "$gt", "$lt"],
        correctAnswer: 0,
        explanation: "$eq matches values that are equal to a specified value.",
      },
    ],
  },
  {
    id: "quiz-git-version-control",
    title: "Git & Version Control",
    duration: 51,
    questions: [
      {
        question: "Which command is used to initialize a git repository?",
        options: ["git init", "git start", "git create", "git begin"],
        correctAnswer: 0,
        explanation: "`git init` initializes a local Git repo.",
      },
      {
        question: "Which command records changes to the repository?",
        options: ["git save", "git commit", "git push", "git add"],
        correctAnswer: 1,
        explanation: "git commit saves changes to the repository.",
      },
      {
        question: "Which command adds files to staging area?",
        options: ["git stage", "git add", "git commit", "git push"],
        correctAnswer: 1,
        explanation: "git add moves changes to the staging area.",
      },
      {
        question: "What is the purpose of .gitignore file?",
        options: [
          "To ignore untracked files",
          "To delete files",
          "To prevent tracking of certain files",
          "To backup files",
        ],
        correctAnswer: 2,
        explanation: ".gitignore prevents specific files from being tracked.",
      },
      {
        question: "Which command shows commit history?",
        options: ["git log", "git history", "git show", "git commits"],
        correctAnswer: 0,
        explanation: "git log displays the commit history.",
      },
    ],
  },
  {
    id: "quiz-python-basics",
    title: "Python Basics",
    duration: 51,
    questions: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["def", "fun", "func", "define"],
        correctAnswer: 0,
        explanation: "'def' is used to define functions in Python.",
      },
      {
        question: "How do you create a comment in Python?",
        options: ["// comment", "# comment", "<!-- comment -->", "/* comment */"],
        correctAnswer: 1,
        explanation: "Use # to write comments in Python.",
      },
      {
        question: "Which symbol is used to raise a number to a power?",
        options: ["^", "**", "^^", "*"],
        correctAnswer: 1,
        explanation: "** is the exponentiation operator in Python.",
      },
      {
        question: "What is the output of print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'dict'>", "<class 'tuple'>"],
        correctAnswer: 0,
        explanation: "An empty list has type 'list'.",
      },
      {
        question: "Which method is used to add an item to the end of a list?",
        options: ["append()", "push()", "insert()", "extend()"],
        correctAnswer: 0,
        explanation: "append() adds an item to the end of a list.",
      },
    ],
  },
  {
    id: "quiz-java-fundamentals",
    title: "Java Fundamentals",
    duration: 51,
    questions: [
      {
        question: "Which keyword is used to define a constant in Java?",
        options: ["final", "static", "const", "immutable"],
        correctAnswer: 0,
        explanation: "'final' is used to define constants in Java.",
      },
      {
        question: "Which method must be implemented by all Java programs?",
        options: ["start()", "run()", "main()", "execute()"],
        correctAnswer: 2,
        explanation: "main() is the entry point of a Java program.",
      },
      {
        question: "What is the size of an int variable in Java?",
        options: ["16 bits", "32 bits", "64 bits", "8 bits"],
        correctAnswer: 1,
        explanation: "int is a 32-bit signed integer in Java.",
      },
      {
        question: "Which access modifier makes a member accessible only within its own class?",
        options: ["public", "protected", "private", "default"],
        correctAnswer: 2,
        explanation: "private restricts access to within the same class.",
      },
      {
        question: "Which statement is used to exit a loop in Java?",
        options: ["break", "exit", "stop", "return"],
        correctAnswer: 0,
        explanation: "break exits a loop immediately.",
      },
    ],
  },
  {
    id: "quiz-cplusplus-basics",
    title: "C++ Basics",
    duration: 51,
    questions: [
      {
        question: "Which symbol is used to include a header file in C++?",
        options: ["#", "<>", ":", "//"],
        correctAnswer: 0,
        explanation: "#include is used to include header files.",
      },
      {
        question: "Which keyword is used to define a class in C++?",
        options: ["struct", "class", "object", "type"],
        correctAnswer: 1,
        explanation: "'class' defines a class in C++.",
      },
      {
        question: "What is the correct way to declare a pointer in C++?",
        options: ["int ptr;", "int* ptr;", "*int ptr;", "ptr int;"],
        correctAnswer: 1,
        explanation: "int* ptr; declares a pointer to an integer.",
      },
      {
        question: "Which operator is used to access members of a pointer object?",
        options: [".", "->", "::", "&"],
        correctAnswer: 1,
        explanation: "-> is used to access members via a pointer.",
      },
      {
        question: "What does the 'new' keyword do in C++?",
        options: [
          "Allocates memory on the stack",
          "Allocates memory on the heap",
          "Deletes memory",
          "Initializes a variable",
        ],
        correctAnswer: 1,
        explanation: "new allocates memory dynamically on the heap.",
      },
    ],
  },
  {
    id: "quiz-database-design",
    title: "Database Design",
    duration: 51,
    questions: [
      {
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Clarity, Integrity, Dependability",
          "Access, Control, Index, Data",
          "Aggregation, Concurrency, Indexing, Distribution",
        ],
        correctAnswer: 0,
        explanation: "ACID ensures reliable processing of transactions.",
      },
      {
        question: "Which normal form eliminates transitive dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctAnswer: 2,
        explanation: "Third Normal Form removes transitive dependencies.",
      },
      {
        question: "What is a foreign key?",
        options: [
          "A unique identifier for a row",
          "A key that references another table's primary key",
          "A duplicate of the primary key",
          "An encrypted key",
        ],
        correctAnswer: 1,
        explanation: "Foreign keys link tables together.",
      },
      {
        question: "Which SQL clause is used to filter rows?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctAnswer: 0,
        explanation: "WHERE filters rows based on conditions.",
      },
      {
        question: "What is a composite key?",
        options: [
          "A key made up of multiple columns",
          "A combination of primary and foreign keys",
          "A temporary key used during joins",
          "A key that spans multiple tables",
        ],
        correctAnswer: 0,
        explanation: "Composite keys consist of two or more columns.",
      },
    ],
  },
  {
    id: "quiz-ui-ux-design",
    title: "UI/UX Design",
    duration: 51,
    questions: [
      {
        question: "What does UX stand for?",
        options: [
          "User Experience",
          "User Extension",
          "Unified Experience",
          "Universal Exchange",
        ],
        correctAnswer: 0,
        explanation: "UX refers to how users interact with products.",
      },
      {
        question: "Which principle focuses on minimizing cognitive load?",
        options: ["Simplicity", "Contrast", "Alignment", "Repetition"],
        correctAnswer: 0,
        explanation: "Simplicity helps reduce user confusion.",
      },
      {
        question: "What is the purpose of wireframing?",
        options: [
          "To finalize visual design",
          "To create a blueprint of layout and structure",
          "To test user behavior",
          "To generate code",
        ],
        correctAnswer: 1,
        explanation: "Wireframes outline the structure before visual design.",
      },
      {
        question: "Which color model is used for digital screens?",
        options: ["CMYK", "RGB", "Pantone", "HSV"],
        correctAnswer: 1,
        explanation: "RGB is used for screen-based designs.",
      },
      {
        question: "What is accessibility in design?",
        options: [
          "Making designs visually appealing",
          "Ensuring usability for people with disabilities",
          "Using high contrast colors",
          "Supporting multiple languages",
        ],
        correctAnswer: 1,
        explanation: "Accessibility ensures inclusive user experiences.",
      },
    ],
  },
  {
    id: "quiz-rest-api",
    title: "REST API Fundamentals",
    duration: 51,
    questions: [
      {
        question: "What does REST stand for?",
        options: [
          "Representational State Transfer",
          "Remote Execution System Tool",
          "Reliable Event Stream Transfer",
          "Resourceful State Transaction",
        ],
        correctAnswer: 0,
        explanation: "REST is an architectural style for web services.",
      },
      {
        question: "Which HTTP method is used to retrieve data?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctAnswer: 0,
        explanation: "GET requests are used to fetch data.",
      },
      {
        question: "Which status code means 'Not Found'?",
        options: ["200", "404", "500", "301"],
        correctAnswer: 1,
        explanation: "404 indicates the requested resource was not found.",
      },
      {
        question: "What is the purpose of API versioning?",
        options: [
          "To track performance",
          "To manage breaking changes",
          "To improve security",
          "To support multiple clients",
        ],
        correctAnswer: 1,
        explanation: "Versioning helps manage updates without breaking clients.",
      },
      {
        question: "Which format is most commonly used for REST APIs?",
        options: ["XML", "CSV", "JSON", "YAML"],
        correctAnswer: 2,
        explanation: "JSON is widely used due to its lightweight nature.",
      },
    ],
  },
  {
    id: "quiz-software-testing",
    title: "Software Testing",
    duration: 51,
    questions: [
      {
        question: "What is unit testing?",
        options: [
          "Testing individual units/components of software",
          "Testing the entire system",
          "Testing user interfaces",
          "Testing network connections",
        ],
        correctAnswer: 0,
        explanation: "Unit tests focus on small parts like functions or methods.",
      },
      {
        question: "Which testing approach tests from the user's perspective?",
        options: ["White-box", "Black-box", "Gray-box", "Glass-box"],
        correctAnswer: 1,
        explanation: "Black-box testing ignores internal implementation details.",
      },
      {
        question: "What is a test case?",
        options: [
          "A set of conditions to verify a feature",
          "A bug report",
          "A deployment script",
          "A documentation file",
        ],
        correctAnswer: 0,
        explanation: "Test cases define inputs, actions, and expected outcomes.",
      },
      {
        question: "Which tool is commonly used for automated testing in JavaScript?",
        options: ["Jest", "Postman", "Webpack", "Babel"],
        correctAnswer: 0,
        explanation: "Jest is a popular testing framework for JS.",
      },
      {
        question: "What is regression testing?",
        options: [
          "Retesting after bug fixes",
          "Testing new features",
          "Testing performance under load",
          "Testing cross-browser compatibility",
        ],
        correctAnswer: 0,
        explanation: "Regression testing ensures existing functionality still works.",
      },
    ],
  },
  {
    id: "quiz-docker-containers",
    title: "Docker Containers",
    duration: 51,
    questions: [
      {
        question: "What is Docker used for?",
        options: [
          "Virtualizing entire operating systems",
          "Containerizing applications",
          "Managing databases",
          "Building websites",
        ],
        correctAnswer: 1,
        explanation: "Docker packages apps and dependencies into containers.",
      },
      {
        question: "Which file is used to define a Docker image?",
        options: ["dockerfile", "docker-compose.yml", "Dockerfile", "image.json"],
        correctAnswer: 2,
        explanation: "Dockerfile contains instructions to build an image.",
      },
      {
        question: "What is a Docker image?",
        options: [
          "A running instance of a container",
          "A template to create containers",
          "A network configuration",
          "A storage volume",
        ],
        correctAnswer: 1,
        explanation: "Images are blueprints for containers.",
      },
      {
        question: "Which command starts a container from an image?",
        options: ["docker start", "docker run", "docker exec", "docker create"],
        correctAnswer: 1,
        explanation: "docker run creates and starts a container.",
      },
      {
        question: "What is a Docker volume used for?",
        options: [
          "Storing persistent data",
          "Defining networks",
          "Managing secrets",
          "Setting permissions",
        ],
        correctAnswer: 0,
        explanation: "Volumes persist data beyond container lifecycle.",
      },
    ],
  },
  {
    id: "quiz-kubernetes-orchestration",
    title: "Kubernetes Orchestration",
    duration: 51,
    questions: [
      {
        question: "What is Kubernetes used for?",
        options: [
          "Container orchestration",
          "Database management",
          "Frontend development",
          "Version control",
        ],
        correctAnswer: 0,
        explanation: "Kubernetes automates container deployment and scaling.",
      },
      {
        question: "Which file defines a Kubernetes deployment?",
        options: ["pod.yaml", "service.yaml", "deployment.yaml", "configmap.yaml"],
        correctAnswer: 2,
        explanation: "deployment.yaml describes desired deployment state.",
      },
      {
        question: "What is a Pod in Kubernetes?",
        options: [
          "A group of nodes",
          "A single container",
          "The smallest deployable unit",
          "A load balancer",
        ],
        correctAnswer: 2,
        explanation: "Pods are the basic execution units in Kubernetes.",
      },
      {
        question: "Which command deploys a configuration in Kubernetes?",
        options: ["kubectl apply", "kubectl deploy", "kubectl create", "kubectl run"],
        correctAnswer: 0,
        explanation: "kubectl apply applies configurations to the cluster.",
      },
      {
        question: "What is a Service in Kubernetes?",
        options: [
          "A container registry",
          "A networking abstraction",
          "A storage volume",
          "A monitoring tool",
        ],
        correctAnswer: 1,
        explanation: "Services expose Pods to network traffic.",
      },
    ],
  },
  {
    id: "quiz-cloud-computing",
    title: "Cloud Computing",
    duration: 51,
    questions: [
      {
        question: "What does IaaS stand for?",
        options: [
          "Infrastructure as a Service",
          "Integration as a Service",
          "Interface as a Service",
          "Intelligence as a Service",
        ],
        correctAnswer: 0,
        explanation: "IaaS provides virtualized computing resources.",
      },
      {
        question: "Which company offers AWS?",
        options: ["Google", "Microsoft", "Amazon", "IBM"],
        correctAnswer: 2,
        explanation: "Amazon Web Services is Amazon's cloud platform.",
      },
      {
        question: "What is a benefit of cloud computing?",
        options: [
          "Reduced upfront costs",
          "Increased hardware maintenance",
          "Fixed scalability limits",
          "Manual backups required",
        ],
        correctAnswer: 0,
        explanation: "Cloud services reduce capital expenditure.",
      },
      {
        question: "Which service model provides software over the internet?",
        options: ["IaaS", "PaaS", "SaaS", "FaaS"],
        correctAnswer: 2,
        explanation: "Software as a Service delivers apps via the web.",
      },
      {
        question: "What is auto-scaling in cloud computing?",
        options: [
          "Manually adjusting server capacity",
          "Automatically increasing/decreasing resources",
          "Deleting unused servers",
          "Restarting failed instances",
        ],
        correctAnswer: 1,
        explanation: "Auto-scaling adjusts capacity based on demand.",
      },
    ],
  },
  {
    id: "quiz-cybersecurity-basics",
    title: "Cybersecurity Basics",
    duration: 51,
    questions: [
      {
        question: "What is phishing?",
        options: [
          "Installing antivirus software",
          "Encrypting data",
          "Tricking users into revealing sensitive info",
          "Blocking malicious websites",
        ],
        correctAnswer: 2,
        explanation: "Phishing attacks attempt to steal credentials or data.",
      },
      {
        question: "Which protocol ensures secure communication over the internet?",
        options: ["HTTP", "FTP", "HTTPS", "SMTP"],
        correctAnswer: 2,
        explanation: "HTTPS encrypts data between browser and server.",
      },
      {
        question: "What is two-factor authentication (2FA)?",
        options: [
          "Using two passwords",
          "Requiring two forms of identification",
          "Changing passwords every two days",
          "Having two user accounts",
        ],
        correctAnswer: 1,
        explanation: "2FA adds an extra layer of security beyond passwords.",
      },
      {
        question: "Which attack involves flooding a server with traffic?",
        options: ["DDoS", "SQL injection", "XSS", "Man-in-the-middle"],
        correctAnswer: 0,
        explanation: "DDoS overwhelms servers to disrupt service.",
      },
      {
        question: "What is encryption?",
        options: [
          "Deleting files permanently",
          "Converting data into unreadable format",
          "Compressing large files",
          "Backing up data",
        ],
        correctAnswer: 1,
        explanation: "Encryption protects data by encoding it.",
      },
    ],
  },
];

// Seeder function
const connectAndSeed = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) throw new Error("❌ MONGODB_URI is not defined in .env");

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");

    await Quiz.deleteMany();
    console.log("🗑️ Existing quizzes deleted");

    await Quiz.insertMany(quizzes);
    console.log("📥 New quizzes inserted");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message || err);
    process.exit(1);
  }
};

connectAndSeed();