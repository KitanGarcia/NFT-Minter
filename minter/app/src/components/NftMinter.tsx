import { PublicKey } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import Image from "next/image";
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

  const mintNFT = async () => {};

  return (
    <div>
      <div className="mx-auto flex flex-col">
        {createObjectUrl && (
          <Image
            className="mx-auto mb-4"
            alt="uploadedImage"
            width="300"
            height="300"
            src={createObjectUrl}
          />
        )}
        {!mintAddress && !mintSignature && (
          <div className="mx-auto text-center mb-2">
            <input className="mx-auto" type="file" onChange={uploadImage} />
          </div>
        )}
      </div>

      <div className="flex flex-row justify-center">
        <div className="relative group items-center">
          {createObjectUrl &&
            image &&
            wallet &&
            !mintAddress &&
            !mintSignature && (
              <div>
                <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <button
                  className="px-8 m-2 mt-4 w-40 h-14 btn animate-pulse bg-gradient-to-br from-orange-300 to-orange-500 hover:from-white hover:to-orange-300 text-black text-lg"
                  onClick={mintNFT}
                >
                  <span>Mint!</span>
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
