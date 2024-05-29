import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
export default function Heading() {
    return (
        <>
            <nav className="flex p-8 justify-between">
                <div className="flex space-x-8">
                    <div className="flex items-center space-x-2">
                        <Image
                            width={36}
                            height={36}
                            src="/logo.png"
                            alt="logo"
                        />
                        <p className="font-bold text-xl">AIMS</p>
                    </div>
                    <div className="space-x-2 flex">
                        <Link href="/">
                            <Button variant="secondary">Home</Button>
                        </Link>

                        <Link href="/about">
                            <Button variant="secondary">About</Button>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Input placeholder="Search" />
                    <Link href="/cart">
                        <Button variant="outline" size='icon'><Image
                            width={16}
                            height={16}
                            src="/icon/cart.png"
                            alt="cart"
                        /></Button>
                        
                    </Link>
                </div>
            </nav>
            <Separator orientation="horizontal" />
        </>
    );
}
