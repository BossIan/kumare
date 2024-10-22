# Kumare

![Kumare](./kumare-website.png)

**Kumare** is a micro-lending app that utilizes blockchain technology to provide secure, transparent, and accessible loans with low-interest rates. By utilizing blockchain, Kumare minimizes transaction fees and streamlines the lending experience, making microloans more affordable and accessible to a wider audience.

## Tech Stack

- **Frontend**: Vite.js (React, Javascript)
- **Backend Services**: Juno (Blockchain-as-a-Service for ICP)
- **Authentication**: ICP Authentication (Passkey)


## Project Setup

To get started with Kumare, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/kumare.git
   cd kumare
   ```

2. **Install Dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

4. **Login to Juno**

   ```bash
   juno login
   ```

5. **Deploy to Juno**

   ```bash
   juno deploy
   ```

6. **Update Canister ID**

   - Open the `juno.config.mjs` file in your project.
   - Update the placeholder canister ID with your own canister ID from Juno.
   - Save the changes to the file.

   **Example:**

   ```typescript
   import { defineConfig } from "juno";

   export default defineConfig({
     satellite: {
       id: "your-own-canister-id-here",
       source: "dist",
     },
   });
   ```

7. **Create Collections in Juno**

   - Go to the [Juno website](https://juno.build).
   - Create a collection named `users`.

8. **Read the Juno Documentation**

   For more information on how to use Juno, visit the [Juno Documentation](https://internetcomputer.org/docs/current/developer-docs/web-apps/frameworks/juno).

## Canister ID

- **Canister ID**: i3g3d-2iaaa-aaaal-amq6a-cai from `juno.config.mjs`.
- **Website**: [Kumare on ICP](https://i3g3d-2iaaa-aaaal-amq6a-cai.icp0.io/)

## Features

### Borrower Side

- **Lower Interest Rates**: Access loans with affordable rates ranging from 15-18%.

- **Flexible Repayment Terms**: Choose repayment schedules that suit your needs—weekly, bi-weekly, monthly, or quarterly, depending on the loan type.

**Emergency Loan Products**: Provides immediate financial support during natural disasters or crises.

**Credit Score System**: Encourages responsible financial habits by rewarding timely payments and maintaining low loan utilization.

### Lender Side

- **Interest Pool Protection**: Lenders are safeguarded by an interest pool, ensuring coverage even if borrowers default temporarily.

- **Transparency**: Full visibility of all transactions to build trust and ensure security.

- **Blockchain Security**: Immutable records of lending and borrowing activities, ensuring safety and reliability.


## Project Description

**Kumare** is an innovative microlending platform that connects borrowers and lenders directly, aiming to enhance access to financial services with decentralized lending solutions and blockchain-based incentives. The app harnesses blockchain integration to offer a secure, transparent, and efficient lending experience. By utilizing smart contracts, Kumare ensures automated loan agreements and repayment tracking, empowering users with fair access to credit while rewarding responsible lending and borrowing practices through crypto-based incentives.

## Team members and their roles.

- **Christian Lorenz Joson**: Team Leader, Frontend and Backend Developer

- **John Marco Aguirre**: Multimedia Artist and Frontend Developer

- **Emil Joseph Luis N. Lindayag**: Frontend Developer

- **Judd Russel Asuncion**: Frontend Developer and Researcher


## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Presentation

Watch the presentation of Kumare: [Watch Video](https://drive.google.com/file/d/1c4D3SkZ4XL9bN1TYP55mDizmWvgXHmdl/view?usp=drivesdk)
