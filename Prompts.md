# Prompts.md

**Project:** AI Cover Letter Generator
**Week:** 4 | **Level:** Intermediate (Level 2)
**Intern:** Tadigadapa Harsha Vardhan


This file documents the prompts I used while building this project, along with what I learned from each step.


### Prompt 1 — Setting up the UI

I began by designing the UI. I didn't want it to feel like a basic form — the goal was a clean, slightly premium interface.

> "Build a modern cover letter generator UI using HTML and CSS with input fields for name, role, company, skills, and job description."

While working on this, I improved my understanding of layout, spacing, and visual hierarchy. I also experimented with gradients, blur effects, and subtle animations to make the UI feel more polished.


### Prompt 2 — Connecting the form to JavaScript

Once the UI was ready, I needed to capture user input and trigger the generation logic.

> "Get values from input fields and handle button click to process form data."

This helped me get more comfortable with DOM handling. I used `document.getElementById` and event listeners to collect values. I also removed inline `onclick` handlers and handled everything through `addEventListener`, which made the code cleaner and easier to maintain.


### Prompt 3 — Calling the Gemini API

This was the core part of the project — integrating the Gemini API.

> "How do I call Gemini API from JavaScript to generate text based on a prompt?"

I learned how to use `fetch()` with a POST request and send structured JSON data. The response format was not straightforward — the generated text is nested inside `candidates[0].content.parts[0].text`. I used `console.log()` to inspect the response and then added checks to safely handle missing or unexpected data.


### Prompt 4 — Improving the prompt

The initial output felt too generic, so I focused on refining the prompt.

> "Improve this prompt so the cover letter sounds natural, structured, and not robotic."

This is where I understood the importance of prompt design. Adding clear instructions for tone, structure (4 paragraphs), and constraints (no extra text, no bullet points) made a big difference. The output became much more personalized and usable.


### Prompt 5 — Resume upload and parsing

To improve personalization, I added resume upload support.

> "How to extract text from a PDF file in JavaScript?"

I used PDF.js via a CDN to extract text page by page. One issue I faced was that the script was loading every time a file was uploaded. I fixed this by checking `if (!window.pdfjsLib)` so it loads only once per session.


### Prompt 6 — Handling errors and edge cases

During testing, I encountered issues like invalid API keys, empty responses, and missing inputs.

> "Handle API errors and show proper error messages in the UI."

I implemented validation and error handling using `try...catch`. I also added specific checks for API key errors and structured validation so users get clear, helpful messages instead of generic failures.


### Prompt 7 — Improving UX

After the core functionality was working, I focused on improving the user experience.

> "Add loading state, disable button while generating, and enable copy-to-clipboard feature."

I added a loading spinner, disabled the generate button while the API request is in progress, and implemented a copy feature using `navigator.clipboard`. These small improvements made the app feel more responsive and complete.


### Things I improved on my own

After reviewing the generated code, I made several improvements independently:

- Replaced inline `onclick` handlers with `addEventListener`
- Fixed the clipboard promise chain (`.then().catch()` instead of `.catch().then()`)
- Disabled the copy button initially and enabled it only after generating a letter
- Added `rel="noopener noreferrer"` for better link security
- Added `name` and `autocomplete` attributes to improve form usability
- Added validation to prevent generating with insufficient input
- Refactored repeated `document.getElementById` calls into variables
- Improved spacing and responsiveness for smaller screens


### Things I learned

- How to integrate a real-world API into a frontend application
- How prompt structure directly affects AI output quality
- How to handle asynchronous operations using `async/await`
- How to work with external libraries like PDF.js
- The importance of UX details like loading states and error handling


### Final Note

I made sure I understood what every part of the code does before including it in my project.