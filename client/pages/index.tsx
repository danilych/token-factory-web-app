import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";


export default function Home() {
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <div className="absolute top-6 right-6">
        <Button outline={true} gradientDuoTone="purpleToBlue">
          Connect wallet
        </Button>
      </div>

      <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-sky-800">
        Create your own token in a few clicks
      </h1>

      <form className="flex flex-col my-auto gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Token name" />
          </div>

          <TextInput
            id="name"
            type="name"
            placeholder="Ethereum"
            required={true}
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
          />
        </div>

        <Button type="submit">Create token</Button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
