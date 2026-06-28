import ApoinmentPage from "@/component/appointment";
import Choosepage from "@/component/choose";
import BannerPage from "@/component/hero";
import Image from "next/image";
import DocterPage from "./docter/page";

export default function Home() {
  return (
    <div>
      <BannerPage></BannerPage>
      <DocterPage> </DocterPage>
      <ApoinmentPage> </ApoinmentPage>
      <Choosepage></Choosepage>
    </div>
  );
}
