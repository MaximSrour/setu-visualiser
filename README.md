# SETU Visualiser

This is a website that is used to visualise Monash University SETU results. The standard method supplied by Monash University is limited in its usability, as it is only possible to view a specific offering in a PDF-like format. This website changes this and allows you to view any offering or unit performance at a glance, making it far easier to compare past performance to the current day.

It is still a work in progress, and new features are being added every week.

## How to use

If you are inclined to use this repo on a locally hosted machine, the follow these steps to get it running.

```sh
git clone git@github.com:MaximSrour/setu-visualiser.git
cd setu-visualiser
pnpm i
cp .env.example .env
pnpm run dev
```

Prior to running your server, you will need to supply database credentials in the .env file. The easiest way to get this up and running is to use [PlanetScale](https://planetscale.com/) and to create a new database. As this repo uses Drizzle-ORM as the DB driver, you can use a single database with multiple Drizzle projects to avoid paying for additional DBs. If you wish to use a different DB solution, you will need to figure this out for yourself.

Once completed, you can now run the dev server.

To deploy, the easiest way would be to host on [Vercel](https://vercel.com/).
