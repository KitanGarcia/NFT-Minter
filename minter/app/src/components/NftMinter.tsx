import { PublicKey } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { FC, useState } from "react";
import { notify } from "../utils/notifications";

export const NftMinter: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const wallet = useWallet();

  const [image, setImage] = useState(null);
  const [createObjectUrl, setCreateObjectUrl] = useState(null);
  const [mintAddress, setMintAddress] = useState(null);
  const [mintSignature, setMintSignature] = useState(null);

  const uploadImage = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedImage = event.target.files[0];
      setImage(uploadedImage);

      // Creates a string containing an object URL that can be used to reference the contents of the specified source object.
      setCreateObjectUrl(URL.createObjectURL(uploadedImage));

      const body = new FormData();
      body.append("file", uploadedImage);
      await fetch("/api/upload", {
        method: "POST",
        body,
      }).catch((res) => {
        notify({ type: "error", message: "Upload failed!", description: res });
        console.log("Error", `Upload failed! ${res}`);
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={uploadImage} />
      <button>Mint NFT!</button>
    </div>
  );
};
