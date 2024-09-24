import { } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";

export function Footer() {
    return (
        <div className="w-full bg-black fixed bottom-0">
            <div className="mx-auto w-[1040px] max-w-[1440px] h-72 flex flex-col gap-11 py-16 px-">
                <div className="flex justify-between items-center">

                    <Link href="/">
                        <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg" href="\">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M40.0561 13.9005L34.5292 3.65272C33.5106 1.76002 31.5182 0.577637 29.3494 0.577637H23.4795V3.48106H23.482C24.5644 3.48106 25.5606 4.07102 26.0697 5.01762L31.595 15.2669C32.0567 16.1213 32.2866 17.06 32.2866 18.0002C32.2866 18.9403 32.0567 19.8786 31.595 20.7334L26.0697 30.9827C25.5606 31.9293 24.5644 32.5193 23.482 32.5193H23.4795V35.4227H29.3494C31.5182 35.4227 33.5106 34.2403 34.5292 32.3476L40.0561 22.0998C40.7456 20.8173 41.0911 19.4095 41.0911 18.0002C41.0911 16.5909 40.7456 15.1831 40.0561 13.9005ZM11.7408 0.577637H17.6116V3.48106H17.6091C16.5267 3.48106 15.5305 4.07102 15.0205 5.01762L9.49661 15.2669C9.03442 16.1213 8.80457 17.06 8.80457 18.0002C8.80457 18.9403 9.03442 19.8786 9.49661 20.7334L15.0205 30.9827C15.5305 31.9293 16.5267 32.5193 17.6091 32.5193H17.6116V35.4227H11.7408C9.57289 35.4227 7.58053 34.2403 6.56192 32.3476L1.03507 22.0998C0.345521 20.8173 0 19.4095 0 18.0002C0 16.5909 0.345521 15.1831 1.03507 13.9005L6.56192 3.65272C7.58053 1.76002 9.57289 0.577637 11.7408 0.577637Z" fill="white" />

                        </svg>
                    </Link>
                    <div className="flex gap-9">
                        <div className="flex items-center gap-5">
                            <div className="size-12 rounded-full border  border-white border-opacity-10  flex items-center justify-center">
                                <LuPhone className="text-white size-5 "

                                />
                            </div>
                            <p className="text-white leading-5 text-sm font-medium">
                                (976) 7007-1234
                            </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="size-12 rounded-full border border-white border-opacity-10 flex items-center justify-center">
                                <IoMailOutline className="text-white size-5 " />
                            </div>
                            <p className="text-white leading-5 text-sm font-medium">
                                contact@ecommerce.mn
                            </p>
                        </div>
                    </div>
                </div>
                <p className="border  border-white border-opacity-10  "></p>
                <div className="flex justify-between">
                    <div className="leading-5 text-sm font-medium text-white">
                        © 2024 Ecommerce MN
                    </div>
                    <div className="flex gap-6">
                        <a href="https://www.facebook.com/pinecone.academy.mongolia?mibextid=LQQJ4d">
                            <FaFacebook className="text-white size-5" style={{ cursor: "pointer" }} href="" />
                        </a>
                        <a href="https://www.facebook.com/pinecone.academy.mongolia?mibextid=LQQJ4d">
                            <FaInstagram className="text-white size-5" style={{ cursor: "pointer" }} />
                        </a>
                        <a href="https://www.facebook.com/pinecone.academy.mongolia?mibextid=LQQJ4d">   
                            <FaTwitter className="text-white size-5" style={{ cursor: "pointer" }} />
                        </a>
                        <a href="https://www.facebook.com/pinecone.academy.mongolia?mibextid=LQQJ4d">
                            <IoLogoLinkedin className="text-white size-5" style={{ cursor: "pointer" }} />
                        </a>
                    </div>
                </div>
            </div>
        </div >
    )
}