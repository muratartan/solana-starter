import wallet from "../wba-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { PublicKey } from "@solana/web3.js";

// Define our Mint address
const mint = publicKey("9fJaRByp97d9vtWfhoYTFbPCjSknPXXJScnU8CnvfDeF");
const tokenMetadataProgramId = publicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
// const [metadata] = PublicKey.findProgramAddressSync(
//   [
//     Buffer.from("metadata"),
//     new PublicKey(tokenMetadataProgramId).toBuffer(),
//     new PublicKey(mint).toBuffer(),
//   ],
//   new PublicKey(tokenMetadataProgramId)
// );

// // Create a UMI connection
// const metadataSeeds = [
//   Buffer.from("metadata"),
//   "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
// ];
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here

    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };
    let data: DataV2Args = {
      name: "Reiner Braun",
      symbol: "RB",
      uri: "https://arweave.net/1234",
      sellerFeeBasisPoints: 500,
      creators: null,
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });
    let result = await tx
      .sendAndConfirm(umi)
      .then((r) => r.signature.toString());
    console.log(result);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
