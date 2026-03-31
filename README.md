# 🚀 AI Cover Letter Generator  

Writing a new cover letter for every job can be tiring and repetitive.  
So I built this project to make that process faster and smarter using AI.

This web application generates **personalized cover letters** using the Google Gemini API.  
Just enter your details, paste the job description, and optionally upload your resume — the app will generate a professional cover letter in seconds.


🔗
Live Demo:
https://ai-cover-letter-generator-5k5v.vercel.app 


GitHub:
https://github.com/vardhan999-hub/ai-cover-letter-generator


## 💡 Why I Built This  

While applying for jobs and internships, I realized how time-consuming it is to write a tailored cover letter for each role.  
This project solves that problem by automating the process while still keeping the output relevant and personalized.

---

## ✨ Features  

- 🤖 Generates personalized cover letters using AI  
- 🎯 Matches content with the job description  
- 📄 Supports resume upload (PDF/TXT)  
- 🎨 Clean and responsive user interface  
- ⚡ Fast generation with loading feedback  
- 📋 Easy copy-to-clipboard option  
- ❗ Handles errors smoothly  


## 🛠️ Tech Stack  

- **Frontend:** React (Vite), CSS, JavaScript  
- **API:** Google Gemini API  
- **PDF Handling:** PDF.js  


## ⚙️ How It Works  

1. Enter your details (name, role, company, skills, job description)  
2. Upload your resume if you want (optional)  
3. The app prepares a structured prompt  
4. Sends it to the Gemini API  
5. Receives the response  
6. Displays your cover letter instantly  

---

## 🔐 API Key  

The API key is stored in a `.env` file and accessed using `import.meta.env`.  
It is not exposed in the repository.


## ⚠️ Note on Security  

For simplicity, this project calls the API directly from the frontend.  

In a real production setup, I would:  
- Use a backend (Node.js + Express)  
- Store the API key securely on the server  
- Route all requests through the backend  


## 📁 Project Structure  
project/
│── index.html
│── package.json
│── vite.config.js
│── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── App.css
│ └── utils/
│ └── extractPDF.js
│── Prompts.md
│── README.md
│── .env
│── .gitignore


## ⚡ Limitations  

- The output depends on how well the user provides input  
- Resume parsing may not be perfect for complex PDFs  
- Limited control over tone/style for now  


## 🚀 Future Improvements  

- Add backend for better security  
- Improve resume parsing accuracy  
- Add tone options (formal, creative, concise)  
- Download as PDF/DOCX  
- Support multiple languages  


## 🧠 Future Architecture  

Frontend (React) → Backend (Node.js) → Gemini API  


## 👨‍💻 Author  

**Tadigadapa Harshavardhan**  

---

## 📌 Final Note  

This project was built as part of an internship assignment.  
I focused on understanding how everything works behind the scenes instead of just using ready-made solutions.
