# JobTrail: project notes

## What the app is for
A simple job search helper for job seekers. They browse open roles, search by title, company or skill,
filter by job type, save jobs to a shortlist and mark jobs they have applied to.

## Main screens
- Home (`/`): hero, short intro and a "Browse jobs" button, plus three feature cards.
- Job board (`/#/jobs`): search box, job type filter, list of job cards with "Save" and "Mark applied" buttons.

## API endpoints
- None yet. Job listings are sample data inside `src/App.jsx`.

## Trial behaviour (free trial: database is read-only)
- Save and "Mark applied" on the Job board change only the page's own state. They reset on page reload.
  The screen shows "Not saved yet: upgrade to keep your changes" after each change.
- After upgrading, switch these to real saving (a jobs/saved table and an applications table in the backend).

## Decisions the user made
- App name: JobTrail. Colours: indigo (#4f46e5) and teal (#0d9488).
- First version uses sample job listings only.
