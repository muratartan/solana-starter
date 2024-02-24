import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../wba-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("9fJaRByp97d9vtWfhoYTFbPCjSknPXXJScnU8CnvfDeF");

// Recipient address
const to = new PublicKey("C9ZZ4ggdMceMGPZjuseTapyBR2n7WMFfgLiVBwBd7hFV");

(async () => {
  const from_ata = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  const to_ata = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to
  );

  const tx = transfer(
    connection,
    keypair,
    from_ata.address,
    to_ata.address,
    keypair.publicKey,
    1000
  );

  console.log(
    `Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`
  );
})();
