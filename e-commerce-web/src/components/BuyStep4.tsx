import Image from "next/image";

export function BuyStepFour() {

  return (
 <div className="bg-gray-100 py-[168px]">
    <div className="bg-white rounded-2xl max-w-[374px] w-full mx-auto">
       <div className="flex flex-col gap-4 items-center py-14 px-2">
         <Image src={"/check-circle.png"} width={27} height={27} alt="check-circle" />
         <p className="font-normal text-base leading-6">Захиалга амжилттай баталгаажлаа.</p>
       </div>
    </div>
 </div>
  );
}
