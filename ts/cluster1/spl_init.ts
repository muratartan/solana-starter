// import { Keypair, Connection, Commitment } from "@solana/web3.js";
// import { createMint } from "@solana/spl-token";
// import wallet from "../wba-wallet.json";

// // Import our keypair from the wallet file
// const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// //Create a Solana devnet connection
// const commitment: Commitment = "confirmed";
// const connection = new Connection("https://api.devnet.solana.com", commitment);

// (async () => {
//   try {
//     // Start here
//     const mint = await createMint(
//       connection,
//       keypair,
//       keypair.publicKey,
//       null,
//       6
//     );
//     console.log(`mint address is: ${mint}`);
//   } catch (error) {
//     console.log(`Oops, something went wrong: ${error}`);
//   }
// })();
import { encode } from "bs58";
const a = encode([
  170, 123, 41, 21, 11, 24, 16, 127, 152, 59, 250, 156, 197, 191, 93, 160, 185,
  116, 251, 227, 247, 167, 83, 84, 55, 142, 21, 211, 191, 1, 64, 96, 167, 238,
  123, 245, 220, 4, 60, 120, 209, 86, 104, 204, 69, 26, 86, 202, 5, 178, 88, 84,
  190, 9, 55, 179, 233, 100, 75, 95, 144, 192, 83, 0,
]);
console.log(a);
