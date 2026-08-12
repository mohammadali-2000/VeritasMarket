# 📝 Handwritten Learning Notes: VeritasMarket Protocol

> **Personal Study & Video Script Guide**  
> *Topic: How Commit-Reveal Schemes, VRF Random Juries, and Stake Slashing Work in DeFi*

---

## 💡 Concept Breakdown (Explain Like I'm 5)

### 1. Why Do We Need Random Juries Instead of Oracles?
- Traditional prediction markets rely on centralized oracles (or multi-sigs) to declare who won.
- If the oracle lies or gets hacked, the market is corrupted.
- VeritasMarket uses a **Random Jury** selected via VRF (Verifiable Random Function) from a pool of stakers. 

### 2. How the Commit-Reveal Scheme Works

```
[ Phase 1: Commit ] ---> [ Phase 2: VRF Selection ] ---> [ Phase 3: Reveal ] ---> [ Settlement ]
 (Hash of Vote + Salt)     (SpaceComputer VRF)             (Secret Salt Shown)      (Payout/Slash)
```

1. **Commit Phase**: A user votes `YES` or `NO` by hashing their vote with a secret random salt: `keccak256(vote + salt)`. They submit ONLY the hash to the smart contract. Nobody can see what they voted!
2. **VRF Jury Selection**: SpaceComputer randomness picks 5 stakers to form the final jury.
3. **Reveal Phase**: The selected jurors submit their secret `salt`. The smart contract re-hashes it and verifies it matches the original commit.
4. **Slash & Settlement**: Jurors who voted against the majority lose 20% of their stake. Jurors who refused to reveal lose 100% of their stake!

---

## 🎬 60-Second Video Script (For Twitter / LinkedIn)

Use this script for your video showcase:

> **[0:00 - 0:15 Intro]**  
> *"Oracles are the biggest single point of failure in prediction markets. Today I built VeritasMarket — a decentralized belief settlement protocol powered by cryptographic Commit-Reveal and VRF Juries."*
>
> **[0:15 - 0:35 How it works]**  
> *"When a user stakes on a market, their vote is cryptographically hidden during the Commit phase using Keccak hashes. Next, SpaceComputer VRF selects a random jury of stakers."*
>
> **[0:35 - 0:50 Settlement]**  
> *"During the Reveal phase, jurors unlock their votes. Dishonest jurors get automatically slashed by 20%, and the rewards are distributed to the honest majority."*
>
> **[0:50 - 1:00 Outro]**  
> *"Check out the smart contract & Next.js frontend code on my GitHub below!"*

---

*Notes created for Ali's Public Web3 Portfolio | July 2026*
