import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ethers } from "ethers";
import TokenFactoryArtifact from "../data/smart-contract/TokenFactory.json";
import { useForm } from "react-hook-form";

export default function Home() {
  const [account, setAccount] = useState("0x0000");

  const [isConnected, setIsConnected] = useState(false);

  let provider: any;

  let signer: any;

  let contract: any;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      symbol: "",
      totalSupply: 0,
    },
    mode: "onChange",
  });

  async function connectWallet() {
    if (window.ethereum == null) {
      console.log("MetaMask not installed");
    } else {
      try {
        provider = new ethers.providers.Web3Provider(window.ethereum);

        const address = await provider.send("eth_requestAccounts", []);

        signer = provider.getSigner();

        setAccount(address[0]);

        contract = new ethers.Contract(
          TokenFactoryArtifact.address,
          TokenFactoryArtifact.abi,
          provider
        );

        console.log("contract", contract);

        setIsConnected(true);
      } catch (error) {
        console.log("Error connection...");

        console.log(error);
      }
    }
  }

  async function createToken(values: any) {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }

    const contractWithSigner = contract!.connect(signer);

    const { name, symbol, totalSupply } = values;

    console.log("name", name);

    const price = await contract?.price();

    console.log("price", price);

    const overrides = {
      value: price,
    };

    const tx = await contractWithSigner?.createToken(
      name,
      symbol,
      totalSupply,
      overrides
    );

    toast.success(
      `Token was created success, you can check address using transaction hash in bscscan`
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="absolute top-6 right-6">
        <Button
          outline={true}
          onClick={connectWallet}
          gradientDuoTone="purpleToBlue"
        >
          {isConnected ? account : "Connect wallet"}
        </Button>
      </div>

      <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-sky-800">
        Create your own token in a few clicks
      </h1>

      <form
        className="flex flex-col my-auto gap-4"
        onSubmit={handleSubmit(createToken)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Token name" />
          </div>

          <TextInput
            id="name"
            type="name"
            placeholder="Ethereum"
            required={true}
            {...register("name", { required: "Enter token name" })}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="symbol" value="Token symbol" />
          </div>

          <TextInput
            id="symbol"
            type="symbol"
            placeholder="ETH"
            required={true}
            {...register("symbol", { required: "Enter token symbol" })}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="total-supply" value="Token total supply" />
          </div>

          <TextInput
            id="total-supply"
            type="total-supply"
            placeholder="1000000"
            required={true}
            {...register("totalSupply", {
              required: "Enter token total supply",
            })}
          />
        </div>

        <Button type="submit">Create token</Button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
