import Image from "next/image";
import { AppleCalculatorComponent } from "../components/apple-calculator";

export default function Home() {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20">
      <AppleCalculatorComponent />
    </div>
  );
}
