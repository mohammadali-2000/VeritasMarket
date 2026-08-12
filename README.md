# ⚖️ VeritasMarket

**Cryptographic Belief Settlement Protocol on Ethereum Sepolia**

[![Live Demo](https://img.shields.io/badge/Live-veritas--market.pages.dev-10d98a?style=flat-square&logo=cloudflare)](https://veritas-market.pages.dev)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Chain](https://img.shields.io/badge/Network-Ethereum%20Sepolia-627EEA?style=flat-square&logo=ethereum)](https://sepolia.etherscan.io)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20Solidity%20%7C%20Foundry%20%7C%20Swarm-111520?style=flat-square)](#stack)

---

## What is VeritasMarket?

VeritasMarket is a decentralized protocol where participants stake tokens on binary claims (YES / NO), vote cryptographically using commit-reveal, and a **VRF-selected random jury** settles the market. Dishonest jurors automatically lose 20% of their stake, which is redistributed to honest participants.

No oracle. No admin key. No off-chain resolution.

---

## How It Works

```
Participant stakes on Claim
        ↓
Commit Phase  →  Submit keccak256(vote + secret_salt)   [hidden]
        ↓
Reveal Phase  →  Reveal raw vote + salt                  [verified on-chain]
        ↓
VRF Jury      →  SpaceComputer randomness selects jurors from stakers
        ↓
Resolution    →  Jury votes. Dishonest jurors slashed 20%. Winners paid.
```

The claim document and market rules are stored on **Swarm** (decentralized storage), so neither the frontend nor any admin can modify the terms after market creation.

---

## Architecture

```
apps/
  web/              Next.js 16 frontend (Turbopack, Wagmi, Viem)
    app/
      components/   SiteHeader, SiteFooter, WalletPill, SwarmBadge...
      markets/      Market detail & voting pages
      jurors/       Jury dashboard
      deploy/       Create a new market
    lib/
      registry.ts   On-chain registry reads
      market-phase  Phase state machine
      server/       Viem RPC client, Swarm claim loader, Sourcify verifier

contracts/          Foundry monorepo
  src/
    VeritasMarket.sol       Core settlement contract (commit-reveal + VRF)
    MarketRegistry.sol      Permissionless registry
  test/                     Forge unit + lifecycle integration tests
  script/                   Deploy & simulate scripts

packages/
  swarm-kv/                 Key-value store built on Swarm feeds (TypeScript SDK)
  swarm-verified-fetch/     BMT + CAC + SOC client-side chunk verification
```

---

## Smart Contract: Key Functions

| Function | Description |
|---|---|
| `commit(bytes32 hash)` | Submit hidden vote as `keccak256(vote ++ salt)` |
| `reveal(bool vote, bytes32 salt)` | Reveal vote after commit deadline |
| `selectJury()` | VRF call to SpaceComputer for random jury selection |
| `resolveAsJuror(bool decision)` | Jury member submits resolution vote |
| `settle()` | Finalize market, slash dishonest jurors, pay winners |

---

## Local Setup

### Prerequisites

- Node.js 20+
- pnpm 10+
- Foundry (`curl -L https://foundry.paradigm.xyz | bash`)

### Clone & Install

```bash
git clone https://github.com/mohammadali-2000/VeritasMarket
cd VeritasMarket
pnpm install
```

### Configure Environment

```bash
cp .env.example .env
# Edit .env with your Sepolia RPC and contract addresses
```

### Run Locally

```bash
cd apps/web
npx next dev -p 3031
# Open http://localhost:3031
```

### Run Smart Contract Tests

```bash
cd contracts
forge test -vv
```

---

## Deployment

The frontend is deployed on **Cloudflare Pages** (free plan):

**Live URL**: [https://veritas-market.pages.dev](https://veritas-market.pages.dev)

Smart contracts are deployed on **Ethereum Sepolia** testnet.

---

## Core Concepts Explained

### Commit-Reveal Voting
Voters first submit a cryptographic hash of their vote. This prevents anyone from seeing how others voted and copying them (front-running). After the commit deadline, everyone reveals their original vote. The on-chain contract verifies the hash matches.

### VRF Jury Selection
SpaceComputer provides Verifiable Random Function (VRF) output — provably random values that no one can manipulate. The protocol uses this to randomly select a subset of staked participants as "jurors" who make the final resolution decision.

### Stake Slashing
Jurors who vote against the majority (considered dishonest) automatically lose 20% of their stake. This stake is distributed to honest jurors. This game-theory mechanism incentivizes jurors to vote based on actual facts, not collusion.

### Swarm Storage
Market claim documents and rules are uploaded to Swarm (decentralized storage) before the market launches. The Swarm hash is immutable — neither the market creator nor the protocol can change the terms after launch.

---

## Handwritten Learning Notes

Step-by-step breakdown of the cryptography and game theory behind this protocol:
[LEARNING.md](./LEARNING.md)

---

## License

MIT — Built for learning, experimentation, and open-source contribution.
