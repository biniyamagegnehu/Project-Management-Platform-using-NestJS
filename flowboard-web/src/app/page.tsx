import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
 return (
  <main
   className="
   p-10
   max-w-xl
   mx-auto
   "
  >
   <Card>

    <h1
     className="
     text-3xl
     font-bold
     mb-6
     "
    >
      FlowBoard
    </h1>

    <Input
      placeholder="Email"
    />

    <div className="h-4" />

    <Button>
      Continue
    </Button>

   </Card>
  </main>
 );
}