Mini AI-Powered Notes App
 
A modern, responsive web application for creating, managing, and summarizing notes with AI-powered features. Built with Next.js, TypeScript, Supabase, DeepSeek API, React Query, TailwindCSS, and Shadcn UI, this app delivers a seamless user experience and is deployed on Vercel.

🚀 Key Features

User Authentication:

Secure sign-up and login with Email/Password and Google OAuth using Supabase.
Protected routes to ensure only authenticated users access the dashboard.


Note Management:

Create, edit, and delete notes with a clean, intuitive interface.
Notes stored securely in a Supabase database with Row Level Security (RLS).


AI Summarization:

Generate concise summaries of notes using the DeepSeek API.
Summaries displayed alongside notes for quick reference.


State Management:

Efficient data fetching and caching with React Query.
Real-time updates for note creation, deletion, and summarization.


Responsive Design:

Polished UI with Shadcn UI components and TailwindCSS.
Fully responsive for mobile and desktop devices.


Deployment:

Hosted on Vercel for fast, scalable deployment.
Connected to a GitHub repository for continuous integration.




🛠️ Tech Stack

Frontend: Next.js (TypeScript), TailwindCSS, Shadcn UI
Backend: Supabase (Authentication, Database)
AI Integration: DeepSeek API for note summarization
State Management: React Query
Deployment: Vercel
Other Tools: Axios, ESLint, PostCSS


📋 Prerequisites
Before setting up the project, ensure you have:

Node.js (v18 or higher)
npm or yarn
Supabase Account (for authentication and database)
DeepSeek API Key (for AI summarization)
Vercel Account (for deployment)
GitHub Account (for version control)


⚙️ Installation & Setup

Clone the Repository:
git clone https://github.com/your-username/ai-notes-app.git
cd ai-notes-app


Install Dependencies:
npm install


Configure Environment Variables:

Create a .env.local file in the root directory.
Add the following:NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DEEPSEEK_API_KEY=your-deepseek-api-key




Set Up Supabase:

Create a Supabase project and enable Google OAuth and Email/Password authentication.
Create a notes table with the following schema:create table notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  title text not null,
  content text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);


Enable Row Level Security (RLS) and add policies:alter table notes enable row level security;
create policy "Users can view their own notes" on notes for select using (auth.uid() = user_id);
create policy "Users can create their own notes" on notes for insert with check (auth.uid() = user_id);
create policy "Users can update their own notes" on notes for update using (auth.uid() = user_id);
create policy "Users can delete their own notes" on notes for delete using (auth.uid() = user_id);




Run the Development Server:
npm run dev


Open http://localhost:3000 in your browser.




🌐 Deployment

Push to GitHub:
git add .
git commit -m "Initial commit"
git push origin main


Deploy on Vercel:

Sign in to Vercel and import the GitHub repository.
Add environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, DEEPSEEK_API_KEY) in Vercel’s dashboard.
Deploy the project to get a live URL (e.g., https://your-app.vercel.app).




📂 Folder Structure
ai-notes-app/
├── app/
│   ├── auth/callback/route.ts        # Supabase auth callback
│   ├── dashboard/page.tsx            # Notes dashboard
│   ├── login/page.tsx                # Login page
│   ├── layout.tsx                    # Root layout with React Query
│   └── globals.css                   # TailwindCSS styles
├── components/
│   └── ui/                           # Shadcn UI components
├── lib/
│   └── supabase.ts                   # Supabase client
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── next.config.mjs                   # Next.js config
├── package.json                      # Dependencies
├── tailwind.config.ts                # TailwindCSS config
├── tsconfig.json                     # TypeScript config
└── README.md                         # Project documentation


🔍 Key Notes

Code Quality:

Written in TypeScript for type safety and maintainability.
Modular structure with reusable components and clear separation of concerns.


Security:

Supabase RLS ensures users only access their own notes.
Sensitive API keys (e.g.,gemini/DeepSeek) should be handled server-side for production.


Performance:

React Query optimizes data fetching and caching for a smooth user experience.
Next.js App Router ensures fast page loads and server-side rendering.


UI/UX:

Clean, responsive design with Shadcn UI and TailwindCSS.
Intuitive note creation and summarization workflows.


Extensibility:

Easily extendable to add features like note categories, rich text editing, or advanced AI capabilities.




🐛 Troubleshooting

Supabase Auth Issues:

Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correct.
Ensure Google OAuth is enabled in Supabase.


DeepSeek API Errors:

Check the API key and endpoint in the DeepSeek documentation.
Move API calls to a server-side route to secure the key.


Vercel Deployment:

Ensure all environment variables are set in Vercel’s dashboard.
Check build logs for errors related to missing dependencies.




🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.


📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📬 Contact
For questions or feedback, reach out to maithiligeek@gmail.com or open an issue on GitHub.

Built with 💻 and ☕ by Mr-Amresh
