import Images from "@/utils/images";
import Image from "next/image";

export default function Logo() {
  return <Image src={Images.brand.logo} alt="logo" width={36}/>;
}
