# NOW

---

## Dev Environment Setup

- Install Dependencies

  ```bash
    npm install
  ```

- Starting Dev Server

  ```bash
    npm run dev
  ```

- Starting supabase

  - Pre-requisite: [Docker](https://www.docker.com/products/docker-desktop/) should be installed

  ```bash
    npx supabase start
  ```

- Update env variables

  - Create a `.env` file in the root directory

    ```bash
    cp .env.example .env
    ```

- Applying migrations

  ```bash
    npx zenstack generate && npx prisma migrate dev
  ```

## Supabase

- [Dashboard](http://localhost:54323/project/default)
- [InBucket](http://localhost:54324) (test email server)

## Tailscale

- [Tailscale](https://tailscale.com/)
  Install in both pc & mobile
- Get hostname from admin console
  [Dashboard - DNS](https://login.tailscale.com/admin/dns)
- Create a directory for certs

  ```bash
  mkdir certs
  cd certs
  ```

- Run

  ```bash
  tailscale cert <device_name>.<hostname>

  # Eg: tailscale cert mac.yourhostname.something
  ```

- Update the device names in admin console.
  [Dashboard - Devices](https://login.tailscale.com/admin/devices)
  Rename 'em to something short (Eg: `pixel` for mobile device & `mac` for your machine)

- Now, you can access the app with the hostname

  ```bash
  https://mac.<hostname>:3000 #for the app
  # OR
  https://pixel.<hostname> # won't be useful for now
  ```

- Update the App url in `capacitor.config.json` to the hostname

  ```json
  {
    ...
   "server": {
    ...
    "url": "https://mac.<hostname>:3000"
   }
  }
  ```

## Setup for android build

- Installing android studio will handle everything
  [Android Studio](https://developer.android.com/studio)

## UI Library

- [DaisyUI](https://daisyui.com/)

## Database

- [Zenstack](https://zenstack.io/)
- [Prisma](https://www.prisma.io/)
